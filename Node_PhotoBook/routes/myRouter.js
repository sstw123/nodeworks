var express = require("express")
// express framework에서 router 모듈을 사용할 수 있도록 추출하여 초기화
var router = express.Router()

// req: 사용자가 웹을 통해서 요청한 정보들이 담긴 객체
// res: 서버에서 웹에 return하는 정보들이 담길 객체
router.get("/", function(req, res) {
    // res 객체의 send() 함수: 일반적인 문자열 형태로 response를 보낼 때 사용
    // send() 함수를 한번 실행하면 이후에 res객체의 다른 method는 호출할 수 없다
    res.send("반갑습니다")
})

router.get("/nation", function(req, res) {
    // res 객체의 write() 함수: 여러 메세지를 전송할 때 사용하는 함수
    // write() 함수로 메세지를 전송하고 나면 반드시 end() 함수를 호출해주어야 한다
    res.write("우리나라만세<br/>")
    res.write("대한민국만세<br/>")
    res.writeHead(200, {"Content-type" : "text/html; charset=utf-8"})
    // res.end() 함수는 그냥 써도 되지만 괄호 안에 문자열을 전송할 수도 있다
    res.end("end");
})

// 모듈 객체를 외부에서 require하여 사용할 수 있도록 return하는 명령문
module.exports = router;