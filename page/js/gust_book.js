
var st = new Vue({
    el:"#send_comment",
    data:{
        vCode:'',
        vRightCode:''
    },
    computed:{
        sendComment(){
            return function(){
                var code = document.getElementById("comment_code").value;
                if(code != this.vRightCode){
                   this.getCode();
                   alert("validate code not right")
                   return ;
                }
                var bid = -2;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                var reply = document.getElementById("comment_reply").value;
                axios({
                    method:'get',
                    url:`/addComment?bid=${bid}&name=${name}&email=${email}&content=${content}&parent=${reply}&`,
                }).then((data)=>{
                    alert(data.data.msg)
                }).catch((err)=>{
                    console.log(err);
                })
            }
        },
        getCode(){
            return function(){
                axios({
                    method:'get',
                    url:'/queryRandomCode'
                }).then((data)=>{
                    this.vCode = data.data.data.data;
                    this.vRightCode = data.data.data.text;
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        getNewCode(){
            return function(){
                this.getCode();
            }
        }
    },
    created(){
        this.getCode();
    }
})

var bComments = new Vue({
    el:"#blog_comments",
    data:{
        commentsList:[], 
        title:"",
        count:0,
        parent:''
    },
    computed:{
        reply(){
            return function(rId){
                location.href = '#send_comment';
                document.getElementById('comment_reply').value = rId;
            }
        },
        getAllComments(){
            return function(){
                    axios({
                        method:"get",
                        url:'/getAllComment?bid='+ -2,
                    }).then((data)=>{
                   
                       var tempList = data.data.data;
                       for(var i = 0; i < tempList.length; i++){
                           if(tempList[i].parent != -1){
                            var tempName;
                            tempList[i].info = tempList[i].user_name+" reply: " + tempList[i].parentName;
                           }else{
                            tempList[i].info =  tempList[i].user_name;
                           }
                           tempList[i].ctime =  new Date(parseInt(tempList[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
                       }
                       this.commentsList = tempList;
                    }).catch((err)=>{
                        console.log(err)
                    })
            }
        },
        getBlogCommentsCountByBid(){
            return function(){
                var param = location.search;
                var tempArr = param.split('=');
                if(tempArr[0] === "?id"){
                    axios({
                        method:"get",
                        url:'/getCommentCount?bid='+ tempArr[1],
                    }).then((data)=>{
                       this.count = data.data.data[0].count;
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            }
        }
    },
    created(){
        this.getAllComments();
        this.getBlogCommentsCountByBid();
    }

})