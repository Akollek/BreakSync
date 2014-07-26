var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
	name: String,
	gender: String,
	yearOfStudy: Number,
	faculty: String
})


module.export=mongoose.model('Student', studentSchema )