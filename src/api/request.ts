import axios from 'axios'
import type { ApiResponse } from '@/types'
import router from '@/router'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/eden',
  timeout: 15000,
})

// 是否正在刷新 Token
let isRefreshing = false
let pendingRequests: Array<(token: string) => void> = []

// 请求拦截器
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['token'] = token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const data = response.data as ApiResponse

    // Token 过期
    if (data.code === 5102) {
      const originalConfig = response.config

      if (!isRefreshing) {
        isRefreshing = true
        const refreshToken = localStorage.getItem('refreshToken')

        return axios
          .post(`${originalConfig.baseURL}/eden/public/v1/auth/refresh`, {
            refreshToken,
          })
          .then((res) => {
            const { token, refreshToken: newRefreshToken } = res.data.data
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', newRefreshToken)

            pendingRequests.forEach((cb) => cb(token))
            pendingRequests = []

            originalConfig.headers['token'] = token
            return request(originalConfig)
          })
          .catch(() => {
            localStorage.clear()
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
      localStorage.clear()
      router.push('/login')
      return Promise.reject(new Error('登录已失效，请重新登录'))
    }

    // 业务错误
    if (data.code !== 200) {
      return Promise.reject(new Error(data.message || '请求失败'))
    }

    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
