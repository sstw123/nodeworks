// express 프레임워크를 사용한 router 생성
var express = require("express")
var router = express.Router()
var bookVO = require("../models/bookVO")

// selectAll 전체 리스트 보기
router.get("/", function(req, res) {
    bookVO.find({}, function(err, books) {
        res.render("book/list", {books : books})
    })
})
// 추가(insert) 화면 보여주기
router.get("/insert", function(req, res) {
    var book = new bookVO()
    res.render("book/write", {book : book, formTitle : "INSERT"})
})
// 추가 화면에서 저장 버튼을 클릭했을 때 DB에 저장할 메소드
router.post("/insert", function(req, res) {
    var book = new bookVO(req.body)
    book.save(function(err, data) {
        if(err) res.end("Insert Error")
        else res.redirect("/book")
    })
})
// 수정(update)화면 보여주기
router.get("/update/:book_id", function(req, res) {
    bookVO.findById(req.params.book_id, function(err, book) {
        if(err) res.end("findById Error")
        else res.render("book/write", {book : book, formTitle : "UPDATE"})
    })
})
// 수정 화면에서 저장 버튼 클릭시 DB에 저장할 메소드
router.post("/update/:book_id", function(req, res) {
    bookVO.update({_id : req.params.book_id}, {$set:req.body}, function(err, book) {
        if(err) res.end("Update Error")
        else res.redirect("/book")
    })
})
// 삭제버튼 클릭시 DB에서 삭제할 메소드
router.get("/delete/:book_id", function(req, res) {
    bookVO.deleteOne({_id : req.params.book_id}, function(err, book) {
        if(err) res.end("Delete Error")
        else res.redirect("/book")
    })
})

module.exports = router