<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <Player ></Player>
  </div>
</template>
<script>
import Header from "./components/Header"
import Tabbar from "./components/Tabbar"
import Player from "./views/Player"
export default {
  name:"App",
  
  components:{
    Header,
    Tabbar,
    Player
  }
}
</script>
<style lang="scss" scoped>
@import "./assets/css/variable.scss";


</style>
