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


function getAllTagDao(success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql ="select tag from tag";
    con.query(sql,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error)
        }
    })
    con.end();
}


function getTagIdByTagNameDao(tagName,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = "select id from tag where tag = ?";
    var param =[tagName] 
    con.query(sql,param,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error)
        }
    })
    con.end();
}

module.exports.getTagIdByTagNameDao = getTagIdByTagNameDao;
module.exports.getAllTagDao = getAllTagDao;
module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;