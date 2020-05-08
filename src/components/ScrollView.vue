<template>
    
    <div id="wrapper" ref="wrapper">
        <slot></slot>
    </div>
    
</template>

<script>
import IScroll from "iscroll/build/iscroll-probe"

export default {
    name:"ScrollView",
    mounted(){
        this.myScroll = new IScroll(this.$refs.wrapper,{
            mouseWheel: true,
            scrollbars: false,
            // click: true,
            probeType: 3,
        // 解决拖拽卡顿问题
            scrollX: false,
            scrollY: true,
            disablePointer: true,
            disableTouch: false,
            disableMouse: true
        })
        let observer = new MutationObserver(() => {
            // console.log(mutationList)
            // console.log(observer)
            this.myScroll.refresh();
        })
        let config = {
        childList: true, // 观察目标子节点的变化，添加或者删除
        subtree: true, // 默认为 false，设置为 true 可以观察后代节点
        attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
        }
         observer.observe(this.$refs.wrapper, config)
    },
    methods:{
        scrolling(fn){
            this.myScroll.on("scroll",function(){
                fn(this.y)
            })
        },
        refresh(){
            setTimeout(()=>{
                this.myScroll.refresh()
            },100)
        },
        scrollTo(x,y,time){
            this.myScroll.scrollTo(x,y,time)
        }
    }
    
}
</script>

<style lang="scss" scoped>
#wrapper{
    width: 100%;
    height: 100%;
}
</style>