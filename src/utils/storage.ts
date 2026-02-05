/**
 * 本地存储工具函数
 * 统一封装 localStorage 操作，提供类型安全的存取接口
 */

// 存储键名常量
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER_ID: 'userId',
  USERNAME: 'username',
} as const

type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]

/**
 * 获取存储值
 */
export function getStorageItem(key: StorageKey): string {
  return localStorage.getItem(key) || ''
}

/**
 * 设置存储值
 */
export function setStorageItem(key: StorageKey, value: string): void {
  localStorage.setItem(key, value)
}

/**
 * 移除存储值
 */
export function removeStorageItem(key: StorageKey): void {
  localStorage.removeItem(key)
}

/**
 * 清除所有认证相关存储
 */
export function clearAuthStorage(): void {
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER_ID)
  localStorage.removeItem(STORAGE_KEYS.USERNAME)
}

/**
 * 获取所有认证信息
 */
export function getAuthStorage() {
  return {
    token: getStorageItem(STORAGE_KEYS.TOKEN),
    refreshToken: getStorageItem(STORAGE_KEYS.REFRESH_TOKEN),
    userId: getStorageItem(STORAGE_KEYS.USER_ID),
    username: getStorageItem(STORAGE_KEYS.USERNAME),
  }
}

/**
 * 设置所有认证信息
 */
export function setAuthStorage(data: {
  token: string
  refreshToken: string
  userId: string
  username: string
}): void {
  setStorageItem(STORAGE_KEYS.TOKEN, data.token)
  setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken)
  setStorageItem(STORAGE_KEYS.USER_ID, data.userId)
  setStorageItem(STORAGE_KEYS.USERNAME, data.username)
}
