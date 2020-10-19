import axios from 'axios'
import { Utils } from '@/utils'

axios.interceptors.request.use(
  config => {
    config.headers['content-type'] = 'application/json; charset=utf-8'
    config.headers['accept-language'] = 'zh-CN'
    config.headers.Authorization = 'token'
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      if(error.response.status===401){
        window.location.href = '/'
      }
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  })


 let baseUrl:string = ''
 
 if(Utils.isDev()){
  baseUrl = (<any>window).testUrl
 } else {
  baseUrl = (<any>window).prodUrl
 }


  export {
    axios,
    baseUrl
  }
