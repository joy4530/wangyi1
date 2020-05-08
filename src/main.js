import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
import fastclick from "fastclick"
import VueLazyload from 'vue-lazyload'
import "./assets/css/base.scss"
import 'swiper/dist/css/swiper.css'
import Loading from './plugin/loading/index'


Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(Loading, {
  title: '正在加载...'
})
Vue.use(VueLazyload,{
  loading:require('./assets/images/loading.png') 
})
Vue.config.productionTip = false
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
