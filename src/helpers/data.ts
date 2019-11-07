import { isPlainObject } from './util'

// 处理 body 为一个json字符串
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
