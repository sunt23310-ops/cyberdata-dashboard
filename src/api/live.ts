import request from './request'
import type { ApiResponse, PageParams, PageResult, Live, LiveDetail, LiveProductItem } from '@/types'

// 直播列表查询参数
export interface LiveQueryParams extends PageParams {
  keyword?: string
  dateFrom?: string
  dateTo?: string
}

// 获取直播列表
export function getLives(params: LiveQueryParams = {}) {
  return request.get<any, ApiResponse<PageResult<Live>>>('/api/lives', { params })
}

// 获取直播详情
export function getLiveDetail(liveId: string) {
  return request.get<any, ApiResponse<LiveDetail>>(`/api/lives/${liveId}`)
}

// 获取直播关联商品列表
export function getLiveProducts(liveId: string, params: PageParams = {}) {
  return request.get<any, ApiResponse<PageResult<LiveProductItem>>>(`/api/lives/${liveId}/products`, { params })
}
