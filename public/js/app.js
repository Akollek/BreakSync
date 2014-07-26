var app = angular.module('bsApp', []);

app.controller('bsController', [ '$scope', function($scope) {

}]);

app.factory('Student', ['$http', function ($http) {
	var Student = {}
	Student.signUp = function(data){
		var formData = new FormData();
		formData.append('key', value);
		return $http.post('/api/students', formData);
	}

	Student.me = function(){
		return $http.get('/api/students');
	}
	
}]);

