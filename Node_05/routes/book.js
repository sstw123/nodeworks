var express = require("express")
var router = express.Router()
var BookModel = require("../model/bookModel.js")

router.get("/", function(req, res) {
    res.render("book")
})

router.get("/list", function(req, res) {
    BookModel.find({}, function(err, data) {
        res.render("book/list", {bookList : data})
    })
})

router.get("/info/:book_id", function(req, res) {
    BookModel.findOne({_id : req.params.book_id}, function(err, data) {
        res.render("book/info", {book : data})
    })
})

router.get("/insert", function(req, res) {
    var bookModel = new BookModel()
    res.render("book/save", {book : bookModel})
})

router.post("/insert", function(req, res) {
    var bookModel = new BookModel(req.body)
    bookModel.save(function(err, data) {
        if(err) {
            console.error(err)
            res.json({result : "insert 오류"})
            return;
        } else {
            res.redirect("/book/list")
        }
    })
})

router.get("/update/:book_id", function(req, res) {
    BookModel.findOne({_id : req.params.book_id}, function(err, book) {
        res.render("book/save", {book : book})
    })
})

router.post("/update/:book_id", function(req, res) {
    BookModel.update({_id : req.params.book_id}, {$set:req.body}, function(err, data) {
        if(err) {
            console.error(err)
            res.json({result : "update 오류"})
            return;
        }
        res.redirect("/book/list")
    })
})

router.get("/delete/:book_id", function(req, res) {
    BookModel.deleteOne({_id : req.params.book_id}, function(err, data) {
        if(err) {
            console.error(err)
            res.json({result : "delete 오류"})
            return;
        }
        else res.redirect("/book/list")
    })
})

module.exports = router