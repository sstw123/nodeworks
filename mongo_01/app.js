var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// mongoDB에 접속할 Connection 설정, dependency는 path 없이 바로 가져올 수 있다
var mongoose = require("mongoose")
// mongoose에 Connection 정보 얻어오기
var dbConn = mongoose.connection
// dbConn에 event handler 설정
// 1. db 연결과정에서 오류 발생시 실행될 함수 선언
dbConn.on("error", function() {
  // 오류 발생시 오류정보 console에 보이기
  console.err
})
// 2. db 연결 성공시 실행될 함수 선언
// once : 이벤트 감지시 1번만 실행
// db 연결을 시도하고 연결 성공시 최초 한번만 메세지 보여주기
dbConn.once("open", function() {
  console.log("MongoDB Connected !")
})

mongoose.connect("mongodb://localhost/mydb")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memberRouter = require("./routes/memberRouter")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/member", memberRouter)

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
