import axios from '../src/index'
import { getAjaxRequest } from './helper'
import cookie from '../src/helpers/cookie'

describe('xsrf 防御', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
    document.cookie =
      axios.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
  })

  test('没有设置 cookie的时候 是不会在headers里面添加', () => {
    axios('/user')
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('设置cookie后会在headers里面添加相关的header', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=123'
    axios('/user')
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('123')
    })
  })

  test('在跨域的情况下，不会去设置cookie', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=123'
    axios('https://www.baidu.com')
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('在跨域情况下,配置 withCredentials 为 true ，会在头部里携带cookie', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=123456'
    axios('http://www.baidu.com', {
      withCredentials: true
    })
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('123456')
    })
  })
})
