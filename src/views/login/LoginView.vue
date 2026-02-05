<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Lock, Eye, EyeOff, RefreshCw, Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Form state
const username = ref('')
const password = ref('')
const validCode = ref('')
const hash = ref('')
const loading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')
const captchaImage = ref('')

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Refresh captcha
const refreshCaptcha = async () => {
  try {
    const result = await authStore.getValidCode()
    if (result) {
      hash.value = result.hash || ''
      captchaImage.value = result.base64Image || ''
    }
  } catch (error) {
    console.error('Failed to get captcha:', error)
  }
}

// Handle form submission
const handleSubmit = async () => {
  errorMessage.value = ''

  if (!username.value || !password.value || !validCode.value) {
    errorMessage.value = '请填写所有必填字段'
    return
  }

  loading.value = true

  try {
    await authStore.login({
      username: username.value,
      password: password.value,
      validCode: validCode.value,
      hash: hash.value
    })

    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  } catch (error: any) {
    errorMessage.value = error.message || '登录失败，请重试'
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}

// Initialize captcha on mount
onMounted(() => {
  refreshCaptcha()
})
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
    <!-- Login Card -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <!-- Logo Section -->
      <div class="flex items-center justify-center gap-3 mb-8">
        <div class="w-10 h-10 bg-[#FF3B30] rounded-lg flex flex-col items-center justify-center gap-1 p-2">
          <div class="w-5 h-0.5 bg-white rounded-full"></div>
          <div class="w-5 h-0.5 bg-white rounded-full"></div>
          <div class="w-5 h-0.5 bg-white rounded-full"></div>
        </div>
        <span class="text-xl font-bold text-gray-900">赛博数据</span>
      </div>

      <!-- Title -->
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">欢迎回来</h2>
        <p class="text-sm text-gray-500">登录您的账号以继续</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-sm"
      >
        {{ errorMessage }}
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Username Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="username"
              type="text"
              class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent transition-colors"
              placeholder="请输入用户名"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent transition-colors"
              placeholder="请输入密码"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Eye v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
              <EyeOff v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        <!-- Captcha Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">验证码</label>
          <div class="flex gap-3">
            <input
              v-model="validCode"
              type="text"
              class="flex-1 px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent transition-colors"
              placeholder="请输入验证码"
            />
            <div class="flex items-center gap-2">
              <!-- Captcha Image -->
              <img
                v-if="captchaImage"
                :src="captchaImage"
                alt="验证码"
                class="w-24 h-10 rounded-sm border border-gray-200 cursor-pointer"
                @click="refreshCaptcha"
              />
              <div
                v-else
                class="w-24 h-10 bg-gray-200 rounded-sm flex items-center justify-center text-gray-500 text-xs"
              >
                加载中...
              </div>
              <button
                type="button"
                @click="refreshCaptcha"
                class="p-2 text-gray-500 hover:text-[#FF3B30] transition-colors"
              >
                <RefreshCw class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              class="w-4 h-4 text-[#FF3B30] border-gray-300 rounded focus:ring-[#FF3B30]"
            />
            <span class="text-sm text-gray-600">记住我</span>
          </label>
          <a href="#" class="text-sm text-[#FF3B30] hover:underline">忘记密码?</a>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 bg-[#FF3B30] text-white font-medium rounded-sm hover:bg-[#E0352B] focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Loader2 v-if="loading" class="h-5 w-5 animate-spin" />
          <span>{{ loading ? '登录中...' : '登 录' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>
