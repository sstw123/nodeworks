var express = require("express")
var router = express.Router()
var bbsVO = require("../models/bbsVO")
var moment = require("moment")
require("moment-timezone")
moment.tz.setDefault("Asia/Seoul")
var cors = require("cors")

var app = express();

var corsOption = {
    origin : "http://localhost:3000",
    optionsSuccessStatue : 200// IE 버전 때문에 생기는 문제 제거
  }

router.get("/", (req, res) => {
    // CORS 모듈 없이 CORS 정책을 허용하기 위한 설정
    // CORS 정책을 허용할 모든 라우터에 하나하나 설정을 해주어야 한다
    // res.header("Access-Control-Allow-Origin", "*")
    // res.header("Access-Control-Allow-Headers", "X-requested-With")

    bbsVO.find({})
    .exec((err, data) => {
        res.json(data)
    })
})

router.post("/insert", (req, res) => {
    req.body.b_date = moment().format("YYYY-MM-DD")
    req.body.b_time = moment().format("HH:mm:ss")

    var bbs = new bbsVO(req.body)

    bbs.save((err, data) => {
        res.json(data)
    })
})

router.put("/", (req, res) => {
    console.log(req.body)

    bbsVO.update({_id : req.body._id}, {$set : req.body})
    .exec((err, result) => {
        res.json(result)
    })
})

router.delete("/", (req, res) => {
    console.log("바디값 :" , req.body)
    bbsVO.deleteOne({_id : req.body._id})
    .exec(function(err, data) {
        if(err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;