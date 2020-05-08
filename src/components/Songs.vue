<template>
    <div>
        <div  class="songs">
            <div class="songs-top">
                <p>最新歌曲</p>
            </div>
            <MultiplexList :songs="songs"></MultiplexList>
        </div>
    </div>
</template>

<script>
import MultiplexList from "./multiplex/MultiplexList"
export default {
    name:"Songs",
    props:{
        songs:{
            type: Array,
            default: function(){},
            required: true
        }
    },
    components:{
        MultiplexList
    }
    
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.songs{
    @include bg_sub_color();
        width: 100%;
        .songs-top{
            width: 100%;
            height: 84px;
            @include bg_sub_color();
            @include font_size($font_large);
            
            font-weight: bold;
            line-height: 84px;
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;
            p{
                
                margin-left: 20px;
            }
        }
        
}
</style>