var express = require('express');
var moment = require('moment');
var userDao = require('../dao/userDao');
var blogDao = require('../dao/blogDao');
var router = express.Router();


router.get('/reg',function(req,res,next){
    res.render('reg.ejs',{error:''});
});
router.post('/reg',function(req,res,next){
    if(req.body.password != req.body.repeatPassword){
        res.render('reg.ejs',{error:'两次密码不一致！'});
        return;
    }
    userDao.getUserByName(req.body.username,function(err,rows){
        if(err){
            console.log(err);
            return;
        }else{
            if(rows.length>0){
                res.render('reg.ejs',{error:'该用户名已被占用！'});
                return;
            }else{
                userDao.addUser({username:req.body.username,password:req.body.password,email:req.body.email},function(err,rows){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(rows);
                    }
                });
                res.redirect('login');
                return;
            }
        }
    });
});
router.get('/login',function(req,res,next){
    res.render('login.ejs');
});
router.post('/login',function(req,res,next){
    userDao.getUserByNameAndPass({username:req.body.username,password:req.body.password},function(err,rows){
        if(err){
            console.log(err);
            return;
        }else{
            if(rows.length <= 0){
                res.render('login.ejs',{error:'用户名或密码不正确！'});
                return;
            }else {
                req.session.userid = rows[0]._id;
                res.redirect('/users/home/' + rows[0]._id+'/1');
                return;
            }
        }
    });
});
router.get('/home/:uid/:pageNum',function(req,res,next){
    var pageNum=parseInt(req.params.pageNum) || 1;
    if(pageNum<1){
        pageNum=1;
    }
    var prePage=pageNum-1;
    var nextPage=pageNum+1;
    if(req.session.userid != req.params.uid){
        res.render('login.ejs',{error:'请先登录！'});
        return;
    }else{
        blogDao.getUserBlogByPageNum({uid:req.session.userid,pageNum:pageNum},function(err,rows){
            if(err){
                console.log(err);
            }else{
                for(var i=0;i<rows.length;i++){
                    rows[i].createTime=moment(rows[i].createTime).format("YYYY-MM-DD HH:mm:ss");
                }
                console.log(rows);
                res.render('myhome.ejs',{uid:req.params.uid,blogs:rows,'prePaginationUrl':'/users/home/'+req.params.uid+'/'+prePage,nextPaginationUrl:'/users/home/'+req.params.uid+'/'+nextPage});
                return;
            }
        });
    }
});
router.get('/logout',function(req,res,next){
    req.session.userid = null;
    res.redirect('/home');
});



module.exports = router;
