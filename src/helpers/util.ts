const toString = Object.prototype.toString

// 是否为 date 对象
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 是否 是一个对象
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 是否为普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
