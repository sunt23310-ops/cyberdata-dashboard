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

// 直播列表项（视图使用）
export interface LiveListItem {
  liveId: string
  anchor: string
  viewCount: number
  salesCount: number
  gmv: number
  duration: number
  date: string
}

// 最近直播会话（Dashboard 使用）
export interface LiveSession {
  id: string
  anchor: string
  duration: number
  gmv: number
  date: string
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
  brand: string
  mainImage?: string
  startTime: string
  endTime: string
  duration: number
  mentions: number
  keywords: string[]
}

// 视频切片
export interface VideoSegment {
  name: string
  startTime: string
  endTime: string
  duration: number
}

// 转录片段
export interface TranscriptSegment {
  speaker: string
  startTime: string
  endTime: string
  text: string
}

// 直播商品详情（直播中某商品的完整表现）
export interface LiveProductDetail {
  liveId: string
  anchor: string
  liveStartTime: string
  totalDuration: number
  itemCode: string
  productName: string
  brand: string
  category: string
  originalPrice: number
  couponPrice: number
  discountInfo?: string
  status: 'on_sale' | 'off_sale'
  startTime: string
  endTime: string
  duration: number
  mentions: number
  confidence: number
  keywords: string[]
  videoSegments: VideoSegment[]
  transcripts: TranscriptSegment[]
  speakers: { name: string; ratio: number }[]
}
