<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Calendar, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import Pagination from '@/components/ui/Pagination.vue'
import { formatDuration, formatLargeNumber, formatDateTime, formatAmount } from '@/utils/format'
import type { LiveListItem } from '@/types/live'

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

// Sort state
type SortField = 'anchor' | 'viewCount' | 'salesCount' | 'gmv' | 'duration' | 'date' | null
type SortOrder = 'asc' | 'desc'
const sortField = ref<SortField>(null)
const sortOrder = ref<SortOrder>('desc')

const mockLives: LiveListItem[] = [
  { liveId: 'LIVE001', anchor: '李佳琦', viewCount: 12300000, salesCount: 85600, gmv: 45600000, duration: 14520, date: '2024-01-15T20:00:00Z' },
  { liveId: 'LIVE002', anchor: '薇娅', viewCount: 8900000, salesCount: 62300, gmv: 32100000, duration: 10800, date: '2024-01-14T19:30:00Z' },
  { liveId: 'LIVE003', anchor: '罗永浩', viewCount: 5600000, salesCount: 41200, gmv: 18900000, duration: 7200, date: '2024-01-13T20:00:00Z' },
  { liveId: 'LIVE004', anchor: '董宇辉', viewCount: 9800000, salesCount: 55400, gmv: 28700000, duration: 12600, date: '2024-01-12T18:00:00Z' },
  { liveId: 'LIVE005', anchor: '小杨哥', viewCount: 7200000, salesCount: 48900, gmv: 21500000, duration: 9000, date: '2024-01-11T19:00:00Z' },
  { liveId: 'LIVE006', anchor: '辛巴', viewCount: 6800000, salesCount: 52100, gmv: 24300000, duration: 11400, date: '2024-01-10T20:30:00Z' },
  { liveId: 'LIVE007', anchor: '雪梨', viewCount: 4500000, salesCount: 38700, gmv: 15800000, duration: 8100, date: '2024-01-09T19:00:00Z' },
  { liveId: 'LIVE008', anchor: '烈儿宝贝', viewCount: 3900000, salesCount: 31200, gmv: 12600000, duration: 7800, date: '2024-01-08T20:00:00Z' },
  { liveId: 'LIVE009', anchor: '陈洁kiki', viewCount: 2800000, salesCount: 24500, gmv: 9800000, duration: 6300, date: '2024-01-07T19:30:00Z' },
  { liveId: 'LIVE010', anchor: '刘媛媛', viewCount: 3200000, salesCount: 27800, gmv: 11200000, duration: 7200, date: '2024-01-06T18:00:00Z' },
  { liveId: 'LIVE011', anchor: '李佳琦', viewCount: 11500000, salesCount: 79200, gmv: 42100000, duration: 13800, date: '2024-01-05T20:00:00Z' },
  { liveId: 'LIVE012', anchor: '董宇辉', viewCount: 8700000, salesCount: 48600, gmv: 25400000, duration: 11100, date: '2024-01-04T19:00:00Z' },
  { liveId: 'LIVE013', anchor: '贾乃亮', viewCount: 4100000, salesCount: 33500, gmv: 14200000, duration: 6600, date: '2024-01-03T20:30:00Z' },
  { liveId: 'LIVE014', anchor: '朱梓骁', viewCount: 3600000, salesCount: 29100, gmv: 11800000, duration: 5400, date: '2024-01-02T19:00:00Z' },
  { liveId: 'LIVE015', anchor: '张庭', viewCount: 2500000, salesCount: 21300, gmv: 8700000, duration: 5100, date: '2024-01-01T18:00:00Z' }
]

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

  // 日期过滤
  if (startDate.value) {
    const start = new Date(startDate.value)
    result = result.filter(l => new Date(l.date) >= start)
  }
  if (endDate.value) {
    const end = new Date(endDate.value)
    end.setHours(23, 59, 59, 999)
    result = result.filter(l => new Date(l.date) <= end)
  }

  // 排序
  if (sortField.value) {
    const field = sortField.value
    result.sort((a, b) => {
      let aVal: string | number
      let bVal: string | number

      if (field === 'date') {
        aVal = new Date(a.date).getTime()
        bVal = new Date(b.date).getTime()
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
        <table class="w-full text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">直播ID</th>
              <th
                class="px-4 py-3 text-left text-gray-600 font-medium cursor-pointer hover:text-[#FF3B30] select-none"
                @click="toggleSort('anchor')"
              >
                <span class="inline-flex items-center gap-1">
                  主播
                  <component :is="getSortIcon('anchor')" class="w-4 h-4" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-gray-600 font-medium cursor-pointer hover:text-[#FF3B30] select-none"
                @click="toggleSort('viewCount')"
              >
                <span class="inline-flex items-center gap-1">
                  观看量
                  <component :is="getSortIcon('viewCount')" class="w-4 h-4" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-gray-600 font-medium cursor-pointer hover:text-[#FF3B30] select-none"
                @click="toggleSort('salesCount')"
              >
                <span class="inline-flex items-center gap-1">
                  销量
                  <component :is="getSortIcon('salesCount')" class="w-4 h-4" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-gray-600 font-medium cursor-pointer hover:text-[#FF3B30] select-none"
                @click="toggleSort('gmv')"
              >
                <span class="inline-flex items-center gap-1">
                  GMV
                  <component :is="getSortIcon('gmv')" class="w-4 h-4" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-gray-600 font-medium cursor-pointer hover:text-[#FF3B30] select-none"
                @click="toggleSort('duration')"
              >
                <span class="inline-flex items-center gap-1">
                  时长
                  <component :is="getSortIcon('duration')" class="w-4 h-4" />
                </span>
              </th>
              <th
                class="px-4 py-3 text-left text-gray-600 font-medium cursor-pointer hover:text-[#FF3B30] select-none"
                @click="toggleSort('date')"
              >
                <span class="inline-flex items-center gap-1">
                  日期
                  <component :is="getSortIcon('date')" class="w-4 h-4" />
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
              <td class="px-4 py-3 font-mono text-gray-900">{{ live.liveId }}</td>
              <td class="px-4 py-3 text-gray-900">{{ live.anchor }}</td>
              <td class="px-4 py-3 text-gray-700">{{ formatLargeNumber(live.viewCount) }}</td>
              <td class="px-4 py-3 text-gray-700">{{ formatLargeNumber(live.salesCount) }}</td>
              <td class="px-4 py-3 text-gray-900 font-medium">{{ formatAmount(live.gmv) }}</td>
              <td class="px-4 py-3 text-gray-700">{{ formatDuration(live.duration) }}</td>
              <td class="px-4 py-3 text-gray-600">{{ formatDateTime(live.date) }}</td>
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
