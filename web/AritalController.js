var path = new Map();
var articleDao = require('../dao/ArticleDao')

function  articleEdit(req,res){
    console.log('inarticleEdit')
    req.on('data',function(data){
        console.log(data.toString());
        // articleDao.articleEditDao()
    })

}
path.set('/edit_article',articleEdit);
module.exports.path = path;