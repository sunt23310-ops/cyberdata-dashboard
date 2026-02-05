<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHeader from '@/components/layout/PageHeader.vue'
import MetricCard from '@/components/ui/MetricCard.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import { formatAmount, formatDurationMinutes } from '@/utils/format'
import type { LiveSession } from '@/types/live'

// Time period selection
const selectedPeriod = ref('7天')
const timePeriods = ['7天', '1个月', '1年', '历史总览']

const selectPeriod = (period: string) => {
  selectedPeriod.value = period
}

// Mock metrics data with change values (不变数据使用 const)
const metrics = {
  productCount: { value: 32580, change: 5.2 },
  liveCount: { value: 1856, change: 12.8 },
  totalSales: { value: 256800000, change: 8.5 },
  totalVolume: { value: 3285600, change: -2.3 }
}

// Mock bar chart data - format expected by BarChart component (不变数据使用 const)
const barChartData = [
  { date: '1月', value: 28500000 },
  { date: '2月', value: 32100000 },
  { date: '3月', value: 29800000 },
  { date: '4月', value: 35600000 },
  { date: '5月', value: 41200000 },
  { date: '6月', value: 38900000 },
  { date: '7月', value: 45700000 }
]

// Mock pie chart data - format expected by PieChart component (不变数据使用 const)
const pieChartData = [
  { category: '美妆', value: 35, percentage: 35 },
  { category: '服饰', value: 25, percentage: 25 },
  { category: '食品', value: 20, percentage: 20 },
  { category: '数码', value: 12, percentage: 12 },
  { category: '家居', value: 8, percentage: 8 }
]

// Mock recent lives data (不变数据使用 const)
const recentLives: LiveSession[] = [
  {
    id: 'LIVE001',
    anchor: '李佳琦',
    duration: 242,
    gmv: 45600000,
    date: '2024-01-15'
  },
  {
    id: 'LIVE002',
    anchor: '薇娅',
    duration: 180,
    gmv: 32100000,
    date: '2024-01-14'
  },
  {
    id: 'LIVE003',
    anchor: '罗永浩',
    duration: 120,
    gmv: 18900000,
    date: '2024-01-13'
  },
  {
    id: 'LIVE004',
    anchor: '董宇辉',
    duration: 210,
    gmv: 28700000,
    date: '2024-01-12'
  },
  {
    id: 'LIVE005',
    anchor: '小杨哥',
    duration: 150,
    gmv: 21500000,
    date: '2024-01-11'
  },
  {
    id: 'LIVE006',
    anchor: '辛巴',
    duration: 190,
    gmv: 24300000,
    date: '2024-01-10'
  },
  {
    id: 'LIVE007',
    anchor: '雪梨',
    duration: 135,
    gmv: 15800000,
    date: '2024-01-09'
  },
  {
    id: 'LIVE008',
    anchor: '烈儿宝贝',
    duration: 130,
    gmv: 12600000,
    date: '2024-01-08'
  }
]
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
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <button
            v-for="period in timePeriods"
            :key="period"
            @click="selectPeriod(period)"
            :class="[
              'px-4 py-2 text-sm font-medium transition-colors rounded-sm',
              selectedPeriod === period
                ? 'bg-[#FF3B30] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            ]"
          >
            {{ period }}
          </button>
        </div>
      </template>
    </PageHeader>

    <!-- Content Area -->
    <div class="p-8">
      <!-- Metrics Cards -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="覆盖商品数量"
          :value="metrics.productCount.value.toLocaleString()"
          :change="metrics.productCount.change"
          variant="dark"
        />
        <MetricCard
          title="覆盖直播数量"
          :value="metrics.liveCount.value.toLocaleString()"
          :change="metrics.liveCount.change"
          variant="dark"
        />
        <MetricCard
          title="销售总额"
          :value="formatAmount(metrics.totalSales.value)"
          :change="metrics.totalSales.change"
          variant="light"
        />
        <MetricCard
          title="总销量"
          :value="metrics.totalVolume.value.toLocaleString()"
          :change="metrics.totalVolume.change"
          variant="light"
        />
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-5 gap-6 mb-8">
        <!-- Bar Chart - 3 columns -->
        <div class="col-span-3 bg-white rounded-sm shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">销售趋势</h3>
          <BarChart :data="barChartData" />
        </div>

        <!-- Pie Chart - 2 columns -->
        <div class="col-span-2 bg-white rounded-sm shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">类目分布</h3>
          <PieChart :data="pieChartData" />
        </div>
      </div>

      <!-- Recent Lives Table Section -->
      <div class="bg-white rounded-sm shadow-sm border border-gray-200">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">最近直播</h3>
          <RouterLink
            to="/lives"
            class="text-sm text-[#FF3B30] hover:underline"
          >
            查看全部
          </RouterLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-3 text-left font-medium text-gray-500">直播ID</th>
                <th class="px-6 py-3 text-left font-medium text-gray-500">主播</th>
                <th class="px-6 py-3 text-left font-medium text-gray-500">时长</th>
                <th class="px-6 py-3 text-left font-medium text-gray-500">GMV</th>
                <th class="px-6 py-3 text-left font-medium text-gray-500">日期</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="live in recentLives"
                :key="live.id"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 text-gray-900 font-mono">{{ live.id }}</td>
                <td class="px-6 py-4 text-gray-900">{{ live.anchor }}</td>
                <td class="px-6 py-4 text-gray-600">{{ formatDurationMinutes(live.duration) }}</td>
                <td class="px-6 py-4 text-gray-900 font-medium">{{ formatAmount(live.gmv) }}</td>
                <td class="px-6 py-4 text-gray-600">{{ live.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
