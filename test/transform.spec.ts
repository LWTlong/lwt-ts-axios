import axios, { AxiosResponse, AxiosTransform } from '../src/index'
import { getAjaxRequest } from './helper'
import { transformRequest } from '../src/helpers/data'

describe('transform', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('json 对象会转换为 json 字符串', () => {
    const data = {
      name: 'lwt'
    }
    axios.post('/user', data)
    return getAjaxRequest().then(res => {
      expect(res.params).toBe('{"name":"lwt"}')
    })
  })

  test('响应时会把json字符串转为json对象', done => {
    let response: AxiosResponse
    axios('/user').then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"name":"lwt"}'
      })
    })
    setTimeout(() => {
      expect(typeof response.data).toBe('object')
      expect(response.data.name).toBe('lwt')
      done()
    }, 100)
  })

  test('可以覆盖默认的 transform', () => {
    const data = {
      name: 'lwt'
    }
    axios.post('/user', data, {
      transformRequest(data) {
        return data
      }
    })
    return getAjaxRequest().then(res => {
      expect(res.params).toEqual({ name: 'lwt' })
    })
  })

  test('转换函数可以支持数组', () => {
    const data = {
      name: 'lwt'
    }
    axios.post('/user', data, {
      transformRequest: (axios.defaults.transformRequest as AxiosTransform[]).concat(data => {
        return data.replace('lwt', 'lh')
      })
    })
    return getAjaxRequest().then(res => {
      expect(res.params).toBe('{"name":"lh"}')
    })
  })

  test('支持两个参数', () => {
    const token = Math.floor(Math.random() * Math.pow(2, 64)).toString(36)
    axios('/user', {
      transformRequest: (data, headers) => {
        headers['X-HEADER'] = token
        return data
      }
    })
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders['X-HEADER']).toBe(token)
    })
  })
})
