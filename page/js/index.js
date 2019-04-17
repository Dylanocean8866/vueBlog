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
        var self = this;
        axios({
            method:'get',
            url:"/queryEveryDay"
        }).then(function(resp){
           self.content = resp.data.data[0].content
        }).catch(function(err){
            console.log('error'+err)
        })
    }
})

var alist = new Vue({
    el:"#article_list",
    data:{
        articleList:[],
        page:1,
        size:5, 
        count:100,
        pageNumList:[]
    },
    computed:{
        generateTool:function(){
            var nowPage = this.page;
            var pageSize = this.size;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<",page:1});
            if(nowPage > 2){
                result.push({text:nowPage - 2,page:nowPage - 2});
            }
            if(nowPage > 1){
                result.push({text:nowPage - 1,page:nowPage - 1});
            }
            result.push({text:nowPage,page:nowPage});
            if(nowPage + 1 <= (totalCount + pageSize -1)/pageSize){
                result.push({text:nowPage + 1 ,page:nowPage + 1})
            }
            if(nowPage + 2 <= (totalCount + pageSize -1)/pageSize){
                result.push({text:nowPage + 2 ,page:nowPage + 2})
            }
            result.push({text:'>>',page:parseInt((totalCount + pageSize -1)/pageSize)});
            this.pageNumList = result;
            return result;
        }
    },
    methods:{
        jumpTo:function(num){
           this.page = num;
           this.loadArticle(num)
        },
        loadArticle:function(num){
            var self =  this;
            axios({
                method:'get',
                url:'/queryAllArticle?pageIndex='+(num - 1)*self.size +'&size='+self.size,
            }).then((data)=>{
                var resultData = data.data.data;
                var tempList = {};
                for(var i = 0; i <resultData.length;i++){
                    resultData[i].content = resultData[i].content.replace(/<img [\w\W]*>/g,'').substring(0,300);
                    resultData[i].link = '/blog_detail.html?id='+resultData[i].id;
                }
                self.articleList = resultData;
            }).catch((err)=>{
                console.log(err);
            })
        },
        getTotalCount:function(){
            var self = this;
            axios({
                method:"get",
                url:"/queryBlogCount",
            }).then(function(resp){
                self.count = resp.data.data[0].count;
            })
        }
    },
    created:function(){
       this.loadArticle(1);
       this.getTotalCount();
    }
})