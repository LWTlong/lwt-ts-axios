import axios from '../src/index'
import mergeConfig from '../src/core/mergeConfig'

describe('合并 config 配置： mergeConfig', () => {
  const defaults = axios.defaults

  test('mergeConfig 第二个参数可以传 undefined', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults)
  })

  test('第二个参数可以传空对象', () => {
    expect(mergeConfig(defaults, {})).toEqual(defaults)
  })

  test('第二个参数传 undefined 或者空对象，结果的结构是一样的，但是引用是不同的，等于说是拷贝了一份过来', () => {
    const merged = mergeConfig(defaults, {})
    expect(merged).not.toBe(defaults)
    expect(merged.headers).not.toBe(defaults.headers)
  })

  test('合并 config', () => {
    const config = {
      url: '/user',
      params: 'cc',
      data: { name: 'lwt' }
    }
    const merged = mergeConfig(defaults, config)
    expect(merged.url).toBe(config.url)
    expect(merged.params).toBe(config.params)
    expect(merged.data).toEqual(config.data)
  })

  test('config 合并策略，url、params、data 只从第二个参数取', () => {
    const config = {
      url: '/user',
      params: 'cc',
      data: { name: 'lwt' }
    }
    const merged = mergeConfig(config, {})
    expect(merged.url).toBeUndefined()
    expect(merged.params).toBeUndefined()
    expect(merged.data).toBeUndefined()
  })

  test('headers 如果第二个参数传入 undefined ，就从第一个参数里取', () => {
    expect(mergeConfig({ headers: 'x-mock-header' }, undefined)).toEqual({
      headers: 'x-mock-header'
    })
  })

  test('第一个参数为空，会取第二个参数，第一个参数有值就合并', () => {
    expect(
      mergeConfig(
        { auth: undefined },
        {
          auth: {
            username: 'lwt',
            password: '123'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'lwt',
        password: '123'
      }
    })
    expect(
      mergeConfig(
        {
          auth: {
            username: 'lwt',
            password: '123'
          }
        },
        {
          auth: {
            username: 'lh',
            password: '321'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'lh',
        password: '321'
      }
    })
  })

  test('如果第二个参数为 null 会覆盖掉第一个参数', () => {
    expect(
      mergeConfig(
        {
          headers: {
            common: {
              Accept: 'application/json, text/plain, */*'
            }
          }
        },
        {
          headers: null
        }
      )
    ).toEqual({ headers: null })
  })

  test('其他配置项的合并策略为 第二个参数有就合并覆盖第一个参数里的，第二个参数没有就用第一个参数的', () => {
    const merged = mergeConfig(defaults, { timeOut: 1000 })
    expect(merged.timeOut).toBe(1000)
  })
})
