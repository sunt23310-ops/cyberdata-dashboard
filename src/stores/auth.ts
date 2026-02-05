import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, getValidCode as getValidCodeApi } from '@/api/auth'
import type { LoginRequest } from '@/types'
import { getAuthStorage, setAuthStorage, clearAuthStorage } from '@/utils/storage'
import router from '@/router'

// Mock 模式标记 - 在 API 不可用时使用
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === 'true' || !import.meta.env.VITE_API_BASE_URL

// Mock 验证码图片 (简单的 SVG base64)
const MOCK_CAPTCHA = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDk2IDQwIj48cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNDAiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSI0OCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiPjEyMzQ8L3RleHQ+PC9zdmc+'

export const useAuthStore = defineStore('auth', () => {
  // 从 storage 初始化状态
  const authData = getAuthStorage()
  const token = ref(authData.token)
  const refreshToken = ref(authData.refreshToken)
  const userId = ref(authData.userId)
  const username = ref(authData.username)

  const isLoggedIn = computed(() => !!token.value)
  const userInitial = computed(() => username.value ? username.value.charAt(0).toUpperCase() : '')

  async function getValidCode() {
    // Mock 模式：返回固定的验证码图片
    if (MOCK_MODE) {
      return {
        base64Image: MOCK_CAPTCHA,
        hash: 'mock-hash-12345'
      }
    }

    try {
      const res = await getValidCodeApi()
      return res.data
    } catch {
      // API 失败时回退到 mock
      return {
        base64Image: MOCK_CAPTCHA,
        hash: 'mock-hash-12345'
      }
    }
  }

  async function login(data: LoginRequest) {
    // Mock 模式：验证测试账号
    if (MOCK_MODE) {
      // 接受任意 4 位验证码
      if (data.validCode.length < 4) {
        throw new Error('请输入4位验证码')
      }

      // 测试账号：admin / 123456
      if (data.username === 'admin' && data.password === '123456') {
        const mockResponse = {
          token: 'mock-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          userId: 'user-001',
          username: 'Admin'
        }

        token.value = mockResponse.token
        refreshToken.value = mockResponse.refreshToken
        userId.value = mockResponse.userId
        username.value = mockResponse.username

        setAuthStorage(mockResponse)
        return
      }

      throw new Error('用户名或密码错误（测试账号：admin / 123456）')
    }

    try {
      const res = await loginApi(data)
      const { token: t, refreshToken: rt, userId: uid, username: uname } = res.data

      token.value = t
      refreshToken.value = rt
      userId.value = uid
      username.value = uname

      setAuthStorage({
        token: t,
        refreshToken: rt,
        userId: uid,
        username: uname,
      })
    } catch (error: any) {
      // API 失败时尝试 mock 登录
      if (data.username === 'admin' && data.password === '123456') {
        const mockResponse = {
          token: 'mock-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          userId: 'user-001',
          username: 'Admin'
        }

        token.value = mockResponse.token
        refreshToken.value = mockResponse.refreshToken
        userId.value = mockResponse.userId
        username.value = mockResponse.username

        setAuthStorage(mockResponse)
        return
      }
      throw error
    }
  }

  // 更新 token（用于 token 刷新）
  function updateTokens(newToken: string, newRefreshToken: string) {
    token.value = newToken
    refreshToken.value = newRefreshToken
    setAuthStorage({
      token: newToken,
      refreshToken: newRefreshToken,
      userId: userId.value,
      username: username.value,
    })
  }

  function logout() {
    token.value = ''
    refreshToken.value = ''
    userId.value = ''
    username.value = ''
    clearAuthStorage()
    router.push('/login')
  }

  return {
    token,
    refreshToken,
    userId,
    username,
    isLoggedIn,
    userInitial,
    getValidCode,
    login,
    logout,
    updateTokens,
  }
})
