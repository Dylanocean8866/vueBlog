var blogList = new Vue({
    el:"#blog_list",
    data:{
        allBLog:[]
    },
    computed:{

    },
    created(){
        axios({
            method:"get",
            url:"/queryAllBlog"
        }).then((data)=>{
            var resultData = data.data.data;
            var tempList = {};
            for(var i = 0; i <resultData.length;i++){
                resultData[i].content = resultData[i].content.replace(/<img [\w\W]*>/g,'').substring(0,300);
                resultData[i].link = '/blog_detail.html?id='+resultData[i].id;
            }
           this.allBLog = resultData;
        })
    }
})