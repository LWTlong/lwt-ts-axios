import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'

describe('request 模块', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('只传入 url', () => {
    axios('/user')
    return getAjaxRequest().then(res => {
      expect(res.url).toBe('/user')
      expect(res.method).toBe('GET')
    })
  })

  test('传入请求方法，在 response的 config 里面可以获取到，平且会转为小写', () => {
    axios({
      url: '/user',
      method: 'POST'
    }).then(res => {
      expect(res.config.method).toBe('post')
    })
    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
    })
  })

  test('网络错误的情况', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })
    const rejectSpy = jest.fn((err: AxiosError) => {
      return err
    })
    jasmine.Ajax.uninstall()

    return axios('/user')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Network Error')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))

      jasmine.Ajax.install()
    }
  })

  test('请求超时的情况', done => {
    let err: AxiosError
    axios('/user', {
      timeOut: 2000,
      method: 'post'
    }).catch(error => {
      err = error
    })
    getAjaxRequest().then(request => {
      // @ts-ignore
      request.eventBus.trigger('timeout')
      setTimeout(() => {
        expect(err instanceof Error).toBeTruthy()
        expect(err.message).toBe('Timeout of 2000 ms exceeded')
        done()
      }, 100)
    })
  })

  test('自定义响应状态码 与返回的状态码对比为 false', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })
    const rejectSpy = jest.fn(err => {
      return err
    })
    axios('/user', {
      validateStatus(status) {
        return status !== 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)
    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })

    function next(reason: AxiosError | AxiosResponse) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Request failed with status code 500')
      expect((reason as AxiosError).response!.status).toBe(500)
    }
  })

  test('自定义响应状态码 与返回的状态码对比为 true', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })
    const rejectSpy = jest.fn((err: AxiosError) => {
      return err
    })
    axios('/user', {
      validateStatus(status) {
        return status === 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)
    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).toHaveBeenCalled()
      expect(rejectSpy).not.toHaveBeenCalled()
      expect(reason.config.url).toBe('/user')
    }
  })

  test('正常情况返回的是一个 json 对象', done => {
    let response: AxiosResponse
    axios('/user', {
      auth: {
        username: 'lwt',
        password: '123'
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"code":0}'
      })
      setTimeout(() => {
        expect(response.data).toEqual({ code: 0 })
        done()
      }, 100)
    })
  })

  test('报错时返回的 json', done => {
    let response: AxiosResponse
    axios('/user', {
      auth: {
        username: 'lwt',
        password: '123'
      },
      headers: {
        Accept: 'application/json'
      },
      method: 'post'
    }).catch(err => {
      response = err.response
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 400,
        statusText: 'error: Bad Request',
        responseText: '{"code":1,"error":"Bad Request"}'
      })
      setTimeout(() => {
        expect(typeof response.data).toBe('object')
        expect(response.data.error).toBe('Bad Request')
        expect(response.data.code).toBe(1)
        done()
      }, 100)
    })
  })

  test('正常响应', done => {
    let response: AxiosResponse
    axios.post('/user').then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"name":"lwt"}',
        responseHeaders: {
          'Content-Type': 'application/json'
        }
      })
      setTimeout(() => {
        expect(response.data.name).toBe('lwt')
        expect(response.status).toBe(200)
        expect(response.statusText).toBe('OK')
        expect(response.headers['content-type']).toBe('application/json')
        done()
      }, 100)
    })
  })

  test('对于请求头 Content-Type 大小写是不敏感的，会转换', () => {
    let response: AxiosResponse
    axios('/user', {
      method: 'post',
      data: { name: 'lwt' },
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      response = res
    })
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders['Content-Type']).toBe('application/json')
    })
  })
})
