<template>
    <div class="tabbar">
        <router-link to="/recommend" tag="div" class="item">
            <span>推荐</span>
        </router-link>
        <router-link to="/singer" tag="div" class="item">
            <span>歌手</span>
        </router-link>
        <router-link to="/rank" tag="div" class="item">
            <span>排行</span>
        </router-link>
        <router-link to="/search" tag="div" class="item">
            <span>搜索</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name:"Tabbar"
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.tabbar{
    width: 100%;
    height: 84px;
    display: flex;
    justify-content: space-around;
    @include bg_sub_color();
    .item{
        
        @include font_size($font_medium);
        span{
            line-height: 84px;
            @include font_color();
        }
       &.router-link-active{
            span{
                @include font_active_color();
                
            }
            border-bottom: 5px solid;
            @include border_color();
        } 
    }
    
    
}
</style>