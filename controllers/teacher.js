var UserModel = require('../models/User').User;
var CountryModel = require('../models/Country').Country;
var sha1 = require('sha1');
var nodemailer = require('nodemailer');
var config = require('./../config') 

exports.profile = async function(req, res)
{
	var country = await CountryModel.findOne({ _id: req.session.user.country_id });
    res.render('teacher/profile' ,  {country:country, });
}

exports.session = async function(req, res)
{
	var country = await CountryModel.findOne({ _id: req.session.user.country_id });
    res.render('teacher/session', {country:country});
}



