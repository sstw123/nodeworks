var express = require('express')
var router = express.Router()

const retData = {
    nation : "Korea",
    name : "lee",
    age : 30
}

// app.js에서 매칭한 /hello 와 함께 path mapping이 된다
router.get("/", function(req, res) {
    res.write("Hello Hello")
    // write() 함수를 사용해서 web 브라우저에 문자열 형태로 데이터 표시하기
    // write() 문자열들을 전송하고 끝에 반드시 end()를 전송해줘야 한다
    // 한줄의 문자열만 전송할때는 write() 없이 end()만 전송하면 된다
    res.end("end")
})

router.get("/json", function(req, res) {   
    res.json(retData)
})

// router의 call 함수의 파람터
// 첫번째 파라미터(req)는 web에서 전송되느 req 정보가 담길 변수
// 두번째 파라미터(res)는 서버에서 응답할때 여러 정보를 담아서 보낼 객체
router.get("/view", function(req, res) {
    res.render("myview", {
        nation:"대한민국",
        name:'홍길동', 
        age:22
    })
})

router.get("/model", function(req, res) {
    res.render("mymodel", {mydata : retData})
})

// 서버에 request 요청시 query String으로 데이터를 보내면
// req.query 객체를 참고하여 값을 받을 수 있다
router.get("/insert", function(req, res) {
    let name = req.query.name
    let nation = req.query.nation
    let retData = {name:name, nation:nation}
    res.json(retData)
})

router.get("/update/:id/:age", function(req, res) {
    let id = req.params.id
    let age = req.params.age
    let retData = {id:id, age:age}
    res.json(retData)
})

router.get("/add", function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=UTF-8"})
    res.end("숫자가 없어서 덧셈 불가")
})

router.get("/add/:num1", function(req, res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=UTF-8"})
    res.end("덧셈을 수행하려면 2개의 숫자를 붙여 보내세요")
})

router.get("/add/:num1/:num2", function(req, res) {
    let intNum1 = parseInt(req.params.num1)
    let intNum2 = parseInt(req.params.num2)
    let ret = {
        숫자1: intNum1,
        숫자2: intNum2,
        합계: intNum1 + intNum2
    }
    //res.json(ret)
    res.render("mymodel" ,ret)
})

module.exports = router
// 꼭 이 코드가 있어야 다른데서 사용 가능