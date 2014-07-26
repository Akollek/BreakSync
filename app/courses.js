var Minerva = require('mcgill-minerva-api');
var user = 'amiel.kollek@mail.mcgill.ca'
var pass =''

var minerva = new Minerva(user, pass); // or store 'em in environment MG_USER & MG_PASS

var currentCourses =[];



minerva.getTranscript().then(function(courses) {
for (var i = 0; i < courses.length; i++) {

	if (courses[i].Grade==false) {
		currentCourses.push(courses[i]);
	};

};
console.log(currentCourses);
return currentCourses	
});//.then(function(argument) {
	
//})

