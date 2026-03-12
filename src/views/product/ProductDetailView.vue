<script setup lang="ts">
import { computed } from 'vue'
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

// 从 mock 获取商品详情 - 对齐 ProductDetail 类型
const product = getProductDetail(productId)

// 从 mock 获取关联直播
const relatedLives: ProductLiveItem[] = getProductRelatedLives(productId)

// 从 highlights 中提取各类信息
const productHighlights = computed(() => {
  return product?.highlights?.filter(h => h.category === '产品相关' && !h.description.startsWith('核心成分：')) || []
})

const coreIngredients = computed(() => {
  const item = product?.highlights?.find(h => h.description.startsWith('核心成分：'))
  return item ? item.description.replace('核心成分：', '') : ''
})

const targetAudience = computed(() => {
  const item = product?.highlights?.find(h => h.category === '适用人群')
  return item ? item.description.replace('适用人群：', '') : ''
})

const anchorScript = computed(() => {
  const item = product?.highlights?.find(h => h.category === '主播讲解')
  return item ? item.description.replace('李佳琦推荐：', '') : ''
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
            <div class="w-80 h-80 bg-gray-100 rounded-sm flex items-center justify-center overflow-hidden mb-3">
              <img
                v-if="product.mainImages && product.mainImages.startsWith('http')"
                :src="product.mainImages"
                :alt="product.productName"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-sm text-gray-400">商品主图</span>
            </div>
            <!-- Thumbnail -->
            <div class="flex gap-2" v-if="product.mainImages && product.mainImages.startsWith('http')">
              <div
                class="w-14 h-14 bg-gray-100 rounded-sm overflow-hidden cursor-pointer ring-2 ring-[#FF3B30]"
              >
                <img :src="product.mainImages" :alt="product.productName" class="w-full h-full object-cover" />
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
                  <p class="text-sm text-gray-500 mb-1">价格区间</p>
                  <p class="text-2xl font-bold text-[#FF3B30]">{{ product.pricing.originalPrice }}</p>
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

      <!-- 产品亮点 -->
      <div class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">产品亮点</h3>
        <ul v-if="productHighlights.length" class="space-y-2">
          <li
            v-for="(h, index) in productHighlights"
            :key="index"
            class="flex items-start gap-2 text-gray-700"
          >
            <span class="w-1.5 h-1.5 bg-[#FF3B30] rounded-full mt-2 flex-shrink-0"></span>
            {{ h.description }}
          </li>
        </ul>
        <p v-else class="text-sm text-gray-400">暂无亮点信息</p>
      </div>

      <!-- 核心成分 -->
      <div v-if="coreIngredients" class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">核心成分</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(ingredient, index) in coreIngredients.split(/[、+，,]/)"
            :key="index"
            class="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full"
          >
            {{ ingredient.trim() }}
          </span>
        </div>
      </div>

      <!-- 适用人群 -->
      <div v-if="targetAudience" class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">适用人群</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(tag, index) in targetAudience.replace(/`/g, '').split(/[|｜]/)"
            :key="index"
            class="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-full"
          >
            {{ tag.trim() }}
          </span>
        </div>
      </div>

      <!-- 主播讲解 -->
      <div v-if="anchorScript" class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">李佳琦直播话术</h3>
        <div class="bg-orange-50 rounded-sm p-4 border-l-4 border-[#FF3B30]">
          <p class="text-gray-700 leading-relaxed text-sm">{{ anchorScript }}</p>
        </div>
      </div>

      <!-- 产品规格 -->
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
