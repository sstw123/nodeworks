var express = require("express")
var router = express.Router()

router.get("/:data/list", function(req, res) {
    let data = req.params.data

    if(data == "book") {
        bookVO.find({}, function(err, data) {
            res.json(data)
        })
    } else if (data == "member") {

    } else if (data == "address") {

    }
    
    res.end("list")
})

router.get("/:data/insert", function(req, res) {
    //res.render("write")
    res.end("insert")
})

router.post("/:data/insert", function(req, res) {
    // DB 추가
    res.end("insert_post")
})

router.get("/:data/:id/update", function(req, res) {
    // id값으로 조회해서 조회 후 render에 건네주기
    // res.render("writer")
    res.end("update")
})

router.put("/:data/:id/update", function(req, res) {
    res.end("update_put")
})

router.delete("/:data/:id/delete", function(req, res) {
    res.end("delete_delete")
})

module.exports = router