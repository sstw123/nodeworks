var express = require("express")
var router = express.Router()

var a = function(err) {
    router.get("/", function(req, res) {
        res.send("Sample Router")
    })

    return router
}

module.exports = router