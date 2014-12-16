var express = require('express');
var router = express.Router();

/* GET users listing. */
/*
 * user :
 * hongyang 123
 * admin admin
 * root root
 * */

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
