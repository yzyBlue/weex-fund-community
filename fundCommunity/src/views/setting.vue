<template>
  <div class="wrapper">
    <div class="header">
      <image class='back-img' resize="contain" src="http://oabbs.cmbchina.com/template/win8mi_third_dynamic2/src/img/search2.png" @click="goToMine"></image>
      <text class="title">设置</text>
      <p class="logout" @click="quitLog">注销</p>
    </div>

    <div class="main">
      <ul class="setlist">
        <li class="setitem">
        <text class="setlabel">用户名</text>
        <input class="setinput" placeholder="用户名" type="text" value="XXX" disabled="disabled"></input>
        </li>
        <li class="setitem">
        <text class="setlabel">昵称</text>
        <input class="setinput" placeholder="点击设置昵称" type="text" value="XXX" autofocus="true"></input>
        </li>       
        <li class="setitem">
        <text class="setlabel">手机</text>
        <input class="setinput" placeholder="手机" type="text" value="12345678901"></input>
        </li>
      </ul>
    </div>

    <div class="unknown">
      <text>unknown</text>
    </div>

    <div class="footer">
      <a class="quitlogbtn" @click="quitLog"><text class="quitlogtext">保存</text></a>
    </div>
   
  </div>
</template>

<style scoped>
   .wrapper { 
  }
  .header {
    background-color: #afddff;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    height: 80px;
  }

  .back-img {
    position: absolute;
    top: 20px;
    width: 40px;
    height: 40px;
    z-index: 10;
  }

  .title {
    text-align: center;
    font-size: 48px;
    font-weight: 10px;
    color: white;
    width:100%;
    top:8px;
  }

  .logout {
    float:right;
    font-size: 30px;
    position:absolute;
    top: 20px;
    left:650px;
    z-index: 10;
  }

  .main {
    margin-top: 30px;
  }

  li {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid grey;
    border-top: 1px solid grey;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .setlabel {
    width: 40%;
    font-size: 36px;
    padding: 30px;
  }
  .setinput {
    flex: auto;
    font-size:36px;
    text-align: right;
    padding-right: 25px;
    background-color:white; 
  }

  .unknown {
    margin-top:100px;
    width: 100%;
    height: 300px;
    background-color: yellow;
  }

  .footer {
    margin-top: 100px;
    width: 100%;
  }

  .quitlogbtn {
    width: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #1E90FF;
    border-radius:15px;
  }

  .quitlogbtn:active {
    background-color: #9bcdfa;
  }

  .quitlogtext {
      font-size: 30px;
      color: #666666;
      text-align: center;
      color:white;
  }
</style>

<script scoped>

  export default {
   data () {
      return {
        
      }
    },
    methods: {
      goToMine: function () {
        this.$router.push({path: '/appentry/mine'});
      },
      quitLog: function () {
        this.$store.state.logging = false;
        this.$store.state.username = "";
        this.$router.push({path: '/login'})
      }
    }
  }
</script>
