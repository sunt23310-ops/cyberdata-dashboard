<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Calendar } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import MetricCard from '@/components/ui/MetricCard.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import { formatAmount, formatDurationMinutes, formatLargeNumber } from '@/utils/format'
import type { LiveSession } from '@/types/live'

const router = useRouter()

// 选中的指标类型
type MetricType = 'sales' | 'volume' | 'products' | 'lives'
const selectedMetric = ref<MetricType>('sales')

// 日期区间
const startDate = ref('2024-01-01')
const endDate = ref('2024-01-15')

// Mock metrics data - 每种指标对应不同的图表数据
const metricsData = {
  products: { value: 32580, change: 5.2, label: '覆盖商品数量' },
  lives: { value: 1856, change: 12.8, label: '覆盖直播数量' },
  sales: { value: 256800000, change: 8.5, label: '销售总额' },
  volume: { value: 3285600, change: -2.3, label: '总销量' }
}

// 不同指标对应的柱状图数据
const chartDataByMetric = {
  sales: [
    { date: '1月1日', value: 28500000 },
    { date: '1月3日', value: 32100000 },
    { date: '1月5日', value: 29800000 },
    { date: '1月7日', value: 35600000 },
    { date: '1月9日', value: 41200000 },
    { date: '1月11日', value: 38900000 },
    { date: '1月15日', value: 45700000 }
  ],
  volume: [
    { date: '1月1日', value: 385600 },
    { date: '1月3日', value: 421000 },
    { date: '1月5日', value: 398000 },
    { date: '1月7日', value: 456000 },
    { date: '1月9日', value: 512000 },
    { date: '1月11日', value: 489000 },
    { date: '1月15日', value: 523600 }
  ],
  products: [
    { date: '1月1日', value: 28500 },
    { date: '1月3日', value: 29100 },
    { date: '1月5日', value: 29800 },
    { date: '1月7日', value: 30600 },
    { date: '1月9日', value: 31200 },
    { date: '1月11日', value: 31900 },
    { date: '1月15日', value: 32580 }
  ],
  lives: [
    { date: '1月1日', value: 1580 },
    { date: '1月3日', value: 1620 },
    { date: '1月5日', value: 1680 },
    { date: '1月7日', value: 1720 },
    { date: '1月9日', value: 1780 },
    { date: '1月11日', value: 1820 },
    { date: '1月15日', value: 1856 }
  ]
}

// 当前图表数据
const currentChartData = computed(() => chartDataByMetric[selectedMetric.value])

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

// 类目分布数据
const pieChartData = [
  { category: '美妆', value: 35, percentage: 35 },
  { category: '服饰', value: 25, percentage: 25 },
  { category: '食品', value: 20, percentage: 20 },
  { category: '数码', value: 12, percentage: 12 },
  { category: '家居', value: 8, percentage: 8 }
]

// 商品类目数据
const categoryData = [
  { name: '美妆', count: 11403, percentage: 35, color: '#FF3B30' },
  { name: '服饰', count: 8145, percentage: 25, color: '#0A0A0A' },
  { name: '食品', count: 6516, percentage: 20, color: '#666666' },
  { name: '数码', count: 3910, percentage: 12, color: '#999999' },
  { name: '家居', count: 2606, percentage: 8, color: '#CCCCCC' }
]

// Mock recent lives data
const recentLives: LiveSession[] = [
  { id: 'LIVE001', anchor: '李佳琦', duration: 242, gmv: 45600000, date: '2024-01-15' },
  { id: 'LIVE002', anchor: '薇娅', duration: 180, gmv: 32100000, date: '2024-01-14' },
  { id: 'LIVE003', anchor: '罗永浩', duration: 120, gmv: 18900000, date: '2024-01-13' },
  { id: 'LIVE004', anchor: '董宇辉', duration: 210, gmv: 28700000, date: '2024-01-12' },
  { id: 'LIVE005', anchor: '小杨哥', duration: 150, gmv: 21500000, date: '2024-01-11' }
]

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
      title-class="text-5xl font-semibold text-gray-900"
    />

    <!-- Content Area -->
    <div class="p-8">
      <!-- Metrics Cards Row - 可点击选中 -->
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

      <!-- Charts Section with Date Picker -->
      <div class="grid grid-cols-5 gap-6 mb-8">
        <!-- Bar Chart - 3 columns -->
        <div class="col-span-3 bg-white rounded-sm shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ chartTitle }}</h3>
            <!-- 日期选择器放在图表区域 -->
            <div class="flex items-center gap-3">
              <div class="relative">
                <input
                  v-model="startDate"
                  type="date"
                  class="pl-9 pr-3 py-1.5 border border-gray-200 bg-white text-sm rounded-sm focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30]/20"
                />
                <Calendar class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <span class="text-gray-400">至</span>
              <div class="relative">
                <input
                  v-model="endDate"
                  type="date"
                  class="pl-9 pr-3 py-1.5 border border-gray-200 bg-white text-sm rounded-sm focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30]/20"
                />
                <Calendar class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <button
                class="px-4 py-1.5 bg-[#FF3B30] text-white text-sm font-medium rounded-sm hover:bg-[#E0352B] transition-colors"
              >
                确定
              </button>
            </div>
          </div>
          <BarChart :data="currentChartData" />
        </div>

        <!-- Pie Chart - 2 columns -->
        <div class="col-span-2 bg-white rounded-sm shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">类目分布</h3>
          <PieChart :data="pieChartData" />
        </div>
      </div>

      <!-- Bottom Section: Category List + Recent Lives -->
      <div class="grid grid-cols-5 gap-6">
        <!-- 商品类目模块 - 2 columns -->
        <div class="col-span-2 bg-white rounded-sm shadow-sm border border-gray-200 p-6">
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

        <!-- Recent Lives Table - 3 columns -->
        <div class="col-span-3 bg-white rounded-sm shadow-sm border border-gray-200">
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
  </div>
</template>
