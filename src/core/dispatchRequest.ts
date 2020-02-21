import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL, combineURL, isAbsoluteURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

/**
 * 调用 xhr 方法  返回一个 response
 */
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(
    res => {
      return transformResponseData(res)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    }
  )
}

// 对请求的数据进行统一处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  // 再做一层 flatten
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理请求的 url
export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url!)
  }
  return buildURL(url!, params, paramsSerializer)
}

// 处理 响应body
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

// 判断 token 是否被使用过了
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
