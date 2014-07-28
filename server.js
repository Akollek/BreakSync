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
var port = process.env.PORT || 8080;

//here we tell express to USE our middleware

app.use(bodyParser());
app.use(morgan());


require('./app/routes.js')(app);
require('./app/api.js')(app);
require('./app/busyTimes.js')(app);

app.listen(port);
console.log('Now listening localhost:' + port);
