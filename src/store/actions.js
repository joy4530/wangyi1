import { getDetail , getLyric ,getMusicUrl} from "../api/index"

export default {
    actChangeView({commit},flag){
        commit("changeView",flag)
      },
    actMiniPlayer({commit},flag){
      commit("changeMiniPlayer",flag)
    }
    ,actPlaying({commit},flag){
      commit("changePlaying",flag)
    },
    actModelType({commit},flag){
      commit("changeModelType",flag)
    },
    actListPlayer({commit},flag){
      commit("changeLits",flag)
    },
    async actDetailSongs({commit},ids){
      let result = await getDetail({ids:ids.join(",")})
      let musicUrl = await getMusicUrl({id:ids.join(",")})
      let list=[]
      result.songs.forEach(function(value){
        let obj = {}
        // obj.url = musicUrl.data[0].url
        for(let j=0;j<musicUrl.data.length;j++){
          let item =musicUrl.data[j]
          if(value.id === item.id){
            obj.url = item.url
            break
          }
        }
        obj.id = value.id
        obj.name = value.name
        let singer =""
        value["ar"].forEach(function(item,index){
          if(index === 0){
            singer = item.name
          }else{
            singer += "-" + item.name
          }
        })
        obj.singer = singer
        obj.picUrl = value["al"].picUrl
        
        list.push(obj)
      })
      commit("getDetailSongs",list)
    },
    async actLyric({commit},id){
     let result = await getLyric ({id:id})
     let reresult = parseLyric(result.lrc.lyric);
    //  console.log(reresult)
    
      commit("getLyrics" ,reresult)
    },
    delSong({commit},index){
      commit("delSong",index)
    },
    setCurrentIndex({commit},index){
      commit("changeCurrentIndex",index)
    },
    addCurrentIndex({commit}){
      commit("addCurrentIndex")
    },
    delCurrentIndex({commit}){
      commit("delCurrentIndex")
    },
    actCurrentTime({commit},time){
      commit("changeCurrentTime",time)
    },
    actFavoriteSongs({commit},song){
      commit("changeFavoriteSongs",song)
    },
    actFavoriteList({commit},list){
      commit("changFavoriteList",list)
    },
    actHistorySongs({commit},song){
      commit("changHistorySong",song)
    },
    actHistoryList({commit},list){
      commit("changeHistoryList",list)
    }
}


// 格式化歌词方法
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
