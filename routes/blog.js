var express = require('express');
var userDao = require('../dao/userDao');
var blogDao = require('../dao/blogDao');
var router = express.Router();


router.get('/input', function(req, res, next) {
  res.render('blogAdd.ejs',{uid:req.session.userid});
});
router.post('/save',function(req,res,next){
    if(req.body.title === '' || req.body.content === ''){
        var json = '{"result":"error","message":"文章的标题或内容没有填写!"}';
        res.send(json);
    }else{
        userDao.getUserById(req.session.userid,function(err,rows){
            if(err){
                console.log(err);
            }else{
                blogDao.addBlog({title:req.body.title,content:req.body.content,uid:req.session.userid,uname:rows[0].username,createTime:new Date()},function(err,rows){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(rows);
                    }
                });
                var json = '{"result":"success","message":"发表成功！","uid":'+req.session.userid+'}';
                res.send(json);
            }
        });
    }
});

module.exports = router;
