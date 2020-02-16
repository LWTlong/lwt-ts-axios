import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/util'

describe('helpers:util', () => {
  describe('判断方法测试: isXXX', () => {
    test('判断是否为 Date对象: isDate', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })
    test('判断是否为一个普通对象: isPlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })
    test('判断是否是 formData: isFormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })
    test('判断 url 是不是 URLSearchParams 类型: isURLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('a=b&c=1')).toBeFalsy()
    })
  })

  describe('合并 Axios 类的原型属性和实例属性: extend', () => {
    test('传入的对象的值会被修改', () => {
      const a = Object.create(null)
      const b = { name: 'lwt' }
      extend(a, b)
      expect(a.name).toBe('lwt')
    })
    test('扩展对象，相同的 key 后面的会把前面的覆盖', () => {
      const a = { name: 'lwt', age: 23 }
      const b = { name: 'lh' }
      const c = extend(a, b)
      expect(c.name).toBe('lh')
      expect(c.age).toBe(23)
    })
  })

  describe('对象深拷贝: deepMerge', () => {
    test('拷贝对象是不可改变的', () => {
      const a: any = { name: 'lwt' }
      const b: any = { age: 23 }
      const c = Object.create(null)
      deepMerge(a, b, c)
      expect(typeof c.age).toBe('undefined')
      expect(typeof c.name).toBe('undefined')
      expect(typeof a.age).toBe('undefined')
      expect(typeof b.name).toBe('undefined')
    })
    test('相同的 key 后面的会覆盖前面的', () => {
      const a = { name: 'lwt' }
      const b = { name: 'lh' }
      const c = { age: 23 }
      const d = deepMerge(a, b, c)
      expect(d.name).toBe('lh')
      expect(d.age).toBe(23)
    })
    test('相同 key 的值如果是一个对象，会递归拷贝合并过来', () => {
      const a = { body: { name: 'lwt' } }
      const b = { body: { userName: 'lh' }, res: { code: 0 } }
      const c = deepMerge(a, b)
      expect(c).toEqual({
        body: {
          name: 'lwt',
          userName: 'lh'
        },
        res: {
          code: 0
        }
      })
    })
    test('key 和值一样，但是拷贝合并后的和被拷贝的对象不是一个引用', () => {
      const a = { body: { name: 'lwt' } }
      const b = {}
      const c = deepMerge(a, b)
      expect(c).toEqual({
        body: {
          name: 'lwt'
        }
      })
      expect(c.body).not.toBe(a.body)
    })
    test('传入空值的情况', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { name: 'lwt' })).toEqual({ name: 'lwt' })
      expect(deepMerge({ name: 'lwt' }, undefined)).toEqual({ name: 'lwt' })
      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { name: 'lwt' })).toEqual({ name: 'lwt' })
      expect(deepMerge({ name: 'lwt' }, null)).toEqual({ name: 'lwt' })
      expect(deepMerge(undefined, null)).toEqual({})
    })
  })
})
