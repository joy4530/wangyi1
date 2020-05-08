<template>
    <div class="palylistbottom">
        <ul>
            <li class="li-top">
                <div class="list-top" @click="getIds">
                    <div></div>
                    <p>播放全部</p>
                </div>
            </li>
            <li v-for="value in data" :key="value.id" class="li-bottom" @click.stop="openView(value.id)">
                <h3>{{value.name}}</h3>
                <p>{{value.ar[0].name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:"PlaylistBottom",
    props:{
        data:{
            type: Array,
            default: () => [],
            required: true
        }
    },
    methods:{
        // openView(){
        //     this.$store.dispatch("actChangeView",true)
        // },
        getIds(){
            this.actChangeView(true)
            let ids = this.data.map((value)=>{
                return value.id
            })
             this.actDetailSongs(ids)
        },
        openView(id){
            this.actChangeView(true),
            this.actDetailSongs([id])
        },
        ...mapActions(["actChangeView","actDetailSongs"])
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
    .palylistbottom{
        width: 100%;
        ul{
            width: 100%;
            .li-top{
                border-top-right-radius: 50px;
                border-top-left-radius: 50px;
                width: 100%;
                height: 100px;
                line-height: 100px;
                border-bottom: 2px solid #ccc;
                @include bg_sub_color();
                .list-top{
                margin-left: 20px;
                width: 100%;
                display: flex;
                align-items: center;
                    div{
                    height: 60px;
                    width: 60px;
                    @include bg_img("../assets/images/small_play");
                    }
                    p{
                    margin-left: 20px;
                    @include font_size($font_large);
                    @include  font_color();
                    }
                }
                
            }
            .li-bottom{
                width: 100%;
                height: 100px;
                padding: 20px;
                box-sizing: border-box;
                border-bottom: 2px solid #ccc;
                @include bg_sub_color();
                h3{
                   @include font_size($font_large);
                   @include font_color();
                }
                p{
                   @include font_size($font_samll);
                   @include font_color();
                }
            }
        }
    }
</style>