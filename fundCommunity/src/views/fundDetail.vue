<template>
<div class="wrapper">
  <div class="header">
      <image class='back-img' resize="contain" :src="imgUrl+'back.png'" @click="goBack"></image>
      <text class="title">基金名称</text>
      <image class='share-img' resize="contain" :src="imgUrl+'share2.png'" @click="shareTo"></image>
  </div>
  <div class="content-scroll">
      <div class="top2">
        <div class="top2text">
            <text class="textNumber">2.4930</text>
            <text class="textName" style="margin-top: 10px;">最新净值</text>
        </div>
        <div class="top2text">
            <text class="textNumber">1.24</text>
            <text class="textName" style="margin-top: 10px;">日涨跌幅(%)</text>
        </div>
        <div class="top2text">
            <text class="textNumber">12.6</text>
            <text class="textName" style="margin-top: 10px;">近一年收益率(%)</text>
        </div>
    </div>
    <div class="top3">
        <image class="top3-label" :src="imgUrl+'danger.png'"></image>
        <text class="top3text">混合型 | R4高风险| 首次购买1000元起</text>
    </div>
    <div class="top4">
        <div class="top4-head">
            <text class="top4-head-text">时间区间</text>
            <text class="top4-head-text">涨跌幅</text>
            <text class="top4-head-text">同类排名</text>
        </div>
        <list>
        <refresh class="refresh-view" :display="refresh_display" @refresh="onrefresh" @pullingdown="">
            <loading-indicator class="indicator"></loading-indicator>
            <!-- <text class="refresh-arrow" style="font-size:32px;text-align: center; color:rgb(238, 162, 54) { 'display' : refresh_display==='hide'}">Refresh</text> -->
        </refresh>
        <cell class="top4-body" v-for="item in itemlist" :key="item.index">
            <text class="top4-body-text">{{item.dateScale}}</text>
            <text class="top4-body-text" style="color:red">{{item.rate}}</text>
            <text class="top4-body-text" style="color: rgb(60, 118, 61);">{{item.rank}}</text>
        </cell>
        </list>
    </div>
     <div class="fund-tread-container">
        <image class="fund-tread-img" :src="imgUrl+'fund_tread.png'"></image>
    </div>
    <div class="top5">
      <div class="top5-btn" @click="buyProduct">
         <text class="top5-1text" style="color:#10a6e2;">购买</text>
      </div>
      <div class="top5-btn" style="background-color: #00aaee;" @click="sellFund">
         <text class="top5-1text" style="color:white;">赎回</text>
      </div>
    </div>
    <div class="memo">
      <div class="caution">
        <text class="caution-text">本页面非任何法律文件，投资前请阅读基金合同、招募说明书。过往业绩不预示未来表现，市场有风险，投资需谨慎。</text>
      </div>
    </div>
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
    bottom: 100px;
    background-color: #f5f5f9;
    display: flex;
    flex-direction: column;
    
  }
.header {
    /*flex: 1;*/
    flex-direction: row;
    background-color: white;
    width: 750px;
    padding-left: 15px;
    padding-right: 15px;
    height: 100px;
    align-items: center;
    justify-content: center;
    border-bottom-style: solid;
    border-bottom-width: 5px;
    border-bottom-color: rgb(245, 245, 249);
  }
  .content-scroll{
    flex: 1;
    overflow: scroll;
  }

  .back-img {
    width: 50px;
    height: 50px;
  }

  .title {
    text-align: center;
    font-size: 48px;
    font-weight: 10px;
    color: black;
    flex: 8;
  }
  .share-img{
    height: 50px;
    width: 50px;
  }
.top2{
    /*flex: 2;*/
    flex-direction: row;
    width: 750px;
    height: 160px;
    padding: 10px;
    background-color: white;
    border-bottom-style: solid;
    border-bottom-width: 5px;
    border-bottom-color: rgb(245, 245, 249);
    align-items: center;
    text-align: center;
    justify-content: space-around;
}
.top2text{
    width: 230px;
}
.textName{
    text-align: center;
    font-size: 27px;
    white-space: nowrap;
}
.textNumber{
    text-align: center;
    color: red;
    font-size: 40px;
    font-weight: 600;
}
.top3{
    /*flex: 1;*/
    height: 90px;
    flex-direction: row;
    background-color: white;
    /*padding-left: 50px;*/
    align-items: center;
    justify-content: center;
    border-bottom-style: solid;
    border-bottom-width: 5px;
    border-bottom-color: rgb(245, 245, 249);
    padding-left: 50px;
}
.top3-label{
  height: 50px;
  width: 50px;
  margin-right: 20px;
}
.top3text{
    flex: 1;
    color: #D8BB9A;
    font-size: 32px;
}
.top4{
    /*flex: 4;*/
    height: 350px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: white;
    border-bottom-style: solid;
    border-bottom-width: 5px;
    border-bottom-color: rgb(245, 245, 249);
}
.top4-head{
    flex-direction: row;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    /*margin-top: 5px;*/
    background-color: white;
    align-items: center;
    background-color: white;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: rgb(245, 245, 249);
}
.top4-head-text{
    flex: 1;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
}
.top4-body{
    flex-direction: row;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    /*margin-top: 5px;*/
    background-color: white;
    align-items: center;
}
.top4-body-text{
    flex: 1;
    font-size: 32px;
    text-align: center;
}
.top5{
    width: 750px;
    height: 100px;
    background-color: white;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    /*width: 700px;*/
    overflow: hidden;
    border-top-width: 2px;
    border-top-style: solid;
    border-top-color: rgb(245, 245, 249);

}
.top5-btn{
    flex:1;
    height: 100px;
    align-items: center;
    justify-content: center;
}
.top5-btn:active {
    background-color: #9bcdfa;
  }
.top5-1text{
    text-align: center;
    font-weight: 500;
    font-size: 40px;
}
.fund-tread-container{
    /*flex: 5;*/
    height: 420px;
    width: 750px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-top-style: solid;
    border-top-width: 5px;
    border-top-color: rgb(245, 245, 249);
    align-items: center;
    justify-content: center;
    background-color: white;
}
.fund-tread-img{
    width: 650px;
    height: 318px;
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
.memo{
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
}
.caution{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.caution-text{
  color: #a5a5a5;
  font-size: 24px;
  text-align: center;
}

</style>
<script>
import apiURL from '../common/api';
  export default{
    data(){
      return {
        imgUrl:apiURL.imgUrl,
        item:this.$route.params.item,
        refresh_display: 'hide',
        loading_display: 'hide',
        itemlist:[
          {
            dateScale:'近一周',
            rate:'0.72%',
            rank:'1030/1059'
          },
          {
            dateScale:'近一月',
            rate:'-0.60%',
            rank:'951/1030'
          },
          {
            dateScale:'近三月',
            rate:'1.82%',
            rank:'124/631'
          }
        ]
      }
    },
    methods:{
      goBack:function(){
        this.$router.back();
      },
      shareTo:function(){
        console.log("shareTo");
      },
      buyProduct:function(){
        console.log("buyProduct");
      },
      sellFund:function(){
        console.log("sellFund");
      },
      onrefresh: function(e) {
        console.log("onrefresh");
        var self = this;
        self.refresh_display = 'show';
        setTimeout(function () {
          self.refresh_display = 'hide';
        }, 2000)
      }
    }
  }

</script>