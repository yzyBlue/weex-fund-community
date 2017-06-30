<template>
     <a class="plate-item" @click="onClick">
        <slot name="plate-item-img"></slot>
        <slot name="plate-item-text"></slot>
    </a>
</template>

<style scoped>
.plates-item {
    text-align: center; 
}

</style>

<script>
    export default {
        props: {
            itemname: {
                type: String
            }
        },
        methods: {
            onClick: function () {
                this.$router.push({path: '/'+this.itemname});
                //console.log(this.$router);
            }
        }
    }
</script>