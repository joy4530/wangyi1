<template>
    <div class="recommend">
        <ScrollView>
            <div>
            <Banner :banners="banners"></Banner>
            <Personalized :personalized="personalized" :title="'新歌推荐'" @selected="fatherChange" :type="'personalized'"></Personalized>
            <Personalized :personalized="newAlbum" :title="'最新专辑'" @selected="fatherChange" :type="'album'"></Personalized>
            <Songs :songs="songs"></Songs>
            </div> 
        </ScrollView>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import {getBanner , getPersonalized , getNewAlbum ,getNewSongs} from "../api/index"
import Banner from "../components/Banner"
import Personalized from "../components/Personalized"
import Songs from '../components/Songs'
import ScrollView from "../components/ScrollView"
export default {
    name:"Recommend",
    data(){
        return{
            banners:[],
            personalized:[],
            newAlbum:[],
            songs:[]
        }
    },
    methods:{
        fatherChange(id,type){
            this.$router.push({path:`recommend/detail/${id}/${type}`})
        }
    },
    created(){
        getBanner()
        .then((data)=>{
            this.banners=data.banners
        }).catch((err)=>{
            console.log(err)
        }),
        getPersonalized()
        .then((data)=>{
            this.personalized =data.result
        }).catch((err)=>{
            console.log(err)
        }),
        getNewAlbum()
        .then((data)=>{
            this.newAlbum=data.albums.splice(0,6)
        }).catch((err)=>{
            console.log(err)
        }),
        getNewSongs()
        .then((data)=>{
            let list = []
            data.result.forEach((value) => {
                let obj = {}
                obj.name = value.name
                obj.id = value.id
                obj.picUrl = value.picUrl
                let singer = ""
                for(let i = 0;i<value.song.artists.length;i++){
                    singer += "-" + value.song.artists[i].name 
                    
                }
                obj.singer = singer
                list.push(obj)
            });
            this.songs = list
        }).catch((err)=>{
            console.log(err)
        })
    },  
    components:{
        Banner,
        Personalized,
        Songs,
        ScrollView
    }
}
</script>

<style lang="scss" scoped>
.recommend{
    position: fixed;
    top:184px;
    left:0;
    right:0;
    bottom:0;
    overflow: hidden;
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