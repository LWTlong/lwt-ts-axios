import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/util'

// 定义合并策略函数的map
const strats = Object.create(null)

// 默认合并策略 如果用户没传入 就取默认值
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只取用户传入的配置 如 url, data, params
function fromUserStrat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 深拷贝
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    // 深拷贝函数
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

// 定义用户必传的配置属性
const stratKeysFromUser = ['url', 'params', 'data']
stratKeysFromUser.forEach(key => {
  strats[key] = fromUserStrat
})

// 需要深拷贝策略的对象
const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

/**
 * 合并方法 默认配置和用户传入的配置
 */
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  // 辅助合并方法
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
  return config
}
