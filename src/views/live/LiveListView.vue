<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Calendar, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import Pagination from '@/components/ui/Pagination.vue'
import { formatDuration, formatLargeNumber, formatDateTime, formatAmount } from '@/utils/format'
import { mockLives } from '@/mock'

const router = useRouter()

const breadcrumbs = [
  { label: 'Home', path: '/' },
  { label: '直播库' }
]

const searchQuery = ref('')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// Sort state - 对齐 live_overview 字段名
type SortField = 'anchor' | 'viewCount' | 'sales' | 'saleAmount' | 'totalDuration' | 'createdAt' | null
type SortOrder = 'asc' | 'desc'
const sortField = ref<SortField>(null)
const sortOrder = ref<SortOrder>('desc')

// 筛选后的数据
const filteredLives = computed(() => {
  let result = [...mockLives]

  // 搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(l =>
      l.anchor.toLowerCase().includes(query) ||
      l.liveId.toLowerCase().includes(query)
    )
  }

  // 日期过滤 - 使用 createdAt 字段
  if (startDate.value) {
    const start = new Date(startDate.value)
    result = result.filter(l => new Date(l.createdAt) >= start)
  }
  if (endDate.value) {
    const end = new Date(endDate.value)
    end.setHours(23, 59, 59, 999)
    result = result.filter(l => new Date(l.createdAt) <= end)
  }

  // 排序
  if (sortField.value) {
    const field = sortField.value
    result.sort((a, b) => {
      let aVal: string | number
      let bVal: string | number

      if (field === 'createdAt') {
        aVal = new Date(a.createdAt).getTime()
        bVal = new Date(b.createdAt).getTime()
      } else {
        aVal = a[field]
        bVal = b[field]
      }

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
const paginatedLives = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredLives.value.slice(start, start + pageSize.value)
})

const total = computed(() => filteredLives.value.length)

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
function goToDetail(liveId: string) {
  router.push(`/lives/${liveId}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader :breadcrumbs="breadcrumbs" title="直播库" />

    <div class="p-6">
      <!-- Filter Row -->
      <div class="flex items-center gap-4 mb-6">
        <div class="relative w-64">
          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search :size="16" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索主播或直播ID..."
            class="h-10 w-full rounded-sm border border-gray-200 bg-white pl-9 pr-16 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-shadow focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/20"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            class="absolute right-1 top-1 bottom-1 px-3 bg-[#FF3B30] text-white text-sm font-medium rounded-sm hover:bg-[#E0352B] transition-colors"
          >
            搜索
          </button>
        </div>

        <div class="relative">
          <input
            v-model="startDate"
            type="date"
            class="pl-10 pr-4 py-2 border border-gray-200 bg-white text-sm rounded-sm focus:outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/20"
          />
          <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <span class="text-gray-400">至</span>

        <div class="relative">
          <input
            v-model="endDate"
            type="date"
            class="pl-10 pr-4 py-2 border border-gray-200 bg-white text-sm rounded-sm focus:outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/20"
          />
          <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-sm border border-gray-200 overflow-hidden">
        <table class="w-full">
          <thead class="bg-[#0A0A0A]">
            <tr>
              <th class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide">直播ID</th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('anchor')"
              >
                <span class="inline-flex items-center gap-1">
                  主播
                  <component :is="getSortIcon('anchor')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('viewCount')"
              >
                <span class="inline-flex items-center gap-1">
                  观看量
                  <component :is="getSortIcon('viewCount')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('sales')"
              >
                <span class="inline-flex items-center gap-1">
                  销量
                  <component :is="getSortIcon('sales')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('saleAmount')"
              >
                <span class="inline-flex items-center gap-1">
                  GMV
                  <component :is="getSortIcon('saleAmount')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('totalDuration')"
              >
                <span class="inline-flex items-center gap-1">
                  时长
                  <component :is="getSortIcon('totalDuration')" class="w-3 h-3" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-[11px] font-medium text-white tracking-wide cursor-pointer hover:text-gray-300 select-none"
                @click="toggleSort('createdAt')"
              >
                <span class="inline-flex items-center gap-1">
                  日期
                  <component :is="getSortIcon('createdAt')" class="w-3 h-3" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="live in paginatedLives"
              :key="live.liveId"
              @click="goToDetail(live.liveId)"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td class="px-4 py-3 text-[13px] font-mono text-gray-900">{{ live.liveId }}</td>
              <td class="px-4 py-3 text-[13px] text-gray-900">{{ live.anchor }}</td>
              <td class="px-4 py-3 text-[13px] text-gray-700">{{ formatLargeNumber(live.viewCount) }}</td>
              <td class="px-4 py-3 text-[13px] text-gray-700">{{ formatLargeNumber(live.sales) }}</td>
              <td class="px-4 py-3 text-[13px] text-[#FF3B30] font-semibold">{{ formatAmount(live.saleAmount) }}</td>
              <td class="px-4 py-3 text-[13px] text-gray-700">{{ formatDuration(live.totalDuration) }}</td>
              <td class="px-4 py-3 text-[13px] text-gray-600">{{ formatDateTime(live.createdAt) }}</td>
            </tr>
            <tr v-if="paginatedLives.length === 0">
              <td colspan="7" class="px-4 py-12 text-center text-gray-500">
                没有找到匹配的直播
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
