/**
 * Created by Administrator on 2015/1/18.
 */
var userModel = require('../model/userModel');
var ObjectID = require('mongodb').ObjectID;
var conf = require('../util/conf');

function getUsersByPageNum(pageNum,callBack){
    userModel.find({}).skip((pageNum-1)*conf.pageSize).limit(conf.pageSize).exec(function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function getUserById(uid,callBack){
    userModel.find({_id:new ObjectID(uid)}).exec(function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function getUserByName(username,callBack){
    userModel.find({username:username}).exec(function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function getUserByNameAndPass(option,callBack){
    userModel.find({username:option.username,password:option.password}).exec(function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function addUser(option,callBack){
    var newUser = new userModel({
        username:option.username,
        password:option.password,
        email:option.email
    });
    newUser.save(function(err,user){
        if(err){
            util.log("FATAL"+err);
        }else{
            callBack(null,user);
        }
    });
}

exports.getUsersByPageNum = getUsersByPageNum;
exports.getUserByName = getUserByName;
exports.addUser = addUser;
exports.getUserByNameAndPass = getUserByNameAndPass;
exports.getUserById = getUserById;
