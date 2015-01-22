/**
 * Created by Administrator on 2015/1/18.
 */
var blogModel = require('../model/blogModel');
var Blog = blogModel.Blog ;	// 使用User模型，对应的users表
var ObjectID = require('mongodb').ObjectID;
var conf = require('../util/conf');

function getUserBlogByPageNum(option,callBack){
    blogModel.find({_id:new ObjectID(option.uid)}).skip((option.pageNum-1)*conf.pageSize).sort({createTime:-1}).limit(conf.pageSize).exex(function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function getBlogByPageNum(pageNum,callBack){
    blogModel.find({}).sort({createTime:-1}).skip((pageNum-1)*conf.pageSize).limit(conf.pageSize).exex(function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function addBlog(option,callBack){
    var newBlog = new Blog();
    newBlog.title = option.title;
    newBlog.content = option.content;
    newBlog.uid = option.uid;
    newBlog.uname = option.uname;
    newBlog.createTime = option.createTime;
    newBlog.save(function(err,blog){
        if(err){
            util.log("FATAL"+err);
        }else{
            callback(null,blog);
        }
    });
}

exports.getUserBlogByPageNum = getUserBlogByPageNum;
exports.addBlog = addBlog;
exports.getBlogByPageNum = getBlogByPageNum;