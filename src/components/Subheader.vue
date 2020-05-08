<template>
    <div class="top" @click="changeTheme">
        <div class="top-left" @click.stop="getBack"></div>
        <p>{{title}}</p>
        <div class="top-right"></div>
    </div>
</template>

<script>
export default {
    name:"Header",
    props:{
        title:{
            type: String,
            default: '',
            required: true
        }
    },
    data:function(){
        return{
            themes:['theme','theme1','theme2'],
            index:0
        }
    },
    methods:{
        getBack(){
          window.history.back();  
        },
        changeTheme(){
            this.index +=1;
            if(this.index >=this.themes.length){
                this.index = 0;
            }
            document.documentElement.setAttribute("data-theme",this.themes[this.index]);
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
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
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
        @include bg_img('../assets/images/back') 
    }
    .top-right{
        @include bg_img('../assets/images/more') 
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