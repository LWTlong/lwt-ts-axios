import { processHeaders, parseHeaders, flattenHeaders } from '../../src/helpers/headers'

describe('headers', () => {
  describe('处理响应头为一个json对象: parseHeaders', () => {
    test('传入 string 转换为 Josn 对象', () => {
      const headers = parseHeaders(
        'Content-Type: application/json\r\n' +
          'Connection: keep-alive\r\n' +
          'Transfer-Encoding: chunked\r\n' +
          ': a\r\n' +
          'name: '
      )
      expect(headers['content-type']).toBe('application/json')
      expect(headers['connection']).toBe('keep-alive')
      expect(headers['transfer-encoding']).toBe('chunked')
      expect(headers['name']).toBe('')
    })
    test('如果传入一个空字符串, 返回一个空对象', () => {
      expect(parseHeaders('')).toEqual({})
    })
  })

  describe('配置 headers 的 Content-Type, 如果data 是对象 配置 application/json;charset=utf-8: processHeaders', () => {
    test('规范化Content-Type,并且删除掉原来不规范的Content-Type', () => {
      const headers: any = {
        'Content-type': 'application/json',
        'x-header': 'lwt'
      }
      processHeaders(headers, {})
      expect(headers['Content-Type']).toBe('application/json')
      expect(headers['Content-type']).toBeUndefined()
      expect(headers['x-header']).toBe('lwt')
    })
    test('如果data 是普通对象 配置Content-Type: application/json;charset=utf-8', () => {
      const header: any = {}
      processHeaders(header, { name: 'lwt' })
      expect(header['Content-Type']).toBe('application/json;charset=utf-8')
    })
    test('如果 data 不是普通对象，不配置 Content-Type', () => {
      const header: any = {}
      processHeaders(header, new URLSearchParams('name=lwt'))
      expect(header['Content-Type']).toBeUndefined()
    })
    test('如果传入的 header 是undefined返回undefined，传入 null 返回 null', () => {
      expect(processHeaders(undefined, {})).toBeUndefined()
      expect(processHeaders(null, {})).toBeNull()
    })
  })

  describe('合并 headers 的默认配置和用户传入的配置: flattenHeaders', () => {
    test('合并 headers 的默认配置和用户传入的配置', () => {
      const header: any = {
        Accept: 'application/json',
        common: {
          'Common-Head': 'common-head'
        },
        get: {
          'Get-Head': 'get-head'
        },
        post: {
          'Post-Head': 'post-head'
        }
      }
      expect(flattenHeaders(header, 'get')).toEqual({
        Accept: 'application/json',
        'Common-Head': 'common-head',
        'Get-Head': 'get-head'
      })
      expect(flattenHeaders(header, 'post')).toEqual({
        Accept: 'application/json',
        'Common-Head': 'common-head',
        'Post-Head': 'post-head'
      })
    })
    test('如果 method 为空，不会取其他值', () => {
      const header: any = {
        Accept: 'application/json',
        common: {
          'Common-Head': 'common-head'
        },
        get: {
          'Get-Head': 'get-head'
        },
        post: {
          'Post-Head': 'post-head'
        }
      }
      expect(flattenHeaders(header, 'options')).toEqual({
        Accept: 'application/json',
        'Common-Head': 'common-head'
      })
    })
    test('如果 headers 传入的 undefined 和 null，返回 undefined 和 null', () => {
      expect(flattenHeaders(undefined, 'get')).toBeUndefined()
      expect(flattenHeaders(null, 'post')).toBeNull()
    })
  })
})
