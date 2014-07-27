module.exports=function(app){

	var express = require('express'),
			mongoose= require('mongoose'),
			dbconfig= require('../config/db.js');
			Student = require('../app/models/StudentSchema');
			Friends=require('../app/models/FriendSchema')
	mongoose.connect(dbconfig().url);
	console.log('CONNECTED TO DATABASE AT: ' + dbconfig().url);

	var router = express.Router();

	router.route('/students')
	.post(function(request, response){
		var student=new Student();
		
		//this adds you as a person into the database		
		student.bs_username=request.body.bs_username; //me
		
		student.save(function(error){
			if(error){
				response.json({
					success:false,
					message:'error occurred',
					error:error
				});
			}

			response.json({message:'You added as a BreakSync user to the database!',success:true})
		})
		
	//TODO: add a delete user function
		
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
	

	//helps to find a particular student that you are looking for using bs_username
	router.route('/students/:parameter')
	.get(function(request,response){
		Student.findOne({
			'bs_username':request.params.parameter
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
			'bs_username':request.params.friendname
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

