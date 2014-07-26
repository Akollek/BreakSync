//Importing our modules
var express	   = require('express'),
		mongoose 	 = require('mongoose'),
		bodyParser = require('body-parser'),
		morgan		 = require('morgan');

//create an instance of express
var app = express();
//routing our public stuff
app.use(express.static(__dirname + '/public'));


//SETTINGS
var db = require('./config/db'); //database
var port = process.env.PORT || 8080;

//here we tell express to USE our middleware

app.use(bodyParser());
app.use(morgan());


var router = express.Router();

router.route('/').get(function (request, response) {
	response.sendfile('/public/index.html')
});



app.listen(port);
console.log('Now listening localhost:'+port);