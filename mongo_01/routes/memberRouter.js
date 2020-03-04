// web에서 request한 path 관련 정보를 추출하기 위한 도구(미들웨어) 선언
var express = require("express")
var router = express.Router()

// mongoDB에 CRUD 구현을 위한 VO 객체 선언
var memberVO = require("../models/memberVO")

router.get("/list", function(req, res) {
    memberVO.find(function(err, data) {
        res.render("list", {members : data})
    })
})

router.get("/insert", function(req, res) {

    let data = new memberVO()
    res.render("write", {
        item : data,
        action : "/member/insert",
        pageTitle : "회원정보 추가"
    })
    
})

router.post("/insert", function(req, res) {
    /*
    web으로부터 데이터 전달받기
    query(?var1=값&var2=값) 문자열로 보낸 데이터
    : req.query.var1 형식으로 받음

    path variable( /path/:var1/:var2) 형식으로 받는 데이터
    : req.params.var1 형식으로 받음

    form에 담겨서 전달되는 데이터는 req.body로 받는다 (VO 형식)
    */
   let newVO = new memberVO(req.body)
   newVO.save(function(err, data) {
       //res.json(data)
       res.redirect("/member/list")
   })
   // req.body에 저장되어있는 데이터를 newVO 변수에 복사하고
   // save() 메소드를 실행한 후
   // 정상적으로 save()되면 callback 함수를 실행하여 현재 DB에 저장된 레코드를 web에 확인시킨다
}) // router.post() end

router.get("/listjson", function(req, res) {
    memberVO.find(function(err, data) {
        res.json(data)
    })
})

router.get("/update/:id", function(req, res) {
    let id = req.params.id

    memberVO.findOne({_id : id}, function(err, data) {
        res.render("write", {
            item : data,
            action : "/member/update",
            pageTitle : "회원정보 수정"
        })
    })
})

router.post("/update/:id", function(req, res) {
    let id = req.params.id
    memberVO.update({_id:id}, {$set:req.body}, function(err, data) {
        res.redirect("/member/list")
    })
})

router.post("/delete/:id", function(req, res) {
    let id = req.params.id
    memberVO.deleteOne({_id:id}, function(err, data) {
        res.redirect("/member/list")
    })
})

router.get("/delete", function(req, res) {
    
})

module.exports = router