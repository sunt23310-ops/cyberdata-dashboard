import axios, { type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types'
import router from '@/router'
import { getStorageItem, setStorageItem, STORAGE_KEYS, clearAuthStorage } from '@/utils/storage'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/eden',
  timeout: 15000,
})

// 是否正在刷新 Token
let isRefreshing = false
let pendingRequests: Array<(token: string) => void> = []

// 请求拦截器
request.interceptors.request.use((config) => {
  const token = getStorageItem(STORAGE_KEYS.TOKEN)
  if (token) {
    config.headers['token'] = token
  }
  return config
})

// 响应拦截器 - 返回解包后的 ApiResponse 数据
request.interceptors.response.use(
  (response): Promise<AxiosResponse> | AxiosResponse => {
    const data = response.data as ApiResponse

    // Token 过期
    if (data.code === 5102) {
      const originalConfig = response.config

      if (!isRefreshing) {
        isRefreshing = true
        const refreshToken = getStorageItem(STORAGE_KEYS.REFRESH_TOKEN)

        return axios
          .post(`${originalConfig.baseURL}/eden/public/v1/auth/refresh`, {
            refreshToken,
          })
          .then((res) => {
            const { token, refreshToken: newRefreshToken } = res.data.data
            setStorageItem(STORAGE_KEYS.TOKEN, token)
            setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken)

            pendingRequests.forEach((cb) => cb(token))
            pendingRequests = []

            originalConfig.headers['token'] = token
            return request(originalConfig)
          })
          .catch(() => {
            clearAuthStorage()
            router.push('/login')
            return Promise.reject(new Error('登录已失效'))
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      return new Promise((resolve) => {
        pendingRequests.push((token: string) => {
          originalConfig.headers['token'] = token
          resolve(request(originalConfig))
        })
      })
    }

    // 登录失效
    if (data.code === 5101) {
      clearAuthStorage()
      router.push('/login')
      return Promise.reject(new Error('登录已失效，请重新登录'))
    }

    // 业务错误
    if (data.code !== 200) {
      return Promise.reject(new Error(data.message || '请求失败'))
    }

    // 返回解包后的数据，使用类型断言
    return data as unknown as AxiosResponse
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
