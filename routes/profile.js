var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');


/* GET profile page. */
router.get('/', stormpath.loginRequired, function(req, res, next) {
  res.render('profile', { title: 'How-To-Nerd' });
  
});

module.exports = router;