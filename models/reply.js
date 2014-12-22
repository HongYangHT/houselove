/**
 *@description 用于回复message
 * 
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema ,
	ObjectId = Schema.ObjectId;

var ReplySchema = new Schema({
	reply_to  : { type :ObjectId, required:true },
	send_from : { type:ObjectId, required:true },
	sender    : { type:String , required:true },
	content   : { type:String },
	send_time : { type:String}
});

module.exports = mongoose.model('Reply',ReplySchema);