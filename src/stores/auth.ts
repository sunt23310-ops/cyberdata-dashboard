import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, getValidCode as getValidCodeApi } from '@/api/auth'
import type { LoginRequest } from '@/types'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const refreshToken = ref(localStorage.getItem('refreshToken') || '')
  const userId = ref(localStorage.getItem('userId') || '')
  const username = ref(localStorage.getItem('username') || '')

  const isLoggedIn = computed(() => !!token.value)
  const userInitial = computed(() => username.value ? username.value.charAt(0) : '')

  async function getValidCode() {
    const res = await getValidCodeApi()
    return res.data
  }

  async function login(data: LoginRequest) {
    const res = await loginApi(data)
    const { token: t, refreshToken: rt, userId: uid, username: uname } = res.data

    token.value = t
    refreshToken.value = rt
    userId.value = uid
    username.value = uname

    localStorage.setItem('token', t)
    localStorage.setItem('refreshToken', rt)
    localStorage.setItem('userId', uid)
    localStorage.setItem('username', uname)
  }

  function logout() {
    token.value = ''
    refreshToken.value = ''
    userId.value = ''
    username.value = ''
    localStorage.clear()
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
  }
})
