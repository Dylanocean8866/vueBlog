var express = require("express");
var gc = require("./config.js")
var app = new express();
app.use(express.static(gc.port));
app.listen(gc.port,function(){
    console.log('server is running at 12306')
})