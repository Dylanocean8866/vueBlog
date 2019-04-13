var dbUtil = require('./DBUtil');

function articleEditDao(title,tags,content,success){
    var con = dbUtil.createConnection();
    con.connect();
    var sql = 'select * from blog';
    con.query(sql,(error,request)=>{
        if(error == null){
            success(request);
        }else{
            console.log(error);
        }
    })
    con.end();
}
module.exports.articleEditDao = articleEditDao;