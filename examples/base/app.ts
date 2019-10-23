import axios from '../../src/index'

const url = '/base/get'

axios({
  url: url,
  params:{
    fool: ['a','b','c']
  }
})

axios({
  url:url,
  params: {
    fool: {
      name: 'LWT'
    }
  }
})

axios({
  url: url,
  params: {
    fool: '@$, '
  }
})

const date = new Date()
axios({
  url: url,
  params: {
    date: date
  }
})

axios({
  url:'/base/get#/path',
  params:{
    fool: 'hash'
  }
})

axios({
  url: url + '?name=lwt',
  params:{
    sex: 'man'
  }
})

axios({
  url: url,
  params: {
    name: 'lwt',
    age: null
  }
})
