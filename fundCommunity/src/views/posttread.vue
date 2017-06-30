<template>
  <div class="wrapper">
    <div class="header">
        <image class="back-image" :src="imgUrl+'back.png'" @click="onClickBack"></image>
        <text class="title" >新动态</text>
        <text class="post" @click="onPost">发布</text>
        <!--<text class="post" @click="onPost">发布</text>-->
    </div>
    <div class="content">
        <textarea class="content-textarea" autofocus="true" placeholder="说点什么吧......" rows="10" @change="onChange" @input="onInput" ref="textinput"></textarea>
        <!--<text class="content-post" @click="onPost">发布</text>-->
    </div>
  </div>
  
</template>

<style scoped>
  .wrapper { 
    margin: 0; 
    padding: 0;
    /*width: 750px;*/
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
  }

  .header {
    background-color: #3a3a3a;
    flex-direction: row;
    /*background-color: red;*/
    padding: 20px;
    border-bottom-width: 10px;
    border-bottom-style: solid;
    border-bottom-color: rgb(245, 245, 249);
    align-items: center;
      
  }

  .back-image {
      width: 50px;
      height: 50px;
      flex: 1;
  }

  .title {
     flex:6;
    text-align: center;
    font-size: 36px;
    color: white;
    font-weight: bold;
  }

  .post {
      flex: 1;
      font-size: 36px;
      text-align: center;
      color: white;
  }

  .content {
      /*margin-top: 20px;*/
      /*background-color: black;*/
  }

  .content-textarea {
      /*margin: 20px;
      border-width: 2px;
      border-style: solid;
      border-color: #efefef;
      border-radius: 5;*/
      font-size: 36px;
      background-color: white;
      padding: 20px;
  }

  /*.content-post {
      background-color: white;
      font-size: 36px;
  }*/

  
</style>

<script>

import apiURL from '../common/api.js'

const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream')

  export default {
    data() {
      return {
          imgUrl: apiURL.imgUrl,
        postobj: {
            "userid": "3",//this.$router.state.userid,
            "content": ""
        }
      };
    },
    components: {
        apiURL
    },
    methods: {
        onClickBack: function () {
            //this.$router.push({path: '/appentry/tread'});
            this.$refs['textinput'].blur();
            setTimeout(this.clickBackHelp,500);
        },
        clickBackHelp: function () {
            this.$router.go(-1);;
        },
        onPost: function (event) {
            // this.$refs['textinput'].blur();
            // this.test1 = 'post' + this.postobj.content
            // console.log(this.postobj);
            if (this.postobj.content === "") {
                modal.toast({
                    message: '请输入内容',
                    duration: 0.8
                });
                return;
            } else {
                stream.fetch({
                    method: 'POST',
                    type: 'json',
                    url: apiURL.treadApi.usertread+'?optid=0',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.postobj)
                }, this.postCallback);
            }
            
        },
        onChange: function (event) {
            this.postobj.content = event.value;
            // this.test = 'change' + this.postobj.content+event.value;
            // console.log(event);
        },
        onInput: function(event) {
            // this.test1 = 'input' + this.postobj.content+event.value;
            this.postobj.content = event.value;
        },
        postCallback: function(response) {
            if (response.ok) {
                console.log(response.data);
                modal.toast({
                    message: '发布成功',
                    duration: 0.8
                });

                this.$router.push({path: '/appentry/tread'});
            } else {
                modal.toast({
                    message: 'network error',
                    duration: 0.8
                });
            }
        }
    }
  }
</script>
