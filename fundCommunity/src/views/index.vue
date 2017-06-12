<template>
  <div class="index-wrapper">
    <div class="header">
      <image class="header-img" src="http://itchz.cmbchina.cn/css/images/login/logo.png"></image>
      <text class="header-title"> 理财社区APP</text>
    </div>

    <div class="plates">
      <ul class="plates-row">
        <li class="plates-item">
          <plateitem itemname="Plate1">
            <image class="plate-item-img" src="http://cmbecsns01.softecs.cmbkx.com/lb00-00-weexproject.11/fund2.png" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">基金排行</text>
          </plateitem>
        </li>
        <li class="plates-item">
          <plateitem itemname="Plate2">
            <image class="plate-item-img" src="http://cmbecsns01.softecs.cmbkx.com/lb00-00-weexproject.11/fund2.png" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">理财排行</text>
          </plateitem>
        </li>
        <li class="plates-item">
          <plateitem itemname="Plate3">
            <image class="plate-item-img" src="http://cmbecsns01.softecs.cmbkx.com/lb00-00-weexproject.11/fund2.png" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">精选理财</text>
          </plateitem>
        </li>
      </ul>
      <ul class="plates-row">
        <li class="plates-item">
          <plateitem itemname="Plate4">
            <image class="plate-item-img" src="http://cmbecsns01.softecs.cmbkx.com/lb00-00-weexproject.11/fund2.png" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">专题基金</text>
          </plateitem>
        </li>
        <li class="plates-item">
          <plateitem itemname="Plate5">
            <image class="plate-item-img" src="http://cmbecsns01.softecs.cmbkx.com/lb00-00-weexproject.11/fund2.png" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">指数基金</text>
          </plateitem>
          </li>
        <li class="plates-item">
          <plateitem itemname="Plate6">
            <image class="plate-item-img" src="http://cmbecsns01.softecs.cmbkx.com/lb00-00-weexproject.11/fund2.png" slot="plate-item-img"></image>
            <text class="plate-item-text" slot="plate-item-text">明星基金</text>
          </plateitem>
        </li>
      </ul>
    </div>

    <div class="ads">
      <slider class="ads-slider" auto>
        <div class="ads-slider-images" v-for="img in imageList">
          <image class="ads-slider-image" resize="cover" :src="img.src"></image>
          <text class="ads-slider-title">{{img.title}}</text>
        </div>
        <indicator class="ads-slider-indicator"></indicator>
      </slider>
    </div>

    <div class="content">
      <scroller class="content-scroll">
        <div class="content-scroll-row" v-for="index in rows" >
          <text class="content-scroll-row-text">rows {{index}}</text>
        </div>
      </scroller>
    </div>
   
  </div>
</template>

<style scoped>
  .index-wrapper {   
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .header{
    align-items: center;
    background-color: #92a1f0;
    width: 100%;
    text-align: center;
    padding: 20px;
  }
  .header-img{
    width: 275px;
    height: 80px;
  }
  .header-title {
    font-size: 20px;
    font-weight: bolder;
    color: white;
  }
  .plates {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex:1;
    border-bottom: 8px solid #e1e1e1;
  }
  .plates ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .plates li {
    flex: auto;
    border: 0px solid grey;
    padding: 10px;
  }
  .plates-item{
    text-align: center; 
  }
  .plate-item-img{
    height: 40px;
    width: 40px;
    margin: 5px auto;
    text-align: center;
}

.plate-item-text {
    font-size: 10px;
    text-align: center; 
}


  .ads{
    width: 100%;
    overflow: auto;
    border-bottom: 5px solid #e1e1e1;
  }

  .ads-slider {
    margin: 10px;
    height: 100px;
    border-width: 0px;
    border-radius: 2px;
    border-style: solid;
    border-color: #41B883;
  }

  .ads-slider-images {
    width: 100%;
    height: 100px;
    position: relative;
    text-align: center;
    margin: 0 auto;
  }
  .ads-slider-image {
    width: 100%;
    height: 100px;
  }

  .ads-slider-title {
    position: absolute;
    text-align: center;
    padding-top: 10px;
    padding-left: 10px;
    color: #FFFFFF;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  .ads-slider-indicator {
    height: 100px;
    item-color: green;
    item-selected-color: red;
    item-size: 50px;
    position: absolute;
  }

  .content {
    width: 100%;
    padding: 10px;
  }

  .content-scroll {
    width: 100%;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    text-align: center;
    margin: 0 auto;
    overflow: scroll;
  }

  .content-scroll-row {
    height: 30px;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
  }

  .content-scroll-row-text {
    font-size: 20px;
  }
  
</style>

<script>
  import plateitem from '../components/plate-item.vue'

  export default {
   data () {
      return {
        imageList: [
        { title: '翩若惊鸿，婉若游龙。', src: 'http://99.6.136.74:8480/info/image/focus/focus_20170126085541.png'},
            { title: '梦烧欢唱迎吉年！', src: 'http://99.6.136.74:8480/info/image/focus/focus_20170126085753.png'}
            
        ],
        rows: [1,2,3]
      }
    },
    methods: {
      
    },
    components: {
      plateitem
    }
  }
</script>
