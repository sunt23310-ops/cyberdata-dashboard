import request from './request'
import type { ApiResponse, ValidCodeResponse, LoginRequest, LoginResponse } from '@/types'

// 获取图片验证码
export function getValidCode() {
  return request.get<any, ApiResponse<ValidCodeResponse>>('/public/auth/validCode')
}

// 用户登录
export function login(data: LoginRequest) {
  return request.post<any, ApiResponse<LoginResponse>>('/public/auth/login', data)
}
