/*
	This is main Starting point of Application 
	Server will run :  http://127.0.0.1:3000
	configuration file is : config.php
*/  

var express = require('express')
var app = express();
var mongodb = require('mongoose');

var config = require('./config') 
var db = require('./db')

app.set('view engine', 'ejs')

var expressValidator = require('express-validator')
app.use(expressValidator())
 
 
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 
var methodOverride = require('method-override')
 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
 

var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');
 
app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash())

// middleware to make 'user' available to all templates
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});


/* Add controllers here  */  
app.use('/', require('./routes/index'))
app.use('/register', require('./routes/register'));
app.use('/search', require('./routes/search'));
app.use('/teacher', require('./routes/teacher'));

/*
app.use('/student', require('./routes/student'))
*/
/* Add controllers here  */ 

app.use(express.static('public'))

db.connect('mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.db+'', function(err) 
{
	  if (err) 
	  {
		console.log('Unable to connect to Mongo: mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.db+'')
		process.exit(1)
	  }
	  else 
	  {
			console.log('MongoDB Connection Sucessfull at : mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.db+'')

			app.listen(config.server.port, config.server.host,  function()
			{
				console.log('Server running at : http://'+config.server.host+':'+config.server.port)
			})

	  }
})

/* Check if page not found then redirect to  error404 page  */ 
app.get('*', function(req, res) {
    res.render('error404', {});
});
/* Check if page not found then redirect to  error404 page  */ 