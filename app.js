var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const session = require('express-session');
var settings = require('./settings.json')

var connection = mysql.createConnection({
  host     : settings.sql.host,
  user     : settings.sql.user,
  password : settings.sql.password,
  database : settings.sql.db
});

connection.connect((err)=> {
  if (err){
      throw err;
  }
  console.log('MySQL veritabanına başarıyla bağlanıldı.'); 
});

module.exports = {con:connection,session:session};

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1)
app.use(session({
  secret: 'xAfeA23rop3mer3onrua3ebgrj3nr42kj3',
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/specialarea', adminRouter);

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