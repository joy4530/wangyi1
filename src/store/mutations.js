export default {
    changeView(state,flag){
        state.isFullView = flag
        state.isMiniPlayer=false
        state.isListPlayer=false
      },
    changeMiniPlayer(state,flag){
      state.isMiniPlayer = flag
      this.isFullView=false
      this.isListPlayer = false
      
    },
    changePlaying(state,flag){
      state.isPlaying = flag
      
    },
    changeModelType(state,flag){
      state.isModelType=flag
    },
    changeLits(state,flag){
      state.isListPlayer = flag
    },
    getDetailSongs(state , flag){
      state.isDetailSongs = flag
    },
    getLyrics(state , flag){
      state.currentLyric = flag
    },
    delSong(state,index){
      if(index !==undefined){
        state.isDetailSongs.splice(index,1)
      }else{
        state.isDetailSongs=[]
      }
      if(state.currentIndex > index){
        state.currentIndex -=1
      }
      if(state.isDetailSongs==0){
        state.isFullView=false
        state.isMiniPlayer=false
        state.isListPlayer=false
      }
    },
    changeCurrentIndex(state,index){
      state.currentIndex = index
    },
    addCurrentIndex(state){
      if(state.currentIndex < state.isDetailSongs.length-1){
        state.currentIndex +=1
      }else{
        state.currentIndex = 0
      }
    },
    delCurrentIndex(state){
      if(state.currentIndex > 0){
        state.currentIndex -= 1
      }else{
        state.currentIndex = state.isDetailSongs.length -1
      }
    },
    changeCurrentTime(state,time){
      state.currentTime = time
    },
    changeFavoriteSongs(state,song){
      let result = state.favoriteSongs.find(function(currentValue){
        return currentValue.id === song.id
      })
      if(result === undefined){
        state.favoriteSongs.push(song)
      }
    },
    changFavoriteList(state,list){
      state.favoriteSongs = list
    },
    changHistorySong(state,song){
      let result = state.historyList.find(function(currentValue){
        return currentValue.id === song.id
      })
      if(result === undefined){
        if(state.historyList.length >30){
          state.historyList.splice(0,1)
        }
        state.historyList.push(song)
      }
    },
    changeHistoryList(state,list){
      state.historyList = list
    }
}