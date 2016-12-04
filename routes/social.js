var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');


/* GET social page. */
router.get('/', stormpath.loginRequired, function(req, res, next) {
  res.render('social', { title: 'How-To-Nerd' });
  
});

module.exports = router;