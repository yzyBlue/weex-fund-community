<template>
  <div class="wrapper">
    <div class="header">
      <text class="title">{{name}}</text>
      <text class="setting" @click="goToSetting">设置</text> 
    </div>

    <div class="myinvest">
      <text style="color: red;">我的投资</text>
    </div>

    <div class="mytread">
      <text style="color: red;">我的动态</text>
      <showlist :onLoadMore='onLoadMore' :onMounted='onMounted'></showlist>
    </div>
   
  </div>
</template>

<style scoped>
  .wrapper {
    margin: 0px;
    padding: 0px;
    width: 100%;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid grey;
    overflow: auto;
  }

  .title,
  .setting {
      font-size: 48px;
  }

  .myinvest {
    height: 250px;
    width: 100%;
    background: yellow;
  }
  
</style>

<script>
import showlist from '../components/showlist.vue'

  export default {
   data () {
      return {
        name: this.$store.state.username
      }
    },
    components: {
      showlist
    },
    methods: {
      goToSetting: function () {
        this.$router.push({path: '/setting'})
      },
      onMounted: function (lists, num) {
        for (var i = 0; i < num; ++i) {
          lists.push(i);
        }
      },
      onLoadMore: function (lists, num) {
        var len = lists.length;
        for (var i = len; i < len+num; i++) {
          lists.push(i);
        }
      }
    }
  }
</script>
