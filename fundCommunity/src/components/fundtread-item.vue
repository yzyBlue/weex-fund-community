<template>
    <div class="tread-item"  @click="onClickContent" v-if="showflag">
        <div class="owner">
            <image :src="imgUrl + 'fundpic.png'" style="width: 68px;height: 68px;"></image>
        </div>
        <div class="content">
            <text class="owner-name">{{treadobj.name | emptyCheck}}</text>
            <div class="text-wrapper">
             <text class="tread-text" :style="dotstyle">{{treadobj.content}}</text>
             </div>
        <div class="footer">
            <text class="post-time">{{treadobj.time | timeAgo }}</text>
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
    justify-content: flex-end;
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
            },
            showflag: {
                type: Boolean,
                default: true
            }, 
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

