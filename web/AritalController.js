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
        // console.log(verbInfo)
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
        console.log(data);
        if(data == null || data.length ==0){
            insertTag(tag,blogId);
        }else{
            insertTagBlogMapping(data[0].id,blogId)
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
            // console.log(data);
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


function getArtById(req,res){
    var param  = url.parse(req.url,true).query;
    articleDao.getArtByIdDao(param.id,(data)=>{
        res.writeHead(200);
        res.write(respUtil.writeResult('success','ok',data));
        res.end();
        articleDao.addViewsByBlogDao(param.id,(data)=>{
            // console.log(data)
        })
    })
}


function queryAllBlog(req,res){
    articleDao.queryAllBlogDao((data)=>{
        res.writeHead(200);
        res.write(respUtil.writeResult('success','ok',data));
        res.end();
    }) 
}


function getHotNews(req,res){
    articleDao.getHotNewsDao((data)=>{
        res.writeHead(200);
        res.write(respUtil.writeResult('success','ok',data));
        res.end();
    }) 
}

function searchByKeyWord(req,res){
    var param  = url.parse(req.url,true).query;
    articleDao.searchByKeyWordDao(param.pageIndex,param.size,param.key,(data)=>{
        res.writeHead(200);
        res.write(respUtil.writeResult('success','ok',data));
        res.end();
    }) 
}




function queryBlogByTag(req,res){
    var urlInfo = url.parse(req.url,true).query;
    tagDao.getTagIdByTagNameDao(urlInfo.tag,(data)=>{
       var tagId = data[0].id;
       tagBlogMapping.getBlogIdListByTagIdFromBlogMappingDao(tagId,(result)=>{
            var tempData = []
            for(var i = 0; i < result.length; i++){
                articleDao.getArtByIdDao(result[i].blog_id,(data)=>{
                    tempData.push(data[0])
                })
            }
            getResult(tempData,result.length,res);
       });
    })
}

function getResult(blogList ,len,res){
    if(blogList.length <len){
        setTimeout(function(){
            getResult(blogList,len,res);
        },10)
    }else{
        res.writeHead(200);
        res.write(respUtil.writeResult('success','ok',blogList));
        res.end();
    }
}

path.set('/searchByKeyWord',searchByKeyWord);
path.set('/queryBlogByTag',queryBlogByTag);
path.set('/getHotNews',getHotNews);
path.set('/queryAllBlog',queryAllBlog);
path.set('/getArtById',getArtById);
path.set('/queryBlogCount',queryBlogCount);
path.set('/queryAllArticle',queryAllArticle);
path.set('/edit_article',articleEdit);
module.exports.path = path;