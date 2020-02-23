import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'
import { config } from 'shelljs'

describe('拦截器 interceptors', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('使用请求拦截器', () => {
    const instance = axios.create()
    instance.interceptors.request.use(config => {
      config.headers.test = 'add interceptors'
      return config
    })
    instance('/user')
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders.test).toBe('add interceptors')
    })
  })

  test('请求 interceptors 返回一个新的 config', () => {
    const instance = axios.create()
    instance.interceptors.request.use(() => {
      return {
        url: '/list',
        method: 'post'
      }
    })
    instance('/user')
    return getAjaxRequest().then(res => {
      expect(res.url).toBe('/list')
      expect(res.method).toBe('POST')
    })
  })

  test('请求 interceptors 可以返回一个 Promise 对象, 异步设置', done => {
    const instance = axios.create()
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return new Promise(resolve => {
        setTimeout(() => {
          config.headers.async = 'promise'
          resolve(config)
        }, 10)
      })
    })
    instance('/user')
    setTimeout(() => {
      getAjaxRequest().then(request => {
        expect(request.requestHeaders.async).toBe('promise')
        done()
      })
    }, 100)
  })

  test('请求拦截器可以添加多个', () => {
    const instance = axios.create()
    instance.interceptors.request.use(config => {
      config.headers.test1 = '1'
      return config
    })
    instance.interceptors.request.use(config => {
      config.headers.test2 = '2'
      return config
    })
    instance.interceptors.request.use(config => {
      config.headers.test3 = '3'
      return config
    })
    instance('/user')
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders.test1).toBe('1')
      expect(res.requestHeaders.test2).toBe('2')
      expect(res.requestHeaders.test3).toBe('3')
    })
  })

  test('响应拦截器', done => {
    let response: AxiosResponse
    const instance = axios.create()
    instance.interceptors.response.use(data => {
      data.data = data.data + ' - interceptors'
      return data
    })
    instance('/user').then(res => {
      response = res
    })
    getAjaxRequest().then(res => {
      res.respondWith({
        status: 200,
        responseText: 'OK'
      })
    })
    setTimeout(() => {
      expect(response.data).toBe('OK - interceptors')
      done()
    }, 100)
  })

  test('响应拦截器修改 data', done => {
    let response: AxiosResponse
    const instance = axios.create()
    instance.interceptors.response.use(() => {
      return {
        data: 'data',
        headers: null,
        status: 500,
        statusText: 'error',
        request: null,
        config: {}
      }
    })
    instance('/user').then(res => {
      response = res
    })
    getAjaxRequest().then(res => {
      res.respondWith({
        status: 200,
        responseText: 'OK'
      })
    })
    setTimeout(() => {
      expect(response.data).toBe('data')
      expect(response.headers).toBeNull()
      expect(response.status).toBe(500)
      expect(response.statusText).toBe('error')
      expect(response.request).toBeNull()
      expect(response.config).toEqual({})
      done()
    }, 100)
  })

  test('响应拦截器也可以异步返回Promise', done => {
    let response: AxiosResponse
    const instance = axios.create()
    instance.interceptors.response.use(data => {
      return new Promise(resolve => {
        setTimeout(() => {
          data.data = 'Promise'
          resolve(data)
        }, 10)
      })
    })
    instance('/user').then(res => {
      response = res
    })
    getAjaxRequest().then(res => {
      res.respondWith({
        status: 200,
        responseText: 'OK'
      })
    })
    setTimeout(() => {
      expect(response.data).toBe('Promise')
      done()
    }, 100)
  })

  test('响应拦截器也可以添加多个', done => {
    let response: AxiosResponse
    const instance = axios.create()
    instance.interceptors.response.use(data => {
      data.data = data.data + '1'
      return data
    })
    instance.interceptors.response.use(data => {
      data.data = data.data + '2'
      return data
    })
    instance.interceptors.response.use(data => {
      data.data = data.data + '3'
      return data
    })
    instance('/user').then(res => {
      response = res
    })
    getAjaxRequest().then(res => {
      res.respondWith({
        status: 200,
        responseText: 'OK'
      })
    })
    setTimeout(() => {
      expect(response.data).toBe('OK123')
      done()
    }, 100)
  })

  test('移除响应拦截器', done => {
    let response: AxiosResponse
    let intercept: any
    const instance = axios.create()
    instance.interceptors.response.use(data => {
      data.data = data.data + '1'
      return data
    })
    intercept = instance.interceptors.response.use(data => {
      data.data = data.data + '2'
      return data
    })
    instance.interceptors.response.use(data => {
      data.data = data.data + '3'
      return data
    })
    instance.interceptors.response.eject(intercept)
    instance.interceptors.response.eject(4)
    instance('/user').then(res => {
      response = res
    })
    getAjaxRequest().then(res => {
      res.respondWith({
        status: 200,
        responseText: 'OK'
      })
    })

    setTimeout(() => {
      expect(response.data).toBe('OK13')
      done()
    }, 100)
  })
})
