/**
 * Created by Administrator on 2015/1/18.
 */
var pool = require('../util/pool');
var conf = require('../util/conf');

function getUsersByPageNum(pageNum,callBack){
    pool.query('select * from user limit ?,?',[(pageNum-1)*conf.pageSize,conf.pageSize],function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function getUserById(uid,callBack){
    pool.query('select * from user where uid=?',[uid],function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function getUserByName(username,callBack){
    pool.query('select * from user where username=?',[username],function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function getUserByNameAndPass(option,callBack){
    pool.query('select * from user where username=? and password=?',[option.username,option.password],function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}
function addUser(option,callBack){
    pool.query('insert into user(username,password,email) values(?,?,?)',[option.username,option.password,option.email],function(err,rows){
        if(err){
            console.log(err);
        }else{
            callBack(null,rows);
        }
    });
}

exports.getUsersByPageNum = getUsersByPageNum;
exports.getUserByName = getUserByName;
exports.addUser = addUser;
exports.getUserByNameAndPass = getUserByNameAndPass;
exports.getUserById = getUserById;
