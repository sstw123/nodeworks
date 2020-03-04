var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '반갑습니다' });
  // render는 index.jade로 json 데이터 넘기기
});

router.post("/insert", function(req, res) {
  // 실행할 코드
})

router.get("/hello", function(req, res) {
  res.write("반갑습니다")
  res.end()
  // write는 end로 닫아주기
})

// RESTful : get, post, put, delete

router.put('/update', function(req, res) {

})

router.delete("/delete", function(req, res) {

})

module.exports = router;
