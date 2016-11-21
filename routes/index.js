var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');

/* GET home page. */
router.get('/', stormpath.loginRequired, function(req, res, next) {
  res.send('Hi ' + req.user.givenName + '!');
});

module.exports = router;
