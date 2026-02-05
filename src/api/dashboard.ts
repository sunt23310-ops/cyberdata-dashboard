import request from './request'
import type { ApiResponse, DashboardOverview, TrendData } from '@/types'

// 获取概览指标
export function getDashboardOverview(period: string = '7d') {
  return request.get<any, ApiResponse<DashboardOverview>>('/api/dashboard/overview', {
    params: { period },
  })
}

// 获取趋势图表数据
export function getDashboardTrend(period: string = '7d', metric: string = 'sale_amount') {
  return request.get<any, ApiResponse<TrendData>>('/api/dashboard/trend', {
    params: { period, metric },
  })
}
