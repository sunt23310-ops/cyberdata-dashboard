// 验证码响应
export interface ValidCodeResponse {
  base64Image: string
  hash: string
}

// 登录请求
export interface LoginRequest {
  username: string
  password: string
  validCode: string
  hash: string
}

// 登录响应
export interface LoginResponse {
  token: string
  refreshToken: string
  userId: string
  username: string
}

// 刷新 Token 请求
export interface RefreshRequest {
  refreshToken: string
}

// 刷新 Token 响应
export interface RefreshResponse {
  token: string
  refreshToken: string
}
