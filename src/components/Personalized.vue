<template>
    <div>
        <div  class="personalized">
            <div class="personalized-top">
                <p>{{title}}</p>
            </div>
            <div class="personalized-list">
                <div v-for="value in personalized" :key="value.id" class="item" @click="getId(value.id)">
                    <img v-lazy="value.picUrl" alt="">
                    <!-- <img :src="value.picUrl" alt=""> -->
                    <p>{{value.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Personalized",
    methods:{
        getId(id){
            this.$emit("selected",id,this.type)
        }
    },
    props:{
        personalized:{
            type: Array,
            default: function(){},
            required: true
        },
        title:{
            type: String,
            default: '',
            required: true
        },
        type:{
            type: String,
            default: '',
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
    .personalized{
        @include bg_sub_color();
        width: 100%;
        .personalized-top{
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
    .personalized-list{
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .item{
            width: 200px;
            margin-bottom: 20px;
             img{
                    width: 200px;
                    height: 200px;
                    border-radius: 20px;
                }
            p{
                @include font_size($font_samll);
                @include font_color();
                @include clamp(2);
            }
        }
       
    } 
    }
</style>