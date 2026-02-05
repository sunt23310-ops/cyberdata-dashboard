import type { MetricValue } from './api'

// Dashboard 概览数据
export interface DashboardOverview {
  itemCount: MetricValue
  liveCount: MetricValue
  saleAmount: MetricValue
  sales: MetricValue
}

// 趋势数据点
export interface TrendItem {
  date: string
  value: number
}

// 类目分布项
export interface CategoryItem {
  category: string
  value: number
  percentage: number
}

// 趋势图表数据
export interface TrendData {
  trend: TrendItem[]
  categoryDistribution: CategoryItem[]
}
