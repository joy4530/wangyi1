<template>
    <div class="accountTips">
        <div class="tiptop" @click="playAll">
            <div class="left"></div>
            <p>播放全部</p>
        </div>
        <div class="tipBottom">
            <ScrollView>
                <MultiplexList :songs="switchNum === 0 ?  getFavoriteSongs:getHistoryList"></MultiplexList>
            </ScrollView>
        </div>
    </div>
</template>

<script>
import ScrollView from "../ScrollView"
import MultiplexList from "../multiplex/MultiplexList"
import {mapGetters , mapActions , mapMutations} from "vuex"
export default {
    name:"AccountTips",
    props:{
        switchNum:{
            type: Number,
            default:0,
            required: true
        }
    },
    components:{
        ScrollView,
        MultiplexList
    },
    computed:{
        ...mapGetters(["getHistoryList","getFavoriteSongs"])
    },
    methods:{
        ...mapMutations(["getDetailSongs"]),
        ...mapActions(["actChangeView","actDetailSongs","setCurrentIndex"]),
        playAll(){
           this.actChangeView(true)
            if(this.switchNum === 0){
                //播放喜欢的
                
                this.getDetailSongs(this.getFavoriteSongs)
            }else{
                //播放历史
                
                this.getDetailSongs(this.getHistoryList)
                // ids = this.getHistoryList.map((value)=>{
                //      return value.id
                // })
            }
            // this.actDetailSongs(ids)
             this.setCurrentIndex(0)
        }
    }
}
</script>


<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
.accountTips{
    position: fixed;
    top: 100px;
    bottom:0; 
    left: 0;
    right: 0;
    @include bg_sub_color();
    .tiptop{
        display: flex;
        text-align: center;
        margin: 20px auto;
        align-items: center;
        width: 250px;
        height: 60px;
        border: 1px solid black;
        border-radius: 30px;
        .left{
            width: 48px;
            height: 48px;
            margin: 0  10px;
            @include bg_img("../../assets/images/small_play")
        }
        p{
            margin-left: 20px;
            @include font_size($font_medium)
        }
    }
    .tipBottom{
        position: fixed;
        top: 200px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        margin-top: 10px;
    }
}
</style>