var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var myRouter = require('./controllers/myController');
// index.js와 users.js를 bean으로 설정하는 역할

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// __dirname : 시스템 변수, 현재 프로젝트의 root 디렉토리 : ../../Node_02
// path.join(__dirname, 'views') : ../../Node_02/views 형식의 디렉토리 정보 생성
// *.ejs(view) 파일들이 저장될 폴더를 지정

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());// json 형태의 데이터들이 있으면 자동 parsing 수행
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());// session과 관련된 미들웨어

app.use(express.static(path.join(__dirname, 'public')));
// Node_02/public : 스프링의 resources 폴더와 같은 역할
// web의 요청이 있으면 바로 response 한다
// img src="" : web에서 이미지 요청
// script src="" : web js 파일 요청
// link href="" : web css 파일 요청

app.use('/', indexRouter);// 사용자가 localhost:3000/ 라고 요청하면 indexRouter에게 요청 전달
app.use('/users', usersRouter);// 사용자가 localhost:3000/users 라고 요청하면 usersRouter에게 요청 전달
app.use("/hello", myRouter)// 사용자가 localhost:3000/hello 라고 요청하면 myRouter(./controllers/myController.js)에게 요청 전달

// catch 404 and forward to error handler
// 매핑되지 않은 주소를 요청하면 404 오류 발생시키기
app.use(function(req, res, next) {
  next(createError(404));//404 에러 create -> next : error handler로 보내기
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// 이 코드가 있어야 bin/www에서 var app = require('../app'); 사용 가능
