<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import PageHeader from '@/components/layout/PageHeader.vue'
import MetricCard from '@/components/ui/MetricCard.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import { formatAmount, formatDurationMinutes, formatLargeNumber } from '@/utils/format'
import {
  chartDataByMetric,
  metricsData,
  pieChartData,
  categoryData,
  recentLives
} from '@/mock'

const router = useRouter()

// 选中的指标类型
type MetricType = 'sales' | 'volume' | 'products' | 'lives'
const selectedMetric = ref<MetricType>('sales')

// 时间范围快捷选项
type TimeRange = '7d' | '15d' | '30d' | 'all'
const selectedTimeRange = ref<TimeRange>('all')

const timeRangeOptions: { key: TimeRange; label: string }[] = [
  { key: '7d', label: '近7天' },
  { key: '15d', label: '近15天' },
  { key: '30d', label: '近30天' },
  { key: 'all', label: '全部' }
]

// 根据时间范围筛选后的图表数据
const currentChartData = computed(() => {
  const allData = chartDataByMetric[selectedMetric.value]
  if (selectedTimeRange.value === 'all') {
    return allData.map(d => ({ date: d.date, value: d.value }))
  }
  const days = { '7d': 7, '15d': 15, '30d': 30 }[selectedTimeRange.value]
  // 基于 mock 数据最新日期 2024-01-30 往前推
  const latestDate = new Date('2024-01-30')
  const cutoff = new Date(latestDate)
  cutoff.setDate(cutoff.getDate() - days)
  const cutoffStr = cutoff.toISOString().slice(0, 10)
  return allData
    .filter(d => d.rawDate > cutoffStr)
    .map(d => ({ date: d.date, value: d.value }))
})

// 图表标题
const chartTitle = computed(() => {
  const titles = {
    sales: '销售趋势',
    volume: '销量趋势',
    products: '商品增长趋势',
    lives: '直播增长趋势'
  }
  return titles[selectedMetric.value]
})

// 选择指标卡片
function selectMetric(metric: MetricType) {
  selectedMetric.value = metric
}

// 点击直播行跳转详情
function goToLiveDetail(liveId: string) {
  router.push(`/lives/${liveId}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader
      :breadcrumbs="[
        { label: 'Home' },
        { label: 'Dashboard' }
      ]"
      title="Dashboard"
    />

    <!-- Content Area -->
    <div class="p-8">
      <!-- Metrics Cards Row -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div
          v-for="(data, key) in metricsData"
          :key="key"
          @click="selectMetric(key as MetricType)"
          class="cursor-pointer transition-all"
        >
          <MetricCard
            :title="data.label"
            :value="key === 'sales' ? formatAmount(data.value) : formatLargeNumber(data.value)"
            :change="data.change"
            :selected="selectedMetric === key"
          />
        </div>
      </div>

      <!-- Bar Chart - Full Width -->
      <div class="bg-white rounded-sm shadow-sm border border-gray-200 p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ chartTitle }}</h3>
          <!-- 时间范围快捷按钮 -->
          <div class="flex items-center gap-1">
            <button
              v-for="option in timeRangeOptions"
              :key="option.key"
              @click="selectedTimeRange = option.key"
              class="px-3 py-1 text-xs font-medium rounded-sm transition-colors"
              :class="selectedTimeRange === option.key
                ? 'bg-[#FF3B30] text-white'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
        <BarChart :data="currentChartData" />
      </div>

      <!-- Pie Chart + Category List - Same Row -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <!-- Pie Chart -->
        <div class="bg-white rounded-sm shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">类目分布</h3>
          <PieChart :data="pieChartData" />
        </div>

        <!-- 商品类目 -->
        <div class="bg-white rounded-sm shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">商品类目</h3>
            <RouterLink to="/products" class="text-xs text-[#FF3B30] hover:underline">
              查看全部
            </RouterLink>
          </div>
          <div class="space-y-4">
            <div
              v-for="category in categoryData"
              :key="category.name"
              class="flex items-center gap-4"
            >
              <div class="w-20 text-sm font-medium text-gray-900">{{ category.name }}</div>
              <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all"
                  :style="{ width: `${category.percentage}%`, backgroundColor: category.color }"
                ></div>
              </div>
              <div class="w-16 text-right text-sm text-gray-600">
                {{ formatLargeNumber(category.count) }}
              </div>
              <div class="w-12 text-right text-sm text-gray-400">
                {{ category.percentage }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Lives - Full Width -->
      <div class="bg-white rounded-sm shadow-sm border border-gray-200">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">最近直播</h3>
          <RouterLink to="/lives" class="text-xs text-[#FF3B30] hover:underline">
            查看全部
          </RouterLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-[#0A0A0A]">
                <th class="px-6 py-3 text-left text-[11px] font-medium text-white tracking-wide">直播ID</th>
                <th class="px-6 py-3 text-left text-[11px] font-medium text-white tracking-wide">主播</th>
                <th class="px-6 py-3 text-left text-[11px] font-medium text-white tracking-wide">时长</th>
                <th class="px-6 py-3 text-left text-[11px] font-medium text-white tracking-wide">GMV</th>
                <th class="px-6 py-3 text-left text-[11px] font-medium text-white tracking-wide">日期</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="live in recentLives"
                :key="live.id"
                @click="goToLiveDetail(live.id)"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td class="px-6 py-4 text-[13px] text-gray-900 font-mono">{{ live.id }}</td>
                <td class="px-6 py-4 text-[13px] text-gray-900">{{ live.anchor }}</td>
                <td class="px-6 py-4 text-[13px] text-gray-600">{{ formatDurationMinutes(live.duration) }}</td>
                <td class="px-6 py-4 text-[13px] text-gray-900 font-medium">{{ formatAmount(live.gmv) }}</td>
                <td class="px-6 py-4 text-[13px] text-gray-600">{{ live.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
