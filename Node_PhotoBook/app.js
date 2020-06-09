var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")

// DB 연결 함수
mongoose.connect("mongodb://localhost/myphoto", {useNewUrlParser: true, useUnifiedTopology: true})

// DB 연결 event 핸들링 설정
var db = mongoose.connection
mongoose.connection.once("open", function() {
  console.log("MongoDB Open!")
})
db.on("error", function() {
  console.error
})

/*
  require() 확장모듈, 미들웨어들을 import하는 명령함수
  ES5 이하에서 js파일을 외부에 분리하고 실제 사용할 때는 import해서 사용하는 방식
  
  ES6 이상에서는 import 키워드로 사용이 되는데 아직 node12버전 이하에서는 import 키워드를 지원하지 않는다
  node14 이상에서는 import 키워드를 공식적으로 지원한다
  
  require()를 사용해서 import할 때
  1. require("./routes"); // routes 폴더(dir)를 지정하는 방법
  - 기본적으로 /에서 routes.js 파일을 찾고, routes.js 파일이 없으면 routes 폴더로 들어가서 routes/index.js 파일을 찾는다
  2. require("./routes/users"); // routes/users.js 파일을 지정하는 방법
  - 파일이 없으면 마찬가지로 users 폴더의 index.js 파일을 찾는다
*/

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var myRouter = require("./routes/myRouter")
var photoRouter = require("./routes/photo/photoRouter") // /routes 폴더에 photo.js 파일이 없을 경우 photo/index.js 파일을 찾게 된다

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// localhost:3000의 root로 request를 요청하면 indexRouter 모듈을 불러와서 요청을 처리한다
// spring에서 Controller 역할을 수행하는 모듈
app.use('/', indexRouter);
// localhost:3000/users/**로 request를 요청하면 userRouter 모듈을 불러와서 요청을 처리한다
app.use('/users', usersRouter);
app.use("/my", myRouter)
app.use("/photo", photoRouter)

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
