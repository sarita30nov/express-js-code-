var express = require('express');
var asysncss = require('express-async-await');
var router = asysncss(express.Router()) ;
var teacher = require('../controllers/teacher');

router.get('/profile',isLoggedIn, teacher.profile);
router.get('/session', isLoggedIn , teacher.session);

//Middleware
function isLoggedIn(req, res, next)
{
	var session_val = req.session.user;
	//console.log(session_val);
	
	if( session_val==undefined )
	{
		res.redirect('/login');
	}
	else if( session_val.user_type=='student' )
	{
		res.redirect('/student');
	}
	else if( session_val.user_type=='teacher' )
	{
		 return next();
	}
}

module.exports = router;