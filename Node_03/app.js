// 미들웨어 설정부분
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// DB 연결하기(app.use 이전에 설정하면 되긴 하지만 다른 곳에서 사용할 수 있기 때문에 최상단 미들웨어 설정부분에 설정하기로 한다)
// 1. mongoose 디펜던시 불러오기
var mongoose = require("mongoose")
// 2. mongoDB와 연결하여 기능 수행시 정상수행, 오류발생 등 감시를 위한 객체 선언
var dbConn = mongoose.connection
// 3. DB Conn 이벤트 핸들러 설정
// 3-1. 연결 에러 발생시 실행할 메소드 설정
dbConn.on("error", function() {
  console.error
})
// 3-2. 연결 성공시 실행할 메소드 설정
dbConn.once("open", function() {
  console.log("MongoDB Opened !!")
})

dbConn.once("disconnected", function() {
  console.log("-- MongoDB Closed --")
})

dbConn.once("connected", function() {
  console.log("MongoDB Connected !!")
})
// 4. mongodb URL과 스키마 설정
mongoose.connect("mongodb://localhost/mydb")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 작성한 myRouter.js를 사용할 수 있도록 객체 생성
// require로 요청할 때 .js는 일반적으로 생략해도 된다
var myRouter = require("./routes/myRouter")



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/book", myRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
