module.exports = function(app){
	//front end routing:
	app.get('/', function (request, response) {
		response.sendfile('./public/index.html');
	});
	

};