/**
 * 格式化工具函数
 * 统一管理项目中的所有格式化逻辑
 */

/**
 * 格式化价格
 * @param price 价格数值
 * @param decimals 小数位数，默认 2
 * @returns 格式化后的价格字符串，如 "¥699.00"
 */
export function formatPrice(price: number, decimals = 2): string {
  return '¥' + price.toFixed(decimals)
}

/**
 * 格式化数字（带千分位）
 * @param num 数字
 * @returns 格式化后的字符串，如 "12,345"
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN')
}

/**
 * 格式化大数字（带单位：万、亿）
 * @param num 数字
 * @param decimals 小数位数，默认 1
 * @returns 格式化后的字符串，如 "1.2万" 或 "1.5亿"
 */
export function formatLargeNumber(num: number, decimals = 1): string {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(decimals) + '亿'
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(decimals) + '万'
  }
  return num.toLocaleString('zh-CN')
}

/**
 * 格式化金额（带单位：万、亿，带货币符号）
 * @param value 金额数值
 * @param decimals 小数位数，默认 2
 * @returns 格式化后的字符串，如 "¥1.56万" 或 "¥1.23亿"
 */
export function formatAmount(value: number, decimals = 2): string {
  if (value >= 100000000) {
    return '¥' + (value / 100000000).toFixed(decimals) + '亿'
  }
  if (value >= 10000) {
    return '¥' + (value / 10000).toFixed(decimals) + '万'
  }
  return '¥' + value.toLocaleString('zh-CN')
}

/**
 * 格式化时长（秒转为 X小时Y分）
 * @param seconds 秒数
 * @returns 格式化后的字符串，如 "2小时30分"
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) {
    return `${hours}小时${minutes}分`
  }
  return `${minutes}分钟`
}

/**
 * 格式化时长（分钟转为 Xh Ym）
 * @param minutes 分钟数
 * @returns 格式化后的字符串，如 "2h 30m"
 */
export function formatDurationMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

/**
 * 格式化日期时间
 * @param isoString ISO 格式的日期字符串
 * @returns 格式化后的字符串，如 "2024-01-15 20:00"
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * 格式化日期
 * @param isoString ISO 格式的日期字符串
 * @returns 格式化后的字符串，如 "2024-01-15"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
