import axios from '../../src/index'

// ============== 扩展API start================
/*
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'axios'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'axios.request'
  }
})

axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post', { name: 'lwt' }, { method: 'post' })
axios.put('/extend/put', { msg: 'put' })
axios.patch('/extend/patch', { msg: 'patch' })

*/
// ============== 扩展API end================

// ========== 实现传入两个参数 start =========
axios('/extend/post', {
  method: 'post',
  data: {
    name: 'lwt',
    age: '23'
  }
})
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    a: 1
  }
})
// 可以这么调用 浏览器能够正常请求到 就是 ide 会给报错 接口里面定义的 axios.request 只能传入一个 config 参数
// axios.request('/extend/post',{
//   method: 'post',
//   data: {
//     name: 'error',
//     sex: 'w'
//   }
// })
// ========== 实现传入两个参数 end   =========
