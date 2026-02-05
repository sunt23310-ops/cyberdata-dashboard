<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  path?: string
}

withDefaults(defineProps<{
  breadcrumbs: BreadcrumbItem[]
  title?: string
  titleClass?: string
}>(), {
  titleClass: 'text-4xl font-semibold text-gray-900'
})
</script>

<template>
  <header class="bg-white px-8 py-5 border-b border-gray-200">
    <!-- Breadcrumbs -->
    <nav class="flex items-center text-[11px] text-[#999999] mb-1" v-if="breadcrumbs.length">
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <span v-if="index > 0" class="mx-2">/</span>
        <RouterLink
          v-if="crumb.path && index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="hover:text-gray-600 transition-colors duration-150"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else>{{ crumb.label }}</span>
      </template>
    </nav>

    <!-- Title & Actions -->
    <div class="flex items-center justify-between mt-2">
      <h1 v-if="title" :class="titleClass">{{ title }}</h1>
      <div v-if="$slots.actions" class="flex items-center gap-3">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
