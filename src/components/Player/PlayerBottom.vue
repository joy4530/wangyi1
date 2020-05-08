<template>
    <div class="playerbottom">
        <div class="bottom-progress" >
            <span ref="eleCurrentTime">00:00</span>
            <div class="progress-ground" @click ="progressClick" ref="progressGround">
                <div class="progress-bar" ref="eleProgressBar" >
                    <div class="progress-dot"></div>
                </div>
            </div>
            <span ref="eleTotalTime">00:00</span>
        </div>
        <div class="bottom-btn">
            <div class="btn1 loop"  @click="change" ref="mode"></div>
            <div class="btn2" @click="preMusic"></div>
            <div class="btn3" @click="play" ref="play"></div>
            <div class="btn4" @click="nextMusic"></div>
            <div class="btn5" @click="favorite" :class="{'active':isFavorite(isDetailSong)}"></div>
        </div>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import model from "../../store/modelType"
import {formartTime} from "../../tools/tools"
export default {
    name:"PlayerBottom",
    props:{
        totalTime:{
            type:Number,
            default:0,
            required:true
        },
        currentTime:{
            type:Number,
            default:0,
            required:true
        }
    },
    methods:{
        ...mapActions(["actPlaying","actModelType","addCurrentIndex","delCurrentIndex","actCurrentTime","actFavoriteSongs"]),
        play(){
            this.actPlaying(!this.isPlaying)
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
        nextMusic(){
            this.addCurrentIndex();
        },
        preMusic(){
            this.delCurrentIndex();
        },
        favorite(){
            this.actFavoriteSongs(this.isDetailSong)
        },
        isFavorite(song){
            let result = this.getFavoriteSongs.find(function(currentValue){
                return currentValue.id === song.id
            })
            return result !== undefined
        },
        //同步进度条点击
        progressClick(e){
            // let normalLeft = e.target.offsetLeft
            let normalLeft = this.$refs.progressGround.offsetLeft
            let eventLeft = e.pageX
            let clickLeft = eventLeft - normalLeft
            // let progressWidth = e.target.offsetWidth
            let progressWidth = this.$refs.progressGround.offsetWidth
            let value = clickLeft / progressWidth 
            this.$refs.eleProgressBar.style.width = value * 100 + "%"
            let curTime = value * this.totalTime
            this.actCurrentTime(curTime)  
            
        }
        
    },
    computed:{
        ...mapGetters(["isPlaying","isModelType","isDetailSong","getFavoriteSongs"])
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
        totalTime(newValue){
            let time = formartTime(newValue)
            this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second
        },
        currentTime(newValue){
            let time = formartTime(newValue)
            this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second
            let progressBar = this.currentTime / this.totalTime * 100
            this.$refs.eleProgressBar.style.width = progressBar + "%"
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
.playerbottom{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    
    .bottom-progress{
        margin: 0 auto;
        width: 80%;
        display: flex;
        line-height: 10px;
        justify-content: space-between;
        @include font_size($font_samll);
        .progress-ground{
            height: 10px;
            width: 80%;
            background-color: #fff;
            
            .progress-bar{
                width: 0;
                height: 10px;
                background-color: #ccc;
                position: relative;
                .progress-dot{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 100%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #ccc;
                }
            }
        }
    }
    .bottom-btn{
        
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: 30px auto;
        div{
            width: 84px;
            height: 84px;
        }
        .btn1{
            
            &.loop{
                @include bg_img("../../assets/images/loop");
            }
            &.one{
                @include bg_img("../../assets/images/one");
            }
            &.random{
                @include bg_img("../../assets/images/shuffle");
            }
        }
        .btn2{
             @include bg_img("../../assets/images/prev");
        }
        .btn3{
             @include bg_img("../../assets/images/play");
             &.active{
                  @include bg_img("../../assets/images/pause");
             }
        }
        .btn4{
             @include bg_img("../../assets/images/next");
        }
        .btn5{
             @include bg_img("../../assets/images/un_favorite");
             &.active{
                 @include bg_img("../../assets/images/favorite");
             }
        }
    }
}
    
</style>