<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  total: number
  page: number
  pageSize: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:page': [value: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const start = computed(() => {
  if (props.total === 0) return 0
  return (props.page - 1) * props.pageSize + 1
})

const end = computed(() => Math.min(props.page * props.pageSize, props.total))

const isFirstPage = computed(() => props.page <= 1)
const isLastPage = computed(() => props.page >= totalPages.value)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = props.page
  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
    return pages
  }

  // Always show first page
  pages.push(1)

  if (current > 3) {
    pages.push('ellipsis-start')
  }

  // Pages around current
  const rangeStart = Math.max(2, current - 1)
  const rangeEnd = Math.min(total - 1, current + 1)

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('ellipsis-end')
  }

  // Always show last page
  pages.push(total)

  return pages
})

function goToPage(p: number) {
  if (p >= 1 && p <= totalPages.value && p !== props.page) {
    emit('update:page', p)
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
    <p class="text-sm text-gray-500">
      显示 {{ total }} 条中的 {{ start }}-{{ end }} 条
    </p>

    <nav class="flex items-center gap-1">
      <!-- Previous -->
      <button
        :disabled="isFirstPage"
        class="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        @click="goToPage(page - 1)"
      >
        <ChevronLeft :size="16" />
      </button>

      <!-- Page buttons -->
      <template v-for="item in visiblePages" :key="item">
        <span
          v-if="typeof item === 'string'"
          class="inline-flex h-8 w-8 items-center justify-center text-sm text-gray-400 select-none"
        >
          &hellip;
        </span>
        <button
          v-else
          :class="[
            'inline-flex h-8 min-w-8 items-center justify-center rounded-sm px-2 text-sm font-medium transition-colors',
            item === page
              ? 'bg-[#FF3B30] text-white'
              : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
          ]"
          @click="goToPage(item)"
        >
          {{ item }}
        </button>
      </template>

      <!-- Next -->
      <button
        :disabled="isLastPage"
        class="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        @click="goToPage(page + 1)"
      >
        <ChevronRight :size="16" />
      </button>
    </nav>
  </div>
</template>
