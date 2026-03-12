import type { LiveSession } from '@/types/live'

type MetricType = 'sales' | 'volume' | 'products' | 'lives'

// 生成连续日期数据
function generateChartData(
  startDate: string,
  days: number,
  baseValue: number,
  growth: number,
  volatility: number
): { date: string; rawDate: string; value: number }[] {
  const data: { date: string; rawDate: string; value: number }[] = []
  const start = new Date(startDate)

  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const month = d.getMonth() + 1
    const day = d.getDate()
    const rawDate = d.toISOString().slice(0, 10)
    const dateLabel = `${month}月${day}日`

    const trend = baseValue * (1 + growth * i / days)
    const noise = trend * volatility * (Math.sin(i * 1.7) * 0.6 + Math.cos(i * 2.3) * 0.4)
    const value = Math.round(trend + noise)

    data.push({ date: dateLabel, rawDate, value })
  }

  return data
}

// 30天图表数据（对齐2025双十一+2026-38期间）
export const chartDataByMetric: Record<MetricType, { date: string; rawDate: string; value: number }[]> = {
  sales: generateChartData('2025-09-15', 30, 329044851, 0.6, 0.15),
  volume: generateChartData('2025-09-15', 30, 1081279, 0.35, 0.12),
  products: generateChartData('2025-09-15', 30, 661, 0.18, 0.05),
  lives: generateChartData('2025-09-15', 30, 7, 0.2, 0.08)
}

// 指标卡片数据
export const metricsData = {
  products: { value: 661, change: 5.2, label: '覆盖商品数量' },
  lives: { value: 7, change: 12.8, label: '覆盖直播数量' },
  sales: { value: 9871345555, change: 8.5, label: '销售总额' },
  volume: { value: 32438371, change: -2.3, label: '总销量' }
}

// 类目分布饼图数据
export const pieChartData = [
  { category: '精华液', value: 38, percentage: 38 },
  { category: '面霜', value: 21, percentage: 21 },
  { category: '面膜', value: 10, percentage: 10 },
  { category: '综合', value: 5, percentage: 5 },
  { category: '次抛精华', value: 5, percentage: 5 },
]

// 商品类目数据
export const categoryData = [
  { name: '精华液', count: 249, percentage: 38, color: '#FF3B30' },
  { name: '面霜', count: 137, percentage: 21, color: '#0A0A0A' },
  { name: '面膜', count: 67, percentage: 10, color: '#666666' },
  { name: '综合', count: 33, percentage: 5, color: '#999999' },
  { name: '次抛精华', count: 31, percentage: 5, color: '#CCCCCC' },
]

// 最近直播数据
export const recentLives: LiveSession[] = [
  { id: 'LIVE001', anchor: '李佳琦', duration: 242, gmv: 45600000, date: '2025-10-07' },
  { id: 'LIVE002', anchor: '李佳琦', duration: 220, gmv: 42100000, date: '2025-10-08' },
  { id: 'LIVE003', anchor: '李佳琦', duration: 210, gmv: 28700000, date: '2025-10-09' },
  { id: 'LIVE004', anchor: '李佳琦', duration: 190, gmv: 32100000, date: '2025-10-10' },
  { id: 'LIVE005', anchor: '李佳琦', duration: 180, gmv: 21500000, date: '2025-10-11' },
  { id: 'LIVE006', anchor: '李佳琦', duration: 150, gmv: 18900000, date: '2025-10-12' },
  { id: 'LIVE007', anchor: '李佳琦', duration: 260, gmv: 48900000, date: '2026-02-21' },
]