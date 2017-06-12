<template>
  <div class="list-wrapper">
    <list class="list" @loadmore="onloadmore" loadmoreoffset="10">
      <cell class="row" v-for="item in lists">
        <text class="content">row {{item}}</text>
      </cell>
      <loading class="loading" @loading="onloading" :display="showLoading">
        <loading-indicator class="loading-indicator"></loading-indicator>
      </loading>
    </list>
  </div>
</template>

<style scoped>
  .list {
    padding: 40px;
    width: 100%;
    height: 700px;
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  .row {
    height: 120px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #BBB;
  }
  .loading {
    width: 750px;
    flex-direction: row;
    justify-content: center;
  }
  .loading-indicator {
    width: 160px;
    height: 160px;
    color: green;
    background-color: red;
  }
</style>

<script>
const modal = weex.requireModule('modal')
const LOADMORE_COUNT = 4;

export default {
  props: {
    onLoadMore: {
      type: Function,
      default: (lists, num) => {}
    },
    onMounted: {
      type: Function,
      default: (lists, num) => {}
    }
  },
  data () {
    return {
      lists: [],
      showLoading: 'hide'
    }
  },
  mounted: function () {
    console.log("mounted");
    /*for (var i = 0; i < 10; i++) {
      this.lists.push({
        id: i + 1
      })
    }*/
    this.onMounted(this.lists, 15);
  },
  methods: {
    onloadmore: function (event) {
      console.log('on load more', event);
      modal.toast({ message: '加载中', duration: 1 });
      setTimeout(this.loadHelp, 2000);
      
    },
    onloading: function (event) {

      console.log('loading ...')
      
      modal.toast({ message: '加载中', duration: 1 })
      this.showLoading = 'show'
      setTimeout(this.loadHelp, 2000)
    },
    loadHelp: function () {
      this.onLoadMore(this.lists, LOADMORE_COUNT);
    }
  }
}
</script>