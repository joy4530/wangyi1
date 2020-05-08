import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
Vue.use(Vuex)

export default new Vuex.Store({
  state:state,
  mutations:mutations,
  actions:actions,
  getters:getters
  // state: {
  //   isFullView:false
  // },
  // mutations: {
  //   changeView(state,flag){
  //     state.isFullView = flag
  //   }
  // },
  // actions: {
  //   actChangeView({commit},flag){
  //     commit("changeView",flag)
  //   }
  // },
  // getters:{
  //   isFullView(state){
  //     return state.isFullView
  //   }
  // }
})
