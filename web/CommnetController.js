var commentDao = require("../dao/CommentDao");
var url = require('url');
var dateUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
var captcha = require('svg-captcha')
var path = new Map();
function addComment(req,res){
    var temp = url.parse(req.url,true).query;
    commentDao.addComment(temp.bid,temp.parent,temp.name,temp.content,temp.email,dateUtil.getNow(),dateUtil.getNow(),(data)=>{
            if(data.affectedRows == 1){
                res.writeHead(200);
                res.write(respUtil.writeResult('success','ok',null));
                res.end();
            }
    })
}
path.set('/addComment',addComment);

function queryRandomCode(req,res){
    var img = captcha.create({fontSize:50,width:100,height:34});
    res.writeHead(200);
    res.write(respUtil.writeResult('success','ok',img));
    res.end();
}

function getAllComment(req,res){
    var tempArr = url.parse(req.url,true).query;
    commentDao.getAllCommentDao(tempArr.bid,(data)=>{
        if(data){
            res.writeHead(200);
            res.write(respUtil.writeResult('success','ok',data));
            res.end();
        }
    })
}

function getCommentCount(req,res){
    var tempArr = url.parse(req.url,true).query;
    commentDao.getCommentCountByBidDao(tempArr.bid,(data)=>{
        if(data){
           
            res.writeHead(200);
            res.write(respUtil.writeResult('success','ok',data));
            res.end();
        }
    })
}


function  getParentName(req,res){
    var tempArr = url.parse(req.url,true).query;
    commentDao.getParentNameDao(tempArr.parent,(data)=>{
        if(data){
            res.writeHead(200);
            res.write(respUtil.writeResult('success','ok',data));
            res.end();
        }
    })
}

function  getCurrentlyComments(req,res){
    commentDao.getCurrentlyCommentsDao((data)=>{
        if(data){
            res.writeHead(200);
            res.write(respUtil.writeResult('success','ok',data));
            res.end();
        }
    })
}



path.set('/getCurrentlyComments',getCurrentlyComments);
path.set('/getParentName',getParentName);
path.set('/getCommentCount',getCommentCount);
path.set('/getAllComment',getAllComment);
path.set('/queryRandomCode',queryRandomCode);
module.exports.path = path;