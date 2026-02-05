<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LayoutDashboard, Radio, Package, LogOut } from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: '直播库', icon: Radio, path: '/lives' },
  { label: '商品库', icon: Package, path: '/products' },
]

function isActive(path: string): boolean {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path === path || route.path.startsWith(path + '/')
}

function handleLogout() {
  authStore.logout()
}
</script>

<template>
  <aside class="w-[280px] min-w-[280px] h-screen bg-[#0A0A0A] flex flex-col">
    <!-- Logo Section -->
    <div class="flex items-center gap-3 px-6 py-6">
      <div class="w-9 h-9 bg-[#FF3B30] rounded-lg flex flex-col items-center justify-center gap-[3px]">
        <span class="block w-4 h-[2px] bg-white rounded-full"></span>
        <span class="block w-4 h-[2px] bg-white rounded-full"></span>
        <span class="block w-4 h-[2px] bg-white rounded-full"></span>
      </div>
      <span class="text-white text-lg font-semibold tracking-wide">赛博数据</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 mt-4 px-3">
      <ul class="space-y-1">
        <li v-for="item in navItems" :key="item.path">
          <RouterLink
            :to="item.path"
            class="relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors duration-150"
            :class="
              isActive(item.path)
                ? 'text-white bg-white/[0.06]'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
            "
          >
            <!-- Active indicator -->
            <span
              v-if="isActive(item.path)"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#FF3B30] rounded-r-full"
            ></span>
            <component :is="item.icon" :size="20" :stroke-width="1.8" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- User Section -->
    <div class="px-4 py-5 border-t border-white/[0.06]">
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-full bg-[#FF3B30] flex items-center justify-center text-white text-sm font-medium shrink-0"
        >
          {{ authStore.userInitial }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-white text-sm font-medium truncate">{{ authStore.username }}</p>
        </div>
        <button
          @click="handleLogout"
          class="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors duration-150"
          title="退出登录"
        >
          <LogOut :size="18" :stroke-width="1.8" />
        </button>
      </div>
    </div>
  </aside>
</template>
