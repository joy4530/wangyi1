<template>
<transition 
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="mini-player" v-show="this.isMiniPlayer">
        <div class="mini-content">
            <div class="item-letf" @click = "openNormalPlayer">
                <div class="circle">
                    <img :src="isDetailSong.picUrl" ref="img">
                </div>
                <div class="content">
                    <h3>{{isDetailSong.name}}</h3>
                    <p>{{isDetailSong.singer}}</p>
                </div>
            </div>
            <div class="item-right">
                <div class="play" @click="play" ref="play"></div>
                <div class="list" @click.stop="open"></div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import {mapActions , mapGetters} from "vuex"
import Velocity from "velocity-animate"
import "velocity-animate/velocity.ui"
export default {
    name:"MiniPlayer",
    methods:{
        open(){
            this.actListPlayer(true)
        },
        ...mapActions(["actChangeView","actMiniPlayer","actPlaying","actListPlayer"]),
        openNormalPlayer(){
            this.actChangeView(true),
            this.actMiniPlayer(false)
        },
        enter (el, done) {
            Velocity(el, 'transition.bounceUpIn', { duration: 500 }, function () {
                done()
            })
        },
        leave (el, done) {
            Velocity(el, 'transition.bounceDownOut', { duration: 500 }, function () {
                done()
            })
        },
        play(){
            this.actPlaying(!this.isPlaying)
        }
    },
    computed:{
        ...mapGetters(["isMiniPlayer","isPlaying","isDetailSong"])
    },
    watch:{
        isPlaying(newValue){
            if(newValue === true){
                this.$refs.play.classList.add("active");
                this.$refs.img.classList.add("active");
            }else{
                this.$refs.play.classList.remove("active");
                this.$refs.img.classList.remove("active");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
    .mini-player{
        width: 100%;
        height: 150px;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index:999;
        .mini-content{
            width: 100%;
            height: 100%;
            display:flex;
            justify-content: space-between;
            @include bg_color();
            .item-letf{
                display: flex;
                align-items: center;
                .circle{
                    height: 84px;
                    width: 84px;
                    border-radius: 50%;
                    position: relative;
                    margin-left: 30px;
                    overflow: hidden;
                    img{
                        width: 84px;
                        height: 84px;
                        position: absolute;
                        left: 0;
                        top: 0;
                        animation: sport 4s linear infinite;
                        animation-play-state: paused;
                            &.active{
                                animation-play-state: running;
                            }
                    }
                }
                .content{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    margin-left: 30px;
                    h3{
                        @include font_size($font_large);
                        @include font_color();
                    }
                    p{
                        @include font_size($font_large);
                        @include font_color();
                    }
                }
            }
        }
        .item-right{
            display: flex;
            align-items: center;
            .list{
                width: 120px;
                height: 120px;
                @include bg_img("../../assets/images/list")
            }
            .play{
                width: 84px;
                height: 84px;
                @include bg_img("../../assets/images/play");
                &.active{
                    @include bg_img("../../assets/images/pause");
                }
            }
        }
    }
    @keyframes sport {
    from {
        transform: rotate(0);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>