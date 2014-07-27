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
		Student.findOne({bs_username: student.bs_username} , function(error, data){
			if(data!==null){
				response.json({
					success:false,
					message:'a user with this BreakSync username already exists'
					
				})
			}
			student.save(function(error){
			if(error){
				response.json({
					success:false,
					message:'error occurred',
					error:error
				});
			}

			response.json({message:'You have been added as a BreakSync user to the database!',success:true})
		})
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

	//this part initiates a friend request
	router.route('/students/addfriend')
	.post(function(request,response){
		Student.findOne({
			'bs_username':request.body.friendname
		}, function(error,foundFriend){
			if(error){
				response.json({
					success:false,
					message:'the friend you are looking for is not found',
					error:error
				});
			}
			
			Student.findOne({
				'bs_username':request.body.me
			}, function(error, meSelf){
				if(error){
					response.json({
						success:false,
						message:'there was an unexpected error - your record was not found',
						error:error
					})
				}
				
				var friendrequest=new Friends()

				friendrequest.initiator=meSelf._id
				friendrequest.receiver=foundFriend._id
				friendrequest.accepted=null
				
				friendrequest.save(function(error){
					if(error){
						response.json({
							success:false,
							message:'there was an error in sending the friend request',
							error:error
						})
					}
							response.json({message:'friend request successfully sent',success:true})

				})				

			});
			
		});
	})
	app.use('/api', router)
}

//TODO: add a delete user function