var app = angular.module('bsApp', ['bs.factories']);

app.controller('bsController', [ '$scope','Student',  function($scope, Student) {
	this.students = [];
	this.me = {
		name: 'ruichao'
	}
	this.click = function(){
	Student.searchAll().success(function(data){
		this.students = data;
		console.log(data);
	});
	}
}]);

