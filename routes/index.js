var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
//});

router.get('/',function(req,res){
	res.sendfile('public/html/login.html');
});

router.get('/main',function(req,res){
	res.sendfile('public/html/main.html');
});
module.exports = router;
