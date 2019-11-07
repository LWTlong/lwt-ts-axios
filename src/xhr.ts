import { AxiosRequestConfig } from './types'

// 通过 XMLHttpRequest 对象 发送一个请求
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  // 配置 headers
  Object.keys(headers).forEach(name => {
    // 判断一下 如果 data = null 就没必要配置 headers 的 content-type 了
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
