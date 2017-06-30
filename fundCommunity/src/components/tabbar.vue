<template>
    <div class="tabbar">
       <slot></slot>
    </div>
</template>

<style scoped>
.tabbar {
    flex-direction: row;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    /*width: 700px;*/
    overflow: hidden;
    height: 150px;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #f5f5f9;
    /*border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;*/
}
</style>

<script>
  
    export default {
        methods: {
           
        }
    }
</script>

