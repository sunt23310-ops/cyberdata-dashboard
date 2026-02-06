import type { MetricValue } from './api'

// 直播列表项（对齐 live_overview 表）
export interface LiveListItem {
  liveId: string           // live_id
  influencerId: string     // influencer_id
  anchor: string           // 展示用（前端映射）
  totalDuration: number    // total_duration
  viewCount: number        // view_count
  viewCountChange: number  // view_count_change
  sales: number            // sales
  salesChange: number      // sales_change
  saleAmount: number       // sale_amount (GMV)
  saleAmountChange: number // sale_amount_change
  createdAt: string        // created_at
}

// 直播概览（对齐 live_overview 表完整字段）
export interface Live {
  liveId: string
  influencerId: string
  totalProducts: number      // total_products
  totalDuration: number      // total_duration
  totalJoinCount: number     // total_join_count
  totalJoinCountChange: number
  viewCount: number
  viewCountChange: number
  avgPrice: number           // avg_price
  avgPriceChange: number
  sales: number
  salesChange: number
  saleAmount: number         // sale_amount
  saleAmountChange: number
  goBuyUv: number            // go_buy_uv
  goBuyUvChange: number
  goBuyCount: number         // go_buy_count
  goBuyCountChange: number
  likeCount: number          // like_count
  likeCountChange: number
  commentCount: number       // comment_count
  commentCountChange: number
  fansGrowth: number         // fans_growth
  fansGrowthChange: number
  itemCount: number          // item_count
  itemCountChange: number
  gmvItemCountRatio: number  // gmv_item_count_ratio
  gmvItemCountRatioChange: number
  createdAt: string
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

// 直播详情（对齐 live_overview 完整字段）
export interface LiveDetail {
  liveId: string
  influencerId: string
  anchor: string              // 展示用
  createdAt: string
  totalProducts: number
  totalDuration: number
  // 所有指标带变化率
  totalJoinCount: MetricValue
  viewCount: MetricValue
  avgPrice: MetricValue
  sales: MetricValue
  saleAmount: MetricValue
  goBuyUv: MetricValue
  goBuyCount: MetricValue
  likeCount: MetricValue
  commentCount: MetricValue
  fansGrowth: MetricValue
  itemCount: MetricValue
  gmvItemCountRatio: MetricValue
  // 兼容旧字段
  interaction: InteractionMetric
}

// 直播商品项（对齐 live_product_detail 表）
export interface LiveProductItem {
  itemCode: string           // item_code ({live_id}_{item_index})
  itemIndex: number          // item_index
  productName: string        // product_name
  productBasicName?: string  // product_basic_name
  brand: string
  mainImage?: string         // main_images
  startTime: number          // start_time (秒数)
  endTime: number            // end_time (秒数)
  duration: number           // 计算: end_time - start_time
  mentions: number           // 从 segment_json.total_mentions 获取
  keywords: string[]         // 从 segment_json.key_phrases 获取
}

// 截图
export interface SegmentScreenshot {
  path: string
  description: string
  timestamp?: number
}

// 视频
export interface SegmentVideo {
  path: string
  duration: number
}

// 再次提及（对齐 segment_json.return_mentions）
export interface ReturnMention {
  mentionId: string
  productName: string
  productBasicName?: string
  startTime: number
  endTime: number
  transcriptText: string
  keyPhrases: string[]
  confidence: number
  mainSpeakerRatio: number
  speakers: { name: string; ratio: number }[]
  duration: number
}

// 切片段落（每次出现 = 一个 Segment）
export interface Segment {
  segmentId: string
  title: string               // "切片 1: 首次讲解"
  startTime: number
  endTime: number
  duration: number
  confidence: number
  mainSpeakerRatio: number
  speakers: { name: string; ratio: number }[]
  transcriptText: string
  transcriptLines: number     // 转录总行数
  keyPhrases: string[]
  screenshots: SegmentScreenshot[]
  video: SegmentVideo | null
  returnMentions: ReturnMention[]
}

// 直播商品详情（直播中某商品的完整表现）
export interface LiveProductDetail {
  liveId: string
  influencerId: string
  anchor: string
  liveStartTime: string
  totalDuration: number         // 直播总时长
  // 商品信息
  itemCode: string
  itemIndex: number
  productName: string
  productBasicName?: string
  brand: string
  category: string
  // 价格信息（来自 product_json.pricing）
  pricing: {
    originalPrice: string
    currentPrice: string
    discountInfo?: string
    promotionStrategy?: string
  }
  status: 'on_sale' | 'off_sale'
  // 汇总
  totalMentions: number
  totalSegmentDuration: number
  // 切片列表
  segments: Segment[]
}
