var fs = require('fs');
var globConfig = {};
var cfg = fs.readFileSync('./server.config').toString();
function getConfig(){
   var tempArr = cfg.split('\r\n');
   for(var i = 0; i <tempArr.length; i++){
       var tem = tempArr[i].split("=");
       globConfig[tem[0]] = tem[1];
   }
}
getConfig();
module.exports = globConfig;
