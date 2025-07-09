import { Target, Request, User, AuthResponse, ApiResponse } from '../types'

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'george@example.com',
    name: 'George RR Martin',
    avatar: 'https://i.pravatar.cc/150?u=george',
    bio: 'Renowned author known for epic fantasy series',
    rating: 4.8,
    reviewCount: 35,
    profession: 'Writer',
    tags: ['Fantasy', 'Author', 'Screenwriter'],
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'emilia@example.com',
    name: 'Emilia Clarke',
    avatar: 'https://i.pravatar.cc/150?u=emilia',
    bio: 'Actress known for her role as Daenerys Targaryen',
    rating: 4.9,
    reviewCount: 42,
    profession: 'Actress',
    tags: ['Actor', 'Model', 'Theater'],
    verified: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
]

const mockTargets: Target[] = [
  {
    id: '1',
    name: 'George RR Martin',
    avatar: 'https://i.pravatar.cc/150?u=george',
    profession: 'Writer',
    tags: ['Fantasy', 'Author', 'Screenwriter'],
    bio: 'I have known Emilia Clarke from days of game of thrones from 2010 to 2018. He played john snow in game of thrones which was produced by HBO studios. great guy good to work with',
    rating: 4.8,
    reviewCount: 35,
    verified: true,
    price: 12000,
    currency: 'USD',
    serviceType: 'Video Call',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Emilia Clarke',
    avatar: 'https://i.pravatar.cc/150?u=emilia',
    profession: 'Actress',
    tags: ['Actor', 'Model', 'Theater'],
    bio: 'Professional actress with extensive experience in film and television. Known for iconic roles in major productions.',
    rating: 4.9,
    reviewCount: 42,
    verified: true,
    price: 15000,
    currency: 'USD',
    serviceType: 'Meeting',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Kit Harington',
    avatar: 'https://i.pravatar.cc/150?u=kit',
    profession: 'Actor',
    tags: ['Actor', 'Film', 'Television'],
    bio: 'Versatile actor with experience in both stage and screen productions.',
    rating: 4.7,
    reviewCount: 28,
    verified: true,
    price: 10000,
    currency: 'USD',
    serviceType: 'Consultation',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
]

const mockRequests: Request[] = [
  {
    id: '1',
    requesterId: '2',
    requester: mockUsers[1],
    targetId: '1',
    target: mockTargets[0],
    status: 'pending',
    message: 'Would love to discuss collaboration opportunities',
    amount: 12000,
    currency: 'USD',
    serviceType: 'Video Call',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    requesterId: '1',
    requester: mockUsers[0],
    targetId: '2',
    target: mockTargets[1],
    status: 'accepted',
    message: 'Looking forward to our meeting',
    amount: 15000,
    currency: 'USD',
    serviceType: 'Meeting',
    scheduledAt: '2024-01-20T14:00:00Z',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions
export const mockApi = {
  // Auth
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<AuthResponse>> => {
    await delay(1000)
    
    const user = mockUsers.find(u => u.email === credentials.email)
    if (!user || credentials.password !== 'password') {
      throw new Error('Invalid credentials')
    }

    return {
      success: true,
      data: {
        user,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      },
      message: 'Login successful',
    }
  },

  register: async (userData: { email: string; password: string; name: string; profession: string }): Promise<ApiResponse<AuthResponse>> => {
    await delay(1500)
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: userData.email,
      name: userData.name,
      profession: userData.profession,
      rating: 0,
      reviewCount: 0,
      tags: [],
      verified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    return {
      success: true,
      data: {
        user: newUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      },
      message: 'Registration successful',
    }
  },

  // Targets
  getTargets: async (): Promise<ApiResponse<Target[]>> => {
    await delay(800)
    return {
      success: true,
      data: mockTargets,
      message: 'Targets retrieved successfully',
    }
  },

  getTarget: async (id: string): Promise<ApiResponse<Target>> => {
    await delay(500)
    const target = mockTargets.find(t => t.id === id)
    if (!target) {
      throw new Error('Target not found')
    }
    return {
      success: true,
      data: target,
      message: 'Target retrieved successfully',
    }
  },

  createTarget: async (targetData: any): Promise<ApiResponse<Target>> => {
    await delay(1000)
    const newTarget: Target = {
      id: String(mockTargets.length + 1),
      ...targetData,
      rating: 0,
      reviewCount: 0,
      verified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockTargets.push(newTarget)
    return {
      success: true,
      data: newTarget,
      message: 'Target created successfully',
    }
  },

  // Requests
  getRequests: async (): Promise<ApiResponse<Request[]>> => {
    await delay(600)
    return {
      success: true,
      data: mockRequests,
      message: 'Requests retrieved successfully',
    }
  },

  getRequest: async (id: string): Promise<ApiResponse<Request>> => {
    await delay(400)
    const request = mockRequests.find(r => r.id === id)
    if (!request) {
      throw new Error('Request not found')
    }
    return {
      success: true,
      data: request,
      message: 'Request retrieved successfully',
    }
  },

  createRequest: async (requestData: any): Promise<ApiResponse<Request>> => {
    await delay(1200)
    const target = mockTargets.find(t => t.id === requestData.targetId)
    const requester = mockUsers[0] // Mock current user
    
    if (!target) {
      throw new Error('Target not found')
    }

    const newRequest: Request = {
      id: String(mockRequests.length + 1),
      requesterId: requester.id,
      requester,
      targetId: target.id,
      target,
      status: 'pending',
      ...requestData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    mockRequests.push(newRequest)
    return {
      success: true,
      data: newRequest,
      message: 'Request created successfully',
    }
  },

  updateRequestStatus: async (id: string, status: Request['status']): Promise<ApiResponse<Request>> => {
    await delay(800)
    const request = mockRequests.find(r => r.id === id)
    if (!request) {
      throw new Error('Request not found')
    }
    
    request.status = status
    request.updatedAt = new Date().toISOString()
    
    return {
      success: true,
      data: request,
      message: 'Request status updated successfully',
    }
  },
} 

export default mockApi