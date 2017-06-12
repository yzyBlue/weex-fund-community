<template>
  <div class="wrapper">
    <div class='header'>
      <input type="text" placeholder="search" class="searchinput" value="" @change="" @input="" @focus="" @blur=""></input>
      <span>发布</span>
    </div>

    <div class="content">
      <text style="color: red;width: 100%; text-align: center; margin-bottom: 30px">我的动态</text>
      <showlist :onLoadMore='onLoadMore' :onMounted='onMounted'></showlist>
    </div>
   
  </div>
</template>

<style scoped>
  .wrapper {
    width: 100%;
  }

  .header {
    display: flex;
    flex-direction: row;
  }

  .searchinput {
    flex: auto;
    padding-left: 20px;
    font-size: 48px;
  }

  .header span {
    display: block;
    text-align: center;
    font-size: 36px;
  }
</style>

<script>
import showlist from '../components/showlist.vue'

  export default {
   data () {
      return {
        target: 'tread'
      }
    },
    components: {
      showlist
    },
    methods: {
      update: function (e) {
        this.target = 'Weex'
        console.log('target:', this.target)
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
