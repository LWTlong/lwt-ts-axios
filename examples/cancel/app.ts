import axios, { Canceler } from '../../src/index'

let CancelToken = axios.CancelToken
let source = CancelToken.source()
axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(err => {
  if (axios.isCancel(err)) {
    console.log('Request Canceled', err.message)
  }
})

setTimeout(() => {
  source.cancel('取消请求')

  axios.post('/cancel/post', { a: 1 }, {
    cancelToken: source.token
  }).catch(err => {
    if (axios.isCancel(err)) {
      console.log(err.message)
    }
  })
}, 100)

let cancel: Canceler
axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(err => {
  if (axios.isCancel(err)) {
    console.log('创建Cancel对象来取消', err.message)
  }
})
setTimeout(() => {
  cancel()
}, 1200)

