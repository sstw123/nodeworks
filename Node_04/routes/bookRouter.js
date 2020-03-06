var express = require("express")
var router = express.Router()

router.get("/list", function(req, res) {
    res.end("list")
})

router.get("/insert", function(req, res) {
    //res.render("write")
    res.end("insert")
})

router.post("/insert", function(req, res) {
    // DB 추가
    res.end("insert_post")
})

router.get("/update", function(req, res) {
    // id값으로 조회해서 조회 후 render에 건네주기
    // res.render("writer")
    res.end("update")
})

router.put("/update", function(req, res) {
    res.end("update_put")
})

router.delete("/delete", function(req, res) {
    res.end("delete_delete")
})

module.exports = router