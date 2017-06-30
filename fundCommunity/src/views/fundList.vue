<template>
  <div class="fund-wrapper">
    <div class="fund-header">
      <image class='back-img' resize="contain" :src="imgUrl+'back.png'" @click="goToIndex"></image>
      <div class="fund-header-title">
          <text class="title-text">基金</text>
      </div>
    </div>
  	<div class="top">    
        <div class="headLine">
            <div class="headLineText1"><text class="top-head-text text-left" >基金名称</text></div>
            <div class="headLineText2"><text class="top-head-text text-center" >最新净值</text></div>
            <div class="headLineText3"><text class="top-head-text text-center" >日涨跌幅</text></div>
        </div>
    </div>
        
    <list class="sort_box">
        <!--<refresh class="refresh-view" :display="refresh_display" @refresh="onrefresh" @pullingdown="pullingdown">
          <loading-indicator class="indicator" ></loading-indicator>
          <text class="refresh-arrow" style="font-size:15px;text-align: center; color:rgb(238, 162, 54) { 'display' : refresh_display==='hide'}">Pull To Refresh</text>
        </refresh>-->

        <!--<div v-for="item in itemList" class="sort_list" :key="item.index">
            <div class="fundCompany">
                <div><text class="fundCompany-name">{{item.fundName}}</text> </div>
                <div><text class="fund-code">{{item.fundCode}}</text></div>
            </div>     
            <div class="fundScale">
                <div><text class="fundScaleValue text-center">{{item.fundScale}}</text></div>
                <div><text class="fundDate text-center">{{item.fundDate}}</text></div>
            </div>
            <div class="fundNumber"><text class="fundPercent text-center">{{item.fundPercent}}</text></div>
        </div>
        <div class="fund-tread-container">
            <image class="fund-tread-img" :src="imgUrl+'fund_tread.png'"></image>
        </div>-->
        <cell v-for="item in itemList" class="sort_list" :key="item.index" @click="onClickDetail(item)">
            <div class="fundCompany">
                <text class="fundCompany-name">{{item.name}}</text>
                <text class="fund-code">{{item.code}}</text>
            </div>     
            <div class="fundScale">
                <text class="fundScaleValue text-center">{{item.current_price}}</text>
                <text class="fundDate text-center">2017-6-6</text>
            </div>
            <div class="fundNumber"><text class="fundPercent text-center">{{item.current_buy_feeRate}}</text></div>
        </cell>
        <!--<div class="fund-tread-container">
            <image class="fund-tread-img" :src="imgUrl+'fund_tread.png'"></image>
        </div>-->
          
         <!--<loading class="loading-view" :display="loading_display" @loading="onloading">
              <loading-indicator class="indicator" ></loading-indicator>
              <text class="refresh-arrow" style="font-size:15px;text-align: center; color:rgb(238, 162, 54) { 'display' : loading_display==='hide'}">Pull To Loading</text>
        </loading>-->
    </list> 
     
</div>
</template>
<style>
  .fund-wrapper {
    /*margin: 0px;
    padding: 0px;*/
    width: 750px;
    background-color:white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .fund-header {
    width: 750px;
    height: 80px;
    background-color: #f5f5f9;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom-color: #f5f5f9;
    border-bottom-width: 5px;
    border-bottom-style: solid;
    margin-bottom: 20px;
    border-radius: 5px;
  }
  .logo-img{
    text-align: center;
    width: 250px;
    height: 100px;
    padding: 10px;
  }

  .back-img {
    margin-left: 20px;
    width: 60px;
    height: 60px;
  }
  .fund-header-title{
    width: 710px;
    height: 60px;
    align-items: center;
  }

  .title-text {
    text-align: center;
    font-size: 50px;
    color: black;
  }

/*ul li{list-style: none;}*/
.top{
    /*position: fixed;*/
    z-index: 99;
    padding-left: 20px;
    padding-right: 20px;
    background-color: white;
    border-bottom-color: #f5f5f9;
    border-bottom-width: 5px;
    border-bottom-style: solid;
    
}
.headLine{
    display: flex;
	flex-direction:row;
    align-items: center;
    background-color:white;
    padding-top:15px;
    padding-bottom:15px;
    padding-left:15px;
    padding-right:15px;
    background-color:white;

}
.top-head-text{
    font-size: 30px;
    color: black;
}
.top-head-text{
    font-size: 30px;
    color: black;
}
.text-left{
    text-align: left;
}
.text-center{
    text-align: center;
}
.headLineText1{
    flex: 1;
    color:#929292;
}
.headLineText2{
    flex: 1;
    color:#929292;
}
.headLineText3{
    flex: 1;
    color:#929292;
}
.sort_box{
    position: relative;
    width: 750px;
    overflow: scroll;
    padding-left: 20px;
    padding-right: 20px;
    flex: 1;
    /*padding-top:300px;*/
    
}
.sort_list{
    display: flex;
    flex-direction:row;
    align-items: center;
    padding:15px;
    position: relative;
    height: 120px;
    margin-top: 5px;
    background-color:white;
    border-bottom-color: #f5f5f9;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    
}
.fundCompany{
    text-align:left;
    flex: 1;
    display: flex;
    flex-direction:column;
    align-items:baseline;
}

.fundCompany-name{
    font-size: 36px;
    color: #286090;
}

.fund-code{
    font-size: 28px;
    color: rgb(238, 162, 54);
}
.fundNumber{
    flex: 1;
    color:#383838;
    overflow:hidden;
    align-items: center;
}
.fundScale{
    flex: 1;
    display:inline-block;
    width:130px;
    text-align:right;
    overflow:hidden;
   
}
.fundDate{
    color:#929292;
    font-size: 30px;
}
.fundScaleValue{
    color:red;
    font-size: 42px; 
}
.fundPercent{
    font-size: 40px;
    color: rgb(60, 118, 61);
    font-weight: bold;
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
  font-size: 16px;
  color: #45b5f0;
}

.loading-view {
  /*width: 750px;*/
  height: 10px;
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
}

.indicator {
  height: 20px;
  width: 20px;
  color: #889967;
}
.fund-tread-container{
    width: 750px;
    padding-top: 10px;
    border-top-width: 5px;
    border-top-color: #f5f5f9;
    border-top-style: solid;
}
.fund-tread-img{
    width: 650px;
    height: 318px;
}
</style>
<script>
  import apiURL from '../common/api';
  const modal = weex.requireModule('modal')
  var stream = weex.requireModule('stream')
  export default {
   data () {
      return {
        imgUrl:apiURL.imgUrl,
        refresh_display: 'hide',
        loading_display: 'hide',
        itemList: []
        // itemList:[{
        //     fundName:'招银基金',
        //     fundCode:'ZZYY',
        //     fundScale:'2.14',
        //     fundDate:'2017-06-14',
        //     fundPercent:'90%'
        // },{
        //     fundName:'华夏基金',
        //     fundCode:'HXJJ',
        //     fundScale:'2.14',
        //     fundDate:'2017-06-14',
        //     fundPercent:'80%'
        // },{
        //     fundName:'和讯基金',
        //     fundCode:'HXYY',
        //     fundScale:'2.14',
        //     fundDate:'2017-06-14',
        //     fundPercent:'100%'
        // },{
        //     fundName:'招银基金',
        //     fundCode:'ZZYY',
        //     fundScale:'2.14',
        //     fundDate:'2017-06-14',
        //     fundPercent:'90%'
        // },{
        //     fundName:'华夏基金',
        //     fundCode:'HXJJ',
        //     fundScale:'2.14',
        //     fundDate:'2017-06-14',
        //     fundPercent:'80%'
        // },{
        //     fundName:'和讯基金',
        //     fundCode:'HXYY',
        //     fundScale:'2.14',
        //     fundDate:'2017-06-14',
        //     fundPercent:'100%'
        // }]
      }
    },
    mounted () {
        this.mountedhelp();
    },
    methods: {
      mountedhelp: function () {
        if (this.$route.params.type !== 0 && this.$route.params.type !== 1 && this.$route.params.type !== 2) {
            modal.toast({
                message: '基金类型错误',
                duration: 0.8
            })

            return;
        }

        var type = this.$route.params.type + 1;

        var opt = {
            method: 'GET',
            type: 'json',
            url: apiURL.fundApi.funds + '?type=' + type,
        };
        console.log(apiURL.fundApi.funds + '?type=' + type)
        stream.fetch(opt, this.mountedCallback)
      },
      mountedCallback: function(response) {
        if (response.ok) {
          this.itemList = response.data;
        //   var len = (response.data.length > 3 ? 3 : response.data.length);
        //   for (var i = 0; i < len; ++i) {
        //     this.sections[index].items.push({
        //       id: i+1, 
        //       num: response.data[i].current_yield,
        //       note: "当前收益率",
        //       desc: response.data[i].detail,
        //       name: response.data[i].name
        //     });
        //   }
        } else {
          modal.toast({
            message: 'network error',
            duration: 0.8
          });
        }
      },
      goToIndex: function () {
        this.$router.push({path: '/index'})
      },
      onrefresh: function(e) {
        console.log("onrefresh");
        console.log(this.$getConfig());
        var self = this;
        self.refresh_display = 'show';
        /*self.$call('modal', 'toast', {
          'message': 'onrefresh'
        });*/
        modal.toast({
          message: '刷新',
          duration: 0.8
        });
        setTimeout(function () {
          self.refresh_display = 'hide';
        }, 1000)
      },
      onloading: function(e) {
        var self = this;
        self.loading_display = 'show';
        modal.toast({
          message: '加载',
          duration: 0.8
        });
        setTimeout(function () {
          self.loading_display = 'hide';
        }, 1000)
      },
      pullingdown: function(e){
        var dy = e.dy;
        var pullingDistance = e.pullingDistance;
        var viewHeight = e.viewHeight;
      },
      onClickDetail: function(item) {
        this.$router.push({name: 'FundDetail', params: {funditem: item}})
      }
    },
  }
</script>