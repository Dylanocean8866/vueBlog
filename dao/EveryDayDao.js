var dbUtil = require("./DBUtil");

function insertEveryDay(content,ctime,success){
    var insertSql = 'insert into every_day(`content`,`ctime`)values(?,?)'
    var params = [content,ctime];
    var con = dbUtil.createConnection();
    con.connect();
    con.query(insertSql,params,function(error,request){
        if(error == null){
            success(request);
        }else{
            console.log(error);
        }
    });
    con.end();
}

function queryEveryDao(success){
    var insertSql = 'SELECT * FROM my_blog.every_day  order by id desc limit 0,1';
    var con = dbUtil.createConnection();
    con.connect();
    con.query(insertSql,function(error,request){
            if(error == null){
                success(request);
            }else{
                console.log(error);
            }
    })
    con.end();
}


module.exports.queryEveryDao = queryEveryDao;
module.exports.insertEveryDay = insertEveryDay;