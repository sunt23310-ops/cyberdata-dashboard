<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Eye } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'

const route = useRoute()
const router = useRouter()
const productId = route.params.id as string

const breadcrumbs = [
  { label: 'Home', path: '/' },
  { label: '商品库', path: '/products' },
  { label: '商品详情' }
]

// Mock product data
const product = ref({
  itemCode: productId,
  productName: '高端护肤精华液',
  brand: '兰蔻',
  category: '护肤品 > 精华',
  shopName: '兰蔻官方旗舰店',
  originalPrice: 899,
  couponPrice: 699,
  sales: 12345,
  gmv: 8623155,
  imageUrl: '',
  highlights: [
    '小黑瓶精华，全球畅销明星产品',
    '肌底修护，细腻毛孔，改善肤质',
    '二裂酵母精粹，强韧肌肤屏障',
    '适合各种肤质，温和不刺激'
  ],
  specs: [
    { label: '规格', value: '50ml/瓶' },
    { label: '产地', value: '法国' },
    { label: '保质期', value: '36个月' },
    { label: '适用肤质', value: '所有肤质' }
  ]
})

// Mock related lives
const relatedLives = ref([
  {
    liveId: 'LIVE001',
    anchor: '李佳琦',
    startTime: '04:44',
    endTime: '09:59',
    duration: 315,
    mentions: 12,
    keywords: ['小黑瓶', '精华', '修护', '抗老']
  },
  {
    liveId: 'LIVE002',
    anchor: '薇娅',
    startTime: '12:30',
    endTime: '18:45',
    duration: 375,
    mentions: 8,
    keywords: ['护肤', '精华液', '保湿']
  }
])

const formatPrice = (price: number): string => {
  return '¥' + price.toFixed(2)
}

const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toLocaleString()
}

const goBack = () => {
  router.push('/products')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader :breadcrumbs="breadcrumbs" title="商品详情">
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
      <!-- Product Info Section -->
      <div class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <div class="flex gap-8">
          <!-- Product Image -->
          <div class="w-80 h-80 bg-gray-100 rounded-sm flex-shrink-0 flex items-center justify-center text-gray-400">
            <span class="text-sm">商品图片</span>
          </div>

          <!-- Product Details -->
          <div class="flex-1">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ product.productName }}</h2>
                <p class="text-sm text-gray-500">商品编码: {{ product.itemCode }}</p>
              </div>
              <span class="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                在售
              </span>
            </div>

            <!-- Basic Info Grid -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-sm text-gray-500 mb-1">品牌</p>
                <p class="text-gray-900 font-medium">{{ product.brand }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">类目</p>
                <p class="text-gray-900">{{ product.category }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">店铺</p>
                <p class="text-gray-900">{{ product.shopName }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">销量</p>
                <p class="text-gray-900 font-medium">{{ formatNumber(product.sales) }}</p>
              </div>
            </div>

            <!-- Price Info -->
            <div class="border-t border-gray-100 pt-4">
              <div class="flex items-baseline gap-4">
                <div>
                  <p class="text-sm text-gray-500 mb-1">原价</p>
                  <p class="text-gray-400 line-through">{{ formatPrice(product.originalPrice) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">到手价</p>
                  <p class="text-2xl font-bold text-[#FF3B30]">{{ formatPrice(product.couponPrice) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">GMV</p>
                  <p class="text-gray-900 font-medium">{{ formatPrice(product.gmv) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Highlights -->
      <div class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">产品卖点</h3>
        <ul class="space-y-2">
          <li
            v-for="(highlight, index) in product.highlights"
            :key="index"
            class="flex items-start gap-2 text-gray-700"
          >
            <span class="w-1.5 h-1.5 bg-[#FF3B30] rounded-full mt-2 flex-shrink-0"></span>
            {{ highlight }}
          </li>
        </ul>
      </div>

      <!-- Product Specs -->
      <div class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">产品规格</h3>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="spec in product.specs"
            :key="spec.label"
            class="flex border-b border-gray-100 pb-3"
          >
            <span class="w-24 text-sm text-gray-500 flex-shrink-0">{{ spec.label }}</span>
            <span class="text-gray-900">{{ spec.value }}</span>
          </div>
        </div>
      </div>

      <!-- Related Lives -->
      <div class="bg-white rounded-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">关联直播</h3>
        </div>

        <table class="w-full text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">直播ID</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">主播</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">播出时间</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">时长(秒)</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">提及次数</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">关键词</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="live in relatedLives"
              :key="live.liveId"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-3 font-mono text-gray-900">{{ live.liveId }}</td>
              <td class="px-4 py-3 text-gray-900">{{ live.anchor }}</td>
              <td class="px-4 py-3 text-gray-700">{{ live.startTime }} - {{ live.endTime }}</td>
              <td class="px-4 py-3 text-gray-700">{{ live.duration }}秒</td>
              <td class="px-4 py-3 text-gray-700">{{ live.mentions }}次</td>
              <td class="px-4 py-3">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="keyword in live.keywords.slice(0, 3)"
                    :key="keyword"
                    class="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    {{ keyword }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3">
                <router-link
                  :to="'/lives/' + live.liveId"
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
