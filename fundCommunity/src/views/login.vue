<template>
  <div class="wrapper">
    <div class="barPos"></div>
    <image style="width: 579px;height: 168px;" src="http://itchz.cmbchina.cn/css/images/login/logo.png" />
    <text class="title">理财社区</text>
    <div style="margin-top:100px">      
      <p style="position: relative">
        <span class="input-img1"></span>
        <input class="username" @change="onchangeUserName" placeholder="用户名" type="text" value="" autofocus="true"></input>   
      </p> 
      <p style="position: relative">
        <span class="input-img2"></span>  
        <input class="password" @change="onchangeUserPassword" placeholder="密码" type="password"></input>   
      </p>
    </div>
    <div style="width:100%">
      <div style="flex-direction:row;margin-top:50px">
        <a class="registerbtn" @click="register">
          <text class="registertext">注册</text>
        </a>
        <a class="loginbtn" @click="login">
          <text class="logintext">登录</text>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import apiURL from '../common/api';
const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream')
export default {
  data() {
    return {
      userName: '',
      userPassword: ''
    };
  },
  methods: {
    onchangeUserName: function (event) {
      this.userName = event.value
    },
    onchangeUserPassword: function (event) {
      this.userPassword = event.value
    },
    register: function (event) {
      console.log('注册', event)
      modal.toast({
        message: '注册',
        duration: 0.8
      })
      this.$router.push({ path: '/register' })
    },
    login: function (event) {

      /*if (this.userName.length < 1) {
        console.log('请输入用户名', event)
        modal.toast({
          message: '请输入用户名',
          duration: 0.8
        })
        return;
      } else if (this.userPassword.length < 1) {
        console.log('请输入密码', event)
        modal.toast({
          message: '请输入密码',
          duration: 0.8
        })
        return;
      }*/
      var user = {
                  'username': this.userName,
                  'password': this.userPassword
                };
      this.validateLoginfo(JSON.stringify(user), this.loginCallback);
    },
    validateLoginfo: function (data, callback) {
      console.log("validate");
      return stream.fetch({
          method: 'POST',
          type: 'json',
          url: apiURL.userApi.login,
          //url: 'http://99.6.150.48:802/api/Users'
          headers: {'Content-Type': 'application/json'},
          body: data
        }, callback);
    },
    loginCallback: function (response) {
      console.log("callback");
      if (response.ok) {
        console.log(response.data)
        var code = response.data.code;
        if (code == 5) {
          console.log('登录成功');
          modal.toast({
              message: '登录成功',
              duration: 0.8
          });
          this.$store.state.logging = true;
          this.$store.state.username = this.userName;
          console.log(this.$store.state.username);
          this.$router.push({ path: '/appentry/index' })
        } else {
            console.log('登录失败');
            modal.toast({
                message: '登录失败',
                duration: 0.8
            });
            this.$router.push({ path: '/appentry/index' })
        }
        
    } else {
        console.log('登录失败');
        modal.toast({
          message: 'network error',
          duration: 0.8
        });
        this.$router.push({ path: '/appentry/index' })
      }
    },
  },
  


}

</script>

<style scoped>
  body{background-color:#f8f8f8; height:;}
  .wrapper { 
    align-items: center; 
    background-color:#f8f8f8; 
  }
  .barPos {
    height:80px;
    width:100%;
  }
  .title { 
    font-size: 54px; 
    font-weight:700;
    font-family: -apple-system-font, SimHei, BlinkMacSystemFont, 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  }
  .logo { 
    width: 360px; 
    height: 82px; 
  }
  .username { 
    font-size:36px;
    align-items: center;
    background-color:white;
    
    height: 80px;  
    width: 550px;  
    padding-left: 90px;  
    padding-top: 15px;  
    padding-bottom: 15px;  
    border-width:1px;  
    border-color: #1E90FF;  
    border-radius:10px;  
    outline: none; 
  }
  .password {  
    font-size:36px;
    align-items: center;
    background-color:white;
    margin-top:50px;
    height: 80px;  
    width: 550px;  
    padding-left: 90px;  
    padding-top: 15px;  
    padding-bottom: 15px;  
    border-width:1px;  
    border-color: #1E90FF;  
    border-radius:10px;  
    outline: none; 
  }
  .input-img1{  
    position: absolute;  
    background-image: url('http://itchz.cmbchina.cn/css/images/login/user.png');
    background-size: cover;
    background-repeat: no-repeat;
    left:5px;
    top:10px;
    width: 60px;  
    height: 60px;  
    z-index: 1;
    } 
  .input-img2{  
    position: absolute;  
    background-image: url('http://itchz.cmbchina.cn/css/images/login/key.png');
    background-size: cover;
    background-repeat: no-repeat;
    left:5px;
    top:60px;  
    width: 60px;  
    height: 60px; 
    z-index: 1; 
  } 
  .loginbtn {
    width: 250px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 60px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #1E90FF;
    border-radius:15px;
    float:left;
 
  }
  .registerbtn {
    width: 250px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 80px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: white;
    border-radius:15px;
    float:left;
   
  }
  .loginbtn:active {
    background-color: #9bcdfa;
  }
  .registerbtn:active {
    background-color: #9bcdfa;
  }
  .logintext {
      font-size: 30px;
      color: #666666;
      text-align: center;
      color:white;
  }
  .registertext {
    font-size: 30px;
    color: #666666;
    text-align: center;
  }
</style>
