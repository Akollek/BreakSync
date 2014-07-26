var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
	name: String,
	gender: String,
	yearOfStudy: Number,
	faculty: String
	friends: Array
})


module.exports=mongoose.model('Student', studentSchema )