var path = new Map();
var everyDayDao = require('../dao/EveryDayDao');
var t = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
function editEveryDay(req,res){
    req.on("data",function(data){
        everyDayDao.insertEveryDay(data.toString().trim(),t.getNow(),function(result){
            res.writeHead(200);
            res.write(respUtil.writeResult("success","ok",null));
            res.end();
        })
    })
}

function queryEveryDay(res,req){
    everyDayDao.queryEveryDao((data)=>{
        req.writeHead(200,{"Content-Type": "image/png"});
        req.write(respUtil.writeResult("success","ok",data));
        req.end();
    });
}
path.set('/editEveryDay',editEveryDay);
path.set('/queryEveryDay',queryEveryDay);
module.exports.path = path;1