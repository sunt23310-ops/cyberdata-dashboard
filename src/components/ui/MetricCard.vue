<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

interface Props {
  title: string
  value: string | number
  change: number
  changeType?: 'percent' | 'count'
  variant?: 'dark' | 'light'
}

const props = withDefaults(defineProps<Props>(), {
  changeType: 'percent',
  variant: 'light',
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
  const base = 'rounded-sm p-5 transition-shadow hover:shadow-md'
  if (props.variant === 'dark') {
    return `${base} bg-[#0A0A0A] text-white`
  }
  return `${base} bg-white border border-gray-200 text-gray-900`
})

const titleClasses = computed(() => {
  if (props.variant === 'dark') {
    return 'text-sm text-gray-400 tracking-wide'
  }
  return 'text-sm text-gray-500 tracking-wide'
})
</script>

<template>
  <div :class="containerClasses">
    <p :class="titleClasses">{{ title }}</p>

    <p class="mt-2 text-2xl font-bold font-heading leading-tight">
      {{ value }}
    </p>

    <div class="mt-3 flex items-center gap-1.5 text-sm font-medium">
      <span
        v-if="isPositive"
        class="inline-flex items-center gap-1 text-green-500"
      >
        <TrendingUp :size="16" :stroke-width="2.5" />
        {{ formattedChange }}
      </span>
      <span v-else class="inline-flex items-center gap-1 text-red-500">
        <TrendingDown :size="16" :stroke-width="2.5" />
        {{ formattedChange }}
      </span>
    </div>
  </div>
</template>
