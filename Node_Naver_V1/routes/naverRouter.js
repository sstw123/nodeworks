var express = require("express")
var router = express.Router()
var naver = require("../config/naver_secret")
var request = require("request")

var reqOptions = (api_url) => {
    var options = {
        url : api_url,
        headers : {
            "X-Naver-Client-Id" : naver.client_id,
            "X-Naver-Client-Secret" : naver.client_secret
        }
    }
    return options
}

// module.exports = function(param1, param2) {} : 어떤 값을 매개변수로 전달하고 싶을 때 사용하는 형식
// 화살표 함수 : ES5 이상에서 사용할 수 있는 단축형 함수
// function() {} 를 다음과 같이 줄일 수 있다. () => {} : function을 생략하고 => 넣기
// 단점은 변수 scope가 상당히 민감하다
// 특히 this라는 키워드의 변수는 scope 때문에 많은 테스트를 수행해야 한다
// function 함수와는 다르게 작동

module.exports = (app) => {
    router.get("/", (req, res) => {
        res.json(naver)
    })

    router.get("/movie", (req, res) => {
        let searchKeyword = req.query.search
        let api_url = naver.movie_search_url
        api_url += "?query=" + encodeURI(searchKeyword)

        request.get(reqOptions(api_url), (err, response, body) => {
            if(err) {
                // 응답은 왔는데 에러
                console.log(err)
                res.send(response.statusMessage)
                return
            } else if(response.statusCode == 200) {
                var naverJson = JSON.parse(body).items
                res.render("movie/list", {movieList : naverJson})
            } else {
                // 응답이 가기 전 에러(api 주소나 쿼리 변수가 틀림 등등의 코드 오류)
                res.send("unknown error")
            }
            
        })
    })

   return router
}