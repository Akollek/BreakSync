module.exports=function(app){

	var express = require('express'),
			mongoose= require('mongoose'),
			dbconfig= require('../config/db.js');
			//Student = require('../app/models/StudentSchema');

	mongoose.connect(dbconfig().url);
	console.log('CONNECTED TO DATABASE AT: ' + dbconfig().url);

	var router = express.Router();

	router.get('/', function(request, response){
		response.json({message: "welcome to the API"});
	})

	app.use('/api', router)
}

