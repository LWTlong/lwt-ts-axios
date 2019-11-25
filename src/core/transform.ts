import { AxiosTransform } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransform | AxiosTransform[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
