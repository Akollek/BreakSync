var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var friendSchema = new Schema({
	initiator: String,
	reciever: String,
	accepted: Boolean
});


module.exports=mongoose.model('Friends', friendSchema);