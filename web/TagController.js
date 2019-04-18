var path = new Map();
var processArg= require("../util/arguments"); 
var tUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil')
var tagDao = require('../dao/TagDao');
var url = require('url');

function getAllTag(req,res){
    tagDao.getAllTagDao((data)=>{
        data.sort(()=> Math.random() > 0.5 ? true:false)
        res.writeHead(200);
        res.write(respUtil.writeResult('success','ok',data));
        res.end();
    }) 
}

path.set('/getAllTag',getAllTag);
module.exports.path = path;