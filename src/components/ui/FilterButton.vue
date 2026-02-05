<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface Option {
  label: string
  value: string
}

interface Props {
  label: string
  options: Option[]
  modelValue?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  if (!props.modelValue) return props.label
  const found = props.options.find((o) => o.value === props.modelValue)
  return found ? found.label : props.label
})

function toggle() {
  isOpen.value = !isOpen.value
}

function select(value: string) {
  emit('update:modelValue', value)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside, true)
})
</script>

<template>
  <div ref="containerRef" class="relative inline-block">
    <!-- Trigger -->
    <button
      type="button"
      class="inline-flex h-10 items-center gap-2 rounded-sm border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      @click="toggle"
    >
      <span>{{ selectedLabel }}</span>
      <ChevronDown
        :size="14"
        class="text-gray-400 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <ul
        v-if="isOpen"
        class="absolute left-0 z-50 mt-1 min-w-[160px] origin-top-left rounded-sm border border-gray-200 bg-white py-1 shadow-lg"
      >
        <li v-for="option in options" :key="option.value">
          <button
            type="button"
            :class="[
              'flex w-full items-center px-3 py-2 text-left text-sm transition-colors',
              option.value === modelValue
                ? 'bg-[#FF3B30]/5 font-medium text-[#FF3B30]'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="select(option.value)"
          >
            {{ option.label }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
