var dbUtil = require("./DBUtil");

function insertTag(tag,ctime,utime,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'insert into tag(`tag`,`ctime`,`utime`)values(?,?,?)';
    var param = [tag,ctime,utime]
    con.query(sql,param,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error);
        }
    })
    con.end();
}

function queryTag(tag,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'select * from tag where tag = ?';
    var param = [tag];
    con.query(sql,param,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error);
        }
    })
    con.end();
}


module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;