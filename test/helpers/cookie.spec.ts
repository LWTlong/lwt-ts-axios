import cookie from '../../src/helpers/cookie'

describe('cookie', () => {
  test('正常读取cookie', () => {
    document.cookie = 'a=b'
    expect(cookie.read('a')).toBe('b')
  })
  test('如果没有的话返回 null', () => {
    document.cookie = 'a=b'
    expect(cookie.read('b')).toBeNull()
  })
})
