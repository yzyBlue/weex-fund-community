<template>
    <div class="tabbar" @itemchange="itemChange">
       <slot></slot>
    </div>
</template>

<style scoped>
.tabbar {
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    height: 120px;
    border-top: 2px solid #e1e1e1;
}
</style>

<script>
    import tabbaritem from './tabbar-item.vue';
    export default {
        methods: {
            itemChange: function (newItem) {
                //console.log('itemchange')
                this.$parent.$emit('selectedchange', newItem);
            }
        }
    }
</script>

