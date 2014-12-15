var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
//});

router.get('/',function(req,res){
	res.render('login');
});

router.get('/home',function(req,res){
	var user={
		username:'admin',
		password:'admin'
	};
	res.render('home',{ user:user});
});

router.get('/chat',function(req,res){
	res.render('chat');
});

router.get('/index',function(req,res){
	var user={
		username:'sam',
		password:'admin'
	};
	
	var joinTime = {
		time : '12/2/2014'	
	};
	
	var follower = {
		follower:'12',
		viewer:'2',
		share:'1'	
	};
	
	res.render('index',{ 
		user:user,
		joinTime:joinTime,
		follower:follower
	});
});


router.post('/',function(req,res){
	var user = {
		username : "admin",
		password : "admin"
	};
	if(req.body.username===user.username && req.body.password===user.password){
		res.redirect('/home');
	}
	
	res.redirect('/');
});

router.get('/main',function(req,res){
	res.sendfile('public/html/main.html');
});

module.exports = router;
