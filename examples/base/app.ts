import axios from '../../src/index'

// const url = '/base/get'

// ================== 处理 url demo  start =====================
// axios({
//   url: url,
//   params:{
//     fool: ['a','b','c']
//   }
// })
//
// axios({
//   url:url,
//   params: {
//     fool: {
//       name: 'LWT'
//     }
//   }
// })
//
// axios({
//   url: url,
//   params: {
//     fool: '@$, '
//   }
// })
//
// const date = new Date()
// axios({
//   url: url,
//   params: {
//     date: date
//   }
// })
//
// axios({
//   url:'/base/get#/path',
//   params:{
//     fool: 'hash'
//   }
// })
//
// axios({
//   url: url + '?name=lwt',
//   params:{
//     sex: 'man'
//   }
// })
//
// axios({
//   url: url,
//   params: {
//     name: 'lwt',
//     age: null
//   }
// })
// ===================== 处理 url demo end ====================================

// ===================== 处理 body demo start =================================
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     name: 'LWT',
//     age: '23'
//   }
// })
//
// const arr = new Int32Array([21, 31])
//
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })
// ======================== 处理 body demo end =================================

// ======================== 处理 headers demo  start ===========================
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })
// axios({
//   method: 'post',
//   headers: {
//     'content-type': 'application/json',
//     'Accept': 'application/json, text/plain, */*'
//   },
//   url: '/base/post',
//   data: {
//     c: 1,
//     d: 2
//   }
// })
//
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })
// ======================== 处理 headers demo  end ===========================

// ======================== 处理返回数据为 promise demo start ===========================
axios({
  method: 'post',
  url: '/base/post',
  data: {
    name: 'lwt',
    sex: 'm'
  }
}).then(res => {
  console.log(res)
})
axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  headers: {
    'content-type': 'application/json'
  },
  data: {
    name: 'wlp',
    sex: 'w'
  }
}).then(res => {
  console.log(res)
})
// ======================== 处理返回数据为 promise demo end ===========================
