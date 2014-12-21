/**
 *@description 用于回复message
 * 
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema ,
	ObjectId = Schema.ObjectId;

var ReplySchema = new Schema({
	reply_to : { type:ObjectId, required:true },
	send_from : { type:ObjectId, required:true },
	content   : { type:String },
	send_time : { type:Date , default : Date.now}
});

module.exports = mongoose.model('Reply',ReplySchema);