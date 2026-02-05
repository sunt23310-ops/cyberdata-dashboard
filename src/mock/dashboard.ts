import type { LiveSession } from '@/types/live'

type MetricType = 'sales' | 'volume' | 'products' | 'lives'

// 生成连续日期数据（1月1日-1月30日）
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

    // 带趋势和波动的数据
    const trend = baseValue * (1 + growth * i / days)
    const noise = trend * volatility * (Math.sin(i * 1.7) * 0.6 + Math.cos(i * 2.3) * 0.4)
    const value = Math.round(trend + noise)

    data.push({ date: dateLabel, rawDate, value })
  }

  return data
}

// 30天图表数据
export const chartDataByMetric: Record<MetricType, { date: string; rawDate: string; value: number }[]> = {
  sales: generateChartData('2024-01-01', 30, 28000000, 0.6, 0.15),
  volume: generateChartData('2024-01-01', 30, 380000, 0.35, 0.12),
  products: generateChartData('2024-01-01', 30, 28000, 0.18, 0.05),
  lives: generateChartData('2024-01-01', 30, 1550, 0.2, 0.08)
}

// 指标卡片数据
export const metricsData = {
  products: { value: 32580, change: 5.2, label: '覆盖商品数量' },
  lives: { value: 1856, change: 12.8, label: '覆盖直播数量' },
  sales: { value: 256800000, change: 8.5, label: '销售总额' },
  volume: { value: 3285600, change: -2.3, label: '总销量' }
}

// 类目分布饼图数据
export const pieChartData = [
  { category: '美妆', value: 35, percentage: 35 },
  { category: '服饰', value: 25, percentage: 25 },
  { category: '食品', value: 20, percentage: 20 },
  { category: '数码', value: 12, percentage: 12 },
  { category: '家居', value: 8, percentage: 8 }
]

// 商品类目数据
export const categoryData = [
  { name: '美妆', count: 11403, percentage: 35, color: '#FF3B30' },
  { name: '服饰', count: 8145, percentage: 25, color: '#0A0A0A' },
  { name: '食品', count: 6516, percentage: 20, color: '#666666' },
  { name: '数码', count: 3910, percentage: 12, color: '#999999' },
  { name: '家居', count: 2606, percentage: 8, color: '#CCCCCC' }
]

// 最近直播数据（10条）
export const recentLives: LiveSession[] = [
  { id: 'LIVE001', anchor: '李佳琦', duration: 242, gmv: 45600000, date: '2024-01-15' },
  { id: 'LIVE002', anchor: '薇娅', duration: 180, gmv: 32100000, date: '2024-01-14' },
  { id: 'LIVE003', anchor: '罗永浩', duration: 120, gmv: 18900000, date: '2024-01-13' },
  { id: 'LIVE004', anchor: '董宇辉', duration: 210, gmv: 28700000, date: '2024-01-12' },
  { id: 'LIVE005', anchor: '小杨哥', duration: 150, gmv: 21500000, date: '2024-01-11' },
  { id: 'LIVE006', anchor: '辛巴', duration: 190, gmv: 24300000, date: '2024-01-10' },
  { id: 'LIVE007', anchor: '雪梨', duration: 135, gmv: 15800000, date: '2024-01-09' },
  { id: 'LIVE008', anchor: '烈儿宝贝', duration: 130, gmv: 12600000, date: '2024-01-08' },
  { id: 'LIVE009', anchor: '陈洁kiki', duration: 105, gmv: 9800000, date: '2024-01-07' },
  { id: 'LIVE010', anchor: '刘媛媛', duration: 120, gmv: 11200000, date: '2024-01-06' }
]
