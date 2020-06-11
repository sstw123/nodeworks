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

router.get("/", function(req, res) {
  let db = firebase.database()
  db.ref("bbs").orderByKey().once("value", (resultSet) => {
    var bbsList = []
    resultSet.forEach((bbs) => {
      bbsList.push(bbs.val())
    })
    res.render("bbs/list", { bbsList })
  })
})

router.get("/write", (req, res) => {
  res.render("bbs/write")
})

router.post("/write", (req, res) => {
  // moment를 사용하여 현재 날짜를 년-월-일 형태의 문자열만 가져오기
  let bDate = moment().format("YYYY-MM-DD")
  let bTime = moment().format("HH:mm:ss")

  // 1. DB Schema 접속하기
  // firebase DB는 접속방법이 인터넷을 통한 클라우드 네트워크에 접속하는 것이므로
  // CRUD를 수행할 때마다 DB에 접속해야 한다는 규칙이 있다
  let db = firebase.database()

  // 2. insert를 수행하기 전 PK 값을 생성해달라고 요청해야 한다
  // ref() : 접속된 DB의 정보
  // child("테이블명") : 테이블명
  // key : 새로운 PK값
  let newKey = db.ref().child("bbs").push().key

  // req.body = form에서 입력한 데이터가 담겨져 있음. newData에 복제
  let newData = req.body

  // newData 객체 안에 b_date, b_time 변수를 새로 만들고
  // 각각 bDate, b_time 값 저장하기
  newData.b_date = bDate
  newData.b_time = bTime
  // 새로 생성된 PK 값을 seq 변수에 저장
  newData.seq = newKey
  // bbs테이블에 newKey값을 PK로 하는 레코드를 만들고 newData 데이터를 setting
  db.ref("/bbs/" + newKey).set(newData)
  res.json(req.body)
})

module.exports = router;
