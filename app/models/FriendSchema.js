var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var friendSchema = new Schema({
	initiator: ObjectId,
	reciever: ObjectId,
	accepted: Boolean
});


module.exports=mongoose.model('Friends', friendSchema);