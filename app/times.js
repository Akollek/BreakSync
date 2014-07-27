module.exports=function(app){

var Minerva = require('mcgill-minerva-api');
var express = require('express')
var session = require('express-session')


var router = express.Router();

router.route('/times')
	.post(function(request, response){


		var user = request.session.creds.split(",")[0]
		var pass = request.session.creds.split(",")[1]
		var Crse = request.body.Crse;
		var Subj = request.body.Subj;
		var semester = request.body.semester;
		var minerva = new Minerva(user, pass); 
		if (semester) {
			results=minerva.getCourses({    
				dep: Subj,
    			number: Crse, 
    			season: 'f', 
    			year: '2014' 
  			})}
  		else{
  			results=minerva.getCourses({    
				dep: Subj,
    			number: Crse, 
    			season: 'w', 
    			year: '2015' 
  			})}
  		}

  		results.then(function(courses) {
  			if (courses.length==1) {
  				var toReturn=courses[0];
  			}
  			else{
  				var toReturn={};
  				for (var i = 0; i < toReturn[i]=courses.length; i++) {
  					toReturn[i]=courses[i];
  				};
  			}

  			response.json(toReturn);	
  		})


				)
	app.use('/minerva', router)
		};
			
			



