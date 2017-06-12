<template>
  <div class="wrapper"> 
    <div class="barPos"><span class="backIcon" @click="backLogin"></span></div>
    <image style="width: 579px;height: 168px;" src="http://itchz.cmbchina.cn/css/images/login/logo.png"/>
    <text class="title">理财社区</text>
    <div style="margin-top:100px">      
      <p style="position: relative">
        <span class="input-img1"></span>
        <input class="username" @change="onchangeUserName" placeholder="用户名" type="text" autofocus="true" value=""></input>   
      </p> 
      <p style="position: relative">
        <span class="input-img2"></span>  
        <input class="password" @change="onchangeUserPassword" placeholder="密码" type="password"></input>   
      </p>
      <p style="position: relative">
        <span class="input-img2"></span>  
        <input class="password" @change="onchangeUserPasswordMore" placeholder="再输入一次密码" type="password"></input>   
      </p>
    </div>   
    
    <div class="registerbtn" @click="register"><text class="registertext">注册</text></div>
  
   
  </div>
    
    
    
</template>

<style scoped>
  body{background-color:#f8f8f8}
  .wrapper { 
    align-items: center; 
    background-color:#f8f8f8; 
  }
  .barPos {
    height:80px;
    width:100%;
    background-color:#E2E827; 
    border: 1px solid #E3E3E3;
    border-radius: 12px;
    padding: 15px;
  }
  .backIcon {
    background-image: url('http://cmbecsns01.softecs.cmbkx.com/lb63-14-cmbcareerimg.11/backArr.png');
    background-size: cover;
    background-repeat: no-repeat;
    float: left;
    height: 50px;
    width: 50px;
  }
  .title { 
    font-size: 48px; 
    font-weight:700;
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
  .registerbtn {
    width: 250px;
    margin-top: 90px;
    margin-bottom: 30px;
    margin-left: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #1E90FF;
    border-radius:15px;
    float:left;
 
  }
  .registerbtn:active {
    background-color: #9bcdfa;
  }
  
  .registertext {
    font-size: 30px;
    color: white;
    text-align: center;
  }
</style>

<script>
import apiURL from '../common/api';
  const modal = weex.requireModule('modal')
  var navigator = weex.requireModule('navigator')
  var stream = weex.requireModule('stream')
  export default {  
        data() {
            return {  
            userName:'',  
            userPassword:'',  
            userPasswordMore:''
            };
    },  
        methods:{  
            onchangeUserName:function (event) {  
                this.userName = event.value
            },  
            onchangeUserPassword:function (event) {  
                this.userPassword = event.value  
            },  
            onchangeUserPasswordMore:function (event) {  
                this.userPasswordMore = event.value  
            }, 
            backLogin:function (event) {
              this.$router.push({ path: '/login' })
            },
            register: function (event) {  
                
                if(this.userName.length < 1){  
                    console.log('请输入用户名',event)  
                    modal.toast({
                      message: '请输入用户名',
                      duration: 0.8
                    }) 
                    return;  
                }else if(this.userPassword.length < 1){  
                    console.log('请输入密码',event) 
                    modal.toast({
                      message: '请输入密码',
                      duration: 0.8
                    })  
                    return;  
                }else if(this.userPasswordMore!=this.userPassword){  
                    console.log('前后密码不一致',event) 
                    modal.toast({
                      message: '前后密码不一致',
                      duration: 0.8
                    })  
                    return;  
                }   

                var user = {
                  'userid': 0,
                  'username': this.userName,
                  'password': this.userPassword,
                  'phonenumber': 0,
                  'createtime': "2017-06-05T15:43:44",
                  'modifytime': "2017-06-05T15:43:44",
                  'balance': 0,
                  'total_assets': 0
                };
                
                this.validate(JSON.stringify(user), this.registerCallback);
                 
            }, 
            validate: function(data, callback) {
              console.log("validate");
              return stream.fetch({
                method: 'POST',
                type: 'json',
                headers: {'Content-Type': 'application/json'},
                body: data, 
                url : apiURL.userApi.login,
              }, callback); 
              }
            , 
            registerCallback: function(response) {
              console.log("callback");
              if (response.ok) {
                var code = response.data.code;
                console.log(code);
                if (code == 2) {
                  console.log('注册成功');
                  modal.toast({
                      message: '注册成功',
                      duration: 0.8
                  });
                  this.$store.state.logging = true;
                  this.$store.state.username = this.userName;
                  console.log(this.$store.state.username);
                  this.$router.push({ path: '/appentry/index' })
                } else {
                    console.log('注册失败');
                    modal.toast({
                        message: '注册失败',
                        duration: 0.8
                    });
                }
              } else {
                 console.log('注册失败');
                 modal.toast({
                  message: 'network error',
                  duration: 0.8
                });
              }
            }
        }
        }
  
</script>