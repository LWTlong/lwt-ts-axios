import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('创建错误类: createError', () => {
  test('createError', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'get' }
    const response: AxiosResponse = {
      data: { name: 'lwt' },
      status: 200,
      statusText: '成功',
      headers: null,
      config,
      request
    }
    const error = createError('error', config, '0', request, response)
    expect(error.message).toBe('error')
    expect(error.config).toBe(config)
    expect(error.code).toBe('0')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
    expect(error instanceof Error).toBeTruthy()
  })
})
