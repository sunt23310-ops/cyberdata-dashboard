// 商品列表项（对齐 live_product_src 表）
export interface ProductListItem {
  itemId: number             // item_id
  liveId: string             // live_id
  itemCode: string           // {live_id}_{item_index} 格式
  title: string              // title
  brandName: string          // brand_name
  shopName: string           // shop_name
  categoryName: string       // category_name (3级分类)
  price: number              // price (原价)
  couponPrice: number        // coupon_price (券后价)
  sale: number               // sale (销量)
  gmv: number                // gmv
  images: string             // images (图片URL)
  goodsIndex?: number        // goods_index
  upTime?: string            // up_time
}

// 商品基础信息（对齐 live_product 表）
export interface Product {
  itemCode: string           // item_code
  itemIndex: number          // item_index
  itemId: number             // item_id
  productName: string        // product_name
  productBasicName?: string  // product_basic_name
  brand: string              // brand
  mainImages?: string        // main_images
  mediaAssets?: string       // media_assets
}

// 价格信息（对齐 product_json.pricing）
export interface PricingInfo {
  originalPrice: string      // "¥599"
  currentPrice: string       // "¥509.15"
  discountInfo?: string      // "享受政府补贴15%"
  promotionStrategy?: string // 促销策略文案
  priceText?: string         // 价格相关话术
}

// 产品成分/规格项（对齐 product_json.ingredients）
export interface IngredientItem {
  name: string               // "屏幕尺寸"
  benefit: string            // 功效说明
  concentration: string      // "1.5英寸"
  source: string             // 来源品牌
}

// 产品卖点（对齐 product_json.highlights）
export interface HighlightItem {
  category: string           // "产品相关" | "服务相关"
  description: string        // 卖点描述
}

// product_json 完整结构
export interface ProductJson {
  productName: string
  segmentId: string
  pricing: PricingInfo
  ingredients: IngredientItem[]
  highlights: HighlightItem[]
  confidenceScore: number
}

// 主讲人信息
export interface Speaker {
  name: string
  ratio: number
}

// 商品详情（对齐 live_product + live_product_src + product_json）
export interface ProductDetail {
  // 基础信息
  itemCode: string
  itemId: number
  productName: string
  productBasicName?: string
  brand: string
  categoryName: string       // 3级分类
  shopName: string
  mainImages?: string
  // 价格信息
  pricing: PricingInfo
  // 销售数据
  sale: number
  gmv: number
  // 产品详情
  highlights: HighlightItem[]
  ingredients: IngredientItem[]
  confidenceScore?: number
  // 状态
  status?: 'on_sale' | 'off_sale'
}

// 商品关联直播项
export interface ProductLiveItem {
  liveId: string
  influencerId: string
  anchor: string             // 展示用
  startTime: number          // 秒数
  endTime: number            // 秒数
  duration: number
  mentions: number
  keywords: string[]
}

// 旧版兼容类型（逐步废弃）
export interface SpecItem {
  name: string
  value: string
}
