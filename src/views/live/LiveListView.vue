<script setup lang="ts">
import { ref, computed } from 'vue'
import { Eye, Calendar } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import Pagination from '@/components/ui/Pagination.vue'

interface Live {
  liveId: string
  anchor: string
  viewCount: number
  salesCount: number
  gmv: number
  duration: number
  date: string
}

const breadcrumbs = [
  { label: 'Home', path: '/' },
  { label: '直播库' }
]

const searchQuery = ref('')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const mockLives: Live[] = [
  {
    liveId: 'LIVE001',
    anchor: '李佳琦',
    viewCount: 12300000,
    salesCount: 85600,
    gmv: 45600000,
    duration: 14520,
    date: '2024-01-15T20:00:00Z'
  },
  {
    liveId: 'LIVE002',
    anchor: '薇娅',
    viewCount: 8900000,
    salesCount: 62300,
    gmv: 32100000,
    duration: 10800,
    date: '2024-01-14T19:30:00Z'
  },
  {
    liveId: 'LIVE003',
    anchor: '罗永浩',
    viewCount: 5600000,
    salesCount: 41200,
    gmv: 18900000,
    duration: 7200,
    date: '2024-01-13T20:00:00Z'
  },
  {
    liveId: 'LIVE004',
    anchor: '董宇辉',
    viewCount: 9800000,
    salesCount: 55400,
    gmv: 28700000,
    duration: 12600,
    date: '2024-01-12T18:00:00Z'
  },
  {
    liveId: 'LIVE005',
    anchor: '小杨哥',
    viewCount: 7200000,
    salesCount: 48900,
    gmv: 21500000,
    duration: 9000,
    date: '2024-01-11T19:00:00Z'
  }
]

const total = computed(() => mockLives.length)

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return hours + '小时' + minutes + '分'
}

const formatLargeNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(0) + '万'
  }
  return num.toString()
}

const formatDate = (isoString: string): string => {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader :breadcrumbs="breadcrumbs" title="直播库" />

    <div class="p-6">
      <!-- Filter Row -->
      <div class="flex items-center gap-4 mb-6">
        <SearchInput
          v-model="searchQuery"
          placeholder="搜索直播..."
          class="w-64"
        />

        <div class="relative">
          <input
            v-model="startDate"
            type="date"
            placeholder="开始日期"
            class="pl-10 pr-4 py-2 border border-gray-200 bg-white text-sm rounded-sm focus:outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/20"
          />
          <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <div class="relative">
          <input
            v-model="endDate"
            type="date"
            placeholder="结束日期"
            class="pl-10 pr-4 py-2 border border-gray-200 bg-white text-sm rounded-sm focus:outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/20"
          />
          <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">直播ID</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">主播</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">观看量</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">销量</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">GMV</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">时长</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">日期</th>
              <th class="px-4 py-3 text-left text-gray-600 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="live in mockLives"
              :key="live.liveId"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-3 font-mono text-gray-900">{{ live.liveId }}</td>
              <td class="px-4 py-3 text-gray-900">{{ live.anchor }}</td>
              <td class="px-4 py-3 text-gray-700">{{ formatLargeNumber(live.viewCount) }}</td>
              <td class="px-4 py-3 text-gray-700">{{ formatLargeNumber(live.salesCount) }}</td>
              <td class="px-4 py-3 text-gray-900 font-medium">¥{{ formatLargeNumber(live.gmv) }}</td>
              <td class="px-4 py-3 text-gray-700">{{ formatDuration(live.duration) }}</td>
              <td class="px-4 py-3 text-gray-600">{{ formatDate(live.date) }}</td>
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
