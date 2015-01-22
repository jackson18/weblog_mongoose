/**
 * Created by Administrator on 2015/1/18.
 */
var blogModel = require('../model/blogModel');
var ObjectID = require('mongodb').ObjectID;
var conf = require('../util/conf');

function getUserBlogByPageNum(option,callBack){
    blogModel.find({uid:option.uid}).skip((option.pageNum-1)*conf.pageSize).sort({createTime:-1}).limit(conf.pageSize).exec(function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function getBlogByPageNum(pageNum,callBack){
    blogModel.find({}).sort({createTime:-1}).skip((pageNum-1)*conf.pageSize).limit(conf.pageSize).exec(function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function addBlog(option,callBack){
    var newBlog = new blogModel({
        title:option.title,
        content:option.content,
        uid:option.uid,
        uname:option.uname
    });
    newBlog.save(function(err,blog){
        if(err){
            util.log("FATAL"+err);
        }else{
            callBack(null,blog);
        }
    });
}

exports.getUserBlogByPageNum = getUserBlogByPageNum;
exports.addBlog = addBlog;
exports.getBlogByPageNum = getBlogByPageNum;