import type { MetricValue } from './api'

// 直播列表项
export interface Live {
  liveId: string
  influencerId: string
  viewCount: number
  sales: number
  saleAmount: number
  totalDuration: number
  createdAt: string
}

// 互动量明细
export interface InteractionDetail {
  likeCount: number
  commentCount: number
}

// 互动量指标
export interface InteractionMetric {
  value: number
  change: number
  detail?: InteractionDetail
}

// 直播核心指标
export interface LiveMetrics {
  viewCount: MetricValue
  sales: MetricValue
  saleAmount: MetricValue
  interaction: InteractionMetric
}

// 直播详情
export interface LiveDetail {
  liveId: string
  influencerId: string
  createdAt: string
  totalDuration: number
  metrics: LiveMetrics
  itemCount: number
}

// 直播商品项
export interface LiveProductItem {
  itemCode: string
  productName: string
  mainImage?: string
  startTime: string
  endTime: string
  duration: number
  price?: number
  mentionCount?: number
  keyPhrases?: string[]
}
