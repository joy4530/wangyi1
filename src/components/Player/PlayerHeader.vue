<template>
    <div class="top">
        <div class="top-left" @click = "closeNormalPlayer"></div>
        <div class="top-center">
            <h3>{{isDetailSong.name}}</h3>
            <p>{{isDetailSong.singer}}</p>
        </div>
        <div class="top-right"></div>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
export default {
    name:"PlayerHeader",
    methods:{
        ...mapActions(["actChangeView","actMiniPlayer"]),
        closeNormalPlayer(){
            this.actChangeView(false),
            this.actMiniPlayer(true)
        }
    },
    computed:{
        ...mapGetters(["isDetailSong"])
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
    display: flex;
    justify-content:space-between;
    .top-left,.top-right{
        height: 84px;
        width: 84px;
        // background-color: #fff;
        margin-top: 8px;
    }
    .top-left{
        @include bg_img('../../assets/images/back') 
    }
    .top-center{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        @include font_color();
        h3{
            @include font_size($font_large);
        }
        p{
            @include font_size($font_samll);
        }
    }
}
</style>