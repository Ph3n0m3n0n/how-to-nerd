var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'How-To-Nerd' }); 
});

// request('http://www.howtogeek.com/', function(err, res, body){
//   app.get('/', function(req, res, next) {
//   res.send(body);
// 	});  
// });

module.exports = router;