<template>
    <transition 
    :css="false"
    @enter="enter"
    @leave="leave">
        <div class="normalplayer" v-show="this.isFullView">
            <div class="player-wrapper">
                <PlayerHeader></PlayerHeader>
                <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
                <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
            </div>
            <div class="back">
                <img :src="isDetailSong.picUrl" alt="">
                <div class="mask"></div>
            </div>
        </div>
   
    </transition>
</template>

<script>

import PlayerHeader from "./PlayerHeader"
import PlayerMiddle from "./PlayerMiddle"
import PlayerBottom from "./PlayerBottom"
import { mapGetters , mapActions} from 'vuex'
import Velocity from "velocity-animate"
import "velocity-animate/velocity.ui"
export default {
    name:"NormalPlayer",
    props:{
        totalTime:{
            type:Number,
            default:0,
            required:true
        },
        currentTime :{
            type:Number,
            default:0,
            required:true
        }
    },
    components:{
        PlayerHeader,
        PlayerMiddle,
        PlayerBottom
    },
    computed:{
        ...mapGetters(['isFullView',"isDetailSong"])
    },
    methods:{
        ...mapActions(["actLyric"]),
        enter (el, done) {
            Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
                done()
            })
        },
        leave (el, done) {
            Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
                done()
            })
        }
    },
    watch:{
        isDetailSong(newValue){
            this.actLyric(newValue.id)
        }
    }
}
</script>

<style lang="scss" scoped>
    .normalplayer{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0; 
        left: 0;
        right: 0;
        z-index: 888;
        .player-wrapper{
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 999;
        }
        .back{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
            img{
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            .mask{
                width: 100%;
                height: 100%;
                background-color: #fff;
                opacity: 0.3;
            }
        }
    }
    
</style>