import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

// 对请求的数据进行统一处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 这里要先处理 headers  因为在处理 body 的时候 把 data 转为 json字符串了，
  // 如果先处理了 data 处理 headers 的时候 判断 data 就不是一个普通对象了
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理请求的 url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 处理请求的 body
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理请求的 headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
