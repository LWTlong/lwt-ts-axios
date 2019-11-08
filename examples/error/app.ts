import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res)=> {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err)
  console.log(err.message)
  console.log(err.config)
  console.log(err.code)
  console.log(err.request)
  console.log(err.response)
  console.log(err.isAxiosError)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeOut: 3500
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
