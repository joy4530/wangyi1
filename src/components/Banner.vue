<template>
    <div >
    <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
        <!-- slides -->
        <swiper-slide v-for="value in banners" :key="value.Id" class="item">
            <a :href="value.url">
                <img :src="value.pic">
            </a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        
    </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name:"Banner",
    props:{
        banners:{
            type: Array,
            default: function(){},
            required: true,
        }
    },
    data () {
        return {
            swiperOption: {
                loop: true, // 循环模式选项
                autoplay: {
                delay: 1000, // 自动切换的时间间隔，单位ms
                stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
                disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
                },
                // 如果需要分页器
                pagination: {
                el: '.swiper-pagination'
                },
                observer: true,
                observeParents: true,
                observeSlideChildren: true
            }
        }
    },
    components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
.banner{
    
    .item{
        img{
            width: 100%;
            height: 300px;
        }
    }
}
</style>

<style lang="scss">
@import "../assets/css/mixin.scss";
    .swiper-pagination-bullet{
        width: 15px;
        height: 15px;
        background-color: #fff;
        opacity: 1;
    }
    .swiper-pagination-bullet-active{
         @include bg_color();
    }
</style>