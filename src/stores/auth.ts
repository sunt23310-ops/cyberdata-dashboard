import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, getValidCode as getValidCodeApi } from '@/api/auth'
import type { LoginRequest } from '@/types'
import { getAuthStorage, setAuthStorage, clearAuthStorage } from '@/utils/storage'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  // 从 storage 初始化状态
  const authData = getAuthStorage()
  const token = ref(authData.token)
  const refreshToken = ref(authData.refreshToken)
  const userId = ref(authData.userId)
  const username = ref(authData.username)

  const isLoggedIn = computed(() => !!token.value)
  const userInitial = computed(() => username.value ? username.value.charAt(0) : '')

  async function getValidCode() {
    const res = await getValidCodeApi()
    return res.data
  }

  async function login(data: LoginRequest) {
    const res = await loginApi(data)
    const { token: t, refreshToken: rt, userId: uid, username: uname } = res.data

    // 更新 Pinia 状态
    token.value = t
    refreshToken.value = rt
    userId.value = uid
    username.value = uname

    // 同步到 localStorage
    setAuthStorage({
      token: t,
      refreshToken: rt,
      userId: uid,
      username: uname,
    })
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
