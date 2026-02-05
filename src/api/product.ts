import request from './request'
import type { ApiResponse, PageParams, PageResult, Product, ProductDetail, ProductLiveItem } from '@/types'

// 商品列表查询参数
export interface ProductQueryParams extends PageParams {
  keyword?: string
  category?: string
  brand?: string
  priceMin?: number
  priceMax?: number
}

// 获取商品列表
export function getProducts(params: ProductQueryParams = {}) {
  return request.get<any, ApiResponse<PageResult<Product>>>('/api/products', { params })
}

// 获取商品详情
export function getProductDetail(itemId: string) {
  return request.get<any, ApiResponse<ProductDetail>>(`/api/products/${itemId}`)
}

// 获取商品关联直播列表
export function getProductLives(itemId: string, params: PageParams = {}) {
  return request.get<any, ApiResponse<PageResult<ProductLiveItem>>>(`/api/products/${itemId}/lives`, { params })
}
