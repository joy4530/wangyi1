import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Recommend from "../views/Recommend.vue"
// import Singer from "../views/Singer.vue"
// import Rank from "../views/Rank.vue"
// import Search from "../views/Search.vue"
//组件异步需求加载
const Playlist = (resolve) =>{
  import("../views/Playlist.vue").then((module)=>{
    resolve(module);
  })
}
const Recommend = (resolve) =>{
  import("../views/Recommend.vue").then((module)=>{
    resolve(module);
  })
}
const Singer = (resolve) =>{
  import("../views/Singer.vue").then((module)=>{
    resolve(module);
  })
}
const Rank = (resolve) =>{
  import("../views/Rank.vue").then((module)=>{
    resolve(module);
  })
}
const Search = (resolve) =>{
  import("../views/Search.vue").then((module)=>{
    resolve(module);
  })
}
const Account = (resolve) =>{
  import("../components/account/Account.vue").then((module)=>{
    resolve(module);
  })
}
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  { path: '/recommend', component: Recommend ,
    children:[{path: 'detail/:id/:type', component : Playlist}]
  },
  { path: '/singer', component: Singer ,
    children:[{path: 'detail/:id/:type', component : Playlist}]
  },
  { path: '/rank', component: Rank ,
    children:[{path: 'detail/:id/:type', component : Playlist}]
  },
  { path: '/search', component: Search },
  { path: '/account', component: Account }
]

const router = new VueRouter({
  routes
})

export default router
