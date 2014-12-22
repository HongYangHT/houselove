var express = require('express');
var router  = express.Router();

/**
 * create model
 * */

var User    = require('../models/user');
var Message = require('../models/message');
var Reply   = require('../models/reply');

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
            User.find(user,function(err,docs){
	       		 if(!err){  
	       	        if(docs!=''){  
//	       	            return res.redirect('/home'+"?id="+docs[0]._id+'');
	       	            req.session.username = user.username;
	       	            req.session._id = docs[0]._id;
	       	            return res.redirect('/home');
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
});

/* handle sign in */
router.post('/doReg',function(req,res){
	 var user = {
			email : req.body.email,
		 password : req.body.password
	 };
	 
	 User.find(user,function(err,docs){
		 if(!err){  
	        if(docs!=''){  
	            req.session.username = docs[0].username;
	            req.session._id = docs[0]._id;
//	            return res.redirect('/home'+"?id="+docs[0]._id+'');  
	            return res.redirect('/home');
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
	var user = {};
	user.username = req.session.username;
	Reply.find({reply_to:req.session._id},function(err,docs){
		if(!err){
			user._id = req.session._id;
			user.receiveMessage = docs;
			console.log(user|user.receiveMessage.length);
			res.render('home',{user:user});
		}
	});
});

router.get('/chat',function(req,res){
	var user = {};
	user.username = req.session.username;
	Reply.find({reply_to:req.session._id},function(err,docs){
		if(!err){
			user._id = req.session._id;
			user.receiveMessage = docs;
			res.render('chat',{user:user});
		}
	});
});

router.post('/chat',function(req,res){
	var message = new Message({
		master_id : req.session._id,
		content   : req.body.message,
		create_at : req.body.dateStraing,
		sendTo_id : req.session._id
	});
	message.save(function(err,message){
		if(!err){
			res.status(200).send({
				username : req.session.username,
				message:'send success!'
			});
			console.log(message);
		}
	});
});

router.get('/reply',function(req,res){
	res.render('reply');
});

router.post('/reply',function(req,res){
	User.find({username:req.body.sendto},function(err,user){
		if(!err){
			var reply = new Reply({
				reply_to : user[0]._id,
				send_from: req.session._id,
				content  : req.body.message,
				sender   : req.session.username,
				send_time: req.body.dateString 
			});
			console.log(req.body);
			reply.save(function(err,message){
				if(!err){
					res.status(200).send({
						username : req.session.username,
						message:'send success!'
					});
				}
			});
		}
	});
});

router.get('/index',function(req,res){
	var follower = {
		follower:'12',
		viewer:'2',
		share:'1'	
	};
	
	var user = {};
	User.find({_id : req.session._id},function(err,docs){
		if(!err){
			user.username = docs[0].username;
			var signupDate = docs[0].signupDate;
			user.signupDate = (signupDate.getMonth()+1)+"/"+signupDate.getDate()+"/"+signupDate.getFullYear()+" "+(signupDate.getHours()>9?signupDate.getHours():"0"+signupDate.getHours())+
			":"+(signupDate.getMinutes()>9?signupDate.getMinutes():"0"+signupDate.getMinutes())+":"+(signupDate.getSeconds()>9?signupDate.getSeconds():"0"+signupDate.getSeconds());
			res.render('index',{ 
				user:user,
				follower:follower
			});	
		}
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

//router.get('/main',function(req,res){
//	res.sendfile('public/html/main.html');
//});

module.exports = router;
