<template>
    <div class="search">
        <div class="input">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
            <input type="text" placeholder="搜索歌曲，歌手，专辑" v-model="keywords" v-throttle="search">
        </div>
        <div class="input-suggest" v-show="keywords !== '' ">
            <ScrollView>
            <ul>
                <li class="suggest-li" v-for="value in content" :key="value.id" @click.stop="selectMusic(value.id)">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
                    <p>{{value.name}}-{{value.artists[0].name}}</p>
                </li>
            </ul>
            </ScrollView>
        </div>
        <div class="searchHot">
            <ul>
                <li v-for="value in hotsearch" :key="value.first" @click.stop="hotsClick(value.first)">{{value.first}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex"
import ScrollView from "../components/ScrollView"
import {getSearch ,getSearchHot} from "../api/index"
export default {
    name:"Search",
    components:{
        ScrollView
    },
    data(){
        return{
            keywords:"",
            content:[],
            hotsearch:[]
        }
    },
    methods:{
        ...mapActions(["actChangeView","actDetailSongs"]),
        search(){
            getSearch({'keywords':this.keywords})
            .then((data) => {
                this.content = data.result.songs
            })
            .catch(function(err){
                console.log(err)
            })
        },
        selectMusic(id){
            this.actChangeView(true)
            this.actDetailSongs([id])
        },
        hotsClick(name){
            this.keywords = name,
            this.search()
        }
    },
    created(){
        getSearchHot()
        .then((data) => {
            this.hotsearch = data.result.hots
        })
        .catch(function(err){
            console.log(err)
        })
    },
    directives: {
        throttle: {
            // 指令的定义
            inserted: function (el,obj) {
                let timerId = null;
                let flag = true;
                el.addEventListener('input',function(){
                    if(!flag)return;
                    flag=false;
                    timerId && clearTimeout(timerId)
                    timerId = setTimeout(function(){
                        flag = true
                        obj.value()
                    },1000);
                }) 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.search{
    position: fixed;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    
    @include bg_sub_color();
    .input{
        margin: 0 auto;
        height: 40px;
        width: 80%;
        border-radius: 30px;
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 20px;
        img{
            width: 50px;
            height: 50px;
        }
        input{
            margin-left: 20px;;
            height: 100%;
            width: 100%;
            outline:none;
            border: none;
            background:transparent;
            @include  font_size($font_medium_s);
        }
    }
    .input-suggest{
        overflow: hidden;
        position: fixed;
        top: 300px;
        bottom: 0;
        left: 0;
        right: 0;
        @include bg_sub_color();
        ul{
            .suggest-li{
                display: flex;
                align-items: center;
                border-bottom: 1px solid #ccc;
                img{
                    padding: 20px 30px 20px 70px;
                    height: 40px;
                    width: 40px;
                }
                p{
                   @include  font_size($font_medium);  
                }
            }
        }
    }
    .searchHot{
        width: 100%;
        ul{
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
            li{
                height: 50px;
                line-height: 50px;
                border: 1px solid #ccc;
                border-radius: 20px;
                margin: 10px 20px;
                padding: 5px 10px;
                @include  font_size($font_large);
            }
        }
    }
}
</style>