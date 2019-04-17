var express = require("express");
var gc = require("./config.js")
var app = new express();
var loader = require("./loader")
app.use(express.static(gc.page_path));

app.post('/edit_every_day',loader.get('/editEveryDay'));
app.get('/queryEveryDay',loader.get('/queryEveryDay'));
app.post('/edit_article',loader.get('/edit_article'));
app.get('/queryAllArticle',loader.get('/queryAllArticle'));
app.get('/queryBlogCount',loader.get('/queryBlogCount'));
app.get('/getArtById',loader.get('/getArtById'));
app.get('/addComment',loader.get('/addComment'));
app.get('/queryRandomCode',loader.get('/queryRandomCode'));
app.get('/getAllComment',loader.get('/getAllComment'));
app.get('/getCommentCount',loader.get('/getCommentCount'));
app.get('/getParentName',loader.get('/getParentName'));

app.listen(gc.port,function(){
    console.log('server is running at 12306')
})

