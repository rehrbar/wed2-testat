var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var qs = require("qs");

var hbs = require('hbs');


hbs.registerHelper("if-eq", (a, b, options) => {
  "use strict";
  if(a == b){
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper("filter-url", (sort, showFinished) => {
  "use strict";
  return "?" + qs.stringify({sort: sort, show_finished: showFinished});
})
hbs.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
    accum += block.fn(i);
  return accum;
});

var momentHandler = require("handlebars.moment");
momentHandler.registerHelpers(hbs);

var routes = require('./routes/notes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'ShittyNotes.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'roflcopter',
    resave: false,
    saveUninitialized: true
  }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
