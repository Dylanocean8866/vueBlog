var randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[
            'javascript',
            'html',
            'css',
            'vue',
            'react',
            'jquery',
            'bootstrap',
            'less',
            'sass',
            'es6',
            'webpack',
            'gulp',
            'common.js',
            'require.js',
            'sea.js',
            'node.js',
            'express',
            'redis',
            'mongon',
            'mysql',
            'sqlserver',
            'c#',
            'java','php']
    },
    computed:{
        randomColor(){
            return () =>{
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return `rgb(${red},${green},${blue})`;
            }
        },
        randomSize(){
            return () =>{
               var size = Math.floor(Math.random() * 13) + 15;
               return size+"px"
            }
        }
    },
    created(){
       
    }
})

var newHot = new Vue({
    el:'#new_hot',
    data:{
        titleList:[
            {
                title:"javascript",
                link:"####"
            },
            {
                title:"javascriptjavascriptjavascriptjavascript",
                link:"####"
            },
            {
                title:"javascript",
                link:"####"
            },
            {
                title:"javascript",
                link:"####"
            },
        ]
    }
})

var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList:[
            {
                user:"user",
                content:"comment content",
                data:'ctime'
            },
            {
                user:"user",
                content:"comment content",
                data:'ctime'
            },
            {
                user:"user",
                content:"comment content",
                data:'ctime'
            },
            {
                user:"user",
                content:"comment content",
                data:'ctime'
            },
        ]
    }
})