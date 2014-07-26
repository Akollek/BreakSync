module.exports=function(app){

	var express = require('express'),
			mongoose= require('mongoose'),
			dbconfig= require('../config/db.js');
			Student = require('../app/models/StudentSchema');

	mongoose.connect(dbconfig().url);
	console.log('CONNECTED TO DATABASE AT: ' + dbconfig().url);

	var router = express.Router();

	router.get('/', function(request, response){
		response.json({message: "welcome to the API"});
	})

	router.route('/students')
	.post(function(request, response){
		var student=new Student();

		student.name=request.body.name;

		student.save(function(error){
			if(error){
				response.json({
					success:false,
					message:'error occurred',
					error:error
				});
			}

			response.json({message:'Friend made!',success:true}):
			})
		

		
	})
	.get(function(request, response){
		Student.find(function(error,data){
			if(error){
				response.json({
					success:false,
					message:'Error occurred',
					error:error
				});
			}
			response.json(data)
		});
	})

	app.use('/api', router)
}

