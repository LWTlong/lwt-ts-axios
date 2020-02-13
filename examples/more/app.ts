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

// axios.post('/more/post', {
//   a: 1
// }, {
//   auth: {
//     username: 'lwt1',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

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
axios.get('/more/get', {
  params: new URLSearchParams('a=b&c=d')
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})
axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})

const instance = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})
instance.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})
