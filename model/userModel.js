/**
 * Created by Administrator on 2015/1/20.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    _id:ObjectId,
    username: String,
    password: String,
    email:String
});

module.exports = mongoose.model('User', UserSchema);