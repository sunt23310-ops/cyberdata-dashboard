import { ref, computed } from 'vue'

/**
 * Composable for pagination state management.
 *
 * @param initialPageSize - Items per page (default 20)
 * @returns Reactive pagination state and helpers
 */
export function usePagination(initialPageSize = 20) {
  const page = ref(1)
  const pageSize = ref(initialPageSize)
  const total = ref(0)

  /**
   * Set the total number of items.
   * Also clamps the current page if it exceeds the new total.
   */
  const setTotal = (value: number) => {
    total.value = value

    const maxPage = Math.max(1, Math.ceil(value / pageSize.value))
    if (page.value > maxPage) {
      page.value = maxPage
    }
  }

  /**
   * Reset pagination to the first page.
   * Optionally accepts a new pageSize.
   */
  const reset = (newPageSize?: number) => {
    page.value = 1
    if (newPageSize !== undefined) {
      pageSize.value = newPageSize
    }
  }

  /**
   * Computed object suitable for spreading into API query parameters.
   * Provides `page`, `pageSize`, and a convenience `offset`.
   */
  const params = computed(() => ({
    page: page.value,
    pageSize: pageSize.value,
    offset: (page.value - 1) * pageSize.value,
  }))

  /**
   * Total number of pages based on current total and pageSize.
   */
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(total.value / pageSize.value))
  )

  return {
    page,
    pageSize,
    total,
    totalPages,
    setTotal,
    reset,
    params,
  }
}
