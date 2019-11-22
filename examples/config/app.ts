import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 'lwt test2'

axios.interceptors.response.use(res => {
  return res.data
})

axios({
  method: 'post',
  url: '/config/post',
  headers: {
    test: 'lwt test'
  },
  data: qs.stringify({
    name: 'lwt'
  })
}).then(res => {
  console.log(res)
})
