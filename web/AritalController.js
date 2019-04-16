var path = new Map();
var articleDao = require('../dao/ArticleDao');
var processArg= require("../util/arguments"); 
var tUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil')
var tagDao = require('../dao/TagDao');
var tagBlogMapping = require("../dao/TagBlogMappingDao");
var querystring = require('querystring');
var url = require('url');

function  articleEdit(req,res){
    req.on('data',function(data){
        var verbInfo = url.parse(req.url,true).query;

        var arg = querystring.parse(data.toString());
        console.log(verbInfo)
        articleDao.articleEditDao(arg.content,verbInfo.title,verbInfo.tags,tUtil.getNow(),tUtil.getNow(),(data)=>{
            if(data.affectedRows == 1){
                res.writeHead(200);
                res.write(respUtil.writeResult('success','ok',null));
                res.end();
                var blogId = data.insertId;
                var temArg = verbInfo.tags.replace(/，/g,',').replace(/,/g,',');
                var tagList = temArg.split(',');
                for(var i = 0; i < tagList.length; i++){
                    if(tagList[i] == ""){
                        continue;
                    }    
                    queryTag(tagList[i],blogId)
                }
            }
        });
    });
}

function queryTag(tag,blogId){
    tagDao.queryTag(tag,(data)=>{
        if(data == null || data.length ==0){
            insertTag(tag,blogId);
        }else{
            insertTagBlogMapping(data.insertId,blogId)
        }
    })
}

function insertTag(tag,blogId){
    tagDao.insertTag(tag,tUtil.getNow(),tUtil.getNow(),(data)=>{
            insertTagBlogMapping(data.insertId,blogId)
    })
}

function insertTagBlogMapping(tagId,blogId){
    tagBlogMapping.insertTagBlogMapping(tagId,blogId,tUtil.getNow(),tUtil.getNow(),(data)=>{
            console.log(data);
    })
}

function queryAllArticle(req,res){
    var urlInfo = url.parse(req.url,true).query;
    articleDao.getAllArticleDao(urlInfo.pageIndex,urlInfo.size,(data)=>{
        if(data){
            res.writeHead(200);
            res.write(respUtil.writeResult('success','ok',data));
            res.end();
        }
    });
}

function queryBlogCount(req,res){
        articleDao.queryBlogCountDao((data)=>{
            if(data){
                res.writeHead(200);
                res.write(respUtil.writeResult('success','ok',data));
                res.end();
            }
        })
}


path.set('/queryBlogCount',queryBlogCount);
path.set('/queryAllArticle',queryAllArticle);
path.set('/edit_article',articleEdit);
module.exports.path = path;