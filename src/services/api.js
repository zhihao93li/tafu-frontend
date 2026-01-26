const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';
const TOKEN_KEY = 'bazi_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * 自定义 API 错误类
 */
export class ApiError extends Error {
  constructor(message, code, status) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

/**
 * 检查是否是取消请求的错误
 * @param {Error} error 
 */
export function isAbortError(error) {
  return error?.name === 'AbortError' || error?.code === 'ABORT_ERR';
}

/**
 * 通用请求函数
 * @param {string} endpoint - API 端点
 * @param {Object} options - 请求选项
 * @param {AbortSignal} options.signal - 用于取消请求的 AbortSignal
 */
export async function request(endpoint, options = {}) {
  const { signal, ...restOptions } = options;
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...restOptions.headers,
  };
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, { 
      ...restOptions, 
      headers,
      signal, // 支持 AbortController 取消请求
    });
    
    // Handle 204 No Content
    if (response.status === 204) return null;

    const result = await response.json();
    
    if (!response.ok) {
      // 处理认证失败：401 Unauthorized 或 403 Forbidden
      if (response.status === 401 || response.status === 403) {
        clearToken();
        localStorage.removeItem('bazi_user_cache');
        // 如果不是登录页面，则重定向到登录页
        if (!window.location.pathname.includes('/login')) {
          const currentPath = window.location.pathname + window.location.search;
          window.location.href = `/login?callbackUrl=${encodeURIComponent(currentPath)}`;
        }
      }
      
      throw new ApiError(
        result.message || '请求失败',
        result.code,
        response.status
      );
    }
    
    // 后端返回的是 ApiResponse 格式: { success, code, message, data }
    // 直接返回 data 字段，简化前端使用
    return result.data;
  } catch (error) {
    // 如果是取消请求，直接重新抛出
    if (isAbortError(error)) {
      throw error;
    }
    
    // 如果是网络错误
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new ApiError('网络连接失败，请检查网络', 'NETWORK_ERROR', 0);
    }
    
    // 其他错误
    throw error;
  }
}

export const api = {
  get: (url, options = {}) => request(url, options),
  post: (url, body, options = {}) => request(url, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (url, body, options = {}) => request(url, { method: 'PUT', body: JSON.stringify(body), ...options }),
  delete: (url, options = {}) => request(url, { method: 'DELETE', ...options }),
};

// ==================== 灵魂歌曲 API ====================

/**
 * 获取灵魂歌曲数据
 * @param {string} subjectId - 测算对象 ID
 */
export async function getSoulSong(subjectId) {
  return api.get(`/soul-song/${subjectId}`);
}

/**
 * 解锁灵魂歌曲
 * @param {string} subjectId - 测算对象 ID
 */
export async function unlockSoulSong(subjectId) {
  return api.post('/soul-song/unlock', { subjectId });
}

/**
 * 获取灵魂歌曲价格
 */
export async function getSoulSongPricing() {
  return api.get('/soul-song/pricing');
}
