var express = require("express");
var gc = require("./config.js")
var app = new express();
var loader = require("./loader")
app.use(express.static(gc.page_path));

app.post('/edit_every_day',loader.get('/editEveryDay'));
app.get('/queryEveryDay',loader.get('/queryEveryDay'));
app.listen(gc.port,function(){
    console.log('server is running at 12306')
})

