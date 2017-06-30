<template>
    <div class="tread-item"   v-if="showflag">
        <div class="owner">
            <image :src="imgUrl + 'userpic.png'" style="width: 68px;height: 68px;"></image>
            <!--<text class="owner-name" style="background-color: ;">{{treadobj.username}}</text>-->
        </div>
        <div class="content">
            <!--<text class="tread-text" :class="{'tread-text-dotdotdot': isUseDotdotdot == true}" style="background-color: green" >
                {{treadobj.content}}
            </text>-->
            <text class="owner-name">{{treadobj.username}}</text>
            <div class="text-wrapper" @click="onClickContent">
             <text class="tread-text" :style="dotstyle">{{treadobj.content}}</text>
            </div>
            <div class="footer">
                <text class="post-time">{{treadobj.time | timeAgo }}</text>
                <text class="delete-tread" @click="onDeleteTread" v-if="mytreadflag">删除</text>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tread-item {
   flex-direction: row;
   padding-left: 10px;
   padding-right: 10px;
   /*width: 750px;*/
}

.owner {
    flex: 2;
    /*width: 150px;*/
    padding: 10px;
    align-items: center;
}

.content {
    /*width: 600px;*/
    flex: 10;
    padding-top: 10px;
    
}

.owner-name{   
    color: #c45894;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    font-size: 40px;
    padding-left: 20px;
    margin-bottom: 20px;
    /*align-items: center;*/
    /*超出范围自动换行*/
    /*word-break:normal; 
    width: auto; 
    white-space: pre-wrap;
    word-wrap: break-word ;*/
    /*overflow: hidden ;*/
}

.text-wrapper {
    background-color: #b3e5fc;
    margin-right: 30px;
    padding: 20px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    
}

.tread-text{
    /*margin-top: 20px;*/
    text-align: left;
    font-size: 36px;
    /*padding: 20px;*/
    /*padding-left: 20px;*/
    letter-spacing: 3px;
    /*line-height:30px;;*/
    color: #696a52;
    
}

.tread-text-dotdotdot {
    /* 多行省略号的实现 */
    /*display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    overflow: hidden;
    -webkit-box-orient: vertical;*/
    text-overflow: ellipsis;
    white-space: nowrap;
}

.footer {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 20px;
}

.post-time{
    text-align: right;
    padding-right: 30px;
    font-size: 24px;
    color: #999;
}

.delete-tread {
    padding-right: 30px;
    color: #999;
}

.delete-tread:active {
    color: #696a52;
}

</style>

<script>
import apiURL from '../common/api.js'

const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream')


    export default {
        data () {
            return {
                dotstyle: this.usedotstyle,
                usedotstyle: {
                    'text-overflow': 'ellipsis',
                    // 'white-space': 'nowrap',
                    lines: '5'
                },
                nodotstyle: {},
                imgUrl: apiURL.imgUrl,
                // mytreadflag: false,
                postobj: {
                    'userid': "3",
                    'time': "2017-06-12T12:12:12"
                }
            }
        },
        props: {
            treadobj: {
                type: Object,
                required: true
            },
            isUseDotdotdot: {
                type: Boolean,
                default: true
            },
            isUseClick: {
                type: Boolean,
                default: true
            },
            showflag: {
                type: Boolean,
                default: true
            },
            ownflag: {
                type: Boolean,
                default: true
            },
            indexnum: {
                type: Number,
                default: -1
            }
        },
        mounted () {
            if (this.isUseDotdotdot) {
                this.dotstyle = this.usedotstyle;
            } else {
                this.dotstyle = this.nodotstyle;
            }

            // 判断是否是自己的动态
            // if (this.ownflag && this.$store.state.username === this.treadobj.username) {
            //     this.mytreadflag = true;
            // } else {
            //     this.mytreadflag = false;
            // }

        },
        computed: {
            // 判断是否是自己动态
            mytreadflag: function() {
                return this.ownflag && this.$store.state.username === this.treadobj.username;
            }
        },
        methods: {
            onClickContent: function () {
                if (!this.isUseClick) {
                    return;
                }

                this.$emit('showcontent', this.treadobj);
               
            },
            onDeleteTread: function (event) {
                var putdata = {
                    "userid": this.$store.state.userid.toString(),
                    "time": this.treadobj.time
                }

                var data1 = JSON.stringify(putdata);
                this.test = data1;
                console.log(data1);
               
                stream.fetch({
                   method: 'POST',
                    type: 'json',
                    url: apiURL.treadApi.usertread+'?optid=1',
                    headers: {'Content-Type': 'application/json'},
                    body: data1
                }, this.deleteTreadCallback)
            },
            deleteTreadCallback: function (response) {
                console.log(response)
                this.test = response;
                // this.$emit('deleterefresh', this.key);
                if (response.ok) {
                    this.$emit('deleterefresh', this.key);
                } else {
                    modal.toast({
                        message: 'network error',
                        duration: 0.8
                    });
                }
            }
        }
    }
</script>

