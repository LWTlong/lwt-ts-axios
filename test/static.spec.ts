import axios from '../src/index'

describe('静态方法', () => {
  test('all', done => {
    let all = false
    axios.all([true, false]).then(arg => {
      all = arg[0]
    })
    setTimeout(() => {
      expect(all).toBeTruthy()
      done()
    }, 100)
  })

  test('spread', done => {
    let sum = 0
    let fulfilled = false
    let result: any
    axios
      .all([12, 34])
      .then(
        axios.spread((a, b) => {
          sum = a + b
          fulfilled = true
          return 'hello'
        })
      )
      .then(res => {
        result = res
      })
    setTimeout(() => {
      expect(fulfilled).toBeTruthy()
      expect(sum).toBe(12 + 34)
      expect(result).toBe('hello')
      done()
    }, 100)
  })
})
