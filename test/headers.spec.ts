import axios from '../src/index'
import { getAjaxRequest } from './helper'

function testHeaderValue(headers: any, key: string, val?: string): void {
  let found = false
  for (let k in headers) {
    if (k.toLowerCase() === key.toLowerCase()) {
      found = true
      expect(headers[k]).toBe(val)
      break
    }
  }
  if (!found) {
    if (typeof val === 'undefined') {
      expect(headers.hasOwnProperty(key)).toBeFalsy()
    } else {
      throw new Error(key + 'was not found in headers')
    }
  }
}

describe('headers 模块', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('不配置 headers 的时候使用默认配置', () => {
    const headers = axios.defaults.headers.common
    axios('/user')

    return getAjaxRequest().then(res => {
      for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
          expect(res.requestHeaders[key]).toEqual(headers[key])
        }
      }
    })
  })

  test('post请求时 头部添加 content-type，data 不同值也不同，data为字符串时', () => {
    axios.post('/user', 'name=lwt')
    return getAjaxRequest().then(res => {
      testHeaderValue(res.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('post 请求，data为object 时，content-type的值', () => {
    axios.post('/user', { name: 'lwt' })
    return getAjaxRequest().then(res => {
      testHeaderValue(res.requestHeaders, 'Content-Type', 'application/json;charset=utf-8')
    })
  })

  test('post 请求, data 不传值, content-type 为 undefined', () => {
    axios.post('/user')
    return getAjaxRequest().then(res => {
      testHeaderValue(res.requestHeaders, 'Content-Type', undefined)
    })
  })

  test('post请求，data 为 false，会保留 content-type的值', () => {
    axios.post('/user', false)
    return getAjaxRequest().then(res => {
      testHeaderValue(res.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('post请求，data 是 FormData 时，会删除 content-type', () => {
    const data = new FormData()
    data.append('name', 'lwt')
    axios.post('/user', data)
    return getAjaxRequest().then(res => {
      testHeaderValue(res.requestHeaders, 'Content-Type', undefined)
    })
  })
})
