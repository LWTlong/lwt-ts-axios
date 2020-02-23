import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('http 授权', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('http Basic', () => {
    axios('/user', {
      auth: {
        username: 'lwt',
        password: '123'
      }
    })
    return getAjaxRequest().then(res => {
      expect(res.requestHeaders['Authorization']).toBe('Basic bHd0OjEyMw==')
    })
  })

  test('不能包含非拉丁字符', () => {
    return axios('/user', {
      auth: {
        username: '🙄Happy',
        password: '123'
      }
    })
      .then(() => {
        throw new Error('不能使用拉丁字符生成')
      })
      .catch(error => {
        expect(/character/i.test(error.message)).toBeTruthy()
      })
  })
})
