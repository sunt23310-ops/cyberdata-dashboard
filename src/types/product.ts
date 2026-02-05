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

// 商品列表项（视图使用，包含额外字段）
export interface ProductListItem {
  itemCode: string
  productName: string
  brand: string
  category: string
  originalPrice: number
  couponPrice: number
  sales: number
  gmv: number
  imageUrl?: string
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
  anchor: string
  startTime: string
  endTime: string
  duration: number
  mentions: number
  keywords: string[]
}
