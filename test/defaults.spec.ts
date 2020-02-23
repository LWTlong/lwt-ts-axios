import axios, { AxiosTransform } from '../src/index'
import { getAjaxRequest } from './helper'
import { deepMerge } from '../src/helpers/util'

describe('defaults', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('对请求数据的转换', () => {
    expect((axios.defaults.transformRequest as AxiosTransform[])[0]({ name: 'lwt' })).toBe(
      '{"name":"lwt"}'
    )
  })

  test('如果传入一个字符串，不做转换', () => {
    expect((axios.defaults.transformRequest as AxiosTransform[])[0]('name=lwt')).toBe('name=lwt')
  })

  test('对响应的数据也需要转换', () => {
    const data = (axios.defaults.transformResponse as AxiosTransform[])[0]('{"name":"lwt"}')
    expect(typeof data).toBe('object')
    expect(data.name).toBe('lwt')
  })

  test('如果响应数据是一个普通字符串,不做处理', () => {
    expect((axios.defaults.transformResponse as AxiosTransform[])[0]('name=lwt')).toBe('name=lwt')
  })

  test('响应数据里可以拿到 url', () => {
    axios('/user')
    return getAjaxRequest().then(res => {
      expect(res.url).toBe('/user')
    })
  })

  test('请求发出去的 url是baseURL + 传入的 url', () => {
    axios.defaults.baseURL = 'https://www.baidu.com'
    axios('/user')
    return getAjaxRequest().then(res => {
      expect(res.url).toBe('https://www.baidu.com/user')
      delete axios.defaults.baseURL
    })
  })

  test('在配置里传入 baseURL 就用配置传入的', () => {
    axios('/user', {
      baseURL: 'https://www.baidu.com'
    })
    return getAjaxRequest().then(res => {
      expect(res.url).toBe('https://www.baidu.com/user')
    })
  })

  test('传入的配置会和默认配置合并', () => {
    const instance = axios.create({
      xsrfCookieName: 'X-COOKIE-NAME',
      xsrfHeaderName: 'X-HEAD-NAME'
    })
    document.cookie = instance.defaults.xsrfCookieName + '=lwt'
    instance.get('/user')
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders[instance.defaults.xsrfHeaderName!]).toBe('lwt')
      document.cookie =
        instance.defaults.xsrfCookieName +
        '=;expires=' +
        new Date(Date.now() - 86400000).toUTCString()
    })
  })

  test('headers get属性添加值', () => {
    axios.defaults.headers.get['X-HEAD'] = 'lwt'
    axios.get('/user')
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders['X-HEAD']).toBe('lwt')
      delete axios.defaults.headers.get['X-HEAD']
    })
  })

  test('headers post属性添加值', () => {
    axios.defaults.headers.post['X-HEAD'] = 'lwt'
    axios.post('/user', {})
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders['X-HEAD']).toBe('lwt')
      delete axios.defaults.headers.post['X-HEAD']
    })
  })

  test('headers 里的值会与传入的值和默认值合并', () => {
    const instance = axios.create({
      headers: {
        common: {
          'C-HEADER': 'common-header'
        },
        get: {
          'G-HEADER': 'get-header'
        },
        post: {
          'P-HEADER': 'post-header'
        }
      }
    })
    instance.get('/user', {
      headers: {
        'X-INS-HEADER': 'instance-header',
        'X-USER-HEADER': 'user-header'
      }
    })
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders).toEqual(
        deepMerge(axios.defaults.headers.common, axios.defaults.headers.get, {
          'X-INS-HEADER': 'instance-header',
          'X-USER-HEADER': 'user-header',
          'G-HEADER': 'get-header',
          'C-HEADER': 'common-header'
        })
      )
    })
  })

  test('在 instance 创建之前修改 defaults 会影响到 instance', () => {
    axios.defaults.baseURL = 'https://www.baidu.com'
    const instance = axios.create()
    instance.get('/user')
    return getAjaxRequest().then(res => {
      expect(res.url).toBe('https://www.baidu.com/user')
      delete axios.defaults.baseURL
    })
  })

  test('在 instance 创建之后修改 defaults 不会影响到 instance', () => {
    const instance = axios.create()
    axios.defaults.baseURL = 'https://www.baidu.com'

    instance.get('/user')
    return getAjaxRequest().then(res => {
      expect(res.url).toBe('/user')
    })
  })
})
