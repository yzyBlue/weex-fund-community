<template>
    <div class="item-content">
        <div class="content-left">
            <image class="img" :src="imgUrl + 'userpic.png'"></image>
        </div>
        <div class="content-mid">
            <text class="name">{{retobj.username}}</text>
            <!--<text>{{obj.nickname}}</text>-->
            <text class="intro" >该用户太懒。。。</text>
        </div>
        <div class="content-right" v-if="!isOwn(retobj.userid)">
             <text class="focus" @click="onClickFocus">{{focustext}}</text>
        </div>
    </div>
  
</template>


<style scoped>
  .item-content {
    /*flex: 1;*/
    flex-direction: row;
    align-items: center;
    /*justify-content: space-around;*/
  }

  .content-left {
    /*width: 50px;*/
    /*padding: 20px;*/
    margin-left: 20px;
    margin-right: 20px;
  }

  .img {
    width: 50px;
    height: 50px;
  }

  .content-mid {
    flex: 6;
    flex-direction: column;
  }

  .name {
    color: #c45894;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    font-size: 40px;
    padding: 20px;
    padding-bottom: 0px;
  }

  .intro {
    /*background-color: #b3e5fc;*/
    padding: 20px;
    padding-top: 0px;
    padding-bottom: 0px;
    text-overflow: ellipsis;
    lines: 1;
    /*line-height: 36px;*/
    /*letter-spacing: 70px;*/
  }

  .content-right {
    flex: 1.5;
    padding: 10px;
    /*background-color: yellow;*/
    margin-left: 20px;
    border-style: solid;
    border-color: aqua;
    border-width: 1px;
    background-color: aqua; 
  }
  .cancel-focus-btn,
  .focus-btn {
    font-size: 24px;
    text-align: center;
  }

  .focus {
        font-size: 24px;
        text-align: center;
    }
</style>

<script>
import apiURL from '../common/api.js'

const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream')

  export default {
    props: {
      retobj: {
        type: Object,
        required: true
      },
      concerneduserslist: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        imgUrl: apiURL.imgUrl,
      };
    }, 
    computed: {
      focusflag: function () {
         return this.concerneduserslist.indexOf(this.retobj.userid.toString()) != -1;
      },
      focustext: function () {
        return this.focusflag ? "取消关注" : "关注";
      }
    },
    mounted() {
        // this.focusflag = (this.concerneduserslist.indexOf(this.retobj.userid.toString()) != -1);
        // if (this.focusflag) {
        //     this.focustext = "取消关注";
        // } else  {
        //     this.focustext = "关注"
        // }
        // console.log(this.retobj)
    },
    components: {
      apiURL
    },
    methods: {
      isOwn: function (curuserid) {
          return this.$store.state.userid === curuserid;
      },
      onUserFocusChange: function () {
        this.$emit('puserfocuschange', )
      },
      onClickFocus: function () {
            console.log('click', this.focusflag)
            if (this.focusflag === true) {
                this.oncancel();
            } else {
                this.onfocus();
            }
        },
        onfocus: function () {
            var postobj  = {
                userid: this.$store.state.userid.toString(),
                concerned_userid: this.retobj.userid.toString()
            }
            stream.fetch({
                method: 'POST',
                type: 'json',
                headers: {'Content-Type': 'application/json'},
                url: apiURL.userApi.concernedusers+'?optid=0',
                body: JSON.stringify(postobj)
            }, this.focusCallback);
            // this.focusCallback({ok: true});
        },
        oncancel: function () {
            var postobj  = {
                userid: this.$store.state.userid.toString(),
                concerned_userid: this.retobj.userid.toString()
            }
            stream.fetch({
                method: 'POST',
                type: 'json',
                headers: {'Content-Type': 'application/json'},
                url: apiURL.userApi.concernedusers+'?optid=1',
                body: JSON.stringify(postobj)
            }, this.cancelCallback);
            // this.cancelCallback({ok: true});
        },
        focusCallback: function (response) {
          if (response.ok) {
            console.log('关注成功');
            // this.focusflag = true;
            // this.focustext = "取消关注";
            this.$emit('userfocuschange', this.retobj.userid, true);
          } else {
            console.log('关注失败');
            modal.toast({
              message: 'network error',
              duration: 0.8
            });
          }
        },
        cancelCallback: function (response) {
          if (response.ok) {
            console.log('取消关注成功');
            // this.focusflag = false;
            // this.focustext = "关注";
            this.$emit('userfocuschange', this.retobj.userid, false);
          } else {
            console.log('取消关注失败');
            modal.toast({
              message: 'network error',
              duration: 0.8
            });
          }
        }
      
    }
  }
</script>
