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

function queryBlogByTagDao(pageIndex,size,success){
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
    con.end();
}

function getArtByIdDao(id,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql ="select * from blog where id = ?";
    var param = [id];
    con.query(sql,param,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error)
        }
    })
    con.end();
}

function queryAllBlogDao(success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql ="select * from blog";
    con.query(sql,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error)
        }
    })
    con.end();
}

function addViewsByBlogDao(bid,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql ="update blog set views = views + 1 where id =?";
    var param = [bid];
    con.query(sql,param,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error)
        }
    })
    con.end();
}



function getHotNewsDao(success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql ="select * from blog order by views desc limit 0,5";
    con.query(sql,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error)
        }
    })
    con.end();
}

module.exports.queryBlogByTagDao = queryBlogByTagDao;
module.exports.getHotNewsDao = getHotNewsDao;
module.exports.queryAllBlogDao = queryAllBlogDao;
module.exports.getArtByIdDao = getArtByIdDao;
module.exports.queryBlogCountDao = queryBlogCountDao;
module.exports.articleEditDao = articleEditDao;
module.exports.getAllArticleDao = getAllArticleDao;
module.exports.addViewsByBlogDao = addViewsByBlogDao;