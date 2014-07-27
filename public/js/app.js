var app = angular.module('bsApp', ['bs.factories']);

app.controller('bsController', [ '$scope','Student',  function($scope, Student) {
	// name will be the json thing need to pass in 
	var students = {};
	var searchStudent = {};
	this.me = {
		name: 'ruichao'
	}

	var loadAllStudents = function(){
		Student.searchAll().success(function(data){
			students = data;
			console.log(data);	
		});
	}

	this.reload = function(){
		loadAllStudents();
	}

	this.search = function(){
		Student.search('guy2').success(function(data){	
		searchStudent=data;
		});
	}

	this.getSearchResults = function(){
		return searchStudent;
	}
	this.getAllStudents = function(){
		return students;
	}
	
	loadAllStudents();	 

}]);

