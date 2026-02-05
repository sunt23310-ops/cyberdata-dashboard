// 商品列表项
export interface Product {
  itemCode: string
  productName: string
  brand: string
  categoryName: string
  mainImage?: string
  price: number
  couponPrice?: number
  sale: number
  gmv: number
}

// 价格信息
export interface PricingInfo {
  originalPrice: number
  currentPrice: number
  discountInfo?: string
}

// 产品规格项
export interface SpecItem {
  name: string
  value: string
}

// 主讲人信息
export interface Speaker {
  name: string
  ratio: number
}

// 商品详情
export interface ProductDetail {
  itemCode: string
  productName: string
  brand: string
  categoryName: string
  shopName?: string
  images?: string[]
  pricing?: PricingInfo
  highlights?: string[]
  ingredients?: SpecItem[]
  status?: 'on_sale' | 'off_sale'
}

// 商品关联直播项
export interface ProductLiveItem {
  liveId: string
  influencerId: string
  startTime: string
  endTime: string
  duration: number
  keyPhrases?: string[]
  speakers?: Speaker[]
  mentionCount?: number
  liveDate: string
}
