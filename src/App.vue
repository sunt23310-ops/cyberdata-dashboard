<script setup lang="ts">
import { useRoute } from 'vue-router'
import Sidebar from '@/components/layout/Sidebar.vue'

const route = useRoute()
</script>

<template>
  <!-- Login page: no layout chrome -->
  <RouterView v-if="route.path === '/login'" />

  <!-- Authenticated layout: sidebar + content -->
  <div v-else class="flex h-screen overflow-hidden">
    <Sidebar />
    <main class="flex-1 overflow-y-auto bg-gray-50">
      <RouterView />
    </main>
  </div>
</template>
