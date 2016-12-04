var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

var routes = require('./routes/index');
var profile = require('./routes/profile');
var social = require('./routes/social');


var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(stormpath.init(app, {
  website: true,
  href: 'https://api.stormpath.com/v1/applications/1lGAstZRRoe32wl3gHgtNm',
  web: {
  logout: {
    enabled: true,
    uri: '/log-me-out',
    nextUri: '/goodbye'
  }
}
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/profile', profile);
app.use('/social', social);

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

app.on('stormpath.ready', function () {
  app.listen(process.env.PORT || 3001);
  console.log('Stormpath Ready! Server starting on port 3001');
});


module.exports = app;
