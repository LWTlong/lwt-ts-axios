import axios from '../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { config } from 'shelljs'
import qs from 'qs'

// document.cookie = 'a=b'
//
// axios.get('/more/get').then(res => {
//   console.log(res)
// })
//
// axios.post('http://127.0.0.1:8088/more/server2',{},{
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-L',
//   xsrfHeaderName: 'H-XSRF-TOKEN-L'
// })
// instance.get('/more/get').then(res => {
//   console.log(res)
// })


// 上传下载监控
// const instance = axios.create()
//
// // 计算进度百分比
// function calculatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }
//
// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }
//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onUploadProgress = update
//     instance.defaults.onDownloadProgress = update
//   }
//   const setupStopProgress = () => {
//     instance.interceptors.response.use(response => {
//       NProgress.done()
//       return response
//     }, err => {
//       NProgress.done()
//       return Promise.reject(err)
//     })
//   }
//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }
// loadProgressBar()
//
// const downloadEl = document.getElementById('download')
// const uploadEl = document.getElementById('upload')
//
// downloadEl!.addEventListener('click', e => {
//   instance.get('https://profile.csdnimg.cn/E/B/9/3_qq_33737087')
// })
//
// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])
//     instance.post('/more/upload', data)
//   }
// })

axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'lwt',
    password: '123'
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

// 自定义响应状体码
// axios.get('/more/304').then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })
//
// axios.get('/more/304', {
//   validateStatus(status) {
//     return status >= 200 && status < 400
//   }
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

// 自定义参数序列化
// axios.get('/more/get', {
//   params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err.message)
// })
// axios.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err.message)
// })
//
// const instance = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
// })
// instance.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err.message)
// })

// baseURL 配置
// const instance = axios.create({
//   baseURL: 'https://pic1.zhimg.com/'
// })
// instance.get('80/v2-e110c4ec6cbc6b51f1bac346d4d85ab1_hd.jpg')
// instance.get('https://pic2.zhimg.com/80/v2-edde30bf0ecf7087f5b97aac41282175_hd.jpg')

// 静态方法

// function getA() {
//   return axios.get('/more/A')
// }
//
// function getB() {
//   return axios.get('/more/B')
// }
//
// axios.all([getA(), getB()])
//   .then(axios.spread(function(resA, resB) {
//     console.log(resA)
//     console.log(resB)
//   }))
// axios.all([getA(), getB()])
//   .then(([resA, resB]) => {
//     console.log(resA)
//     console.log(resB)
//   })
//
// const configA = {
//   baseURL: 'https://www.baidu.com/',
//   url: 'user/login',
//   params: {
//     name: 'lwt',
//     pwd: '123'
//   }
// }
// console.log(axios.getUri(configA))
