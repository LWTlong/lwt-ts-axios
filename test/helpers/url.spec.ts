import { buildURL, isURLSameOrigin, isAbsoluteURL, combineURL } from '../../src/helpers/url'

describe('url', () => {
  describe('构建 url  拼接参数: buildURL', () => {
    test('params 为空，直接返回 url', () => {
      expect(buildURL('/user')).toBe('/user')
    })
    test('params 传入一个普通值', () => {
      expect(buildURL('/user', { name: 'lwt' })).toBe('/user?name=lwt')
    })
    test('params 中有属性值为null,不会拼接到url上', () => {
      expect(buildURL('/user', { name: 'lwt', pwd: null })).toBe('/user?name=lwt')
    })
    test('params只有一个属性值，且属性值为null,不拼接，直接返回url', () => {
      expect(buildURL('/user', { name: null })).toBe('/user')
    })
    test('params 的属性值是一个对象，则转为 encodeURI(json字符串) ', () => {
      expect(buildURL('/user', { body: { name: 'lwt' } })).toBe(
        '/user?body=' + encodeURI('{"name":"lwt"}')
      )
    })
    test('params 的值为一个 date类型', () => {
      const date = new Date()
      expect(buildURL('/user', { date: date })).toBe('/user?date=' + date.toISOString())
    })
    test('params 的值是一个 Array', () => {
      expect(buildURL('/user', { list: ['name', 'pwd'] })).toBe('/user?list[]=name&list[]=pwd')
    })
    test('params 的值是特殊字符', () => {
      expect(buildURL('/user', { data: '@:$, ' })).toBe('/user?data=@:$,+')
    })
    test('url 已经带有参数，params 拼接在url参数后面', () => {
      expect(buildURL('/user?name=lwt', { pwd: 123 })).toBe('/user?name=lwt&pwd=123')
    })
    test('url 中有哈希，去掉哈希，拼接在后面', () => {
      expect(buildURL('/user?name=lwt#hash', { pwd: 123 })).toBe('/user?name=lwt&pwd=123')
    })
    test('如果自定义参数序列化', () => {
      const serializer = jest.fn(() => {
        return 'name=lwt'
      })
      const params: any = { name: 'lwt' }
      expect(buildURL('/user', params, serializer)).toBe('/user?name=lwt')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })
    test('params 是一个 RULSearchParams', () => {
      expect(buildURL('/user', new URLSearchParams('name=lwt'))).toBe('/user?name=lwt')
    })
  })

  describe('判断 url 是不是绝对地址: isAbsoluteURL', () => {
    test('地址开头都是合法字符串 判断为 true', () => {
      expect(isAbsoluteURL('https://github.com/LWTlong/lwt-ts-axios')).toBeTruthy()
      expect(isAbsoluteURL('npmjs-cn://getting-started/installing-node/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://www.bilibili.com/')).toBeTruthy()
    })
    test('不合法', () => {
      expect(isAbsoluteURL('123://github.com/LWTlong/lwt-ts-axios')).toBeFalsy()
      expect(isAbsoluteURL('~npmjs.cn/getting-started/installing-node/')).toBeFalsy()
    })
    test('//开头也是合法的', () => {
      expect(isAbsoluteURL('//bilibili.com/')).toBeTruthy()
    })
    test('相对路径返回 false', () => {
      expect(isAbsoluteURL('/user')).toBeFalsy()
      expect(isAbsoluteURL('user')).toBeFalsy()
    })
  })

  describe('拼接 baseURL 和 传入的 url: combineURL', () => {
    test('拼接 baseURL 和 url', () => {
      expect(combineURL('https://github.com/', 'LWTlong/lwt-ts-axios')).toBe(
        'https://github.com/LWTlong/lwt-ts-axios'
      )
    })
    test('baseURL 末尾有 / 和 url 的开头有 /, 会去掉一个，返回一个正确的 url', () => {
      expect(combineURL('https://github.com/', '/LWTlong/lwt-ts-axios')).toBe(
        'https://github.com/LWTlong/lwt-ts-axios'
      )
    })
    test('baseURL 和 url 中间没有 / 分割，会自动添加 /分割', () => {
      expect(combineURL('https://github.com', 'LWTlong/lwt-ts-axios')).toBe(
        'https://github.com/LWTlong/lwt-ts-axios'
      )
    })
    test('url 为空，返回 baseURL', () => {
      expect(combineURL('https://github.com', '')).toBe('https://github.com')
    })
    test('url 可以传入一个 /', () => {
      expect(combineURL('https://github.com/LWTlong', '/')).toBe('https://github.com/LWTlong/')
    })
  })

  describe('判断是否是同源: isURLSameOrigin', () => {
    test('与当前地址判断 是否同源', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })
    test('与当前地址不同源 返回 false', () => {
      expect(isURLSameOrigin('https://github.com/LWTlong')).toBeFalsy()
    })
  })
})
