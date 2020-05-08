<template>
    <div class="rank">
        <scrollview>
            <div class="main">
            <ul v-for="(value,key) in catlogs.titles" :key="key" >
                <li class="content">{{value}}
                    <ul class="normal-rank" v-if="value=== '官方榜' " >
                        <li v-for="obj in catlogs[key]" :key="obj.name"  @click.stop="changeSwitch(obj.id)">
                            <div class="rank-left">
                                <img v-lazy="obj.rank.coverImgUrl" alt="">
                            </div>
                            <div class="rank-right">
                                <p v-for="(song,index) in obj.rank.tracks" :key="song.first">{{index}}.{{song.first}}.{{song.second}}</p>
                            </div>
                        </li>
                    </ul>
                    <ul class="other-rank" v-else>
                        <li v-for="obj in catlogs[key]" :key="obj.name" @click.stop="changeSwitch(obj.id)">
                            <div class="rank-top">
                                <img v-lazy="obj.rank.coverImgUrl" alt="">
                            </div>
                            <div class="rank-bottom">
                                <div class="limit">
                                <p>{{obj.rank.name}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            </div>
        </scrollview>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import {getTopListDetails} from "../api/index"
import scrollview from "../components/ScrollView"
export default {
    name:"Rank",
    components:{
        scrollview
    },
    data(){
        return{
            catlogs:{}
        }
    },
    methods:{
        changeSwitch(id){
            this.$router.push({path:`rank/detail/${id}/rank`})
        }
    },
    created(){
        getTopListDetails()
        .then((value) => {
            this.catlogs = value
        })
        .catch(function(err){
            console.log(err)
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.rank{
    overflow: hidden;
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    @include bg_sub_color();
    .main{
        
        
        ul{
            .content{
                margin-top: 20px;
                @include  font_size($font_large);
                .normal-rank{
                    li{
                        display: flex;
                        align-items: center;
                        height: 100%;
                        width: 100%;
                    .rank-left{
                        height: 200px;
                        margin: 20px;
                        img{
                            height: 200px;
                            width: 200px;
                            border-radius: 10px;
                        }
                    }
                    .rank-right{
                        p{
                            @include  font_size($font_medium_s);
                            padding: 10px 0;
                        }
                    }
                    }
                }
                .other-rank{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    li{
                        padding: 10px 20px;
                        box-sizing: border-box;
                        .rank-top{
                            
                            img{
                                margin-top: 20px;
                                border-radius: 20px;
                                height: 200px;
                                width: 200px;
                            }
                        }
                    }
                }
                .rank-bottom{
                    width: 200px;
                    p{
                    margin-top: 20px;
                    @include  font_size($font_medium_s);
                    @include no-wrap();
                    }
                }
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