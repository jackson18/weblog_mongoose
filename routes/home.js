/**
 * Created by Administrator on 2015/1/17.
 */
var express = require('express');
var moment = require('moment');
var blogDao = require('../dao/blogDao');
var router = express.Router();

router.get('/',function(req,res,next){
    blogDao.getBlogByPageNum(1,function(err,rows){
        if(err){
            console.log(err);
        }else{
            for(var i=0;i<rows.length;i++){
                rows[i].createTime=moment(rows[i].createTime).format("YYYY-MM-DD HH:mm:ss");
            }
            res.render('home.ejs',{uid:req.params.uid,blogs:rows,'prePaginationUrl':'/home/0',nextPaginationUrl:'/home/2'});
        }
    });
});
router.get('/:pageNum',function(req,res,next){
    var pageNum=parseInt(req.params.pageNum) || 1;
    if(pageNum<1){
        pageNum=1;
    }
    var prePage=pageNum-1;
    var nextPage=pageNum+1;
    blogDao.getBlogByPageNum(pageNum,function(err,rows){
        if(err){
            console.log(err);
        }else{
            for(var i=0;i<rows.length;i++){
                rows[i].createTime=moment(rows[i].createTime).format("YYYY-MM-DD HH:mm:ss");
            }
            res.render('home.ejs',{uid:req.params.uid,blogs:rows,'prePaginationUrl':'/home/'+prePage,nextPaginationUrl:'/home/'+nextPage});
        }
    });
});
router.get('/:uid/:pageNum',function(req,res,next){
    var pageNum=parseInt(req.params.pageNum) || 1;
    if(pageNum<1){
        pageNum=1;
    }
    var prePage=pageNum-1;
    var nextPage=pageNum+1;
    blogDao.getBlogByPageNum(pageNum,function(err,rows){
        if(err){
            console.log(err);
        }else{
            for(var i=0;i<rows.length;i++){
                rows[i].createTime=moment(rows[i].createTime).format("YYYY-MM-DD HH:mm:ss");
            }
            res.render('home.ejs',{uid:req.params.uid,blogs:rows,'prePaginationUrl':'/home/'+req.params.uid+'/'+prePage,nextPaginationUrl:'/home/'+req.params.uid+'/'+nextPage});
        }
    });
});


module.exports = router;