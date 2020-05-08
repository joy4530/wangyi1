export default {
    isFullView(state){
        return state.isFullView
      },
    isMiniPlayer(state){
        return state.isMiniPlayer
    },
    isPlaying(state){
        return state.isPlaying
    },
    isModelType(state){
        return state.isModelType
    },
    isListPlayer(state){
        return state.isListPlayer
    },
    isDetailSongs(state){
        return state.isDetailSongs
    },
    isDetailSong(state){
        let obj ={
            name:"",
            singer:"",
            picUrl:null,
            ids:""
        }
        if(state.isDetailSongs.length !== 0){
            obj = state.isDetailSongs[state.currentIndex]
        }
        return obj
    },
    currentLyric(state){
        return state.currentLyric
    },
    currentIndex(state){
        return state.currentIndex
    },
    getCurrentTime(state){
        return state.currentTime
    },
    getFavoriteSongs(state){
        return state.favoriteSongs
    },
    getHistoryList(state){
        return state.historyList
    }
}