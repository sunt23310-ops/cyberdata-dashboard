<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useECharts } from '@/composables/useECharts'

interface PieDataItem {
  category: string
  value: number
  percentage: number
}

const props = defineProps<{
  data: PieDataItem[]
}>()

const COLORS = ['#FF3B30', '#0A0A0A', '#666666', '#E0E0E0', '#22C55E']

const chartRef = ref<HTMLElement | null>(null)
const { setOptions } = useECharts(chartRef)

function buildOptions() {
  return {
    tooltip: {
      trigger: 'item' as const,
      backgroundColor: '#ffffff',
      borderColor: '#E0E0E0',
      borderWidth: 1,
      textStyle: {
        color: '#0A0A0A',
        fontSize: 13,
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
      },
      formatter(params: any) {
        const item = props.data.find((d) => d.category === params.name)
        const pct = item ? item.percentage : params.percent
        return `
          <div style="padding:4px 0">
            <div style="font-size:12px;color:#666;margin-bottom:4px">${params.name}</div>
            <div style="font-size:14px;font-weight:600">${Number(pct).toFixed(1)}%</div>
          </div>
        `
      },
    },
    legend: {
      orient: 'vertical' as const,
      right: 16,
      top: 'middle' as const,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 16,
      textStyle: {
        color: '#333333',
        fontSize: 12,
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
      },
    },
    series: [
      {
        type: 'pie' as const,
        radius: ['48%', '72%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
          scaleSize: 6,
        },
        labelLine: {
          show: false,
        },
        data: props.data.map((d, i) => ({
          name: d.category,
          value: d.value,
          itemStyle: {
            color: COLORS[i % COLORS.length],
          },
        })),
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 2,
          borderRadius: 4,
        },
      },
    ],
    animation: true,
    animationDuration: 600,
    animationEasing: 'cubicOut' as const,
  }
}

onMounted(() => {
  if (props.data.length) {
    setOptions(buildOptions())
  }
})

watch(
  () => props.data,
  () => {
    setOptions(buildOptions(), true)
  },
  { deep: true }
)
</script>

<template>
  <div ref="chartRef" class="w-full h-[300px]" />
</template>
