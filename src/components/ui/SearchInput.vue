<script setup lang="ts">
import { Search } from 'lucide-vue-next'

interface Props {
  modelValue: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '搜索…',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="relative">
    <span
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
    >
      <Search :size="16" />
    </span>

    <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      class="h-10 w-full rounded-sm border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-shadow focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/20"
      @input="onInput"
    />
  </div>
</template>
