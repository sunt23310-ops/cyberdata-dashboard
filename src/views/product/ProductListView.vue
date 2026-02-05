<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import FilterButton from '@/components/ui/FilterButton.vue'
import Pagination from '@/components/ui/Pagination.vue'
import { formatPrice, formatLargeNumber, formatAmount } from '@/utils/format'
import { mockProducts } from '@/mock'

const router = useRouter()

const breadcrumbs = [
  { label: 'Home', path: '/' },
  { label: '商品库' }
]

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// Filter values
const categoryFilter = ref('')
const brandFilter = ref('')
const priceFilter = ref('')

// Sort state
type SortField = 'productName' | 'brand' | 'category' | 'couponPrice' | 'sales' | 'gmv' | null
type SortOrder = 'asc' | 'desc'
const sortField = ref<SortField>(null)
const sortOrder = ref<SortOrder>('desc')

// Filter options (expanded for 50 products)
const categoryOptions = [
  { label: '全部', value: '' },
  { label: '护肤品', value: '护肤品' },
  { label: '洁面', value: '洁面' },
  { label: '洗护', value: '洗护' },
  { label: '防晒', value: '防晒' },
  { label: '彩妆', value: '彩妆' },
  { label: '精华', value: '精华' },
  { label: '面膜', value: '面膜' }
]

const brandOptions = [
  { label: '全部', value: '' },
  { label: '兰蔻', value: '兰蔻' },
  { label: '欧莱雅', value: '欧莱雅' },
  { label: '雅诗兰黛', value: '雅诗兰黛' },
  { label: '潘婷', value: '潘婷' },
  { label: '安耐晒', value: '安耐晒' },
  { label: 'SK-II', value: 'SK-II' },
  { label: '资生堂', value: '资生堂' },
  { label: '娇韵诗', value: '娇韵诗' },
  { label: '倩碧', value: '倩碧' },
  { label: '海蓝之谜', value: '海蓝之谜' }
]

const priceOptions = [
  { label: '全部', value: '' },
  { label: '0-100', value: '0-100' },
  { label: '100-500', value: '100-500' },
  { label: '500-1000', value: '500-1000' },
  { label: '1000以上', value: '1000+' }
]

// 筛选后的数据
const filteredProducts = computed(() => {
  let result = [...mockProducts]

  // 搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.productName.toLowerCase().includes(query) ||
      p.itemCode.toLowerCase().includes(query)
    )
  }

  // 类目过滤
  if (categoryFilter.value) {
    result = result.filter(p => p.category === categoryFilter.value)
  }

  // 品牌过滤
  if (brandFilter.value) {
    result = result.filter(p => p.brand === brandFilter.value)
  }

  // 价格区间过滤
  if (priceFilter.value) {
    result = result.filter(p => {
      const price = p.couponPrice
      switch (priceFilter.value) {
        case '0-100': return price >= 0 && price < 100
        case '100-500': return price >= 100 && price < 500
        case '500-1000': return price >= 500 && price < 1000
        case '1000+': return price >= 1000
        default: return true
      }
    })
  }

  // 排序
  if (sortField.value) {
    const field = sortField.value
    result.sort((a, b) => {
      const aVal = a[field]
      const bVal = b[field]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder.value === 'asc'
          ? aVal.localeCompare(bVal, 'zh-CN')
          : bVal.localeCompare(aVal, 'zh-CN')
      }
      return sortOrder.value === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })
  }

  return result
})

// 分页后的数据
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredProducts.value.slice(start, start + pageSize.value)
})

const total = computed(() => filteredProducts.value.length)

// 点击排序
function toggleSort(field: SortField) {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'desc'
  }
}

// 获取排序图标组件
function getSortIcon(field: SortField) {
  if (sortField.value !== field) return ArrowUpDown
  return sortOrder.value === 'asc' ? ArrowUp : ArrowDown
}

// 搜索
function handleSearch() {
  currentPage.value = 1
}

function handlePageChange(page: number) {
  currentPage.value = page
}

// 点击行跳转详情
function goToDetail(itemCode: string) {
  router.push(`/products/${itemCode}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader :breadcrumbs="breadcrumbs" title="商品库" />

    <div class="p-6">
      <!-- Filter Row -->
      <div class="flex items-center gap-4 mb-6">
        <div class="relative w-80">
          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search :size="16" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索商品名称或编码..."
            class="h-10 w-full rounded-sm border border-gray-200 bg-white pl-9 pr-20 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-shadow focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/20"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            class="absolute right-1 top-1 bottom-1 px-4 bg-[#FF3B30] text-white text-sm font-medium rounded-sm hover:bg-[#E0352B] transition-colors"
          >
            搜索
          </button>
        </div>
        <FilterButton
          v-model="categoryFilter"
          label="类目"
          :options="categoryOptions"
        />
        <FilterButton
          v-model="brandFilter"
          label="品牌"
          :options="brandOptions"
        />
        <FilterButton
          v-model="priceFilter"
          label="价格"
          :options="priceOptions"
        />
      </div>

      <!-- Table -->
      <div class="bg-white rounded-sm border border-gray-200">
        <table class="w-full">
          <thead class="bg-[#0A0A0A] text-white">
            <tr>
              <th class="px-4 py-3 text-left text-[11px] font-medium tracking-wide" style="width: 60px">图片</th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('productName')"
              >
                <span class="inline-flex items-center gap-1">
                  商品名称
                  <component :is="getSortIcon('productName')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('brand')"
              >
                <span class="inline-flex items-center gap-1">
                  品牌
                  <component :is="getSortIcon('brand')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('category')"
              >
                <span class="inline-flex items-center gap-1">
                  类目
                  <component :is="getSortIcon('category')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('couponPrice')"
              >
                <span class="inline-flex items-center gap-1">
                  价格
                  <component :is="getSortIcon('couponPrice')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('sales')"
              >
                <span class="inline-flex items-center gap-1">
                  销量
                  <component :is="getSortIcon('sales')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('gmv')"
              >
                <span class="inline-flex items-center gap-1">
                  GMV
                  <component :is="getSortIcon('gmv')" class="w-3 h-3" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in paginatedProducts"
              :key="product.itemCode"
              @click="goToDetail(product.itemCode)"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td class="px-4 py-3">
                <div class="w-10 h-10 bg-gray-200 rounded-sm"></div>
              </td>
              <td class="px-4 py-3">
                <div class="text-[13px] font-medium text-gray-900">{{ product.productName }}</div>
                <div class="text-[11px] text-gray-500 mt-1">{{ product.itemCode }}</div>
              </td>
              <td class="px-4 py-3 text-[13px] text-gray-700">{{ product.brand }}</td>
              <td class="px-4 py-3 text-[13px] text-gray-700">{{ product.category }}</td>
              <td class="px-4 py-3">
                <div class="line-through text-gray-400 text-[11px]">{{ formatPrice(product.originalPrice) }}</div>
                <div class="text-[13px] text-[#FF3B30] font-medium">{{ formatPrice(product.couponPrice) }}</div>
              </td>
              <td class="px-4 py-3 text-[13px] text-gray-700">{{ formatLargeNumber(product.sales) }}</td>
              <td class="px-4 py-3 text-[13px] text-[#FF3B30] font-semibold">{{ formatAmount(product.gmv) }}</td>
            </tr>
            <tr v-if="paginatedProducts.length === 0">
              <td colspan="7" class="px-4 py-12 text-center text-gray-500">
                没有找到匹配的商品
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-6">
        <Pagination
          :page="currentPage"
          :total="total"
          :page-size="pageSize"
          @update:page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
