module.exports=function(app){

	var express = require('express')

	var router=express.Router();
	router.get('/', function(request, response){
		response.json({message: "welcome to the API"});
	})

	app.use('/api', router)
}

