import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'

/**
 * 通过 XMLHttpRequest 对象 发送一个请求
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeOut,
      cancelToken,
      withCredentials,
      xsrfHeaderName,
      xsrfCookieName
    } = config
    const request = new XMLHttpRequest()

    // 如果设置了 返回值类型 responseType
    if (responseType) {
      request.responseType = responseType
    }
    if (timeOut) {
      request.timeout = timeOut
    }
    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    request.open(method.toUpperCase(), url!, true)

    // 实现 onreadystatechange 事件处理器 目前 XMLHttpRequest 实列是被所有浏览器支持的
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 错误处理
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 超时处理
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeOut} ms exceeded`, config, 'ECONNABORTED', request))
    }
    // 读取cookie  xsrf防御
    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue
      }
    }
    // 配置 headers
    Object.keys(headers).forEach(name => {
      // 判断一下 如果 data = null 就没必要配置 headers 的 content-type 了
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)

    // 响应状态处理
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
