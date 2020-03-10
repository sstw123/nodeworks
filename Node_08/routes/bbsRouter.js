var express = require("express")
var router = express.Router()
// models 폴더에 여러 VO가 있으면 json 형식으로 가져오기
var {bbsVO} = require("../models")
var moment = require('moment')
require('moment-timezone')

moment.tz.setDefault("Asia/Seoul")


router.get("/", function(req, res) {
    res.redirect("/bbs/list")
})

router.get("/list", function(req, res) {
    bbsVO.findAll()
    .then(function(bbsList) {
        res.render("index", {bbsList : bbsList})
    })
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
})

router.get("/view/:id", function(req, res) {
    let id = req.params.id
    bbsVO.findOne({
        where : {b_id : id}
    })
    .then(function(bbs) {
        bbsVO.update(
            {b_count : bbs.b_count + 1},
            {where : {b_id : bbs.b_id}}
        )
        .then(function() {
            bbsVO.findOne({
                where : {b_id : id}
            }).then(function(updated_bbs) {
                res.render("bbs/view", {bbs : updated_bbs})
            })
        })
    })

    
})

router.get("/insert", function(req, res) {
    let bbsVO = {
        b_date : "2020-03-10",
        b_time : "11:04:00"
    }
    res.render("bbs/write", {bbs : bbsVO})
})

router.post("/insert", function(req, res) {
    bbsVO.create({
        b_date : "2020-03-10",
        b_writer : req.body.b_writer,
        b_subject : req.body.b_subject,
        b_text : req.body.b_text
    }).then(function(result) {
        //res.json(result)
        res.redirect("/bbs")
    })
})

router.get("/update/:id", function(req, res) {
    let id = req.params.id
    bbsVO.findOne({
        where : {b_id : id}
    })
    .then(function(bbs) {
        res.render("bbs/write", {bbs : bbs})
    })
    // catch : Exception 발생시 웹페이지에 오류 보여주기
    .catch(function(err) {
        res.send(err)
    })
})

router.post("/update/:id", function(req, res) {
    let id = req.params.id
    bbsVO.update({
        b_date : "2020-03-10",
        b_writer : req.body.b_writer,
        b_subject : req.body.b_subject,
        b_text : req.body.b_text
    },
    {where : {b_id : id}}
    )
    .then(function() {
        res.redirect("/bbs/view/" + id)
    })
    .catch(function(err) {
        res.send(err)
    })
})

router.get("/delete/:id", function(req, res) {
    bbsVO.destroy({where : {b_id : req.params.id}})
    .then(function() {
        res.redirect("/bbs")
    })
})

module.exports = router