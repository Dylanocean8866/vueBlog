var dbUtil = require('./DBUtil');

function articleEditDao(content,title,tags,ctime,utime,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'insert into blog(`title`,`content`,`views`,`tags`,`ctime`,`utime`)values(?,?,?,?,?,?)';
    var param = [title,content,'0',tags,ctime,utime]
    con.query(sql,param,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error);
        }
    })
    con.end();
}

function getAllArticleDao(pageIndex,size,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'select * from blog limit '+pageIndex+','+size+'';
    var param = [pageIndex,size];
    con.query(sql,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error);
        }
    })
    con.end();
}

function queryBlogCountDao(success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql ="select count(1) as count from blog";
    con.query(sql,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error)
        }
    })
}

module.exports.queryBlogCountDao = queryBlogCountDao;
module.exports.articleEditDao = articleEditDao;
module.exports.getAllArticleDao = getAllArticleDao;