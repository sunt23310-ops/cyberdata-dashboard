<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Eye } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import MetricCard from '@/components/ui/MetricCard.vue'
import { formatDuration, formatLargeNumber, formatAmount } from '@/utils/format'
import type { LiveProductItem } from '@/types/live'

const route = useRoute()
const router = useRouter()
const liveId = route.params.id as string

const breadcrumbs = [
  { label: 'Home', path: '/' },
  { label: '直播库', path: '/lives' },
  { label: '直播详情' }
]

// Mock live data (不变数据使用 const)
const live = {
  liveId: liveId,
  anchor: '李佳琦',
  startTime: '2024-01-15 20:00:00',
  totalDuration: 14520,
  viewCount: { value: 12300000, change: 8.5 },
  salesCount: { value: 85600, change: 12.3 },
  gmv: { value: 45600000, change: 15.7 },
  interaction: { value: 2580000, change: 6.2 }
}

// Mock products in this live (不变数据使用 const)
const liveProducts: LiveProductItem[] = [
  {
    itemCode: 'SKU001',
    productName: '高端护肤精华液',
    brand: '兰蔻',
    startTime: '04:44',
    endTime: '09:59',
    duration: 315,
    mentions: 12,
    keywords: ['小黑瓶', '精华', '修护', '抗老']
  },
  {
    itemCode: 'SKU002',
    productName: '清爽控油洁面乳',
    brand: '欧莱雅',
    startTime: '12:30',
    endTime: '18:45',
    duration: 375,
    mentions: 8,
    keywords: ['控油', '洁面', '清爽']
  },
  {
    itemCode: 'SKU003',
    productName: '持久保湿面霜',
    brand: '雅诗兰黛',
    startTime: '22:00',
    endTime: '28:30',
    duration: 390,
    mentions: 15,
    keywords: ['保湿', '面霜', '持久']
  },
  {
    itemCode: 'SKU004',
    productName: '防晒隔离霜SPF50',
    brand: '安耐晒',
    startTime: '35:00',
    endTime: '42:15',
    duration: 435,
    mentions: 10,
    keywords: ['防晒', 'SPF50', '隔离']
  }
]

const goBack = () => {
  router.push('/lives')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader :breadcrumbs="breadcrumbs" title="直播详情">
      <template #actions>
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          返回列表
        </button>
      </template>
    </PageHeader>

    <div class="p-6">
      <!-- Live Info Header -->
      <div class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ live.anchor }} 直播间</h2>
            <div class="flex items-center gap-6 text-sm text-gray-500">
              <span>直播ID: <span class="font-mono text-gray-700">{{ live.liveId }}</span></span>
              <span>开播时间: {{ live.startTime }}</span>
              <span>总时长: {{ formatDuration(live.totalDuration) }}</span>
            </div>
          </div>
          <span class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
            已结束
          </span>
        </div>
      </div>

      <!-- Metrics Cards -->
      <div class="grid grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="观看量"
          :value="formatLargeNumber(live.viewCount.value)"
          :change="live.viewCount.change"
          variant="light"
        />
        <MetricCard
          title="销量"
          :value="formatLargeNumber(live.salesCount.value)"
          :change="live.salesCount.change"
          variant="light"
        />
        <MetricCard
          title="GMV"
          :value="formatAmount(live.gmv.value)"
          :change="live.gmv.change"
          variant="dark"
        />
        <MetricCard
          title="互动量"
          :value="formatLargeNumber(live.interaction.value)"
          :change="live.interaction.change"
          variant="light"
        />
      </div>

      <!-- Products in Live -->
      <div class="bg-white rounded-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">直播商品</h3>
          <span class="text-sm text-gray-500">共 {{ liveProducts.length }} 个商品</span>
        </div>

        <table class="w-full text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">商品编码</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">商品名称</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">品牌</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">出现时间</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">时长(秒)</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">提及次数</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">关键词</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in liveProducts"
              :key="product.itemCode"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-3 font-mono text-gray-900">{{ product.itemCode }}</td>
              <td class="px-4 py-3 text-gray-900 font-medium">{{ product.productName }}</td>
              <td class="px-4 py-3 text-gray-700">{{ product.brand }}</td>
              <td class="px-4 py-3 text-gray-700">{{ product.startTime }} - {{ product.endTime }}</td>
              <td class="px-4 py-3 text-gray-700">{{ product.duration }}秒</td>
              <td class="px-4 py-3 text-gray-700">{{ product.mentions }}次</td>
              <td class="px-4 py-3">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="keyword in product.keywords.slice(0, 3)"
                    :key="keyword"
                    class="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    {{ keyword }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3">
                <router-link
                  :to="'/products/' + product.itemCode"
                  class="text-gray-500 hover:text-[#FF3B30] transition-colors"
                >
                  <Eye class="w-5 h-5" />
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
