var factories = angular.module('bs.factories', []);


factories.factory('Student', ['$http', function ($http) {
	var Student = {};

	Student.logIn = function (username, password) {

	}
	// signUp, allows user to sign up
	// Parameters: username, password
	// Returns: $http promise
	Student.signUp = function (username, password) {
		var formData = new FormData();
		formData.append('bs_username', username);
		formData.append('pwd', password);
		return $http.post('/api/students', formData);
	}

	// search, allows user to search for a person on the server
	// Parameters: username
	// Returns: $http promise
	Student.search = function (username) {
		return $http.get('/api/students/' + username);
	}

	Student.searchAll = function () {
		return $http.get('/api/students');
	}

	Student.addFriend = function (initiator, receiver) {
		return $http()
	}

	return Student;

}]);

