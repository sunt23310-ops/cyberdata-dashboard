<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  path?: string
}

defineProps<{
  breadcrumbs: BreadcrumbItem[]
  title?: string
}>()
</script>

<template>
  <header class="bg-white px-8 py-5 border-b border-gray-200">
    <!-- Breadcrumbs -->
    <nav class="flex items-center text-sm text-gray-400 mb-1" v-if="breadcrumbs.length">
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <span v-if="index > 0" class="mx-2 text-gray-300">&gt;</span>
        <RouterLink
          v-if="crumb.path && index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="hover:text-gray-600 transition-colors duration-150"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="text-gray-600 font-medium">{{ crumb.label }}</span>
      </template>
    </nav>

    <!-- Title & Actions -->
    <div class="flex items-center justify-between mt-1">
      <h1 v-if="title" class="text-xl font-semibold text-gray-900">{{ title }}</h1>
      <div v-if="$slots.actions" class="flex items-center gap-3">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
