<template>
    <div class="top" @click="changeTheme">
        <div class="top-left"></div>
        <ul class="top-center">
            <li :class="{'active' : value === 0}" @click.stop="switchLeft(0)">我喜欢的</li>
            <li :class="{'active' : value === 1}" @click.stop="switchRight(1)">我播放的</li>
        </ul>
        <div class="top-right"></div>
    </div>
</template>

<script>
export default {
    name:"AccountHeader",
    data:function(){
        return{
            themes:['theme','theme1','theme2'],
            index:0,
            value:0
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
        switchLeft(value){
            this.value = value
            this.$emit("changeSwitch",value)
        },
        switchRight(value){
            this.value = value
            this.$emit("changeSwitch",value)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
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
        @include bg_img('../../assets/images/logo') 
    }
    .top-right{
        @include bg_img('../../assets/images/more') 
    }
    .top-center{
        display:flex;
        height: 60px;
        align-items: center;
        text-align: center;
        line-height: 60px;
        margin-top: 20px;
        border: 1px solid white;
        border-radius: 10px;
        // font-size: 30px;
        color: #fff;
        @include font_size($font_medium);
        li{
            padding: 0 10px;
            &:nth-child(1){
                height: 60px;
                border-right: 1px solid white;
            }
            &.active{
                background-color:rgba(255,255,255,0.3);
            }
        }
    }
    
}
</style>