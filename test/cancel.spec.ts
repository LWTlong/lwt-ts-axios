import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('cancel', () => {
  const CancelToken = axios.CancelToken
  const Cancel = axios.Cancel

  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  describe('请求发送之前', () => {
    test('请求发送之前，调用cancel', () => {
      const source = CancelToken.source()
      source.cancel('Cancellation request')
      return axios
        .get('/user', {
          cancelToken: source.token
        })
        .catch(reason => {
          expect(reason).toEqual(expect.any(Cancel))
          expect(reason.message).toBe('Cancellation request')
        })
    })
  })
  describe('请求发送后', () => {
    test('请求发送后 响应之前 取消请求', done => {
      const source = CancelToken.source()
      axios
        .get('/user', {
          cancelToken: source.token
        })
        .catch(reason => {
          expect(reason).toEqual(expect.any(Cancel))
          expect(reason.message).toBe('Cancellation request')
          done()
        })
      getAjaxRequest().then(res => {
        source.cancel('Cancellation request')
        setTimeout(() => {
          res.respondWith({
            status: 200,
            responseText: 'OK'
          })
        }, 100)
      })
    })
    test('执行 cancel 方法就是执行了 xhr对象的 abort 方法', done => {
      const source = CancelToken.source()
      let request: any
      axios
        .get('/user', {
          cancelToken: source.token
        })
        .catch(reason => {
          // jasmine 在调用 abort 方法的时候会给 statusText 设置为 abort 字符串
          expect(request.statusText).toBe('abort')
          done()
        })
      getAjaxRequest().then(res => {
        source.cancel()
        request = res
      })
    })
  })
  describe('响应接收之后', () => {
    test('接收到响应之后执行 cancel 是不会报异常的', done => {
      const source = CancelToken.source()
      axios
        .get('/user', {
          cancelToken: source.token
        })
        .then(res => {
          window.addEventListener('unhandledrejection', () => {
            done.fail('Unhandled rejection')
          })
          source.cancel()
          setTimeout(done, 100)
        })
      getAjaxRequest().then(res => {
        res.respondWith({
          status: 200,
          responseText: 'OK'
        })
      })
    })
  })
})
