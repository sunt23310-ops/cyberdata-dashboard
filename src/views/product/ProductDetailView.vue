<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import { formatLargeNumber, formatAmount, formatSeconds } from '@/utils/format'
import type { ProductLiveItem } from '@/types/product'
import { getProductDetail, getProductRelatedLives } from '@/mock'

const route = useRoute()
const router = useRouter()
const productId = route.params.id as string

const breadcrumbs = [
  { label: 'Home', path: '/' },
  { label: '商品库', path: '/products' },
  { label: '商品详情' }
]

// 当前选中的图片索引
const selectedImageIndex = ref(0)

// 从 mock 获取商品详情 - 对齐 ProductDetail 类型
const product = getProductDetail(productId)

// 从 mock 获取关联直播
const relatedLives: ProductLiveItem[] = getProductRelatedLives(productId)

// 按类别分组的卖点
const highlightsByCategory = computed(() => {
  const grouped: Record<string, string[]> = {}
  if (product?.highlights) {
    product.highlights.forEach(h => {
      if (!grouped[h.category]) {
        grouped[h.category] = []
      }
      grouped[h.category]!.push(h.description)
    })
  }
  return grouped
})

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
          <!-- Product Images -->
          <div class="flex-shrink-0">
            <!-- Main Image -->
            <div class="w-80 h-80 bg-gray-100 rounded-sm flex items-center justify-center text-gray-400 mb-3">
              <span class="text-sm">商品主图</span>
            </div>
            <!-- Thumbnails (模拟 5 张图片) -->
            <div class="flex gap-2">
              <div
                v-for="index in 5"
                :key="index"
                @click="selectedImageIndex = index - 1"
                class="w-14 h-14 bg-gray-100 rounded-sm flex items-center justify-center cursor-pointer transition-all"
                :class="selectedImageIndex === index - 1 ? 'ring-2 ring-[#FF3B30]' : 'hover:ring-1 hover:ring-gray-300'"
              >
                <span class="text-[10px] text-gray-400">{{ index }}</span>
              </div>
            </div>
          </div>

          <!-- Product Details -->
          <div class="flex-1">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="text-4xl font-bold text-gray-900 mb-2">{{ product.productName }}</h2>
                <p class="text-sm text-gray-500">商品编码: {{ product.itemCode }}</p>
              </div>
              <span
                class="px-3 py-1 text-xs font-medium rounded-full"
                :class="product.status === 'on_sale' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
              >
                {{ product.status === 'on_sale' ? '在售' : '下架' }}
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
                <p class="text-gray-900">{{ product.categoryName }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">店铺</p>
                <p class="text-gray-900">{{ product.shopName }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">销量</p>
                <p class="text-gray-900 font-medium">{{ formatLargeNumber(product.sale) }}</p>
              </div>
            </div>

            <!-- Price Info - 使用 pricing 对象 -->
            <div class="border-t border-gray-100 pt-4">
              <div class="flex items-baseline gap-6">
                <div>
                  <p class="text-sm text-gray-500 mb-1">原价</p>
                  <p class="text-gray-400 line-through">{{ product.pricing.originalPrice }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">到手价</p>
                  <p class="text-2xl font-bold text-[#FF3B30]">{{ product.pricing.currentPrice }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">GMV</p>
                  <p class="text-gray-900 font-medium">{{ formatAmount(product.gmv) }}</p>
                </div>
              </div>
              <!-- 优惠信息 -->
              <div v-if="product.pricing.discountInfo || product.pricing.promotionStrategy" class="mt-3 flex gap-3">
                <span
                  v-if="product.pricing.discountInfo"
                  class="px-2 py-1 text-xs bg-red-50 text-[#FF3B30] rounded"
                >
                  {{ product.pricing.discountInfo }}
                </span>
                <span
                  v-if="product.pricing.promotionStrategy"
                  class="px-2 py-1 text-xs bg-orange-50 text-orange-600 rounded"
                >
                  {{ product.pricing.promotionStrategy }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Highlights - 使用 HighlightItem 结构 -->
      <div class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">产品卖点</h3>

        <!-- 按类别展示卖点 -->
        <div class="space-y-4">
          <div v-for="(items, category) in highlightsByCategory" :key="category">
            <p class="text-sm font-medium text-gray-500 mb-2">{{ category }}</p>
            <ul class="space-y-2">
              <li
                v-for="(description, index) in items"
                :key="index"
                class="flex items-start gap-2 text-gray-700"
              >
                <span class="w-1.5 h-1.5 bg-[#FF3B30] rounded-full mt-2 flex-shrink-0"></span>
                {{ description }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 置信度评分 -->
        <div v-if="product.confidenceScore" class="mt-4 pt-4 border-t border-gray-100">
          <p class="text-sm text-gray-500">
            置信度评分: <span class="font-medium text-gray-900">{{ (product.confidenceScore * 100).toFixed(1) }}%</span>
          </p>
        </div>
      </div>

      <!-- Product Ingredients/Specs - 使用 IngredientItem 结构 -->
      <div class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">产品规格</h3>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="ingredient in product.ingredients"
            :key="ingredient.name"
            class="flex border-b border-gray-100 pb-3"
          >
            <span class="w-24 text-sm text-gray-500 flex-shrink-0">{{ ingredient.name }}</span>
            <div class="flex-1">
              <span class="text-gray-900">{{ ingredient.concentration }}</span>
              <span v-if="ingredient.source" class="text-gray-500 text-sm ml-2">({{ ingredient.source }})</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Lives -->
      <div class="bg-white rounded-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">关联直播</h3>
        </div>

        <table class="w-full">
          <thead class="bg-[#0A0A0A]">
            <tr>
              <th class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide">直播ID</th>
              <th class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide">主播</th>
              <th class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide">播出时间</th>
              <th class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide">时长(秒)</th>
              <th class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide">提及次数</th>
              <th class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide">关键词</th>
              <th class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="live in relatedLives"
              :key="live.liveId"
              @click="router.push(`/lives/${live.liveId}/products/${productId}`)"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td class="px-4 py-3 text-[13px] font-mono text-gray-900">{{ live.liveId }}</td>
              <td class="px-4 py-3 text-[13px] text-gray-900">{{ live.anchor }}</td>
              <td class="px-4 py-3 text-[13px] text-gray-700">{{ formatSeconds(live.startTime) }} - {{ formatSeconds(live.endTime) }}</td>
              <td class="px-4 py-3 text-[13px] text-gray-700">{{ live.duration }}秒</td>
              <td class="px-4 py-3 text-[13px] text-gray-700">{{ live.mentions }}次</td>
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
                <span class="text-[#FF3B30] text-xs font-medium">查看详情 →</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
