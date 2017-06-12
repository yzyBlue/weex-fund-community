<template>
  <div class="wrapper">
    <platecontent :titlename="titleName" :onMounted="onMounted" :onLoadMore="onLoadMore"></platecontent>
  </div>
</template>

<style scoped>
  .wrapper { 
   
  }
  
  
</style>

<script>
  import platecontent from '../components/plate-content.vue'

  export default {
   data () {
      return {
        titleName: '精选理财'
      }
    },
    components: {
      platecontent
    },
    methods: {
      goToIndex: function () {
        console.log('gotoindex');
        this.$router.push({path: '/'});
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
