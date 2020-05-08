import axios from "axios"
import Vue from "vue"
//定义全局配置
axios.defaults.baseURL="http://127.0.0.1:3000"
axios.defaults.timeout = 7000
let count = 0
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    count++
    Vue.showLoading()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    Vue.hiddenLoading()
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    count--
    if(count === 0){
        Vue.hiddenLoading()
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    Vue.hiddenLoading()
    return Promise.reject(error);
  });

export default {
    get:function(path="",data={}){
            return new Promise(function(reslove,reject){
                axios.get(path,{
                    params:data
                }).then(function(response){
                    reslove(response.data)
                }).catch(function(error){
                    reject(error)
                })
            })
        },
    post:function(path="",data={}){
        return new Promise(function(reslove,reject){
            axios.post(path,data)
            .then(function(response){
                reslove(response.data)
            }).catch(function(error){
                reject(error)
            })
            
        })
    },
    all:function(list){
        return new Promise(function(reslove,reject){
            axios.all(list)
            .then(axios.spread(function (...result) {
                // 两个请求现在都执行完成
                reslove(result)
            }))
            .catch(function(err){
                reject(err)
            })
        })
    }
   
}