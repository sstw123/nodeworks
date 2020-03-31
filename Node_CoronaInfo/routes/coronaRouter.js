var express = require("express")
var router = express.Router()

router.get("/", (req, res) => {
    res.render("extends/main_content")
})

router.get("/info", (req, res) => {
    res.render("extends/info")
})

router.get("/statistics", (req, res) => {
    res.render("extends/statistics")
})

router.get("/route", (req, res) => {
    res.render("extends/route")
})

module.exports = router