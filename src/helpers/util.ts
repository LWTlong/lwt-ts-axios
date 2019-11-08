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

// 合并 Axios 类的原型属性和实例属性
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
