<template>
  <div class="wrapper">
    <router-view></router-view>
    <div class="tabbar-wrapper" @selectedchange="selectedChange">
      <tabbar>
        <tabbaritem itemname='Index' :selecteditem="selectedItem">
          <image class="item-image" src="http://itchz.cmbchina.cn/css/images/nav/home.png" slot="item-img"></image>
          首页
        </tabbaritem>
        <tabbaritem itemname='Tread' :selecteditem="selectedItem">
          <image class="item-image" src="http://itchz.cmbchina.cn/css/images/nav/bbs.png" slot="item-img"></image>
          动态
        </tabbaritem>
        <tabbaritem itemname='Mine' :selecteditem="selectedItem">
          <image class="item-image" src="http://itchz.cmbchina.cn/css/images/nav/self.png" slot="item-img"></image>
          我的
        </tabbaritem>
      </tabbar>
    </div>
  </div>
  
</template>

<style scoped>
  .wrapper { 
    align-items: center; 
    margin: 0px; 
    padding: 0px;
    width: 100%;
    background: white;
  }

  .item-image {
    width: 50px;
    height: 50px;
  }

</style>

<script>
  import showlist from '../components/showlist.vue'
  import tabbaritem from '../components/tabbar-item.vue'
  import tabbar from '../components/tabbar.vue'

  export default {
    data() {
      return {
        selectedItem: 'Index' // 当前选中的tab
      };
    },
    methods: {
      selectedChange: function (newItem) {
        //console.log('selectedChange');
        this.selectedItem = newItem;
      }
    },
    components: {
        showlist,
        tabbaritem,
        tabbar
    }
  }
</script>
