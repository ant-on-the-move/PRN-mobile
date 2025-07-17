// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  bio?: string
  rating: number
  reviewCount: number
  profession: string
  tags: string[]
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  phone?: string
  location?: string
  website?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    instagram?: string
  }
}

// Target Types
export interface Target {
  id: string
  name: string
  image_url: string
  profession: string
  tags: string[]
  bio: string
  rating: number
  reviewCount: number
  verified: boolean
  price: number
  currency: string
  serviceType: 'Video Call' | 'Meeting' | 'Consultation'
  createdAt: string
  updatedAt: string
}

export interface CreateTargetRequest {
  name: string
  profession: string
  tags: string[]
  bio: string
  price: number
  currency: string
  serviceType: 'Video Call' | 'Meeting' | 'Consultation'
}

// Request Types
export interface Request {
  id: string
  requesterId: string
  requester: User
  targetId: string
  target: Target
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled'
  message?: string
  amount: number
  currency: string
  serviceType: 'Video Call' | 'Meeting' | 'Consultation'
  scheduledAt?: string
  createdAt: string
  updatedAt: string
}

export interface CreateRequestRequest {
  targetId: string
  message?: string
  amount: number
  currency: string
  serviceType: 'Video Call' | 'Meeting' | 'Consultation'
  scheduledAt?: string
}

// Payment Types
export interface Payment {
  id: string
  requestId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transactionId: string
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'request' | 'alert' | 'payment' | 'system'
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  createdAt: string
}

// Search Types
export interface SearchFilters {
  query?: string
  tags?: string[]
  minPrice?: number
  maxPrice?: number
  serviceType?: string
  verified?: boolean
  sortBy?: 'rating' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Auth Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface VerifyEmailRequest {
  name: string  
  email: string
  password: string
  otp: string
}

export interface AuthResponse {
  access_token: string
  token_type: string                                                                   
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: {
    items: T[]
    total: number
    page: number
    limit: number
    hasMore: boolean
  }
  message?: string
}

// Error Types
export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: Record<string, any>
} 