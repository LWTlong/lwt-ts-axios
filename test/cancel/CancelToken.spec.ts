import Cancel from '../../src/cancel/Cancel'
import CancelToken from '../../src/cancel/CancelToken'
import { Canceler } from '../../src/types'

describe('CancelToken', () => {
  describe('reason', () => {
    test('实列化一个 CancelToken', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Cancellation request')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Cancellation request')
    })
    test('多次调用是不会有影响的', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Cancellation request')
      cancel!('Cancellation request')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Cancellation request')
    })
    test('实列化 CancelToken, 但是不去调用 Cancel 方法, reason 为 undefined', () => {
      const token = new CancelToken(() => {
        // do nothing
      })
      expect(token.reason).toBeUndefined()
    })
  })

  describe('promise', () => {
    test('只要调用了 Cancel 方法, 可以在 token 的promise resolve内拿到 reason 相关', () => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel))
        expect(value.message).toBe('Cancellation request')
      })
      cancel!('Cancellation request')
    })
  })

  describe('throwIfRequested: 用来判断 token 是否被使用过  如果使用过 就抛出一个异常', () => {
    test('throwIfRequested 抛出异常', () => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Cancellation request')
      try {
        token.throwIfRequested()
        fail('错误，此时已经使用过了')
      } catch (thrown) {
        if (!(thrown instanceof Cancel)) {
          fail('错误，thrown 应该是一个 Cancel 实列' + thrown)
        }
        expect(thrown.message).toBe('Cancellation request')
      }
    })
    test('如果没有去执行 Cancel 方法，不会报异常', () => {
      const token = new CancelToken(() => {
        // do nothing
      })
      token.throwIfRequested()
    })
  })

  describe('source 静态方法', () => {
    const source = CancelToken.source()
    expect(source.token).toEqual(expect.any(CancelToken))
    expect(source.cancel).toEqual(expect.any(Function))
    expect(source.token.reason).toBeUndefined()
    source.cancel('Cancellation request')
    expect(source.token.reason).toEqual(expect.any(Cancel))
    expect(source.token.reason!.message).toBe('Cancellation request')
  })
})
