// 定义请求类型的 字符字面量  定义请求类型指定的固定值
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 定义 config 的接口
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeOut?: number
  transformRequest?: AxiosTransform | AxiosTransform[]
  transformResponse?: AxiosTransform | AxiosTransform[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string

  [propName: string]: any
}

// 定义一个返回 promise 对象接口类型
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 定义返回的 promise 对象接口
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// 增强 Error 返回的内容  扩展 Error 接口
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 定义 axios 方法类 的接口
export interface Axios {
  // 默认配置
  defaults: AxiosRequestConfig
  // 拦截器
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 定义拦截器 use 方法接口
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransform {
  (data: any, headers?: any): any
}

// 定义 axios create 静态接口
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

// 定义 CancelToken 接口
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

// 定义取消方法接口
export interface Canceler {
  (message?: string): void
}

// 定义 Cancel 构造函数的参数类型
export interface CancelExecutor {
  (cancel: Canceler): void
}

// 定义一个通过 CancelToken.source 方法返回的一个对象接口
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// 定义 CancelToken Static 接口
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

// 定义 Cancel 类
export interface Cancel {
  message?: string
}

// Cancel 类的类类型
export interface CancelStatic {
  new (message?: string): Cancel
}
