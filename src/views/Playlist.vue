<template >
    <div class="playlist">
        <Subheader :title="Title.name"></Subheader>
        <PlaylistTop :path="Title.coverImgUrl" ref="playlisttop"></PlaylistTop>
        <div class="moveIterm">
            <ScrollView ref="scrollview">
                <PlaylistBottom :data="Title.tracks"></PlaylistBottom>
            </ScrollView>
        </div>
    </div>
</template>

<script>
import Subheader from "../components/Subheader"
import PlaylistTop from "../components/PlaylistTop"
import PlaylistBottom from "../components/PlaylistBottom"
import ScrollView from "../components/ScrollView"
import {getPlayList ,getAlbum, getSingerSongs, getDetailRank} from "../api/index"
export default {
    name:"Playlist",
    data(){
        return {
            Title:{}
        }
    },
    components:{
        Subheader,
        PlaylistTop,
        PlaylistBottom,
        ScrollView
    },
    created(){
        if(this.$route.params.type ==="personalized"){
            getPlayList({id:this.$route.params.id})
                    .then((data)=>{
                        this.Title = data.playlist
                    }).catch((err)=>{
                        console.log(err)
                    })
        }else if(this.$route.params.type ==="album"){
            getAlbum({id:this.$route.params.id})
                    .then((data)=>{
                        this.Title={
                            name:data.album.name,
                            coverImgUrl:data.album.picUrl,
                            tracks:data.songs
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
        }else if (this.$route.params.type ==="Singer"){
            getSingerSongs({id:this.$route.params.id})
                    .then((data)=>{
                        this.Title={
                            name:data.artist.name,
                            coverImgUrl:data.artist.picUrl,
                            tracks:data.hotSongs
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
        }else if (this.$route.params.type ==="rank"){
            getDetailRank({idx:this.$route.params.id})
                    .then((data)=>{
                        console.log(data)
                        this.Title={
                            name:data.playlist.name,
                            coverImgUrl:data.playlist.coverImgUrl,
                            tracks:data.playlist.tracks
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
        }
        
    },
    mounted(){
        let defaultHeight = this.$refs.playlisttop.$el.offsetHeight
        this.$refs.scrollview.scrolling((offsetY)=>{
            if(offsetY>0){
                let scale =1+ offsetY/defaultHeight
                this.$refs.playlisttop.$el.style.transform = `scale(${scale})`
                
            }else{
                let blur = Math.abs(offsetY/1000)
                // console.log(blur)
                // this.$refs.playlisttop.$el.style.filter = `blur(${blur}px)`
                this.$refs.playlisttop.changeMask(blur)
            }
        })
    }
    
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
    .playlist{
        @include bg_sub_color();
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        
       .moveIterm{
           position: fixed;
           top: 500px;
           bottom: 0px;
           left: 0;
           right: 0;
       }
    }
</style>