var fs = require("fs");
var gc = require("./config");

var controllerSet = [];
var pathMap = new Map();

var files= fs.readdirSync(gc.web_page);
for(var i = 0; i < files.length; i++){
    var temp = require('./'+ gc.web_page +"/"+ files[i]);
    if(temp.path){
        for (var [k,v] of temp.path){
            if(pathMap.get(k) == null){
                pathMap.set(k,v);
            }else{
                throw new Error('url path wrong' + k)
            }
            controllerSet.push(temp);
        }
    }
}

module.exports = pathMap;