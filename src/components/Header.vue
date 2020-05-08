<template>
    <div class="top" @click="changeTheme">
        <div class="top-left"></div>
        <p>自己的音乐</p>
        <div class="top-right" @click.stop="account"></div>
    </div>
</template>

<script>
export default {
    name:"Header",
    data:function(){
        return{
            themes:['theme','theme1','theme2'],
            index:0
        }
    },
    methods:{
        changeTheme(){
            this.index +=1;
            if(this.index >=this.themes.length){
                this.index = 0;
            }
            document.documentElement.setAttribute("data-theme",this.themes[this.index]);
        },
        account(){
            this.$router.push({path:`/account`})
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.top{
    width: 100%;
    height: 100px;
    // background-color: red;
    @include bg_color();
    display: flex;
    justify-content:space-between;
    .top-left,.top-right{
        height: 84px;
        width: 84px;
        // background-color: #fff;
        margin-top: 8px;
    }
    .top-left{
        @include bg_img('../assets/images/logo') 
    }
    .top-right{
        @include bg_img('../assets/images/account') 
    }
    p{
        text-align: center;
        line-height: 100px;
        // font-size: 30px;
        color: #fff;
        @include font_size($font_medium);
    }
}
</style>