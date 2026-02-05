import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/products',
      name: 'ProductList',
      component: () => import('@/views/product/ProductListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: () => import('@/views/product/ProductDetailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/lives',
      name: 'LiveList',
      component: () => import('@/views/live/LiveListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/lives/:id',
      name: 'LiveDetail',
      component: () => import('@/views/live/LiveDetailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/lives/:liveId/products/:itemCode',
      name: 'LiveProductDetail',
      component: () => import('@/views/live/LiveProductDetailView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// 路由守卫
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.path === '/login' && authStore.isLoggedIn) {
    return { path: '/' }
  }
})

export default router
