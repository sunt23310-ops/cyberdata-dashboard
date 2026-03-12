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
  sales: generateChartData('2025-09-15', 30, 363755747, 0.6, 0.15),
  volume: generateChartData('2025-09-15', 30, 1252591, 0.35, 0.12),
  products: generateChartData('2025-09-15', 30, 696, 0.18, 0.05),
  lives: generateChartData('2025-09-15', 30, 7, 0.2, 0.08)
}

// 指标卡片数据
export const metricsData = {
  products: { value: 696, change: 5.2, label: '覆盖商品数量' },
  lives: { value: 7, change: 12.8, label: '覆盖直播数量' },
  sales: { value: 10912672417, change: 8.5, label: '销售总额' },
  volume: { value: 37577741, change: -2.3, label: '总销量' }
}

// 类目分布饼图数据
export const pieChartData = [
  { category: '精华', value: 17, percentage: 17 },
  { category: '面霜', value: 14, percentage: 14 },
  { category: '面膜', value: 10, percentage: 10 },
  { category: '精华水/水', value: 7, percentage: 7 },
  { category: '气垫', value: 6, percentage: 6 },
  { category: '眼霜', value: 6, percentage: 6 },
  { category: '次抛', value: 5, percentage: 5 },
  { category: '护肤套组', value: 5, percentage: 5 },
  { category: '水乳/水霜', value: 4, percentage: 4 },
  { category: '粉底液', value: 4, percentage: 4 },
  { category: '妆前隔离', value: 3, percentage: 3 },
  { category: '洁面', value: 3, percentage: 3 },
]

// 商品类目数据
export const categoryData = [
  { name: '精华', count: 115, percentage: 17, color: '#FF3B30' },
  { name: '面霜', count: 98, percentage: 14, color: '#0A0A0A' },
  { name: '面膜', count: 73, percentage: 10, color: '#FF6B35' },
  { name: '精华水/水', count: 47, percentage: 7, color: '#4A90D9' },
  { name: '气垫', count: 44, percentage: 6, color: '#666666' },
  { name: '眼霜', count: 40, percentage: 6, color: '#50C878' },
  { name: '次抛', count: 37, percentage: 5, color: '#9B59B6' },
  { name: '护肤套组', count: 36, percentage: 5, color: '#E67E22' },
  { name: '水乳/水霜', count: 31, percentage: 4, color: '#1ABC9C' },
  { name: '粉底液', count: 26, percentage: 4, color: '#999999' },
  { name: '妆前隔离', count: 20, percentage: 3, color: '#CCCCCC' },
  { name: '洁面', count: 19, percentage: 3, color: '#E5E5E5' },
]

// 最近直播数据
export const recentLives: LiveSession[] = [
  { id: 'LIVE001', anchor: '李佳琦', title: '10.7精华小课堂', duration: 242, gmv: 45600000, date: '2025-10-07' },
  { id: 'LIVE002', anchor: '李佳琦', title: '10.8次抛+面膜小课堂', duration: 220, gmv: 42100000, date: '2025-10-08' },
  { id: 'LIVE003', anchor: '李佳琦', title: '10.9面霜+眼霜小课堂', duration: 210, gmv: 28700000, date: '2025-10-09' },
  { id: 'LIVE004', anchor: '李佳琦', title: '10.10水乳套组小课堂', duration: 190, gmv: 32100000, date: '2025-10-10' },
  { id: 'LIVE005', anchor: '李佳琦', title: '10.11彩妆小课堂', duration: 180, gmv: 21500000, date: '2025-10-11' },
  { id: 'LIVE006', anchor: '李佳琦', title: '10.12仪器防晒卸妆洁面小课堂', duration: 150, gmv: 18900000, date: '2025-10-12' },
  { id: 'LIVE007', anchor: '李佳琦', title: '38焕新周爆品攻略小课堂', duration: 260, gmv: 48900000, date: '2026-02-21' },
]