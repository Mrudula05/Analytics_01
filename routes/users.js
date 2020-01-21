var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Test = require('../models/test');
var Energymeter = require('../models/energymeter');


//Login
router.get('/login', function(req, res){
	res.render('login');
});

//Register
router.get('/register', function (req, res) {
	res.render('register');
});

//Analytics
router.get('/anayltics', function (req, res) {
	res.render('anayltics');
});

//Dashboard
router.get('/about', function(req, res){
	Test.find({},'-_id -__v',function (err, test){
		if (err)return res.send(err)
		res.render('about',{tests:test});
});
});
router.get('/api/data', function(req, res){
	Test.find({},'-_id -__v',function (err, test){
		if (err)return res.send(err)
		res.send(test);
});
});

router.get('/api/data', function(req, res){
	//var location_id=req.param("location_id");
	var board_id=req.param("board_id");
	Test.find({BoardId:board_id},'-_id -__v',function (err, test){
		if (err)return res.send(err)
		res.send(test);
});
});

//energymeters data
router.get('/energymeters', function(req, res){
	Energymeter.find({},'-_id -__v',function (err, energymeter){
		if (err)return res.send(err)
		res.render('energymeters',{energymeters:energymeter});
});
});

router.get('/api/data1', function(req, res){
	Energymeter.find({},'-_id -__v',function (err, energymeter){
		if (err)return res.send(err)
		res.send(energymeter);
});
});
//Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email= req.body.email;
	var username = req.body.username;
	var password =  req.body.password;
	var password2 = req.body.password2;

	//validation
	req.checkBody('name' , 'Name is required').notEmpty();
	req.checkBody('email' , 'email is required').notEmpty();
	req.checkBody('email' , 'email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password' , 'password is required').notEmpty();
	req.checkBody('password2' , 'passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
				errors:errors
		});
	}else{
		var newUser = new User({
			name : name,
			email:email,
			username:username,
			password:password
		});

		User.createUser(newUser, function(err, user){
			if(err)throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}


});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
    	if(err) throw err;
    	if(!user){
    		return done(null,false ,{message: 'Unknown User'});
    	}

    	User.comparePassword(password, user.password, function(err, isMatch){
    		if(err) throw err;
    		if(isMatch){
    			return done(null, user);
    		}else{
    			return done(null, false ,{message: 'Invalid password'});
    		}

    	});
    });
      
  }));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
router.post('/login',
passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
   res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});
module.exports = router;



