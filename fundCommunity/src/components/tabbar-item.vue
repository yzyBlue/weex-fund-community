<template>
     <a class="tabbar-item" :class="{'selected-item': selecteditem == itemname }"  @click="onClick">
        <slot name="item-img"></slot>
        <span class="tabbar-item-text"><slot></slot></span>
    </a>
</template>

<style scoped>
.tabbar-item {
    flex: auto;
    text-align: center;
    align-items: center;
    margin: 5px auto;
}

.tabbar-item span {
    display: block;
    font-size: 16px;
    color: #949494;
    text-align: center;
    height: 50%;
}

.selected-item .tabbar-item-text {
    color: red;
}

.tabbar-item .tabbar-item-img {
    padding-top: 8px;
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
            },
            selecteditem: {
                type: String,
            }
        },
        methods: {
            onClick: function () {
                this.$router.push(this.itemname);
                this.$parent.$emit('itemchange', this.itemname);
            }
        }
    }
</script>