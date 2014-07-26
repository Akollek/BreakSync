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

			response.json({message:'Friend made!',success:true})
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
	
	router.route('/students/:parameter')
	.get(function(request,response){
		Student.findOne({
			'name':request.params.parameter
		}, function(error,data){
			if(error){
				response.json({
					success:false,
					message:'error occurred',
					error:error
				});
			}
			response.json(data);
		})
	})
	router.route('/students/:me/add/:friendname')
	.put(function(request,response){
		Student.findOne({
			'name':request.params.friendname
		}, function(error,foundFriend){
			if(error){
				response.json({
					success:false,
					message:'error occurred',
					error:error
				});
			}
			
			var foundFriendID=foundFriend._id

			Student.findOne({
				'name':request.params.me
			}, function(error, meSelf){
				//insert error check here
				meSelf.friends.push(foundFriendID);
				meSelf.save(function(error){
					if(error){
						response.json({
							success:false,
							message:'failed to save after adding friend',
							error:error
						});
					}
					response.json({message:'friend successfully added',success:true})
				});
			});
			
		});
	})
	app.use('/api', router)
}

