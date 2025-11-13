/**  웹 어플리케이션을 위한 기본 설정을 가짐
 *  모듈을 로딩하고 템플릿 엔진 설정하며, 라우트 설정을 함
 * 상단부에는 사용할 모듈을 로딩하는 코드 작성
 * 외부 모듈을 해당 파일에 사용하고 싶다면 require()함수 호출 - cjs  
 * import() 함수를 쓰는 건 ejs 
 * */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// 아래는 라우팅을 지원하는 모듈이 있는 물리적인 위치값(.js생략)
var usersRouter = require('./routes/users');
var calendarRouter = require('./routes/calendar');
var youtubeRouter = require('./routes/youtube');

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
app.use('/calendar', calendarRouter);
app.use('/youtube', youtubeRouter);

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
