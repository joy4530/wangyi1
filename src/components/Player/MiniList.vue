<template>
<transition 
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="minilist" v-show="isListPlayer">
        <div class="list-top">
            <div class="top-left" >
                <div class="mod loop" @click.stop="change" ref="mode"></div>
                <p v-if = "this.isModelType === 0">顺序播放</p>
                <p v-else-if = "this.isModelType === 1">单曲循环</p>
                <p v-else>随机播放</p>
        </div>
            <div class="top-right" @click.stop="delAll"></div>
        </div>
        
        <div class="list-middle">
            <ScrollView ref="scrollview">
            <ul class="middle" ref="play" >
                <li v-for="(value,index) in isDetailSongs" :key="value.id">
                    <div class="middle-left" @click.stop="selectMusic(index)">
                        <div class="play" @click.stop="play" v-show="currentIndex == index" ></div>
                        <p>{{value.name}}</p>
                    </div>
                    <div class="middle-right">
                        <div class="favorite" @click.stop="addFavoriteSong(value)" :class="{'active':isFavoriteSong(value)}"></div>
                        <div class="close" @click.stop="del(index)"></div>
                    </div>
                </li>
            </ul>
            </ScrollView>
        </div>
        
        <div class="list-bottom">
            <p @click.stop="close">关闭</p>
        </div>
    </div>
</transition>
</template>

<script>
import Velocity from "velocity-animate"
import "velocity-animate/velocity.ui"
import {mapGetters,mapActions} from "vuex"
import model from "../../store/modelType"
import ScrollView from "../../components/ScrollView"
export default {
    name:"MiniList",
    components:{
        ScrollView
    },
    methods:{
        ...mapActions(["actPlaying","actModelType","actListPlayer","delSong","setCurrentIndex","actFavoriteSongs"]),
        play(){
            this.actPlaying(!this.isPlaying)
        },
        close(){
            this.actListPlayer(false)
        },
        enter (el, done) {
            Velocity(el, 'transition.slideRightIn', { duration: 500 }, function () {
                done()
            })
        },
        leave (el, done) {
            Velocity(el, 'transition.slideRightOut', { duration: 500 }, function () {
                done()
            })
        },
        change(){
            if(this.isModelType === model.loop){
                this.actModelType(model.one)
            }else if(this.isModelType === model.one){
                this.actModelType(model.random)
            }else if(this.isModelType === model.random){
                this.actModelType(model.loop)
            }
        },
        del(index){
            this.delSong(index)
        },
        delAll(){
            this.delSong()
        },
        selectMusic(index){
            this.setCurrentIndex(index)
        },
        addFavoriteSong(value){
            this.actFavoriteSongs(value)
        },
        isFavoriteSong(song){
            let result = this.getFavoriteSongs.find(function(currentValue){
                return song.id === currentValue.id
            })
            return result !== undefined
        }
    },
   
    computed:{
        ...mapGetters(["isPlaying","isModelType","isListPlayer","isDetailSongs","currentIndex","getFavoriteSongs","isDetailSong"])
    },
    watch:{
        isPlaying(newValue){
            if(newValue === true){
                this.$refs.play.classList.add("active")
               
            }else{
                this.$refs.play.classList.remove("active")
            }
        },
        isModelType(newValue){
            if(newValue === model.loop){
                this.$refs.mode.classList.remove("random")
                this.$refs.mode.classList.add("loop")
            }else if (newValue === model.one){
                this.$refs.mode.classList.remove("loop")
                this.$refs.mode.classList.add("one")
            }else if (newValue === model.random){
                this.$refs.mode.classList.remove("one")
                this.$refs.mode.classList.add("random")
            }
        },
        isListPlayer(newValue){
            if(newValue){
                this.$refs.scrollview.refresh()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";
.minilist{
    @include bg_sub_color();
    height: 700px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index:999;
    .list-top{
        height: 84px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top-left{
            height: 100%;
            display: flex;
            align-items: center;
            .mod{
                height: 56px;
                width: 56px;
                margin: 0 20px;
                &.loop{
                    @include bg_img("../../assets/images/small_loop");
                }
                &.one{
                    @include bg_img("../../assets/images/small_one");
                }
                &.random{
                    @include bg_img("../../assets/images/small_shuffle");
                }
            }
            p{
                @include font_size($font_samll);
                @include font_color();
            }
        }
        .top-right{
            height: 56px;
            width: 56px;
            @include bg_img("../../assets/images/small_del");
        }
    }
    .list-middle{
        height: 100%;
        overflow: hidden;
        .middle{
            &.active {
                li{
                .middle-left {
                     .play  {
                            @include bg_img("../../assets/images/small_pause");
                        }
                 }
                 }
            }
            li{
                line-height: 84px;
                display: flex;
            justify-content: space-between;
            align-items: center;
        .middle-left{
            display: flex;
            align-items: center;
            .play{
                margin: 0 20px;
                width: 56px;
                height: 56px;
                @include bg_img("../../assets/images/small_play");
                
            }
            p{
                @include font_size($font_medium);
                @include no-wrap()
            }
        }
        .middle-right{
            display: flex;
            align-items: center;
            .favorite{
                width: 56px;
                height: 56px;
                @include bg_img("../../assets/images/small_un_favorite");
                &.active{
                    @include bg_img("../../assets/images/small_favorite");
                }
            }
            .close{
                margin: 0 10px;
                width: 48px;
                height: 48px;
                @include bg_img("../../assets/images/small_close");
            }
        }
        }
        }
    }
    .list-bottom{
        position: fixed;
        bottom: 0px;
        height: 84px;
        width: 100%;
        line-height: 84px;
        text-align: center;
        @include bg_color();
        p{
            @include font_size($font_large);
            color: #fff;
        }
    }
}
</style>