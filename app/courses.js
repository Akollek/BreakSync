var Minerva = require('mcgill-minerva-api');
var user = 'amiel.kollek@mail.mcgill.ca'
var pass =''

var minerva = new Minerva(user, pass); // or store 'em in environment MG_USER & MG_PASS

var ungradedCourses =[];
var currentCourses




minerva.getTranscript().then(function(courses) {
for (var i = 0; i < courses.length; i++) {

	if (courses[i].Grade==false) {
		currentCourses.push(courses[i]);// get ungraded course
	};

};
	//console.log("Ungraded Courses")
	//console.log(currentCourses)
	//console.log("In Fall:")
	return currentCourses;	
}).then(function(currentCourses) {
for (var i = 0; i < currentCourses.length; i++) {
	console.log(''+currentCourses[i].Subj)
	console.log(''+currentCourses[i].Crse)
		minerva.getCourses({
    		dep: ''+currentCourses[i].Subj,
    		number: ''+currentCourses[i].Crse, 
    		season: 'f', //fall hardcoded, lol
    		year: '2014' //seach for classes in fall
	}).then(function(courses) {

		for (var i = 0; i < courses.length; i++) {
			if(courses){ //check if it returned a course

			}
		};
	})
};
})

