<template>
  <div class="wrapper">
    <div class="header">
      <image class='back-img' resize="contain" src="http://oabbs.cmbchina.com/template/win8mi_third_dynamic2/src/img/search2.png" @click="goToIndex"></image>
      <text class="title">{{titlename}}</text>
    </div>
    <div class="main">
      <showlist :onLoadMore='onLoadMore' :onMounted='onMounted'></showlist>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
  .wrapper { 
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .header {
    background-color: #afddff;
    width: 100%;
  }

  .back-img {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 40px;
    height: 40px;
    z-index: 10;
  }

  .title {
    text-align: center;
    font-size: 48px;
    font-weight: 10px;
    width: 100%;
    color: white;
  }
  .main {
    margin-top: 30px;
    margin-bottom: 10px;
    flex: auto;
  }
  
</style>

<script>
  import showlist from './showlist.vue'

  export default {
      props: {
        titlename: String,
        onLoadMore: {
            type: Function
        },
        onMounted: {
            type: Function
        }
      },
   data () {
      return {
        
      }
    },
    components: {
      showlist
    },
    methods: {
      goToIndex: function () {
        console.log('gotoindex');
        this.$router.push({path: '/index'});
      }
    }
  }
</script>
