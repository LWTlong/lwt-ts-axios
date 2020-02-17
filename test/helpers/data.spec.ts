import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('data', () => {
  describe('transformRequest', () => {
    test('如果传入json字符串，不做处理，返回Json字符串', () => {
      const a = '{"name":"lwt"}'
      expect(transformRequest(a)).toBe(a)
    })
    test('如果传入一个普通对象，转为json字符串', () => {
      const a = { name: 'lwt' }
      expect(transformRequest(a)).toBe('{"name":"lwt"}')
    })
  })

  describe('transformResponse', () => {
    test('如果传入的一个json字符串，转换为一个普通对象', () => {
      const a = '{"name": "lwt"}'
      expect(transformResponse(a)).toEqual({ name: 'lwt' })
    })
    test('如果传入一个非json字符串，普通字符串，直接返回', () => {
      const a = '{a:b}'
      expect(transformResponse(a)).toBe(a)
    })
    test('如果传入的一个普通对象，直接返回', () => {
      const a = { name: 'lwt' }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
