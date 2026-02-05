// 通用 API 响应类型
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message?: string
}

// 分页请求参数
export interface PageParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// 分页响应
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 带变化率的指标值
export interface MetricValue {
  value: number
  change: number
  changeType?: 'percent' | 'count'
}
