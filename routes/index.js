var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
//});

router.get('/',function(req,res){
	res.render('login');
});


/* handle sign up */

router.post('/reg',function(req,res){
	var user = new User ({
		username:req.body.username,
		password:req.body.password,
		email:req.body.email,
		address:req.body.address,
		birthDate:req.body.birthDate
	});
	user.save(function (err, user) {  
        if(!err) {  
            console.log(user); 
            User.find(user,function(err,docs){
	       		 if(!err){  
	       	        if(docs!=''){  
	       	            console.log(docs);                  
	       	            return res.redirect('/home'+"?id="+docs[0]._id+'');  
	       	        } else{  
	       	            console.log('注册失败！');  
	       	            return res.redirect('/');  
	       	          }  
	       	  
	       	        }else{  
	       	           console.log("Something happend.");  
	       	       }  
	       	 });
//            res.redirect('/');  
        }          
    });  
    console.log(req.body.user);
});

/* handle sign in */
router.post('/doReg',function(req,res){
	 var user = {
		 username : req.body.username,
		 password : req.body.password
	 };
	 
	 User.find(user,function(err,docs){
		 if(!err){  
	        if(docs!=''){  
	            console.log(docs);                  
	            return res.redirect('/home'+"?id="+docs[0]._id+'');  
	        } else{  
	            console.log('用户名或密码不正确');  
	            return res.redirect('/');  
	            }  
	  
	        }else{  
	           console.log("Something happend.");  
	       }  
	 });
});



router.get('/home',function(req,res){
//	var user={
//		username:'admin',
//		password:'admin'
//	};
	var user = {};
	var id = req.param('id');
	console.log(id);
	if(id){
		User.find({_id:id},function(err,docs){
			if(!err){
				user.username = docs[0].username;
			}
			res.render('home',{ user:user});
		});
	}else{
		 res.redirect('/');
	}
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

/* 这是以前静态的 */
/*router.post('/',function(req,res){
	var user = {
		username : "admin",
		password : "admin"
	};
	if(req.body.username===user.username && req.body.password===user.password){
		res.redirect('/home');
	}
	
	res.redirect('/');
});*/

router.get('/main',function(req,res){
	res.sendfile('public/html/main.html');
});

module.exports = router;
