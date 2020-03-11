var express = require('express');
var router = express.Router();
var busStation = require("../models/busStation")

/* GET home page. */
router.get('/', function(req, res, next) {
  let station = req.query.station
  busStation.find({BUSSTOP_NAME : station}).sort({BUSSTOP_NAME : "asc"})
  .exec(function(err, stationList) {
    res.render("bus/station", {stationList : stationList})
  })
});

module.exports = router;
