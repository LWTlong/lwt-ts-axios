import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

/**
 * 创建 Axios 类，返回一个 Axios 实列
 */
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  // 返回的instance 可以看作默认调用的 Axios 的 request 方法
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
