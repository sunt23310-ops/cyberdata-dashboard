<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

interface Props {
  title: string
  value: string | number
  change: number
  changeType?: 'percent' | 'count'
  selected?: boolean
  size?: 'default' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  changeType: 'percent',
  selected: false,
  size: 'default',
})

const isPositive = computed(() => props.change >= 0)

const formattedChange = computed(() => {
  const sign = isPositive.value ? '+' : ''
  if (props.changeType === 'percent') {
    return `${sign}${props.change}%`
  }
  return `${sign}${props.change}`
})

const containerClasses = computed(() => {
  const base = 'rounded-lg p-7 transition-shadow hover:shadow-md'
  if (props.selected) {
    return `${base} bg-[#3D1A1C] text-white border-l-4 border-l-[#FF3B30]`
  }
  return `${base} bg-white border border-gray-200 text-gray-900`
})

const titleClasses = computed(() => {
  if (props.selected) {
    return 'text-xs text-[#888888]'
  }
  return 'text-xs text-gray-500'
})

const valueClasses = computed(() => {
  if (props.selected) {
    return 'mt-3 text-5xl font-bold font-heading leading-tight tracking-tight'
  }
  if (props.size === 'small') {
    return 'mt-3 text-[28px] font-bold font-heading leading-tight'
  }
  return 'mt-3 text-[32px] font-bold font-heading leading-tight'
})
</script>

<template>
  <div :class="containerClasses">
    <p :class="titleClasses">{{ title }}</p>

    <p :class="valueClasses">
      {{ value }}
    </p>

    <div class="mt-3 flex items-center gap-2 text-xs font-medium">
      <span
        v-if="isPositive"
        class="inline-flex items-center gap-1 text-green-500"
      >
        <TrendingUp :size="14" :stroke-width="2.5" />
        {{ formattedChange }}
      </span>
      <span v-else class="inline-flex items-center gap-1 text-red-500">
        <TrendingDown :size="14" :stroke-width="2.5" />
        {{ formattedChange }}
      </span>
      <span :class="selected ? 'text-[#888888]' : 'text-gray-400'">较上期</span>
    </div>
  </div>
</template>
