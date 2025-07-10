import axios from 'axios'

// API Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.prn.com/v1'

// Create axios instance
console.log(API_BASE_URL)
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from storage (you can use AsyncStorage or secure storage)
    const token = getAuthToken() // You'll implement this
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      // You can dispatch logout action here
    }
    return Promise.reject(error)
  }
)

// Helper function to get auth token (implement with your storage solution)
const getAuthToken = (): string | null => {
  // TODO: Implement with AsyncStorage or Expo SecureStore
  return null
}

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: 'api/auth/login',
  REGISTER: 'api/auth/register',
  LOGOUT: 'api/auth/logout',
  REFRESH_TOKEN: 'api/auth/refresh',
  VERIFY_EMAIL: 'api/auth/verify-email',
  FORGOT_PASSWORD: 'api/auth/forgot-password',
  RESET_PASSWORD: 'api/auth/reset-password',
  
  // User
  PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  UPLOAD_AVATAR: '/user/avatar',
  
  // Targets
  TARGETS: '/targets',
  TARGET_DETAILS: (id: string) => `/targets/${id}`,
  CREATE_TARGET: '/targets',
  UPDATE_TARGET: (id: string) => `/targets/${id}`,
  DELETE_TARGET: (id: string) => `/targets/${id}`,
  
  // Requests
  REQUESTS: '/requests',
  REQUEST_DETAILS: (id: string) => `/requests/${id}`,
  CREATE_REQUEST: '/requests',
  UPDATE_REQUEST: (id: string) => `/requests/${id}`,
  DELETE_REQUEST: (id: string) => `/requests/${id}`,
  
  // Payments
  PAYMENTS: '/payments',
  PAYMENT_HISTORY: '/payments/history',
  CREATE_PAYMENT: '/payments',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  MARK_READ: (id: string) => `/notifications/${id}/read`,
  
  // Search
  SEARCH: '/search',
  SEARCH_TARGETS: '/search/targets',
  SEARCH_REQUESTS: '/search/requests',
} as const

export default apiClient 