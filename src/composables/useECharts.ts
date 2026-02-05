import { onUnmounted, unref, type Ref, shallowRef } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'

/**
 * Composable that manages an ECharts instance.
 *
 * @param elRef - A ref pointing to the container HTMLElement
 * @param initialOptions - Optional ECharts options applied immediately after init
 * @returns { setOptions, resize, instance }
 */
export function useECharts(
  elRef: Ref<HTMLElement | null | undefined>,
  initialOptions?: EChartsOption
) {
  const instance = shallowRef<ECharts | null>(null)
  let resizeTimer: ReturnType<typeof setTimeout> | null = null

  /**
   * Debounced resize handler — waits 200ms after the last resize event
   * before actually calling `instance.resize()`.
   */
  const handleResize = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(() => {
      instance.value?.resize()
    }, 200)
  }

  /**
   * Initialise the ECharts instance if it has not been created yet.
   * Automatically attaches the window resize listener.
   */
  const initChart = () => {
    const el = unref(elRef)
    if (!el || instance.value) return

    instance.value = echarts.init(el)

    if (initialOptions) {
      instance.value.setOption(initialOptions)
    }

    window.addEventListener('resize', handleResize)
  }

  /**
   * Apply (merge) new options onto the existing instance.
   * If the instance does not exist yet it will be created first.
   */
  const setOptions = (options: EChartsOption, notMerge = false) => {
    initChart()
    instance.value?.setOption(options, notMerge)
  }

  /**
   * Manually trigger a resize of the chart.
   */
  const resize = () => {
    instance.value?.resize()
  }

  /**
   * Dispose the chart instance and clean up listeners.
   */
  const dispose = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
      resizeTimer = null
    }
    window.removeEventListener('resize', handleResize)

    if (instance.value) {
      instance.value.dispose()
      instance.value = null
    }
  }

  // Auto-dispose when the owning component unmounts
  onUnmounted(dispose)

  return {
    setOptions,
    resize,
    instance,
  }
}
