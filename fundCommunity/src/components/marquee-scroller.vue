<template>
  <scroller>
    <!--<panel title="Marquee" type="primary">-->
      <marquee
        :step="marquee.height * 2"
        :count="marquee.list.length"
        :index="marquee.index"
        :interval="marquee.interval"
        :duration="marquee.duration"
        :style="{
          width: 700,
          height: marquee.height * 2,
          backgroundColor: 'rgb(223, 240, 216)',
          borderRadius: 8,
          paddingLeft: 10,
          paddingRight: 10
        }"
        @change="marqueeChange">
        <div
          v-for="(item,i) in marquee.list"
          :key="i"
          :style="{
            height: marquee.height * marquee.length,
            paddingTop: marquee.height * 0.5,
            paddingBottom: marquee.height * 0.5,
            overflow: 'hidden'
          }">
          <text
            :style="{
              height: marquee.height,
              color: 'rgb(60, 118, 61)',
              fontSize: 28
            }">{{item.text}}</text>
        </div>
      </marquee>
    <!--</panel>-->
  </scroller>
</template>

<script>
  import apiURL from '../common/api.js'
  import marquee from './marquee.vue'

  const modal = weex.requireModule('modal')
  var stream = weex.requireModule('stream')
  module.exports = {
    data: function () {
      return {
        marquee: {
          height: 30,
          index: 1,
          duration: 1000,
          interval: 1000,
          list: [
            // {text: 'Introducing Bots on Messenger'},
            // {text: 'Capturing 3D 360-Stereo VR Video'},
            // {text: 'The Future of Video on Facebook'},
            // {text: 'Announcing Vue.js 2.0'},
            // {text: 'Not Your Average Virtual-DOM'},
            // {text: 'Templates, JSX, or Hyperscript?'}
          ]
        }
      }
    },
    components: {
      marquee, apiURL
    },
    mounted () {
      var opt = {
        method: 'GET',
        type: 'json',
        url: apiURL.treadApi.fundtread
      };

      stream.fetch(opt, this.mountedCallback);
    },
    methods: {
       mountedCallback: function (response) {
        if (response.ok) {
          this.marquee.list = [];
          var len = (response.data.length > 3 ? 3 : response.data.length);
          for (var i = 0; i < len; ++i) {
            this.marquee.list.push({
              text: response.data[i].content
            });
          }
          console.log(this.marquee.list)
        } else {
          modal.toast({
            message: 'network error',
            duration: 0.8
          });
        }
      },
      marqueeChange: function (newitem) {
        this.marquee.index = (newitem.index + 1) % (newitem.count);

      }
    }
  }
</script>
