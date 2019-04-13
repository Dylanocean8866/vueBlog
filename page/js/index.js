var everyDay = new Vue({
    el:"#every_day",
    data:{
        content:'a single sentence'
    },
    computed:{
        getContent:function(){
            return this.content;
        }
    },
    created:function(){

    }
})


var articleList = new Vue({
    el:"#article_list",
    data:{
        articleList:[
            {
                title:'title',
                content:'content',
                date:'2018-01-01',
                views:"101",
                tags:'test1 test2',
                id:"1",
                link:"aaa"
            },
            {
                title:'title',
                content:'content',
                date:'2018-01-01',
                views:"101",
                tags:'test1 test2',
                id:"1",
                link:"bbb"
            },
        ]
    },
    computed:{

    },
    created:function(){
        
    }
})