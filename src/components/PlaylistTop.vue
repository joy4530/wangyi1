<template>
    <div class="topimg">
        <img :src="path" alt="">
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
    name:"PlaylistTop",
    props:{
        path:{
            type: String,
            default: '',
            required: true
        }
    },
    methods:{
        changeMask(data){
            this.$refs.mask.style.opacity = data
        }
    }
}
</script>

<style lang="scss" scoped>
    .topimg{
        width: 100%;
        height: 500px;
        // overflow: hidden;
        position: relative;
        img{
            width: 100%;
        }
        .mask{
            width: 100%;
            height:100%;
            position:absolute;
            background-color: black;
            top: 100px;
            left: 0;
            opacity: 0;
        }
    }
</style>