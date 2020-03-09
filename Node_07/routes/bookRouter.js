var express = require("express")
var router = express.Router()
var bookModel = require("../models/bookModel")

router.get("/", function(req, res) {
    /*
    bookModel.find({}, function(err, data) {
        res.render("book/list", {books : data})
    })
    */
   bookModel.find({})
            .limit(5).skip(0)
            .sort({bTitle : "desc"}) // 1 : asc, -1 : desc
            .exec(function(err, books) {
       res.render("book/list", {books : books})
   })
   // mongoose 5.x 미만 .then 사용
   // mongoose 5.x 이상 .exec
   // sort도 1, -1 대신 "asc", "desc" 사용 가능
})

router.get("/insert", function(req, res) {
    var book = new bookModel()
    res.render("book/write", {book : book, formTitle : "INSERT"})
})

router.post("/insert", function(req, res) {
    var book = new bookModel(req.body)
    book.save(function(err, data) {
        res.redirect("/book")
    })
})

router.get("/update/:id", function(req, res) {
    var id = req.params.id
    bookModel.findOne({_id : id}, function(err, data) {
        res.render("book/write", {book : data, formTitle : "UPDATE"})
    })
})

router.post("/update/:id", function(req, res) {
    var id = req.params.id
    bookModel.update({_id : id}, {$set:req.body}, function(err, data) {
        if(err) res.end("업데이트 실패")
        else res.redirect("/book")
    })
})

router.get("/delete/:id", function(req, res) {
    bookModel.deleteOne({_id : req.params.id}, function(err, data) {
        if(err) res.end("삭제 실패")
        else res.redirect("/book")
    })
})

module.exports = router