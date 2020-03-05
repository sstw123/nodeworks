// node.js router (Spring의 controller)
// web request 응답을 쉽게 처리할 수 있도록 도와주는 미들웨어
// web request에 반응하는 이벤트 핸들러로 봐도 된다
var router = require("express").Router()

var bookVO = require("../models/book.js")// .js 생략 가능

// web에서 localhost:3000/RouterMapping/ 주소로 요청하면 반응할 이벤트 핸들러
// router.get() 요청은 callback 함수에게 req, res, next 3개의 매개변수를 주입한다
// req : web으로부터 전달된 HTTP 정보들이 들어있다
// res : web에게 전달(응답)할 HTTP 정보들이 기본적으로 들어있다
// 1. req에서 필요한 데이터를 가져와서 2. res에 응답할 데이터를 추가하여 3. web에게 응답한다
router.get("/", function(req, res, next) {
    bookVO.find({}, function(err, data) {
        //res.json(data)
        res.render("books/list", {books : data})
    })
})

router.get("/insert", function(req, res) {
    var newVO = new bookVO()
    res.render("books/write", {book : newVO, btnText:"추가"})
})

// form POST method로 값이 전송되어 왔을 때
router.post("/insert", function(req, res) {
    /*
    form의 데이터 submit시 req.body로 데이터를 받는다(VO 형식)
    HTTP 프로토콜에서는 body에 답겨있는 데이터를 payload라고 부른다
    */

   //새로운 bookVO를 생성하면서 req.body를 생성자에 넣어주면 VO에 json형식의 데이터가 그대로 담긴다
   var newVO = new bookVO(req.body)
   //그 VO를 save 메소드에 넘겨준다
   newVO.save(req.body, function(err, data) {
       // save 메소드는 save 성공시 추가된 데이터를 findOne으로 찾아서 data에 담아준다
       // res.json(data)
       res.redirect("/book")
   })
})// router.post("/insert")

router.get("/name", function(req, res) {
    let name = req.query.name
    bookVO.findOne({bName:name}, function(err, data) {
        res.json(data)
    })
})

// id값을 path variable로 수신하여 데이터 조회 후 write 폼으로 전송
router.get("/update/:id", function(req, res) {
    // path variable 형식으로 받은 파라미터는 req.params에 담겨있다
    // req.params에서 id 추출 = req.params.id
    let id = req.params.id
    bookVO.findOne({_id : id}, function(err, data) {
        //res.json(data)
        res.render("books/write", {book : data, btnText:"수정"})
    })
})
// RESTful : update시 method=PUT 방식 권장
// 수행하려는 행동이 무엇인지 명확히 하려는 의미이다
// router.put("/update/:id")
router.post("/update/:id", function(req, res) {
    var id = req.params.id
    // var updateVO = new bookVO(req.body)
    bookVO.update({_id:id}, {$set:req.body}, function(err, data) {
        res.redirect("/book")
    })
})

// RESTful : router.delete("/delete/:id")
// 웹에서는 잘 사용하지 않는다
router.get("/delete/:id", function(req, res) {
    var id = req.params.id

    bookVO.deleteOne({_id:id}, function(err, data) {
        res.redirect("/book")
    })
})

// 위에서 세팅된(초기화, get() 메소드가 설정된) router 객체를 외부에서 참조할 수 있도록 내보내기 설정
module.exports = router