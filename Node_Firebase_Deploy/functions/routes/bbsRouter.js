var express = require('express');
var router = express.Router();
// js에서 날짜와 관련된 이슈를 피하기 위한 날짜 미들웨어
var moment = require("moment")
require("moment-timezone")
moment.tz.setDefault("Asia/Seoul")
// firebase DB와 연동하기 위한 미들웨어 설정
var firebase = require("firebase")
require("firebase/auth")
require("firebase/firestore")

const firebaseConfig = require("../config/firebaseConfig.json")
firebase.initializeApp(firebaseConfig)

/*
- db.ref("bbs") : firebase에 데이터를 요청하는 호출 메소드
- once("value") : firebase DB에서 데이터를 조회할 때 사용하는 이벤트 메소드
데이터 요청이 허락되면 value라는 이름으로 응답을 수행하는데 그 때 응답을 수신하는 메소드
- then(call back 함수) : callback 함수를 통해서 수신된 데이터를 처리
- orderByKey() : Key 값을 기준으로 오름차순 정렬
DB의 Key값이 랜덤 UUID값이기 때문에 실제로 정렬하는데 별로 의미가 없다
- orderByChild("b_date") : b_date 칼럼을 기준으로 오름차순 정렬

Firebase의 단점
- 키 값으로 오름차순 정렬은 되지만 내림차순(DESC) 정렬이 불가능하다
- 복수(2개 이상)의 칼럼으로 정렬이 불가능하다 (Query.orderByChild: You can't combine multiple orderBy calls.)
*/
router.get("/", function(req, res) {
  let db = firebase.database()
  db.ref("bbs")
  //.orderByKey()
  .orderByChild("b_date")
  .once("value", (resultSet) => {
    let bbsList = []
    resultSet.forEach((bbs) => {
      bbsList.push(bbs.val())
    })
    res.render("bbs/list", { bbsList })
  })
})

router.get("/details/:seq", (req, res) => {
  let seq = req.params.seq
  let db = firebase.database()
  db.ref("bbs/" + seq)
  .once("value")
  .then((result) => {
    //console.log(result.val())
    res.render("bbs/details", {bbs : result.val()} )
  })
})

router.get("/update/:seq", (req, res) => {
  let seq = req.params.seq
  let db = firebase.database()
  db.ref("bbs/" + seq)
  .once("value")
  .then((result) => {
    //console.log(result.val())
    res.render("bbs/write", {bbs : result.val()} )
  })
})

router.get("/write", (req, res) => {
  // newData 안에 편의상 안에 칼럼(변수명)을 설정하긴 했지만
  // 실제로 pug에서는 let newData = {} 처럼 빈 값만 보내도 오류가 발생하지 않는다
  let newData = {
    b_title : "",
    b_writer : "",
    b_content : "",
    b_date : "",
    b_time : "",
    seq : ""
  }
  res.render("bbs/write", {bbs : newData})
})

router.post("/write", (req, res) => {
  let seq = req.body.seq

  // 1. DB Schema 접속하기
  // firebase DB는 접속방법이 인터넷을 통한 클라우드 네트워크에 접속하는 것이므로
  // CRUD를 수행할 때마다 DB에 접속해야 한다는 규칙이 있다
  let db = firebase.database()

  // req.body = form에서 입력한 데이터가 담겨져 있음. newData에 복제
  let newData = req.body

  // seq값을 받지 않은 경우(새 글인 경우)
  // 새로운 seq를 생성해서 insert 상태로 만들고 날짜와 시각을 생성하여 data (req.body)에 추가
  if(seq == "") {
    // moment를 사용하여 현재 날짜를 년-월-일 형태의 문자열만 가져오기
    let bDate = moment().format("YYYY-MM-DD")
    let bTime = moment().format("HH:mm:ss")

    // 2. insert를 수행하기 전 PK 값을 생성해달라고 요청해야 한다
    // ref() : 접속된 DB의 정보
    // child("테이블명") : 테이블명
    // key : 새로운 PK값
    seq = db.ref().child("bbs").push().key

    // newData 객체 안에 b_date, b_time 변수를 새로 만들고
    // 각각 bDate, b_time 값 저장하기
    newData.b_date = bDate
    newData.b_time = bTime
    // 새로 생성된 PK 값을 seq 변수에 저장
    newData.seq = seq
  }

  // bbs테이블에 newKey값을 PK로 하는 레코드를 만들고 newData 데이터를 setting
  db.ref("/bbs/" + seq).set(newData)
  //res.json(req.body)
  res.redirect("/bbs")
})

router.get("/delete/:seq", (req, res) => {
  let seq = req.params.seq
  firebase.database().ref("bbs/" + seq).remove()
})

module.exports = router;
