var CountryModel = require('../models/Country').Country;
var UniversityModel = require('../models/University').University;
var UserModel = require('../models/User').User;
var CourseModel = require('../models/Course').Course;

var sha1 = require('sha1');
var nodemailer = require('nodemailer');
var config = require('./../config') 

exports.register = function(req, res){
    res.render('user/register');
}

exports.student =async function(req, res){
	
	
	var country = await CountryModel.find({ is_active: true });
	var university = await UniversityModel.find({ is_active: true });
    res.render('user/student_register' ,  {country: country, university: university  }   );
}

exports.student_submit =async function(req, res){
	
	var post_data = req.body;
	//console.log(post_data);
	var password = sha1(post_data.password);
	var verification_code = sha1(Date.now());
	var agree_terms = post_data.agree_terms;
	if(agree_terms==1)
	{
		agree_terms = true;
	}
	
	var insert = await UserModel.create({ 
	user_type: 'student',
	email: post_data.email,
	user_name: post_data.user_name,
	first_name: post_data.first_name,
	last_name: post_data.last_name,
	screen_name: post_data.screen_name,
	gender: post_data.gender,
	dob: post_data.dob,
	street: post_data.street,
	city_name: post_data.city_name,
	zip_code: post_data.zip_code,
	contact_number: post_data.contact_number,
	country_id: post_data.country_id,
	university_id: post_data.university_id,
	password: password,
	verification_code: verification_code,
	is_verified: false,
	agree_terms: agree_terms,
	});
	
	
	var transporter = nodemailer.createTransport({
	  service: 'ignitershub',
	  auth: 
	  {
		user: config.transport.email,
		pass: config.transport.password
	  }
	});

	var subject="Activate your account";
	var message="Hi "+post_data.first_name+"  \n Thank your for registereing our website  \n   <a href='"+req.protocol + '://' + req.get('host')+"/register/varify?varify="+verification_code+"'"+">click here</a> to activate your account.";
	
	var mailOptions = {
	  from: 'manjeet.patel@ignitershub.com',
	  to: post_data.email,
	  subject: subject,
	  text: message
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	}); 
	
	
	res.redirect('/register/success');
}

exports.success = function(req, res){
    res.render('user/success');
}


exports.emailcheck =async function(req, res)
{	
	var email = req.body.email;
	
	var email_exists = await UserModel.find({ email: email }  );
	if(email_exists.length==0)
	{
		res.json({status: true,data:''});
	}
	else
	{
	  res.json({status: false,data:'Email already exists. try another'});
	}
}

exports.usernamecheck =async function(req, res)
{	
	var user_name = req.body.user_name;
	
	var email_exists = await UserModel.find({ user_name: user_name }  );
	if(email_exists.length==0)
	{
		res.json({status: true,data:''});
	}
	else
	{
	  res.json({status: false,data:'User name already exists. try another'});
	}
}

exports.varify =async function(req, res)
{	
	var varify = req.query.varify;
	
	var code_exists = await UserModel.find({ verification_code: varify }  );
	if(code_exists.length==0)
	{
		 res.redirect('/register/varify_status?type=fail');
	}
	else
	{
		var update = await UserModel.update({verification_code: varify}, {$set:{verification_code: '', is_verified: true, is_active: true}});
		//console.log(update);
	   res.redirect('/register/varify_status?type=success');
	}
}


exports.varify_status =async function(req, res)
{	
	var type = req.query.type;
	res.render('user/varify_status', {type: type} );
}



exports.teacher = async function(req, res)
{
	var country = await CountryModel.find({ is_active: true });
	var course = await CourseModel.find({ is_active: true });
    res.render('user/teacher_register' ,  {country: country, course: course  }  );
}

exports.teacher_submit =async function(req, res){
	
	var post_data = req.body;
	//console.log(post_data);
	var password = sha1(post_data.password);
	var verification_code = sha1(Date.now());
	var agree_terms = post_data.agree_terms;
	if(agree_terms==1)
	{
		agree_terms = true;
	}
	
	var insert = await UserModel.create({ 
	user_type: 'teacher',
	email: post_data.email,
	user_name: post_data.user_name,
	first_name: post_data.first_name,
	last_name: post_data.last_name,
	screen_name: post_data.screen_name,
	gender: post_data.gender,
	dob: post_data.dob,
	street: post_data.street,
	city_name: post_data.city_name,
	zip_code: post_data.zip_code,
	contact_number: post_data.contact_number,
	country_id: post_data.country_id,
	course_id: post_data.course_id,
	password: password,
	verification_code: verification_code,
	is_verified: false,
	agree_terms: agree_terms,
	});
	
	
	var transporter = nodemailer.createTransport({
	  service: 'ignitershub',
	  auth: 
	  {
		user: config.transport.email,
		pass: config.transport.password
	  }
	});

	var subject="Activate your account";
	var message="Hi "+post_data.first_name+"  \n Thank your for registereing our website  \n   <a href='"+req.protocol + '://' + req.get('host')+"/register/varify?varify="+verification_code+"'"+">click here</a> to activate your account.";
	
	var mailOptions = {
	  from: 'manjeet.patel@ignitershub.com',
	  to: post_data.email,
	  subject: subject,
	  text: message
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	}); 
	
	
	res.redirect('/register/success');
}


exports.reset_password =async function(req, res)
{	
	var verification_code = req.query.code;
	
	var code_exists = await UserModel.findOne({ verification_code: verification_code }  );
	if(code_exists!=null)
	{
		var type = true;
	}
	else
	{
		var type = false;
	}
	
	res.render('user/reset_password', {type: type, verification_code:verification_code    } );
}

exports.reset_password_post =async function(req, res)
{	
	var verification_code = req.body.code;
	
	var code_exists = await UserModel.findOne({ verification_code: verification_code }  );
	if(code_exists!=null)
	{
		var password = sha1(req.body.password);
		
		var update = await UserModel.update({verification_code: verification_code}, { $set:{password: password, verification_code: '' }}    );
		res.json({status: true,data:'Password has been updated sucessfully.'});
	}
	else
	{
		res.json({status: false,data:'Invalid activation code.'});
	}
}

