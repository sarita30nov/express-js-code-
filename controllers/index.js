var PageModel = require('../models/Page').Page;
var SubscriberModel = require('../models/Subscriber').Subscriber;
var UserModel = require('../models/User').User;

var sha1 = require('sha1');
var nodemailer = require('nodemailer');
var config = require('./../config') 


exports.index = function(req, res){
    res.render('index');
}
exports.login = function(req, res){
    res.render('user/login');
}
exports.login_submit = async function(req, res,next)
{
	var post_data = req.body;
	var user_name = post_data.user_name;
	var password = sha1(post_data.password);
	var user_exists = await UserModel.findOne( {password: password , $or: [ { user_name: user_name }, { email: user_name } ]} );
	//process.exit(0);
	if(user_exists!=null)
	{
		if( user_exists.is_active==true )
		{
			//create session 
			res.cookie('_id', user_exists._id) ; //create cookie
			req.session.user  = user_exists;
			req.flash('success', 'You have been sucessfully loggged in ');
			res.locals.message = req.flash();
			
			if(user_exists.user_type=='teacher')
			{
				res.redirect('/teacher/profile');
			}
			else if(user_exists.user_type=='student')
			{
				res.redirect('/student/profile');
			}
		}
		else
		{
			req.flash('error', 'Your account is not varified, please check your email and varified');
			res.locals.message = req.flash();
			res.render('user/login');
		}
	}
	else
	{
		req.flash('error', 'Invalid email or password');
		res.locals.message = req.flash();
		res.render('user/login');
	}
}

exports.about_us = async function(req, res,next)
{
	var page_data = await PageModel.findOne({ url: 'about_us' });
	//var insert = await PageModel.create({ page_name: 'help_support' ,url: 'help_support' , page_description: '---' });
	//console.log(page_data);
    res.render('pages/about_us',{data: page_data});
}
exports.how_works =async function(req, res){
	var page_data = await PageModel.findOne({ url: 'how_works' });
    res.render('pages/how_works',  {data: page_data} );
}

exports.contact_us =async function(req, res){
	var page_data = await PageModel.findOne({ url: 'contact_us' });
    res.render('pages/contact_us',  {data: page_data});
}

exports.whiteboard = async function(req, res){
	var page_data = await PageModel.findOne({ url: 'whiteboard' });
    res.render('pages/whiteboard',  {data: page_data});
}
exports.help_support = async function(req, res){
	var page_data = await PageModel.findOne({ url: 'help_support' });
    res.render('pages/help_support',  {data: page_data} );
}
exports.make_payment =async function(req, res){
	var page_data = await PageModel.findOne({ url: 'make_payment' });
    res.render('pages/make_payment',  {data: page_data} );
}
exports.exam_courses =async function(req, res){
	var page_data = await PageModel.findOne({ url: 'exam_courses' });
    res.render('pages/exam_courses',  {data: page_data} );
}
exports.online_tutoring =async function(req, res){
	var page_data = await PageModel.findOne({ url: 'online_tutoring' });
    res.render('pages/online_tutoring',  {data: page_data} );
}
exports.test_preparation =async function(req, res){
	var page_data = await PageModel.findOne({ url: 'test_preparation' });
    res.render('pages/test_preparation',  {data: page_data} );
}
exports.sitemap = async function(req, res){
	var page_data = await PageModel.findOne({ url: 'sitemap' });
    res.render('pages/sitemap',  {data: page_data} );
}
exports.faq = async function(req, res){
	var page_data = await PageModel.findOne({ url: 'faq' });
    res.render('pages/faq',  {data: page_data} );
}

exports.terms = async function(req, res){
	var page_data = await PageModel.findOne({ url: 'terms' });
    res.render('pages/terms',  {data: page_data} );
}

exports.subscribe = async function(req, res,next)
{
	var email = req.body.email;
	//console.log(email);
	var email_exists = await SubscriberModel.find({ email: email }  );
	//console.log(email_exists.length);
	if(email_exists.length==0)
	{
		var insert = await SubscriberModel.create({ email: email });
		res.json({status: true,data:'You have been subscribed sucessfully.'});
	}
	else
	{
	  res.json({status: false,data:'You have already subscribed.'});
	}
	
}


exports.forgot_password = async function(req, res,next)
{
	var email = req.body.email;
	//console.log(email);
	var user_exists = await UserModel.findOne({ email: email, is_active:true }  );
	//console.log(email_exists.length);
	if(user_exists!=null)
	{
		var verification_code = sha1(Date.now());
		var update = await UserModel.update({email: user_exists.email}, {$set:{verification_code: verification_code}});
		//send update forgot password 
		
		var transporter = nodemailer.createTransport({
		  service: 'ignitershub',
		  auth: 
		  {
			user: config.transport.email,
			pass: config.transport.password
		  }
		});

		var subject="Reset Your Password";
		var message="Hi "+user_exists.first_name+"  \n  \n   <a href='"+req.protocol + '://' + req.get('host')+"/register/reset_password?code="+verification_code+"'"+">click here</a> to reset your password.";
		
		var mailOptions = {
		  from: 'manjeet.patel@ignitershub.com',
		  to: user_exists.email,
		  subject: subject,
		  text: message
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
			console.log(error);
		  } else {
			//console.log('Email sent: ' + info.response);
		  }
		}); 
		
		
		res.json({status: true,data:'Password reset link has been sent to your email.'});
	}
	else
	{
	  res.json({status: false,data:'Email not found in database'});
	}
	
}


exports.logout = function(req, res){
	req.session.user={};
	res.redirect('/login');
}

