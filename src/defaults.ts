import { AxiosRequestConfig } from './types'
// 默认配置  未来可扩展
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeOut: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNodata = ['get', 'delete', 'head', 'options']
methodsNodata.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
