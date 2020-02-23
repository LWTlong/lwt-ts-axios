import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'
import get = Reflect.get

describe('Axios 实列', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('返回的 instance 实列可以直接当作一个函数使用', () => {
    const instance = axios.create()
    instance('/user')
    return getAjaxRequest().then(res => {
      expect(res.url).toBe('/user')
    })
  })

  test('instance 也可以使用 api', () => {
    const instance = axios.create()
    instance.get('/user')

    return getAjaxRequest().then(res => {
      expect(res.url).toBe('/user')
      expect(res.method).toBe('GET')
    })
  })

  test('使用 post api', () => {
    const instance = axios.create()
    instance.post('/user')
    return getAjaxRequest().then(res => {
      expect(res.method).toBe('POST')
    })
  })

  test('使用 put ', () => {
    const instance = axios.create()
    instance.put('/user')

    return getAjaxRequest().then(res => {
      expect(res.method).toBe('PUT')
    })
  })

  test('使用 patch', () => {
    const instance = axios.create()
    instance.patch('/user')

    return getAjaxRequest().then(res => {
      expect(res.method).toBe('PATCH')
    })
  })

  test('使用 options', () => {
    const instance = axios.create()
    instance.options('/user')

    return getAjaxRequest().then(res => {
      expect(res.method).toBe('OPTIONS')
    })
  })

  test('使用 delete', () => {
    const instance = axios.create()
    instance.delete('/user')

    return getAjaxRequest().then(res => {
      expect(res.method).toBe('DELETE')
    })
  })

  test('使用 head', () => {
    const instance = axios.create()
    instance.head('/user')

    return getAjaxRequest().then(res => {
      expect(res.method).toBe('HEAD')
    })
  })

  test('创建时可以传入参数', () => {
    const instance = axios.create({ timeOut: 1000 })
    instance.get('/user')

    return getAjaxRequest().then(res => {
      expect(res.timeout).toBe(1000)
    })
  })

  test('默认配置会和传入的配置合并', () => {
    const instance = axios.create({ baseURL: 'https://www.github.com' })
    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  test('axios 设置的请求拦截器不会影响到 isntance 实列', done => {
    axios.interceptors.request.use(config => {
      config.timeOut = 1000
      return config
    })
    const instance = axios.create()

    instance.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })
    let response: AxiosResponse
    instance.get('/user').then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
    })
    setTimeout(() => {
      expect(response.config.timeOut).toBe(0)
      expect(response.config.withCredentials).toBeTruthy()
      done()
    }, 100)
  })

  test('静态方法 geturi ', () => {
    const config: AxiosRequestConfig = {
      baseURL: 'https://www.baidu.com',
      url: '/user',
      params: {
        id: 1,
        name: 'lwt'
      }
    }
    expect(axios.getUri(config)).toBe('https://www.baidu.com/user?id=1&name=lwt')
  })
})
