<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useECharts } from '@/composables/useECharts'

interface BarDataItem {
  date: string
  value: number
}

const props = withDefaults(
  defineProps<{
    data: BarDataItem[]
    color?: string
  }>(),
  {
    color: '#FF3B30',
  }
)

const chartRef = ref<HTMLElement | null>(null)
const { setOptions } = useECharts(chartRef)

function buildOptions() {
  return {
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: '#ffffff',
      borderColor: '#E0E0E0',
      borderWidth: 1,
      textStyle: {
        color: '#0A0A0A',
        fontSize: 13,
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
      },
      axisPointer: {
        type: 'shadow' as const,
        shadowStyle: {
          color: 'rgba(0,0,0,0.04)',
        },
      },
      formatter(params: any) {
        const item = Array.isArray(params) ? params[0] : params
        const value = typeof item.value === 'number' ? item.value : 0
        const formatted = value.toLocaleString('zh-CN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        return `
          <div style="padding:4px 0">
            <div style="font-size:12px;color:#666;margin-bottom:4px">${item.name}</div>
            <div style="font-size:14px;font-weight:600">¥${formatted}</div>
          </div>
        `
      },
    },
    grid: {
      top: 16,
      right: 16,
      bottom: 32,
      left: 56,
      containLabel: false,
    },
    xAxis: {
      type: 'category' as const,
      data: props.data.map((d) => d.date),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#999999',
        fontSize: 11,
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value' as const,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#999999',
        fontSize: 11,
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
        formatter(val: number) {
          if (val >= 10000) return `${(val / 10000).toFixed(0)}w`
          if (val >= 1000) return `${(val / 1000).toFixed(0)}k`
          return String(val)
        },
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: 'bar' as const,
        data: props.data.map((d) => d.value),
        itemStyle: {
          color: props.color,
          borderRadius: [2, 2, 0, 0],
        },
        barMaxWidth: 32,
        emphasis: {
          itemStyle: {
            color: props.color,
            opacity: 0.85,
          },
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
  () => [props.data, props.color],
  () => {
    setOptions(buildOptions(), true)
  },
  { deep: true }
)
</script>

<template>
  <div ref="chartRef" class="w-full h-[300px]" />
</template>
