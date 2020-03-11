var express = require("express")
var router = express.Router()

var busStation = require("../models/busStation")

var request = require("request")

// router를 선언하는 곳에서(app.js) 매개변수로 config 값을 전달하기 위해서 선언
// module.exports = function(config) {
var busRouter = function(app, config) {

    // 전체데이터 개수, 한 페이지에 보일 개수, 현재 선택된 페이지가 몇 번인지 확인 가능
    var paginate = require("express-paginate")
    const pageLimit = 10
    
    app.use(paginate.middleware(10, 50))
    // 기본 limit 10개, 최대 limit 50개 설정

    // 다른 router 메소드를 실행하기 전 먼저 실행하여 변수, 세팅 등을 설정한 후
    // request를 요청한 다음 라우터(next)로 전달하기
    router.all(function(req, res, next) {
        if(req.query.limit <= 10) req.query.limit = 10
        next()
    })

    router.get("/bustime", function(req, res) {
        let busStop_id = req.query.id

        // 정류장 번호에 해당하는 정보 API 요청
        let apiURL = config.bus.arrive_url + "?serviceKey=" + config.bus.apiKey + "&BUSSTOP_ID=" + busStop_id

        request({url : apiURL, method : "GET"}, function(err, response, body) {
            var stop_info = JSON.parse(body)//정류장 ID에 해당하는 정보
            if(stop_info.RESULT.RESULT_CODE == "ERROR") {
                res.send("도착정보 없음")
            } else {
                res.render("bus/bustime", {bustimeList : stop_info.BUSSTOP_LIST})//정류장 정보에서 BUSSTOP_LIST 가져오기
            }
        })

        busStation.findOne({BUSSTOP_ID : busStop_id}, function(err, data) {

        })
    })

    router.get("/searchstation", function(req, res) {
        /*
            mongoose 문자열 검색
            {칼럼명 : 값} : 완전히 일치하는 문자열만 검색
            {칼럼명 : RegExp("^"" + 값)} : 시작문자열 검사 = 값%
            {칼럼명 : RegExp(값, "ig")} : 중간문자열 검사 = %값%
        */
        let station = req.query.station
        busStation.find({BUSSTOP_NAME : RegExp(station, "ig")})
        .sort({BUSSTOP_NAME : "asc"})
        .exec(function(err, stationList) {
            res.render("bus/station_small", {stationList : stationList})
        })
    })

    router.get("/viewstation", function(req, res) {
        // 현재 선택된 페이지 번호가 req.query.page에 담겨서 전달되면
        // 그 페이지번호에 pageLimit 값을 곱하여 몇 번째 데이터부터 읽어올 것인지 설정
        // offset == skip
        let offset = (req.query.page - 1) * pageLimit

        // 전체 데이터 수 구하기
        busStation.count({})
        .exec(function(err, count) {
            // 전체 데이터 수를 페이지당 데이터 수로 나우어 총 몇페이지가 필요한지 계산
            let pageCount = Math.ceil(count / pageLimit)

            // 페이지당 보일 데이터(pageLimit), 전체 페이지 수(pageCount), 현재 선택된 페이지(req.query.page)를
            // paginate.getArrayPage에 전달하면 페이지를 그리는데 필요한 정보가 담긴 객체를 자동으로 생성(pageInfo)
            let pageInfo = paginate.getArrayPages(req)(pageLimit, pageCount, req.query.page)

            // 실제 한 페이지에 보여줄 데이터를 읽어오는데 (find) 위에서 계산한 pageLimit, offset 값을 활용하여 필요한 부분만 가져오기
            busStation.find({}).limit(pageLimit).skip(offset)
            .exec(function(err, stationList) {
                // 데이터 리스트 전달
                res.render("bus/station_small", {
                    stationList : stationList,//실제 리스트 데이터
                    pageCount : pageCount,
                    itemCount : count,//전체 개수
                    currentPage : req.query.page,
                    pages : pageInfo
                })
            })
        })
        /*
        busStation.find({}).skip(100).limit(100).sort({ BUSSTOP_NAME : "ASC" }).exec(function(err, stationList) {
            res.render("bus/station_small", {stationList : stationList})
        })
        */
    })

    router.get("/getstation", function(req, res) {

        let station_url = config.bus.station_url
        let apiKey = config.bus.apiKey
        //apiKey = encodeURIComponent(apiKey)// ※ GET으로 보낸다면 굳이 인코딩 할 필요는 없을 듯 하다

        
        var query = "?serviceKey=" + apiKey

        request({
            url : station_url + query,
            method : "GET"
        }, function(err, response, body) {
            // json 문자열 형태로 수신된 body에 담긴 정보를 json Object로 변환
            var resultJson = JSON.parse(body)
            if(resultJson.RESULT.RESULT_CODE == "SUCCESS") {
                // 데이터 정상 수신
                // 기존 데이터가 있다면 전부 삭제 후 새로운 데이터로 대체
                busStation.deleteMany(function() {
                    var station_list = resultJson.STATION_LIST

                    busStation.collection.insertMany(station_list, function(err, result) {
                        if(err) {
                            res.send("Data Bulk Insert Error")
                        } else {
                            //res.json(result)
                            res.render("bus/station_small", {stationList : result.ops})
                        }
                    })
                    /*
                    station_list.forEach(function(station) {
                        var vo = new busStation(station)
                        vo.save()
                    })
                    */
                })
                
            } else if (resultJson.RESULT.RESULT_CODE == "ERROR") {
                res.write(resultJson.RESULT.RESULT_MSG)
                res.end("데이터 수신 오류")
            }
            
        })
        
    })

    return router
}

module.exports = busRouter