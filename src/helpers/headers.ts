import { deepMerge, isPlainObject } from './util'
import { Method } from '../types'

// 处理 headers 里面的 Content-Type
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 配置 headers 的 Content-Type  如果data 是对象 配置 application/json;charset=utf-8
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

//  处理响应头为一个json对象
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    key = key.trim().toLowerCase()
    parsed[key] = val
  })
  return parsed
}

// 合并 headers 的默认配置和用户传入的配置
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDel = ['delete', 'get', 'options', 'head', 'post', 'patch', 'put', 'common']

  methodsToDel.forEach(method => {
    delete headers[method]
  })
  return headers
}
