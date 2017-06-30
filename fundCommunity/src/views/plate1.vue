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

  var stream = weex.requireModule('stream')

  export default {
   data () {
      return {
        titleName: '基金排行',
        fundlists: []
      }
    },
    mounted () {
      this.getFunds(this.getFundsCallback);
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
          lists.push(this.fundlists[i]);
        }
      },
      onLoadMore: function (lists, num) {
        var len = lists.length;
        for (var i = len; i < len+num; i++) {
          lists.push(i);
        }
      },
      getFunds: function (callback) {
        console.log("validate");
        return stream.fetch({
            method: 'GET',
            type: 'json',
            url: 'http://99.6.150.41:820/WebAPI/api/Funds',
          }, callback);
      },
      getFundsCallback: function(response) {
        if (response.ok) {
          var funds = response.data;
          console.log(funds);
          this.fundlists = funds;
        }
      }
    }
  }
</script>
