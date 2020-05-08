/* eslint-disable vue/require-v-for-key */
<template>
<div class="main" ref="divheight">
    <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide class="item-cd">
            <div class="cd-top">
                <img :src="isDetailSong.picUrl" ref="img">
            </div>
            <p >{{currentLyric[0]}}</p>
        </swiper-slide>
        <swiper-slide class="scroll">
            <ScrollView class="scrollview" ref="scrollviewRef">
                <ul >
                    <li v-for="(val, key) in currentLyric" :key="key" :class="{'active':curTime===key}">{{val}}</li>
                </ul>
            </ScrollView>
        </swiper-slide>
      
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        
    </swiper>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from "../../components/ScrollView"
import {mapGetters} from "vuex"
export default {
    name:"PlayerMiddle",
    props:{
        currentTime :{
            type:Number,
            default:0,
            required:true
        }
    },
    data () {
        return {
            swiperOption: {
                // 如果需要分页器
                pagination: {
                el: '.swiper-pagination'
                },
                observer: true,
                observeParents: true,
                observeSlideChildren: true
            },
            curTime:"0"
        }
    },
    components:{
        swiper, 
        swiperSlide,
        ScrollView
    },
    computed:{
        ...mapGetters(["isPlaying","isDetailSong","currentLyric"])
    },
    methods:{
        preTime(lineNum){
            if(lineNum < 0 ){
                return this.curTime
            }
            let exist = this.currentLyric[lineNum + ""]
            if(exist===undefined||exist===""){
                lineNum--
                return this.preTime(lineNum)
            }else{
                return lineNum + ''
            }
        }
    },
    watch:{
        isPlaying(newValue){
            if(newValue === true){
                this.$refs.img.classList.add("active");
            }else{
                this.$refs.img.classList.remove("active");
            }
        },
        currentLyric(newValue){
            for(let key in newValue){
                this.curTime = key
                return
            }
        },
        //同步歌词
        currentTime(newValue){
            let lineNum = Math.floor(newValue) + ""
            let preTime = this.preTime(lineNum)
            this.curTime =preTime
            let topLyric = document.querySelector("li.active").offsetTop
            let divHeight = this.$refs.divheight.offsetHeight/2
            if(topLyric > divHeight){
                this.$refs.scrollviewRef.scrollTo(0,divHeight - topLyric,200)
            }else{
                this.$refs.scrollviewRef.scrollTo(0,0,200)
            }
            // let exist = this.currentLyric[lineNum]
            // if(exist !== undefined && exist !==""){
            //     this.curTime = lineNum
            //     let topLyric = document.querySelector("li.active").offsetTop
            //     let divHeight = this.$refs.divheight.offsetHeight/2
            //     if(topLyric > divHeight){
            //         this.$refs.scrollviewRef.scrollTo(0,divHeight - topLyric,200)
            //     }
            // }
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
.main{
    height: 800px;
.item-cd{
    width: 100%;
    height: 800px;
    text-align: center;
    margin-bottom: 300px;
    p{
        @include font_size($font_large);
    }
    .cd-top{
    display: block;
    margin: 0 auto;
    margin-top: 100px;
    width: 500px;
    height: 500px;
    border: 30px solid #fff;
    border-radius: 50%;
    overflow: hidden;
        img{
            height: 500px;
            width: 500px;
            animation: sport 4s linear infinite;
            animation-play-state: paused;
            &.active{
                animation-play-state: running;
            }
        }
    }
    p{
        margin-top: 50px;
    }   
}
.scroll{
    overflow: hidden;
    height: 800px;
    margin: 100px auto;
    ul{
    li{
        height: 100%;
        text-align: center;
        margin: 10px 0;
        @include font_size($font_medium);
        &.active{
            color:#fff;
        }
        &:last-of-type{
            padding-bottom: 50%;
        }
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