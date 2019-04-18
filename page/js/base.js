var randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[
            // 'javascript',
            // 'html',
            // 'css',
            // 'vue',
            // 'react',
            // 'jquery',
            // 'bootstrap',
            // 'less',
            // 'sass',
            // 'es6',
            // 'webpack',
            // 'gulp',
            // 'common.js',
            // 'require.js',
            // 'sea.js',
            // 'node.js',
            // 'express',
            // 'redis',
            // 'mongon',
            // 'mysql',
            // 'sqlserver',
            // 'c#',
            // 'java','php'
        ]
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
        },
        gotoLink(){
            return function(tag){
                location = "http://127.0.0.1:12306/index.html" + tag
            }
        }
    },
    created(){
       axios({
           method:"get",
           url:'/getAllTag'
       }).then((data)=>{
            var resultData = data.data.data;
            for(var i = 0; i <resultData.length;i++){
                resultData[i].link = '?tag='+resultData[i].tag;
            }
            this.tags = resultData
       })
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
    },
    created(){
        axios({
            method:"get",
            url:'/getHotNews'
        }).then((data)=>{
            var resultData = data.data.data;
            for(var i = 0; i <resultData.length;i++){
                resultData[i].link = '/blog_detail.html?id='+resultData[i].id;
            }
            this.titleList = resultData
        })
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
    },
    created(){
        axios({
            method:"get",
            url:'/getCurrentlyComments'
        }).then((data)=>{
            var tempList = data.data.data;
            for(var i = 0; i < tempList.length; i++){
                tempList[i].ctime =  new Date(parseInt(tempList[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            }
            this.commentList = tempList
        })
    }
})