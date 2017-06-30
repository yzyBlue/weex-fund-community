<template>
  <div class="wrapper">
    <div class="header">
      <image class='back-img' resize="contain" :src="imgUrl+'back.png'" @click="goToSetting"></image>
      <text class="title">{{curtitle}}</text>
      <div class="placeholder"></div>
    </div>

    <div class="content-noret" v-if="noresult">
      <text class="noret-text">无关注对象</text>
    </div>

    <div class="content" >
      <list class="result-list" @loadmore="" show-scrollbar="false">
        <cell class="cell"  v-for="obj in lists" >
          <searchuseritem class="searchitem" :retobj="obj" :concerneduserslist="concernedusers" @userfocuschange="onUserFocusChange" v-if="showusersearch"></searchuseritem>
          <searchfunditem class="searchitem" :retobj="obj" :concernedfundslist="concernedfunds" @fundfocuschange="onFundFocusChange" v-else></searchfunditem>
        </cell>
        <loading class="loading" @loading="">
              <loading-indicator class="loading-indicator"></loading-indicator>
        </loading>
       </list> 
    </div>
   
  </div>
</template>

<style scoped>
  .wrapper {
    
    background-color: #f8f8f8;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .header {
    padding-left: 15px;
    padding-right: 15px;

    background-color: #3a3a3a;
    flex-direction: row;
    padding: 20px;
    border-bottom-width: 10px;
    border-bottom-style: solid;
    border-bottom-color: rgb(245, 245, 249);
    align-items: center;
  }

  .back-img {
    width: 50px;
    height: 50px;
    flex: 1
  }

  .title {
    flex: 14;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: white;
  }

  .placeholder {
    flex: 1;
  }

  .content-noret {
    padding: 30px;
    flex: 1;
    align-items: center;
    flex-direction: row;
  }

  .noret-text {
    flex: 1;
    text-align: center;
    color: #707070;
    font-size: 36px;
  }
  
 .content {
    width: 750px;
    flex: 1;
  }

  .result-list {
    flex: 1;
    width: 760px;
  }

  .cell {
    padding: 30px;
    padding-top: 10px;
    /*padding-bottom: 10px;*/
    width: 750px;
    border-bottom-width: 5px;
    border-bottom-style: solid;
    border-bottom-color: #f5f5f9;
    background-color: white;
  }
  

</style>

<script>

import apiURL from '../common/api.js'
import searchuseritem from '../components/searchuser-item.vue'
import searchfunditem from '../components/searchfund-item.vue'

const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream')


  export default {
   data () {
      return {
        imgUrl: apiURL.imgUrl,
        name: this.$store.state.username == "" ? "暂未设置昵称" : this.$store.state.username,
        searchIndex: 0,
        curtitle: "关注的用户",
        lists: [],
        concernedusers: [],
        noresult: false
      }
    },
    computed: {
      showusersearch: function () {
        return this.searchIndex === 0;
      }
    },
    components: {
      apiURL, searchuseritem, searchfunditem
    },
    mounted () {
      if (this.$route.params.isuser) {
        this.searchIndex = 0;
        this.curtitle = "关注的用户";
      } else {
        this.searchIndex = 1;
        this.curtitle = "关注的基金";
      }
      this.mountedHelp();
    },
    methods: {
      goToSetting: function () {
        this.$router.push({path: '/setting'});
      },
      mountedHelp: function () {
         var opt = {
            methord: 'GET',
            type: 'json',
            url: "",
          };
          if (this.searchIndex === 0) {
            // opt.url = apiURL.userApi.users+'?username='+ event.value + '&flag=1';
            console.log('mountedhelp')
            opt.url = apiURL.userApi.concernedusers + '?userid=' + this.$store.state.userid;
            console.log(opt.url)
            stream.fetch(opt, this.searchUserCallback);
          } else {
            opt.url = apiURL.fundApi.concernedfunds + '?userid='+ this.$store.state.userid;
            console.log(opt.url)
            stream.fetch(opt, this.searchFundCallback);
          }
      },
      searchUserCallback: function (response) {
          if (response.ok) {
            console.log('searchUserCallback')
            this.lists = [];
            this.concernedusers = [];
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].userid !== this.$store.state.userid) {
                this.concernedusers.push(response.data[i].userid.toString());
                this.lists.push(response.data[i]);
              }
            }
            console.log(this.concernedusers);
            if (this.lists.length === 0) {
              this.noresult = true;
            } else {
              this.noresult = false;
            }
          } else {
            console.log('查询失败');
            modal.toast({
              message: 'network error',
              duration: 0.8
            });
          }
        },
        searchFundCallback: function (response) {
          if (response.ok) {
            this.lists = response.data;
            console.log(this.lists)
            this.concernedfunds = [];
            for (var i = 0; i < response.data.length; i++) {
              this.concernedfunds.push(response.data[i].code.toString());
            }
            if (this.lists.length === 0) {
              this.noresult = true;
            } else {
              this.noresult = false;
            }
          } else {
            console.log('查询失败');
            modal.toast({
              message: 'network error',
              duration: 0.8
            });
          }
        },
        onUserFocusChange: function (curuserid, optflag) {
          if (optflag) { // 关注
            this.concernedusers.push(curuserid.toString());
            console.log(this.concernedusers)
          } else { // 取消关注
            var index = this.concernedusers.indexOf(curuserid.toString());
            if (index === -1) {
              console.log('异常');
              return;
            }

            this.concernedusers[index] = this.concernedusers[-1];
            this.concernedusers.pop(); 
            console.log(this.concernedusers)
          }
        },
        onFundFocusChange: function (curfundcode, optflag) {
          if (optflag) { // 关注
            this.concernedfunds.push(curfundcode.toString());
            console.log(this.concernedfunds)
          } else { // 取消关注
            var index = this.concernedfunds.indexOf(curfundcode.toString());
            if (index === -1) {
              console.log('异常');
              return;
            }

            this.concernedfunds[index] = this.concernedfunds[-1];
            this.concernedfunds.pop(); 
            console.log(this.concernedfunds)
          }
          
        }
    }
  }
</script>
