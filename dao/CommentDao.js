var dbUtil = require("./DBUtil");

function addComment(bid,parent,name,content,email,ctime,utime,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'insert into comments(`blog_id`,`parent`,`user_name`,`comments`,`email`,`ctime`,`utime`)values(?,?,?,?,?,?,?)';
    var param = [bid,parent,name,content,email,ctime,utime];
    con.query(sql,param,(err,request)=>{
        if(err == null){
            success(request);
        }else{
            console.log(err);
        }
    })
    con.end();
}

function getAllCommentDao(bid,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'select * from comments where blog_id = ?';
    var param = [bid];
    con.query(sql,param,(err,request)=>{
        if(err == null){
            var tempData = request;
            for(var i = 0; i < tempData.length; i++){
                if(tempData[i].parent != -1){
                    for(var j = 0; j < tempData.length; j++){
                        if(tempData[i].parent == tempData[j].id){
                            tempData[i].parentName = tempData[j].user_name;
                        }
                    }
                }
            }
            success(tempData);
        }else{
            console.log(err);
        }
    })
    con.end();
}

function getCommentCountByBidDao(bid,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'select count(1) as count from comments where blog_id = ?';
    var param = [bid];
    con.query(sql,param,(err,request)=>{
        if(err == null){
            success(request);
        }else{
            console.log(err);
        }
    })
    con.end();
}


function getParentNameDao(rid,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'select user_name from comments where parent = ?';
    var param = [rid];
    con.query(sql,param,(err,request)=>{
        if(err == null){
            success(request);
        }else{
            console.log(err);
        }
    })
    con.end();
}



function getCurrentlyCommentsDao(success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql ="select * from my_blog.comments order by ctime desc limit 0,5";
    con.query(sql,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error)
        }
    })
    con.end();
}


module.exports.getCurrentlyCommentsDao = getCurrentlyCommentsDao;
module.exports.getParentNameDao = getParentNameDao;
module.exports.getCommentCountByBidDao = getCommentCountByBidDao;
module.exports.getAllCommentDao = getAllCommentDao;
module.exports.addComment = addComment;