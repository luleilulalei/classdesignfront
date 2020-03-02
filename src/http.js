import axios from 'axios'
import { Message } from 'element-ui'

// let loading // 定义loading变量

// function startLoading () { // 使用Element loading-start 方法
//   loading = Loading.service({
//     lock: true,
//     text: '加载中...',
//     background: 'rgba(0, 0, 0, 0.7)'
//   })
// }
// function endLoading () { // 使用Element loading-close 方法
//   loading.close()
// }

// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
  // 加载
  // config.baseURL = 'http://localhost:8090/api'
  // config.baseURL = 'http://202.206.251.126:8090/api'
  config.baseURL = 'http://47.105.187.18:8090/api'
  // startLoading()
  // if (localStorage.eleToken) {
  //   config.headers.Authorization = localStorage.eleToken
  // }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截  401 token过期处理
axios.interceptors.response.use(response => {
  // endLoading()
  return response
}, error => {
  // 错误提醒
  // endLoading()
  Message.error(error.response.data)
  const { status } = error.response
  if (status === 401) {

  }
  return Promise.reject(error)
})

export default axios
