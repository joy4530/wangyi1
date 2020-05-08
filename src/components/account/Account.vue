<template>
<transition name="slide-fade">
    <div class="account">
        <accountHeader @changeSwitch="changeSwitch"></accountHeader>
        <AccountTips :switchNum="switchNum"></AccountTips>
    </div>
</transition>
</template>

<script>
import accountHeader from "./AccountHeader"
import AccountTips from "./AccountTips"
export default {
    name:"Account",
    components:{
        accountHeader,
        AccountTips
    },
    data(){
      return {
        switchNum : 0
      }
    },
    methods:{
      changeSwitch(value){
        this.switchNum = value
      }
    }
}
</script>

<style lang="scss" scoped>
    .account{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: red;
    }
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>