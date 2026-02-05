<script setup lang="ts">
import { ref, computed } from 'vue'
import { Eye } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import FilterButton from '@/components/ui/FilterButton.vue'
import Pagination from '@/components/ui/Pagination.vue'
import { formatPrice, formatLargeNumber } from '@/utils/format'
import type { ProductListItem } from '@/types/product'

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

// Filter options
const categoryOptions = [
  { label: '全部', value: '' },
  { label: '护肤品', value: 'skincare' },
  { label: '洁面', value: 'cleanser' },
  { label: '洗护', value: 'haircare' },
  { label: '防晒', value: 'suncare' }
]

const brandOptions = [
  { label: '全部', value: '' },
  { label: '兰蔻', value: 'lancome' },
  { label: '欧莱雅', value: 'loreal' },
  { label: '雅诗兰黛', value: 'esteelauder' },
  { label: '潘婷', value: 'pantene' },
  { label: '安耐晒', value: 'anessa' }
]

const priceOptions = [
  { label: '全部', value: '' },
  { label: '0-100', value: '0-100' },
  { label: '100-500', value: '100-500' },
  { label: '500-1000', value: '500-1000' },
  { label: '1000以上', value: '1000+' }
]

// Mock data (不变数据使用 const)
const mockProducts: ProductListItem[] = [
  {
    itemCode: 'SKU001',
    productName: '高端护肤精华液',
    brand: '兰蔻',
    category: '护肤品',
    originalPrice: 899,
    couponPrice: 699,
    sales: 12345,
    gmv: 8623155
  },
  {
    itemCode: 'SKU002',
    productName: '清爽控油洁面乳',
    brand: '欧莱雅',
    category: '洁面',
    originalPrice: 129,
    couponPrice: 89,
    sales: 45678,
    gmv: 4065342
  },
  {
    itemCode: 'SKU003',
    productName: '持久保湿面霜',
    brand: '雅诗兰黛',
    category: '护肤品',
    originalPrice: 1280,
    couponPrice: 980,
    sales: 8765,
    gmv: 8589700
  },
  {
    itemCode: 'SKU004',
    productName: '滋养修复发膜',
    brand: '潘婷',
    category: '洗护',
    originalPrice: 79,
    couponPrice: 59,
    sales: 23456,
    gmv: 1383904
  },
  {
    itemCode: 'SKU005',
    productName: '防晒隔离霜SPF50',
    brand: '安耐晒',
    category: '防晒',
    originalPrice: 298,
    couponPrice: 248,
    sales: 34567,
    gmv: 8572616
  }
]

const total = computed(() => mockProducts.length)

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader :breadcrumbs="breadcrumbs" title="商品库" />

    <div class="p-6">
      <!-- Filter Row -->
      <div class="flex items-center gap-4 mb-6">
        <SearchInput
          v-model="searchQuery"
          placeholder="搜索商品名称或编码..."
          class="w-80"
        />
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
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="px-4 py-3 text-left font-medium" style="width: 60px">图片</th>
              <th class="px-4 py-3 text-left font-medium">商品名称</th>
              <th class="px-4 py-3 text-left font-medium">品牌</th>
              <th class="px-4 py-3 text-left font-medium">类目</th>
              <th class="px-4 py-3 text-left font-medium">价格</th>
              <th class="px-4 py-3 text-left font-medium">销量</th>
              <th class="px-4 py-3 text-left font-medium">GMV</th>
              <th class="px-4 py-3 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in mockProducts"
              :key="product.itemCode"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-3">
                <div class="w-12 h-12 bg-gray-200 rounded-sm"></div>
              </td>
              <td class="px-4 py-3">
                <div class="font-medium text-gray-900">{{ product.productName }}</div>
                <div class="text-gray-500 text-xs mt-1">{{ product.itemCode }}</div>
              </td>
              <td class="px-4 py-3 text-gray-700">{{ product.brand }}</td>
              <td class="px-4 py-3 text-gray-700">{{ product.category }}</td>
              <td class="px-4 py-3">
                <div class="line-through text-gray-400 text-xs">{{ formatPrice(product.originalPrice) }}</div>
                <div class="text-[#FF3B30] font-medium">{{ formatPrice(product.couponPrice) }}</div>
              </td>
              <td class="px-4 py-3 text-gray-700">{{ formatLargeNumber(product.sales) }}</td>
              <td class="px-4 py-3 text-gray-700">{{ formatPrice(product.gmv) }}</td>
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
