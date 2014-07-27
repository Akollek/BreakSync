var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
	bs_username: String,
	pwd: String,
	busyTimes: Array
})


module.exports=mongoose.model('Student', studentSchema )