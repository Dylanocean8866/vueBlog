var express = require("express");
var app = new express();
app.use(express.static('./page'));
app.listen(12306,function(){
    console.log('server is running at 12306')
})