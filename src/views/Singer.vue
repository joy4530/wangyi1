<template>
    <div class="singer">
        <ScrollView ref="scrollview">
        <ul class="group-one">
            <li class="group-li" v-for="(value,index) in list" :key="index" ref="group">
                <div class="divP">
                    <p>{{keys[index]}}</p>
                </div>
                <ul class="ul-two">
                    <li class="li-two" v-for="obj in list[index]" :key = "obj.id" @click="switchSinger(obj.id)">
                        <img v-lazy="obj.img1v1Url" alt="">
                        <p>{{obj.name}}</p>
                    </li>
                </ul>
            </li>   
        </ul>
        </ScrollView>
        <ul class="left" >
            <li class="left-content" :class="{'active' : currentIndex === index}" v-for="(key,index) in keys" :key="index" 
            :data-index="index"
            @touchstart.stop.prevent="touchstart"
            @touchmove.stop.prevent="touchmove"
            >
                {{key}}
            </li>
        </ul>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { getAllSInger } from "../api/index"
import ScrollView from "../components/ScrollView"
export default {
    name:"Singer",
    components:{
        ScrollView
    },
    methods:{
        _moveTo(index){
            this.currentIndex=index
            let offsetH = this.groupTops[index]
            this.$refs.scrollview.scrollTo(0,-offsetH)
        },
        touchstart(e){
           this._moveTo(parseInt(e.target.dataset.index))
           this.touchstartValue =  e.touches[0].pageY
           
        },
        touchmove(e){
            let moveTouch = e.touches[0].pageY
            this.touchmoveValue = moveTouch
            let value = (this.touchmoveValue - this.touchstartValue) / e.target.offsetHeight
            let Index  = parseInt(e.target.dataset.index) + Math.floor(value)
            this._moveTo(Index)
        },
        switchSinger(id){
            this.$router.push({path:`recommend/detail/${id}/Singer`})
        }
    },
    created() {
        getAllSInger()
        .then((result) => {
            this.keys = result.keys
            this.list = result.list
        })
        .catch(function(){
            // console.log(err)
        })
    },
    mounted(){
        this.$refs.scrollview.scrolling((y)=>{
            this.moveY = y
            //头部区域处理
            if(y>=0){
                this.currentIndex = 0
                return
            }
            //中间区域处理
            for(let i = 0 ;i<this.groupTops.length-1  ; i ++){
                if(-y>this.groupTops[i] && -y<this.groupTops[i+1]){
                    this.currentIndex = i 
                    return
                }
            }
            //底部区域处理
            this.currentIndex = this.groupTops.length -1
        })
        
    },
    data(){
        return{
            keys:[],
            list:[],
            groupTops:[],
            currentIndex:0,
            touchstartValue:0,
            touchmoveValue:0,
            moveY:0
        }
    },
    watch:{
        list(){
            this.$nextTick(()=>{
                this.$refs.group.forEach((item)=>{
                    this.groupTops.push(item.offsetTop)
                })
            })
        }
        
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.singer{
    position: fixed;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    @include bg_sub_color();
    .group-one{
        width: 100%;
        .group-li{
            width: 100%;
            height: 100%;
            .divP{
                height: 100%;
                width: 100%;
                border-bottom: 1px solid #ccc;
                @include  bg_color();
                p{
                font-size: 40px;
                @include font_color()
                }
            }
            .ul-two{
                height: 100%;
                width: 100%;
                .li-two{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    img{
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        overflow: hidden;
                        margin: 20px;
                    }
                    p{
                        @include font_size($font_large);
                        @include font_color()
                    }
                }
            }
        }
    }
    .left{
        position: fixed;
        right: 10px;
        top: 55%;
        transform: translateY(-50%);
        .left-content{
            @include font_size($font_large);
            @include font_color() ;
            &.active{
                text-shadow: 0 0 10px black;
            }
           
        }
    }
    
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>