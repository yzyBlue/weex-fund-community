<template>
    <div class="tread-item"  @click="onClickContent">
        <div class="owner" style="background-color: ;">
            <image :src="imgUrl + 'userpic.png'" style="width: 50px;height: 50px;"></image>
            <!--<text class="owner-name" style="background-color: ;">{{treadobj.username}}</text>-->
        </div>
        <div class="content" style="background-color: ">
            <!--<text class="tread-text" :class="{'tread-text-dotdotdot': isUseDotdotdot == true}" style="background-color: green" >
                {{treadobj.content}}
            </text>-->
            <div class="text-wrapper">
             <text class="tread-text" :style="dotstyle" style="background-color: ">{{treadobj.content}}</text>
             </div>
    
            <text class="post-time">{{treadobj.time | timeAgo }}</text>
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
    flex: 1;
    /*width: 150px;*/
    padding: 10px;
}

.content {
    /*width: 600px;*/
    flex: 10;
    padding-top: 10px;
}

.owner-name{   
    color: #286090;
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

.post-time{
    text-align: right;
    margin-top: 10px;
    padding-right: 30px;
    font-size: 24px;
    color: grey;
}

</style>

<script>
import apiURL from '../common/api.js'
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
                imgUrl: apiURL.imgUrl
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
            }
        },
        mounted () {
            if (this.isUseDotdotdot) {
                this.dotstyle = this.usedotstyle;
            } else {
                this.dotstyle = this.nodotstyle;
            }
        },
        methods: {
            onClickContent: function () {
                if (!this.isUseClick) {
                    return;
                }

                this.$emit('showcontent', this.treadobj);
               
            }
        }
    }
</script>

