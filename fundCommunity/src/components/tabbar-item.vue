<template>
     <div class="tabbar-item"  @click="onClick">
          <div><slot></slot></div>
        <div class="tabbar-item-img" ><slot name="item-img"></slot></div>
        <div class="tabbar-item-text"><slot name="item-text"></slot></div>
    </div>
</template>

<style scoped>
.tabbar-item {
    flex: 1;
    padding:0px 50px;
    align-items: center;
    justify-content: center;
}

.tabbar-item-img {
    align-items: center;
}
.tabbar-item-text {
    
}
.selected-item .tabbar-item-text {
    color: red;
}

.tabbar-item .tabbar-item-img {
    padding-top: 10px;
}


</style>

<script>
    export default {
        data () {
            return {

            }
        },
        props: {
            itemname: {
                type: String
            }
        },
        methods: {
            onClick: function () {
                this.$router.push(this.itemname);
                this.$emit('itemchange', this.itemname);
            }
        }
    }
</script>