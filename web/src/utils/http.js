import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://app8071.acapp.acwing.com.cn/api',
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // POST 请求自动转 form-encoded（axios 默认发 JSON，后端要求 form）
  if (config.method === 'post' && config.data && !(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    const params = new URLSearchParams()
    for (const key in config.data) {
      params.append(key, config.data[key])
    }
    config.data = params
  }
  return config
})

export default apiClient
