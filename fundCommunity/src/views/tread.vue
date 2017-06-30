<template>
  <div class="wrapper">
    <div class='header'>
      <div class="holder"></div>
      <text class="title">全部动态</text>
      <!--<a class="postimg" @click="goToPost"></a>-->
      <!--<image class="postimg" :src="imgUrl+'apply.png'" @click="goToPost"></image>-->
      <image class="searchimg" :src="imgUrl+'icon-search.png'" @click="goToSearch"></image>
    </div>


    <div class="tread-tabs">
      <!--<text class="tread-tab-item1" :class="{'selected': selecteditem == 0}" @click="changeItem(0)">基金动态</text>
      <text class="tread-tab-item2" :class="{'selected': selecteditem == 1}" @click="changeItem(1)">用户动态</text>-->
      <text class="tread-tab-item1" :style="treadtab1style" @click="changeItem(0)">用户动态</text>
      <text class="tread-tab-item2" :style="treadtab2style" @click="changeItem(1)">基金动态</text>
    </div>

    <div class="content" >
      <!-- 改scroller为list，解决使用refresh上方空白问题-->
      <list class="tread-scroller" @loadmore="onLoadmore" show-scrollbar="false" append="tree" ref="listroot">
            <refresh class="refreshing" :display="refresh_display" @refresh="onrefresh" @pullingdown="">
              <loading-indicator class="refresh-indicator"></loading-indicator>
              <text class="text-indicator" v-if="refresh_display == 'hide'">下拉刷新</text>
              <text class="text-indicator" v-else>刷新中...</text>
            </refresh>
            <cell class='cell' v-for="(obj, index) in lists" :ref="'item'+index">
                <div class="tread-scroller-item">
                      <usertreaditem class="itemself" @deleterefresh="onDeleteRefresh" :indexnum="index" :treadobj="obj" @showcontent="onShowContent(obj)"  v-if="userflag"></usertreaditem>
                      <fundtreaditem class="itemself" :treadobj="obj" @showcontent="onShowContent(obj)" v-else></fundtreaditem>

                </div>
            </cell>
            <loading class="loading" @loading="onLoading" :display="loading_display">
              <loading-indicator class="loading-indicator"></loading-indicator>
            </loading>
       </list>
       
    </div>

    <image class="postimg" :src="imgUrl+'apply.png'" @click="goToPost"></image>

    
    <div class="tread-content"  @click="onHideContent" v-if="detailflag">  
    </div>
    <div class="tread-content-real"  v-if="detailflag">
      <usertreaditem  class="tread-content-item"  :treadobj="curObj" :isUseDotdotdot="false" :isUseClick="false" :showflag="detailflag" v-if="userflag" :ownflag="false"></usertreaditem>
      <fundtreaditem  class="tread-content-item"  :treadobj="curObj" :isUseDotdotdot="false" :isUseClick="false" :showflag="detailflag" v-else></fundtreaditem>
    </div>

    <!--<appentry curselect="Tread"></appentry>-->
   
  </div>
</template>

<style scoped>

  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 150px;
    /*background-color: white;*/
    /*background-color: #eaeaea;*/
    background-color: #f5f5f5;
  }

  .header {
    background-color: #3a3a3a;
    flex-direction: row;
    /*background-color: red;*/
    padding: 20px;
    border-bottom-width: 10px;
    border-bottom-style: solid;
    border-bottom-color: rgb(245, 245, 249);
    align-items: center;
    /*justify-content: space-between;*/
  }

  .holder {
    width: 50px;
    flex: 1;
  }

  .title {
    flex:14;
    text-align: center;
    font-size: 36px;
    color: white;
    font-weight: bold;
  }

  .searchimg {
    flex: 1;
    height: 50px;
    width: 50px;
  }

  .postimg {
    /*flex: 1;*/
    height: 70px;
    width: 70px;
    position: fixed;
    right: 20px;
    bottom: 170px;
    /*background-color: white;*/
  }

  

  .tread-tabs {
    flex-direction: row;
    margin-top: 10px;
    background-color: white;
    align-items: center;
  }
  .tread-tab-item1,
  .tread-tab-item2 {
    flex: 1;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    font-size: 36px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .tread-tab-item1 {
    border-right-width: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    /*border-radius: 4px 0 0 4px;*/
  }
  .tread-tab-item2 {
    border-width: 1px;
    /*border-radius: 0 4px 4px 0;*/
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  
  .selected {
    color: #fff;
    background-color: #565656
  }

  .content {
    width: 750px;
    /*margin-top: 10px;*/
    /*background-color: white;*/
    flex: 1;
  }

  .tread-scroller {
    width: 760px;
    /*height: 900px;*/
    flex: 1;
    /*padding-top: 0;*/
    /*padding-bottom: 0;*/
    /*background-color: green;*/
  }

  .refreshing {
    height: 120px;
    width: 750px;
    align-items: center;
    /*flex: 1;*/
    /*background-color: yellow;*/
  }

  .text-indicator {
    font-size: 30px;
    color: #45b5f0;
    text-align: center; 
    color:rgb(238, 162, 54);
  }

  .refresh-indicator,
  .loading-indicator {
    height: 60;
    width: 60;
    color: #889967;
  }

  .cell {
    padding: 30px;
    padding-top: 10px;
  }

  .tread-scroller-item {
    background-color: #f0f0e3;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-top: 30px;
    box-shadow: 0px 1px 2px #ccc;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .itemself {
    /*margin-bottom: 15px;*/
    /*padding-bottom: 10px;*/
    /*border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: grey;*/
    /*border-top-width: 1px;
    border-top-style: solid;
    border-top-color: grey;*/
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  }

  .loading {
    height: 80px;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: #c0c0c0;
  }


  .tread-content {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    opacity: 0.5;
    background-color: rgb(0, 0, 0);
  }

  .tread-content-real {
    width: 750px;
    position: fixed; 
    top: 300px;  
    left: 0;
    right: 0;
  }

  .tread-content-item{
    background-color: #fff;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .tread-content-hide {
    /*display: none;*/
  }

</style>

<script scoped>
import showlist from '../components/showlist.vue'
import usertreaditem from '../components/usertread-item.vue'
import fundtreaditem from '../components/fundtread-item.vue'
import apiURL from '../common/api.js'

const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream');

  export default {
   data () {
      return {
        imgUrl: apiURL.imgUrl,
        selectImg: "arrow_down.png",
        selecteditem: 0,
        listfundtread: [],
        listusertread: [],
        listfundshow: [],
        listusershow: [],
        lists: [],
        loading_display: 'hide',
        refresh_display: 'hide',
        curObj: {'username':'fdfs','content':'fdsfds', 'time':'2017-07-16T11:11:11'},
        // style相关
        selectedstyle: {
          'color': '#fff',
          'background-color': '#565656'
        },
        treadtab1style: {},
        treadtab2style: {},
        detailflag: false,
        defaultshowlen: 5,
        loadmorelen: 4,
        userflag: false,
        test: "123"

      }
    },
    mounted () {
      this.treadtab1style = this.selectedstyle;
      this.detailflag = false;
      this.userflag = true;

      // if (this.$store.state.userid < 0) {
      //   console.log('error');
      //   return;
      // }

      // 获取用户动态
      console.log(apiURL.treadApi.usertread+'?userid='+this.$store.state.userid+'&optid=1');
      this.userrefresh();

      // 获取基金动态
      console.log(apiURL.treadApi.fundtread+'?userid='+this.$store.state.userid);
      this.fundrefresh();

      
      
    },
    components: {
      showlist, usertreaditem, apiURL, fundtreaditem
    },
    methods: {
      goToSearch: function (event) {
        this.$router.push({path: '/search'});
      },
      changeItem: function (selected) {
        this.selecteditem = selected;
        if (selected == 0) {
          this.lists = this.listusershow;
          this.userflag = true;
          this.treadtab1style = this.selectedstyle;
          this.treadtab2style = {};
        } else {
          this.lists = this.listfundshow;
          this.userflag = false;
          this.treadtab2style = this.selectedstyle;
          this.treadtab1style = {};
        }
      },
      onrefresh: function(e) {
        var self = this;
        self.refresh_display = 'show';
        setTimeout(self.refreshhelp, 2000)
      },
      refreshhelp: function () {
        if (this.selecteditem === 0) {
          this.userrefresh()
        } else {
          this.fundrefresh();
        }
        this.refresh_display = 'hide';
      },
      pullingdown: function(e){
        var dy = e.dy;
        var pullingDistance = e.pullingDistance;
        var viewHeight = e.viewHeight;
      },
      fundrefresh: function ()  {
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: apiURL.treadApi.fundtread//+'?userid='+ this.$store.state.userid
          // url: apiURL.treadApi.usertread+'?userid=3&optid=1'
        }, this.mountedFundCallback)
      },
      userrefresh: function ()  {
          stream.fetch({
            method: 'GET',
            type: 'json',
            url: apiURL.treadApi.usertread+'?userid='+ this.$store.state.userid +'&optid=1'
            // url: apiURL.treadApi.usertread+'?userid=3&optid=1'
          }, this.mountedUserCallback)
      },
      onLoading: function (event) {
        console.log('onLoading');
        var self = this;
        self.loading_display = 'show';
        if (self.selecteditem === 0) {
        //   setTimeout(function () {
        //    self.loading_display = 'hide';
        //  }, 3000);
          setTimeout(function () {
            self.loadingtread(self.listusertread, self.listusershow);
            self.lists = self.listusershow;
            self.loading_display = 'hide';
          }, 500);
        } else {
          setTimeout(function () {
            
            self.loadingtread(self.listfundtread, self.listfundshow);
            self.lists = self.listfundshow;
            self.loading_display = 'hide';
          }, 500);
          
        }
              
        // var self = this;
        // self.loading_display = 'show';
        // setTimeout(function () {
        //   self.loading_display = 'hide';
        // }, 3000)
      },
      onLoadmore: function (event) {

      },
      // 加载更多动态
      loadingtread: function(listall, listshow) {
        if (listshow.length === listall.length) {
          console.log('no more tread');
          modal.toast({
            message: '内容到底了',
            duration: 0.8
          });
          return;
        }
        var newlen = listshow.length  + this.loadmorelen;
        var finallen = newlen > listall.length? listall.length: newlen;
        for (var i = listshow.length; i < finallen; i++) {
          listshow.push(listall[i]);
        }
      },
      onShowContent: function (curObj) {
        console.log('show');
        this.curObj = curObj;     

        this.detailflag = true;
      },
      onHideContent: function () {
        console.log('hide');
        this.detailflag = false;
        this.curObj = {'username':'','content':'', 'time':''}
      },
      mountedFundCallback: function(response) {
        console.log('moutedfundcallback')
        if (response.ok) {
          // 
          this.listfundtread = response.data;
          var curlen = this.listfundtread.length;
          var showlen = curlen < this.defalutshowlen ? curlen : this.defaultshowlen;
          this.listfundshow = this.listfundtread.slice(0, showlen);
          if (this.selecteditem === 1) {
              this.lists = this.listfundshow;
          }
        } else {
          /*modal.toast({
                message: 'network error',
                duration: 0.8
          })*/
          console.log('network error');
        }
      },
      mountedUserCallback: function(response) {
        console.log('mountedusercallback')
        if (response.ok) {
          // 
          this.listusertread = response.data;
          var curlen = this.listusertread.length;
          var showlen = curlen < this.defaultshowlen ? curlen : this.defaultshowlen;
          this.listusershow = this.listusertread.slice(0, showlen);
          if (this.selecteditem === 0) {
              this.lists = this.listusershow;
          }
          
        } else {
          /*modal.toast({
                message: 'network error',
                duration: 0.8
          })*/
          console.log('network error');
        }
      },
      goToPost: function () {
        this.$router.push({path: '/posttread'});
      },
       onSelect: function () {
          console.log('test');
          this.selectImg = "arrow_up.png"

          var picker = weex.requireModule('picker');
          var items = new Array("关注的人","动态");
          var self = this;
          picker.pick({
                'items':items,
                 'index':self.searchIndex
                },function (ret) {
                    var result = ret.result;
                    if(result == 'success')
                    {
                        self.selectType = items[ret.data];
                        self.searchIndex = ret.data;
                        self.selectImg = "arrow_down.png"
                    }
        });
      },
      onDeleteRefresh: function(objindex) {
        this.listusershow.splice(objindex,1);
        this.listusertread.splice(objindex,1);
        
        modal.toast({
          message: "删除成功",
          duration: 0.8
        });
      }

    }
  }
</script>
