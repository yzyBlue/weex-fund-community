<template>
  <div class="wrapper">
    <router-view></router-view>
    <div class="tabbar-wrapper" >
      <!--<image :src="imgUrl+'topline.png'" style="width: 750px;height:10px;"></image>-->
      <tabbar class="tabbar">
        <tabbaritem class="tabbar-item" itemname='Index'  @itemchange="itemChange">
          <!--<image :src="imgUrl+'topline.png'" style="width: 250px;height:4px;"></image>-->
          <image class="item-image" :src="homeUrl" slot="item-img"></image>
          <text class="item-text" :style="{color: indexcolor}" slot="item-text">首页</text>
        </tabbaritem>
        <tabbaritem class="tabbar-item" itemname='Tread'  @itemchange="itemChange">
          <!--<image :src="imgUrl+'topline.png'" style="width: 250px;height:4px;"></image>-->
          <image class="item-image" :src="treadUrl" slot="item-img"></image>
          <text class="item-text" :style="{color: treadcolor}" slot="item-text">动态</text>
        </tabbaritem>
        <tabbaritem class="tabbar-item" itemname='Mine' @itemchange="itemChange">
          <!--<image :src="imgUrl+'topline.png'" style="width: 250px;height:4px;"></image>-->
          <image class="item-image" :src="mineUrl" slot="item-img"></image>
          <text class="item-text" :style="{color: minecolor}" slot="item-text">我的</text>
        </tabbaritem>
      </tabbar>
      
    </div>
  </div>
  
</template>

<style scoped>
  .wrapper { 
    margin: 0px; 
    padding: 0px;
    /*width: 750px;*/
  }

  .tabbar-wrapper {
    
  }

  .tabbar {
    background-color: white;
  }

  .tabbar-item {
    
  }

  .item-image {
    width: 64px;
    height: 64px;
  }

</style>

<script>
  import showlist from '../components/showlist.vue'
  import tabbaritem from '../components/tabbar-item.vue'
  import tabbar from '../components/tabbar.vue'
  import apiURL from '../common/api.js'

  export default {
    data() {
      return {
        imgUrl:apiURL.imgUrl,
        selectedItem: "", // 当前选中的tab
        indexcolor: '#cdcdcd',
        treadcolor: '#cdcdcd',
        minecolor: '#cdcdcd',
        homeUrl:apiURL.imgUrl+'home-fill-grey.png',
        treadUrl:apiURL.imgUrl+'trade-grey.png',
        mineUrl:apiURL.imgUrl+'mine-grey.png'
      };
    },
    mounted () {
      console.log('appentry mounted')
      this.selectedItem = this.$store.state.curselect;
      this.setColor();
    },
    methods: {
      itemChange: function (newItem) {
        this.indexcolor = '#cdcdcd';
        this.treadcolor = '#cdcdcd';
        this.minecolor = '#cdcdcd';
        this.homeUrl=apiURL.imgUrl+'home-fill-grey.png';
        this.treadUrl=apiURL.imgUrl+'trade-grey.png';
        this.mineUrl=apiURL.imgUrl+'mine-grey.png';
       
        this.selectedItem = newItem;
        this.$store.state.curselect = newItem;
        
        this.setColor();
      },
      setColor: function () {
        if (this.selectedItem === 'Index') {
          this.indexcolor = '#10a6e2';
          this.homeUrl=apiURL.imgUrl+'home-fill-blue.png';
        } else if (this.selectedItem === 'Tread') {
          this.treadcolor = '#10a6e2';
          this.treadUrl=apiURL.imgUrl+'trade-blue.png';
        } else {
          this.minecolor = '#10a6e2';
          this.mineUrl=apiURL.imgUrl+'mine-blue.png';
        }
      }
    },
    components: {
        showlist,
        tabbaritem,
        tabbar
    }
  }
</script>
