/**
 * Created by Administrator on 2015/1/20.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BlogSchema = new Schema({
    _id:ObjectId,
    title: String,
    content: String,
    uid:String,
    uname:String,
    createTime:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Blog', BlogSchema);