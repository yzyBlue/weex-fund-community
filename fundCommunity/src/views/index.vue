<template>
  <div class="index-wrapper" ref="test">
    <div class="header">
      <image class="header-img" :src="imgUrl+'logo.png'"></image>
      <text class="header-title"> 理财社区APP</text>
    </div>

    <div class="plates">
      <div class="plates-row">
        <div class="plates-item">
          <plateitem itemname="fundlist">
            <image class="plate-item-img" :src="imgUrl+'fund.png'" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">基金排行</text>
          </plateitem>
        </div>
        <div class="plates-item">
          <plateitem itemname="Plate2">
            <image class="plate-item-img" :src="imgUrl+'finance.png'" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">理财排行</text>
          </plateitem>
        </div>
        <div class="plates-item">
          <plateitem itemname="Plate3">
            <image class="plate-item-img" :src="imgUrl+'diamond.png'" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">精选理财</text>
          </plateitem>
        </div>
      </div>
      <div class="plates-row">
        <div class="plates-item">
          <plateitem itemname="Plate4">
            <image class="plate-item-img" :src="imgUrl+'special_fund.png'" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">专题基金</text>
          </plateitem>
        </div>
        <div class="plates-item">
          <plateitem itemname="Plate5">
            <image class="plate-item-img" :src="imgUrl+'index_fund.png'" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">指数基金</text>
          </plateitem>
        </div>
        <div class="plates-item">
          <plateitem itemname="Plate6">
            <image class="plate-item-img" :src="imgUrl+'star_fund.png'" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">明星基金</text>
          </plateitem>
        </div>
      </div>
    </div>

    <!-- <div class="ads">
      <slider class="ads-slider" auto>
        <div class="ads-slider-images" v-for="img in imageList">
          <image class="ads-slider-image" resize="cover" :src="img.src"></image>
          <text class="ads-slider-title">{{img.title}}</text>
        </div>
        <indicator class="ads-slider-indicator"></indicator>
      </slider>
    </div> -->
    <div class="marquee-scroller" >
      <image class="marquee-scroller-img" :src="imgUrl+'internet_news.png'"></image>
      <marquee-scroller></marquee-scroller>
    </div>

    <div class="content">
      <list class="content-scroll">
        <!--<refresh class="refresh-view" :display="refresh_display" @refresh="onrefresh" @pullingdown="pullingdown">
          <loading-indicator class="indicator" ></loading-indicator>
          <text class="refresh-arrow" style="font-size:15px;text-align: center; color:rgb(238, 162, 54) { 'display' : refresh_display==='hide'}">Pull To Refresh</text>
        </refresh>-->

        <cell v-for="(sec, i) in sections" :key="i" class="content-scroll-row">
          <div class="row-header">
            <div class="row-header-left">
              <div class="row-header-label"></div>
              <text class="row-header-title">{{sec.title}}</text>
            </div>
            <div class="row-header-right" @click="onClickMore(i)">
              <text class="row-header-more">更多</text>
              <image class="row-header-icon" :src="imgUrl+'arrow_2x.png'"></image>
            </div>
          </div>

          <div v-for="item in sec.items" class="row-header-items" :key="item.index" >
            <div class="row-header-item">
              <div class="data-view">
                <text class="data-num">{{item.num}}</text>
              </div>
              <div class="data-title">
                <text class="data-title-desc">{{item.desc}}</text>
              </div>
            </div>
            <div class="row-header-item">
              <div class="data-view">
                <text class="data-note">{{item.note}}</text>
              </div>
              <div class="data-title">
                <text class="data-title-name">{{item.name}}</text>
              </div>
            </div>
          </div>
          <div class="content-noret" v-if="!hasContent(sec.items)">
            <text class="noret-text">当前内容为空</text>
          </div>

        </cell>

        <!--<loading class="loading-view" :display="loading_display" @loading="onloading">
          <loading-indicator class="indicator" ></loading-indicator>
          <text class="refresh-arrow" style="font-size:15px;text-align: center; color:rgb(238, 162, 54) { 'display' : loading_display==='hide'}">Pull To Loading</text>
        </loading>-->
      </list>
    </div>
    
    <!--<appentry></appentry>-->
  </div>
</template>

<style scoped>
  .index-wrapper {   
    margin: 0;
    padding: 0;
    /*width: 750px;*/
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 150px;
    background-color: white;
  }
  .header{
    align-items: center;
    background-color: #10a6e2;
    /*width: 750px;*/
    height: 180px;
    text-align: center;
    padding: 10px;
  }
  .header-img{
    width: 386px;
    height: 112px;
  }
  .header-title {
    font-size: 30px;
    font-weight: bolder;
    color: white;
    margin: 10px;
  }
  .plates {
    width: 750px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom-style: solid;
    border-bottom-width: 10px;
    border-bottom-color: #f5f5f9;
  }
  .plates-row{
    width: 750px;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top:17px;
    padding-bottom: 17px; 
  }
  .plates-item{
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .plate-item-img{
    height: 80px;
    width: 80px;
  }

.plate-item-text {
    font-size: 20px;
    margin-top: 10px;
}
.marquee-scroller{
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-style: solid;
  border-bottom-width: 10px;
  border-bottom-color: #f5f5f9;
}
.marquee-scroller-img{
  width: 40px;
  height: 40px;
}

.ads{
  /*width: 750px;*/
  overflow: auto;
  border-bottom: 5px solid #f5f5f9;
}

.ads-slider {
  margin: 4px;
  height: 60px;
  border-width: 0px;
  border-radius: 2px;
  border-style: solid;
  border-color: #41B883;
}

.ads-slider-images {
  /*width: 750px;*/
  height: 60px;
  position: relative;
  text-align: center;
  margin: 0 auto;
}
.ads-slider-image {
  /*width: 100%;*/
  height: 80px;
}

.ads-slider-title {
  position: absolute;
  text-align: center;
  padding-top: 10px;
  padding-left: 10px;
  color: #FFFFFF;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.1);
}

.ads-slider-indicator {
  position: absolute;
  /*width: 690px;*/
  height: 420px;
  top: 140px;
  left: 240px;
  itemColor: #dddddd;
  itemSelectedColor: rgb(40, 96, 144);
}

.content {
  /*width: 750px;*/
  flex: 1;
}

.content-scroll {
  /*width: 750px;*/
  /*height:600px;*/
  text-align: center;
  overflow: scroll;
  flex: 1;
}
.content-scroll-row{
  border-style: solid;
  border-bottom-width: 10px;
  border-color: #f5f5f9;
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

.loading-view {
  /*width: 750px;*/
  height: 20px;
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
.row-header {
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffffff;
  height: 42px;
  /*width: 750px;*/
  text-align: left;
  padding-left: 20px;
  padding-right: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.row-header-left{
  display: flex;
  flex-direction: row;
  align-items: center;
  float: left;
  width: 300px;
}
.row-header-right{
  display: flex;
  flex-direction: row;
  align-items: center;
  float: right;
  width: 100px;
}
.row-header-label{
  height: 30px;
  width: 4px;
  padding-bottom: 5px;
  padding-top: 5px;
  background-color: #10a6e2;
  text-align: left;
  
}

.row-header-title {
  font-size: 32px;
  width: 200px;
  color: black;
  padding-left: 10px;
  font-weight: normal;
  text-align: left;
}
.row-header-more{
  font-size: 24px;
  color:#929292;
  text-align: right;
}
.row-header-icon{
  width: 10px;
  height: 20px;
  margin-left: 10px;
  text-align: center;
}
.row-header-items{
  border-top-width: 0.5px;
  border-top-color: rgba(208, 208, 208,1);
  border-top-style: solid;
}

.row-header-item {
  justify-content: space-between;
  align-content: center;
  padding-top: 10px;
  /*width: 750px;*/
  height: 60px;
  padding: 5px;
  display: flex;
  flex-direction: row;
}
.data-view{
  flex:2;
  margin-left: 50px;
  margin-right: 10px;
  text-align: left; 
  width: 300px;
  float: right;
}
.data-num{
  font-size: 36px;
  color: red;
  padding-top: 3.5px;
  padding-bottom: 3.5px;
}
.data-note{
  font-size: 24px;
  color:#929292;
  padding-top: 9px;
  padding-bottom: 9px;
}
.data-title{
  flex:3;
  float: right;
  text-align: left;
}
.data-title-desc{
  font-size: 30px;
  font-weight: bold;
  color:#565656;
  padding-top: 4.5px;
  padding-bottom: 4.5px;
}
.data-title-name{
  font-size: 24px;
  color:#929292;
  padding-top: 9px;
  padding-bottom: 9px;
}

.content-noret {
    padding: 30px;
    flex: 1;
    align-items: center;
    flex-direction: row;
  }

  .noret-text {
    flex: 1;
    text-align: center;
    color: #707070;
    font-size: 36px;
  }
  
</style>

<script>
  import plateitem from '../components/plate-item.vue'
  import marqueeScroller from '../components/marquee-scroller.vue'
  import apiURL from '../common/api';

  const modal = weex.requireModule('modal')
  var stream = weex.requireModule('stream')

  export default {
    mounted () {
      // console.log(this.$refs['test'].clientHeight);
      var preurl = apiURL.fundApi.funds + '?type=';

      var opt = {
        method: 'GET',
        type: 'json',
        url: "",
      };
      opt.url = preurl + "1"
      // console.log(opt.url)
      stream.fetch(opt, this.mountedFirstCallback)
      // this.mountedFirstCallback({ok: true});
      opt.url = preurl + "2"
      stream.fetch(opt, this.mountedSecondCallback)
      // this.mountedSecondCallback({ok: true});
      opt.url = preurl + "3"
      stream.fetch(opt, this.mountedThirdCallback)
      // this.mountedThirdCallback({ok: true});
    },
   data () {
      return {
        imgUrl:apiURL.imgUrl,
        refresh_display: 'hide',
        loading_display: 'hide',
        imageList: [
          { title: '翩若惊鸿，婉若游龙。', src: 'http://99.6.136.74:8480/info/image/focus/focus_20170126085541.png'},
          { title: '梦烧欢唱迎吉年！', src: 'http://99.6.136.74:8480/info/image/focus/focus_20170126085753.png'}
            
        ],
        sections: [
          {
            title: '专题基金',
            items: [
              // {id: 1,num:"+27.90%",note:"近一年涨幅",desc:"一带一路助享政策红利",name:"南方小康ETF联接"},
              // {id: 2,num:"+29.61%",note:"近一年涨幅",desc:"五好基金",name:"富国中证红利指数增强"},
              // {id: 3,num:"+24.68%",note:"近一年涨幅",desc:"一建投资智慧城市",name:"南方小康ETF联接"}
            ]
          },
          {
            title: '指数基金',
            items: [
              // {id: 1,num:"+27.90%",note:"近一年涨幅",desc:"一带一路助享政策红利",name:"南方小康ETF联接"},
              // {id: 2,num:"+29.61%",note:"近一年涨幅",desc:"五好基金",name:"富国中证红利指数增强"},
              // {id: 3,num:"+24.68%",note:"近一年涨幅",desc:"一建投资智慧城市",name:"南方小康ETF联接"}
            ]
          },
          {
            title: '明星基金',
            items: [
              // {id: 1,num:"+27.90%",note:"近一年涨幅",desc:"一带一路助享政策红利",name:"南方小康ETF联接"},
              // {id: 2,num:"+29.61%",note:"近一年涨幅",desc:"五好基金",name:"富国中证红利指数增强"},
              // {id: 3,num:"+24.68%",note:"近一年涨幅",desc:"一建投资智慧城市",name:"南方小康ETF联接"}
            ]
          }
        ]
      }
    },
    methods: {
      mountedCallback: function(response, index) {
        this.sections[index].items = [];
        if (response.ok) {
          this.sections[index].items = [];
          var len = (response.data.length > 3 ? 3 : response.data.length);
          for (var i = 0; i < len; ++i) {
            this.sections[index].items.push({
              id: i+1, 
              num: response.data[i].current_yield,
              note: "当前收益率",
              desc: response.data[i].detail,
              name: response.data[i].name
            });
          }
        } else {
          modal.toast({
            message: 'network error',
            duration: 0.8
          });
        }
      },
      mountedFirstCallback: function(response) {
        this.mountedCallback(response, 0);
      },
      mountedSecondCallback: function(response) {
        this.mountedCallback(response, 1);
      },
      mountedThirdCallback: function(response) {
        this.mountedCallback(response, 2);
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
        }, 3000)
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
        }, 3000)
      },
      pullingdown: function(e){
        var dy = e.dy;
        var pullingDistance = e.pullingDistance;
        var viewHeight = e.viewHeight;
      },
      hasContent: function (datalist) {
        // console.log(datalist)
        return datalist.length !== 0;
      },
      onClickMore: function (fundtype) {
       this.$router.push({name: 'Fundlist', params: {type: fundtype}});
      }
    },
    components: {
      plateitem, marqueeScroller
    }
  }
</script>
