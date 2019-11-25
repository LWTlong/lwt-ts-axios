import axios, { AxiosTransform } from '../../src/index'
import qs from 'qs'

// axios.defaults.headers.common['test2'] = 'lwt test2'
//
// axios.interceptors.response.use(res => {
//   return res.data
// })
//
// axios({
//   method: 'post',
//   url: '/config/post',
//   headers: {
//     test: 'lwt test'
//   },
//   data: qs.stringify({
//     name: 'lwt'
//   })
// }).then(res => {
//   console.log(res)
// })

axios({
  transformRequest:[
    (function(data) {
      return qs.stringify(data)
    }), ...(axios.defaults.transformRequest as AxiosTransform[])
  ],
  transformResponse:[
    ...(axios.defaults.transformResponse as AxiosTransform[]),
    (function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    })
  ],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
