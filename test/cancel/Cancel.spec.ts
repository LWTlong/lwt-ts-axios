import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('取消请求：Cancel', () => {
  test('Cancel 类', () => {
    const cancel = new Cancel('message')
    expect(cancel.message).toBe('message')
  })

  test('判断是否是一个 Cancel 实列', () => {
    expect(isCancel(new Cancel())).toBeTruthy()
    expect(isCancel({ name: 'lwt' })).toBeFalsy()
  })
})
