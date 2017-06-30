<template>
  <div class="mine-wrapper">
    <div class="mine-header">
      <div class="mine-header-img-container" @click="upload">
        <image class="mine-header-img" :src="imgUrl+'user_photo.png'"></image>
      </div>
      <div class="mine-header-profile">
        <text class="mine-header-name">用户名</text>
        <div class="mine-header-desc">
          <text class="mine-desc-text">该用户很懒，没有设置简介,该用户很懒，没有设置简介,该用户很懒，没有设置简介</text>
        </div>
      </div>
      <div class="setting" @click="goToSetting">
          <!-- <text class="setting-text" @click="goToSetting">设置</text> -->
          <image class="setting-img" :src="imgUrl+'fast_forward.png'"></image>
      </div>
    </div>

    <div class="my-card-container">
      <div class="card">
        <div class="my-invest">
          <div class="my-invest-top">
            <image class="my-invest-top-img" :src="imgUrl+'money.png'"></image>
            <text class="my-invest-top-text">我的投资</text>
          </div>
          <div class="my-invest-down">
            <text class="my-invest-down-text">1亿</text>
          </div>
        </div>
        <div class="my-invest-midline"></div>
        <div class="my-invest">
          <div class="my-invest-top">
            <image class="my-invest-top-img" :src="imgUrl+'simulationMoney.png'"></image>
            <text class="my-invest-top-text">模拟投资</text>
          </div>
          <div class="my-invest-down">
            <text class="my-invest-down-text">100亿</text>
          </div>
        </div>
      </div>
    </div>

    <div class="mytread">
      <div style="height:5px;background-color: #f8f8f8"></div>
      <div class="mytread-header">
          <text style="margin-left: 40px;background-color:white;font-size:32px;">我的动态</text>
      </div>
      <div style="height:5px;background-color: #f8f8f8"></div>
         
        <list class="tread-scroller" show-scrollbar="false">
          <refresh class="refresh-view" :display="refresh_display" @refresh="onrefresh" @pullingdown="pullingdown">
            <loading-indicator class="indicator"></loading-indicator>
            <text class="refresh-arrow" style="font-size:15px;text-align: center; color:rgb(238, 162, 54) { 'display' : refresh_display==='hide'}">Pull To Refresh</text>
          </refresh>
          <cell class="tread-scroller-item" v-for="obj in lists">
            <treaditem class="itemself" :treadobj="obj"></treaditem>
          </cell>
        </list>

      
      <!--<showlist :onLoadMore='onLoadMore' :onMounted='onMounted'></showlist>-->
    </div>

  </div>
</template>

<style scoped>
  .mine-wrapper {
    /*margin: 0px;
    padding: 0px;*/
    width: 750px;
    background-color:white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 150px;
    /*background-color: white;*/
  }

  .mine-header {
    display: flex;
    flex-direction: row;
    height: 200px;
    padding-top: 30px;
    padding-bottom: 10px;
    padding-left: 30px;
    padding-right: 30px;
    overflow: auto;
    background-color:#10a6e2;
    align-items: center;
  }

  .mine-header-img-container{
    height:160px;
    align-items: center;
    text-align: center;
    padding-top: 12.5px;
    padding-bottom: 12.5px;
  }

  .mine-header-img{
    height:125px;
    width:104px;
  }
  .mine-header-profile{
    flex: 9;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height:150px;
    width: 450px;
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 10px;
  }
  .mine-header-name{
    flex: 2;
    font-size: 32px;
    color: white;
    font-weight: bold;
  }
  .mine-header-desc{
    flex: 3;
    text-align: center;
    margin-top:0;
    margin-left: 0px;
    margin-bottom: 0;
    margin-right: 0px;
    padding-bottom: 0px;
  }

  .mine-desc-text{
    font-size: 24px;
    color: white;
    text-overflow:ellipsis;
  }

  .setting {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    padding-left: 20px;
    float: right;
    align-items: center;
  }
  .setting-img{
    width: 50px;
    height: 50px;
  }
  .setting-text{
    font-size: 32px;
    color: white;
  }

  .my-card-container {
    width: 750px;
    background-color: white;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  .card{
    display: flex;
    height: 100px;
    flex-direction: row;
    justify-content:space-around;
    text-align:center;
    margin-left:15px;
  }
  .my-invest{
    flex: 1;
    flex-direction:column;
    text-align:center;
    align-items: center;
    justify-content: space-between;
  }

  .my-invest-midline{
    width: 2px;
    height: 100px;
    background-color: #d0d0d0;
  }

  .my-invest-top{
    flex: 2;
    flex-direction:row;
    text-align:center;
    align-items: center;
  }

  .my-invest-top-img{
    height:40px;
    width:40px;
  }
  .my-invest-top-text{
    text-align:center;
    padding-left: 20px;
    font-size: 32px;
  }
  .my-invest-down{
    flex: 3;
    flex-direction:row;
    text-align:center;
    align-items: center;
  }
  .my-invest-down-text{
    text-align:center;
    font-size: 40px;
    color: red;
  }

  .tread-scroller {
    width: 750px;
    height: 900px;
  }
  .mytread{
    width: 750px;
    background-color: white;
  }
  .mytread-header{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .refresh-view {
  height: 30px;
  /*width: 750px;*/
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
}

.refresh-arrow {
  font-size: 20px;
  color: #45b5f0;
}
.indicator {
  height: 20px;
  width: 20px;
  color: #889967;
}

</style>

<script>
import showlist from '../components/showlist.vue'
import apiURL from '../common/api'
import treaditem from '../components/mytread-item.vue'

var event = weex.requireModule('event');
const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream');
//var dom = weex.requireModule('dom');
  export default {
   data () {
      return {
        refresh_display: 'hide',
        loading_display: 'hide',
        imgUrl:apiURL.imgUrl,
        name: this.$store.state.username,
        //lists:[{'username':"adfadf",'time':"sdf",'content':"agsdf"}],
        lists:[],
      }
    },
    components: {
      showlist,treaditem
    },
  mounted () {
    console.log(apiURL.treadApi.usertread+'?userid=3&optid=0');
      stream.fetch({
        method: 'GET',
        type: 'json',
        //url: apiURL.treadApi.usertread+'?userid='+ this.$store.state.userid +'&optid=1'
        url: apiURL.treadApi.usertread+'?userid=3&optid=0'
      }, this.mountedCallback);
  },
    methods: {
      goToSetting: function () {
        this.$router.push({path: '/setting'})
      },
      mountedCallback: function(response) {
        console.log('moutedcallback')
        if (response.ok) {
          // 
          this.lists = response.data;
        } else {
          /*modal.toast({
                message: 'network error',
                duration: 0.8
          })*/
          console.log('network error');
        }
      },
      onMounted: function () {
        // for (var i = 0; i < num; ++i) {
        //   lists.push('我发表的动态');
        // }

      },
      onLoadMore: function (lists, num) {
        var len = lists.length;
        for (var i = len; i < len+num; i++) {
          //this.lists.push('我发表的动态');
        }
      },
      upload:function(){
        this.$router.push({ path: '/setphoto' })
      },
      onrefresh: function(e) {
        console.log("onrefresh");
        console.log(this.$getConfig());
        var self = this;
        self.refresh_display = 'show';
        modal.toast({
          message: '刷新',
          duration: 0.8
        });
        setTimeout(function () {
          self.refresh_display = 'hide';
        }, 1000)
      },
      pullingdown: function(e){
        var dy = e.dy;
        var pullingDistance = e.pullingDistance;
        var viewHeight = e.viewHeight;
      }
    }
  }
</script>
