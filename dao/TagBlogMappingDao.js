var dbUtil = require("./DBUtil");
function insertTagBlogMapping(tagId,blogId,ctime,utime,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'insert into tag_blog_mapping(`tag_id`,`blog_id`,`ctime`,`utime`)values(?,?,?,?)';
    var param = [tagId,blogId,ctime,utime]
    con.query(sql,param,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error);
        }
    })
    con.end();
}

module.exports.insertTagBlogMapping = insertTagBlogMapping;