<template>
  <div class="wrapper">
    <div class="header">
      <image class="back-image" :src="imgUrl+'back.png'" @click="onClickBack"></image>
      <div class="header-select" @click="onSelect">
        <text class="select-bar">{{selectType}}</text>
        <image class="select-image" :src="imgUrl+selectImg"></image>
      </div>
      <input type="text" placeholder="search" autofocus="true" class="searchinput" :value="inputvalue" @input="onInput" @change="onChangeSearch" maxlength="100" ref="inputsearch" :style="{flex: inputflex}"></input>
      <!--:style="{flex: inputflex, 'margin-right': marginshow}" -->
      <image class="erase-image" :src="imgUrl+'delete.png'" @click="onClickErase" v-if="inputflag"></image>
      
    </div>

    <div class="content-noret" v-if="noresult">
      <text class="noret-text">当前内容为空</text>
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
    background-color: #eaeaea;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .header {
    /*flex-direction: row;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 10px;
    padding-bottom: 10px;
    border-bottom-width: 10px;
    border-bottom-style: solid;
    border-bottom-color: rgb(245, 245, 249);
    align-items: center;
    background-color: white;*/

     background-color: #3a3a3a;
    flex-direction: row;
    /*background-color: red;*/
    padding: 20px;
    border-bottom-width: 10px;
    border-bottom-style: solid;
    border-bottom-color: rgb(245, 245, 249);
    align-items: center;
    
  }
  
  .back-image {
    width: 50px;
    height: 50px;
    flex: 1;
  }

  .header-select {
    flex: 3.5;
    flex-direction: row;
    /*border-right-width: 10px;
    border-right-style: solid;*/
    /*border-right-color: rgb(245, 245, 249);*/
    /*border-right-color: #ddd;*/
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
    height: 50px;
  }
  .select-bar {
    flex: 2.5;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding-right: 0px;
    /*background-color: white;*/
    color: white;
    
  }

  .select-image {
    flex:1;
    width: 25px;
    height: 25px;
  }

  .searchinput {
    padding-left: 20px;
    font-size: 36px;
    height: 70px;
    /*margin-right: 10px;*/
    background-color: white;
    /*border-width: 5px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;*/
  }

  .erase-image {
    /*flex: 1;*/
    margin-left: -1px;
    width: 50px;
    height: 70px;
    background-color: white;
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

  .result-list:first-child {
    border-top-width: 0px;
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

  .userretitem {
    flex: 1;
  }


  
</style>

<script>
import apiURL from '../common/api.js'
import searchuseritem from '../components/searchuser-item.vue'
import searchfunditem from '../components/searchfund-item.vue'

const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream')

  export default {
    data() {
      return {
        imgUrl: apiURL.imgUrl,
        selectType: "用户",
        selectImg: "less.png",
        searchIndex: 0,
        inputflex: '9',
        inputvalue: '',
        inputflag: false,
        lists: [],
        concernedusers: [],
        concernedfunds: [],
        noresult: false
      };
    }, 
    computed: {
      showusersearch: function () {
        return this.searchIndex === 0;
      }
    },
    components: {
      apiURL, searchuseritem, searchfunditem
    },
    methods: {
         onSelect: function () {
            console.log('test');
            this.selectImg = "more_unfold.png"

            var picker = weex.requireModule('picker');
            var items = new Array("用户","基金");
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
                        }

                        self.selectImg = "less.png"
                        self.$refs['inputsearch'].focus();
            });
            // self.selectImg = "less.png"
        }, 
        onInput: function (event) {
          console.log('onInput');
          this.inputvalue = event.value
          if (event.value === "") {
            // this.eraseimgstyle = {};
            this.inputflag=false;
            this.inputflex = 9;
          } else {
            // this.eraseimgstyle = this.eraseshowstyle;  
            this.inputflag = true;
            this.inputflex = 8;      
          }
        },
        onClickBack: function () {
          this.eraseimgstyle = {};
          this.inputflex = 9;
          this.$refs['inputsearch'].blur()
          setTimeout(this.clickBackHelp, 500);
        },
        clickBackHelp: function () {
          this.$router.push({path: '/appentry/tread'});
        },
        onClickErase: function (event) {
          
          // this.$refs['inputsearch'].value = ""
          this.inputvalue = "";
          this.$refs['inputsearch'].focus()
          this.noresult = false;
        },
        onChangeSearch: function (event) {
          if (event.value == "") {
            modal.toast({
              message: '内容不能为空',
              duration: 0.8
            });
            this.$refs['inputsearch'].focus()
            return;
          }
          var opt = {
            methord: 'GET',
            type: 'json',
            url: "",
          };
          if (this.searchIndex === 0) {
            // opt.url = apiURL.userApi.users+'?username='+ event.value + '&flag=1';
            opt.url = apiURL.userApi.users + '?currentUserName=' + this.$store.state.username + '&searchedName='+ event.value;
            stream.fetch(opt, this.searchUserCallback);
          } else {
            opt.url = apiURL.fundApi.funds + '?currentUserName='+ this.$store.state.username +'&fundName=' + event.value;
            console.log(opt.url)
            stream.fetch(opt, this.searchFundCallback);
          }
        },
        searchUserCallback: function (response) {
          if (response.ok) {
            this.lists = response.data.slice(0,-1);
            this.concernedusers = response.data.slice(-1)[0].username.split(',');
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
            this.lists = response.data.slice(0,-1);
            this.concernedfunds = response.data.slice(-1)[0].name.split(',');
            console.log(response.data.length)
            console.log(this.lists.length)
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
