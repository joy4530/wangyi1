<template>
   <div class="player">
       <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
       <MiniPlayer></MiniPlayer>
       <MiniList ref="miniList"></MiniList>
       <audio :src="isDetailSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>

   </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import NormalPlayer from "../components/Player/NormalPlayer"
import MiniPlayer from "../components/Player/MIniPlayer"
import MiniList from "../components/Player/MiniList"
import model from "../store/modelType"
import {getRandomIntInclusive ,setStroge ,getStroge} from "../tools/tools"
export default {
    name:"Player",
    components:{
        NormalPlayer,
        MiniPlayer,
        MiniList
    },
    computed:{
        ...mapGetters(["isDetailSong","isPlaying","currentIndex","getCurrentTime","isModelType","isDetailSongs","getFavoriteSongs","getHistoryList"])
    },
    watch:{
        isPlaying(newValue){
            if(newValue){
                this.$refs.audio.play()
                
            }else{
                this.$refs.audio.pause()
            }
            this.actHistorySongs(this.isDetailSong)
        },
        currentIndex(){
            this.$refs.audio.oncanplay = () =>{
                this.totalTime = this.$refs.audio.duration
                if(this.isPlaying){
                    this.actHistorySongs(this.isDetailSong)
                    this.$refs.audio.play()
                }else{
                    this.$refs.audio.pause()
                }
            }
        },
        getCurrentTime(newValue){
            this.$refs.audio.currentTime = newValue
        },
        getFavoriteSongs(newValue){
            // window.localStorage.setItem("storageFavoriteSongs",JSON.stringify(newValue))
            setStroge("storageFavoriteSongs",newValue)
        },
        getHistoryList(newValue){
            // window.localStorage.setItem("storageHistoryList",JSON.stringify(newValue))
            setStroge("storageHistoryList",newValue)
        }
    },
    created () {
        // let favoriteSongs = JSON.parse(window.localStorage.getItem("storageFavoriteSongs"))
        let favoriteSongs = JSON.parse(getStroge("storageFavoriteSongs"))
        if(favoriteSongs === null ){ return }
        this.actFavoriteList(favoriteSongs)

        // let historyList = JSON.parse(window.localStorage.getItem("storageHistoryList"))
        let historyList = JSON.parse(getStroge("storageHistoryList"))
        if(historyList === null){return}
        this.actHistoryList(historyList)
    },
    data(){
        return{
            totalTime:0,
            currentTime:0
        }
    },
    methods:{
        ...mapActions(["setCurrentIndex","actFavoriteList","actHistorySongs","actHistoryList"]),
        timeupdate(e){
           this.currentTime = e.target.currentTime

        },
        end(){
            if(this.isModelType === model.loop){
                this.setCurrentIndex(this.currentIndex +1)
            }else if (this.isModelType === model.one) {
                this.$refs.audio.play()
            }else if (this.isModelType === model.random){
                this.setCurrentIndex(getRandomIntInclusive(0,this.isDetailSongs.length -1))
            }
        }
       
    },
    mounted(){
        this.$refs.audio.oncanplay = () =>{
            this.totalTime = this.$refs.audio.duration
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>