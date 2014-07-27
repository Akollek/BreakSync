module.exports=function(app){

var Minerva = require('mcgill-minerva-api');
var express = require('express')





var router = express.Router();


router.route('/courses')
	.post(function(request, response){

		var user = request.body.username
		var pass = request.body.password
		var ungradedCourses =[];
		var coursesJson={};
		var minerva = new Minerva(user, pass); 

		minerva.getTranscript().then(function(courses){
			for (var i = 0; i < courses.length; i++){
				if (courses[i].Grade == false){
					ungradedCourses.push(courses[i]);
				}
			};
			for (var i = 0; i < ungradedCourses.length; i++) {
				coursesJson[i]=ungradedCourses[i];
			};
			
			response.json(coursesJson);
	}
);
app.use('/minerva', router)

}