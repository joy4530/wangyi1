<template>
    <div>
        <ul class="songs-list">
                <li v-for="value in songs" :key="value.id" class="item" @click="openNormalPlayer(value.id)">
                    <img v-lazy="value.picUrl" alt="">
                    <!-- <img :src="value.song.album.picUrl" alt=""> -->
                    <div>
                    <h3>{{value.name}}</h3>
                    <p>{{value.singer}}</p>
                    </div>
                </li>
            </ul>
    </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
    name:"MultiplexList",
    props:{
        songs:{
            type: Array,
            default: function(){},
            required: true
        }
    },
    methods:{
        ...mapActions(["actChangeView","actDetailSongs"]),
        openNormalPlayer(id){
            this.actChangeView(true),
            this.actDetailSongs([id])
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
.songs-list{
            width:100%;
            list-style: none;
            overflow: hidden;
            .item{
                width:100%;
                align-items: center;
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                border-bottom: 1px solid #ccc;
                img{
                    width: 150px;
                    height: 150px;
                    margin-left: 20px;
                }
                div{
                    
                    width: 70%;
                    h3{
                        @include font_size($font_medium);
                        @include font_color();
                        @include no-wrap();
                        margin-bottom: 10px;
                    }
                    p{
                        @include font_size($font_samll);
                        @include font_color();
                        @include no-wrap();
                    }
                }
                
            }
        }
</style>