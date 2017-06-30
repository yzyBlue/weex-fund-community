<template>
  <div class="setting-wrapper">
    <div class="header">
      <image class='back-img' resize="contain" :src="imgUrl+'back.png'" @click="goBack"></image>
      <text class="title">设置</text>
    </div>

    <div class="main">
      <div class="infolist-profile" @click="goToUpload">
        <text class="setlabel">头像</text>
        <div class="infolist-profile-img">
          <image class="profile-img" :src="imgUrl+'user_photo.png'"></image>
        </div>
      </div>
      <div class="infolisttop infolist">
        <text class="setlabel">用户名</text>
        <div class="info-desc">
          <text class="info-desc-text">faker</text>
        </div>
      </div>
      <div class="infolist">
        <text class="setlabel">昵称</text>
        <input id="nickname" type="text" placeholder="昵称" class="info-desc info-desc-text" value="小灰灰"/>
      </div>      
      <div class="infolist">
        <text class="setlabel">手机</text>
        <input id="mobile" class="info-desc info-desc-text" placeholder="手机" type="text" value="12345678901"></input>
      </div>
      <div class="infolist" @click="setProfileDesc">
        <text class="setlabel">简介</text>
        <div class="info-desc">
          <text class="info-desc-text">{{profileDesc}}</text>
        </div>
      </div>
      <div class="infolist" @click="showUser">
        <text class="setlabel">关注的人</text>
        <div class="infolist-profile-img">
          <image class="jumpIcon" :src="imgUrl+'arrow_2x.png'"></image>
        </div>
      </div>
      <div class="infolist" @click="showFund">
        <text class="setlabel">关注的基金</text>
        <div class="infolist-profile-img">
          <image class="jumpIcon" :src="imgUrl+'arrow_2x.png'"></image>
        </div>
      </div>
      <div class="infolist" @click="gotoAbout">
        <text class="setlabel">关于</text>
        <div class="infolist-profile-img">
          <image class="jumpIcon" :src="imgUrl+'arrow_2x.png'"></image>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="savebtn" @click="save"><text class="savetext">保存</text></div>
      <div class="savebtn" @click="quitLog"><text class="savetext">退出</text></div>
    </div>
   
  </div>
</template>

<style scoped>
   .setting-wrapper { 
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
    flex-direction: row;
    /*background-color: white;*/
    width: 750px;
    padding-left: 15px;
    padding-right: 15px;
    height: 100px;
    align-items: center;
    justify-content: center;
  }

  .back-img {
    flex: 1;
    height: 40px;
  }

  .title {
    text-align: center;
    font-size: 48px;
    font-weight: 10px;
    padding-right: 80px;
    color: black;
    flex: 8;
  }

  .logout {
    font-size: 36px;
    flex: 1;
  }

  .main {
    /*margin-top: 30px;*/
  }

  .infolist-profile{
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top-width: 10px;
    border-top-style: solid;
    border-top-color: rgb(245, 245, 249);
  }
  .infolist-profile-label{
    flex: 1;
    font-size: 36px;
    padding: 30px;
    text-align: left;
  }
  .infolist-profile-img{
    flex: 1;
    align-items: flex-end;
    text-align: right;
    padding-right: 20px;
  }
  .profile-img{
    height:125px;
    width:104px;
  }

  .infolisttop {
    border-top-width: 3px;
    border-top-style: solid;
    border-top-color: rgb(245, 245, 249);
  }
  .infolist {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: rgb(245, 245, 249);
  }

  .setlabel {
    flex: 1;
    font-size: 36px;
    padding: 30px;
  }
  
  .setinput {
    font-size: 32px;
    color: #929292;
    text-align: right;
  }

  .info-desc{
    flex: 2;
    align-items: flex-end;
    text-align: right;
    padding-right: 20px;
  }
  .info-desc-text{
    font-size: 32px;
    color: #929292;
    text-align: right;
  }

  .jumpIcon {
    height: 41px;
    width: 25px;
  }

  .footer {
    width: 750px;
    height: 200px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    border-top-width: 10px;
    border-top-style: solid;
    border-top-color: rgb(245, 245, 249);
  }

  .savebtn {
    flex: 1;
    width: 700px;
    margin-top:10px;
    padding-top: 13px;
    padding-bottom: 13px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #1E90FF;
    border-radius:15px;
  }

  .savebtn:active {
    background-color: #9bcdfa;
  }

  .savetext {
      font-size: 36px;
      color: #666666;
      text-align: center;
      color:white;
      padding-top: 10px;
      padding-bottom: 10px;
  }
</style>

<script scoped>
import apiURL from '../common/api';
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
var event = weex.requireModule('event');

  export default {
    
   data () {
      return {
        imgUrl:apiURL.imgUrl,
        profileDesc:"该用户很懒没有设置简介",
        autofocus: false
      }
    },
    methods: {
      goBack: function () {
        // this.$router.go(-1);
        //this.$router.push({path: '/appentry/mine'})
        this.$router.back();
      },
      quitLog: function () {
        this.$store.state.logging = false;
        this.$store.state.username = "";
        this.$router.push({path: '/login'})
      },
      save: function () {      
        var mobReg = /^1\d{10}$/;
        if (!mobReg.test(document.getElementById("mobile").value)) {
            modal.toast({
              message: '请准确输入手机号！',
              duration: 0.8
            });
            return false;
        }

        var user = {
          'userid': 0,
          'username': this.userName,
          'phonenumber': 0
        };
        
        //this.validate(JSON.stringify(user), this.registerCallback);
           
      }, 
      validate: function(data, callback) {
        return stream.fetch({
          method: 'POST',
          type: 'json',
          headers: {'Content-Type': 'application/json'},
          body: data, 
          url : 'http://99.6.150.41:820/WebAPI/api/users?request=Modify'
        }, callback); 
      }, 
      registerCallback: function(response) {
        console.log("callback");
        if (response.ok) {
          var code = response.data.code;
          console.log(code);
          if (code == 2) {
            console.log('修改成功');
            modal.toast({
                message: '修改成功',
                duration: 0.8
            });
          } else {
              console.log('修改失败');
              modal.toast({
                  message: '修改失败',
                  duration: 0.8
              });
          }
        } else {
           console.log('修改失败');
           modal.toast({
            message: 'network error',
            duration: 0.8
          });
        }
      },
      showUser: function() {
        // this.$router.push({ path: '/star'})
        this.$router.push({ name: 'Star', params: {isuser: true} })
      },
      showFund: function() {
        // this.$router.push({ path: '/star'})
        this.$router.push({ name: 'Star', params: {isuser: false} })
      },
      goToUpload:function(){
        this.$router.push({ path: '/setphoto' });
      },
      setProfileDesc:function () {
        var self = this;
        modal.prompt( {
          'message': '填写简介',
          'okTitle': 'ok',
          'cancelTitle': 'cancel'
        }, function(result) {
          console.log(result.data);
          self.profileDesc = result.data;
          // modal.toast({ message: "Click Prompt  " + JSON.stringify(result),duration: 0.8 })
        })
      },
      gotoAbout:function () {
        this.$router.push({ path: '/about' });
      }
    }
  }
</script>
