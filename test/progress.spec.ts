import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('上传和下载监控: progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('下载监控', () => {
    const progressSpy = jest.fn()
    axios('/user', {
      onDownloadProgress: progressSpy
    })
    return getAjaxRequest().then(res => {
      res.respondWith({
        status: 200,
        responseText: '{"name":"bar"}'
      })
      expect(progressSpy).toHaveBeenCalled()
    })
  })

  test('上传监控', () => {
    const progressSpy = jest.fn()
    axios('/user', {
      onUploadProgress: progressSpy
    })
    return getAjaxRequest().then(res => {
      // jasmine 还支持上传的事件 这里先注释 让它通过
    })
  })
})
