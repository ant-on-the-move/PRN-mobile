import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../stores/authStore'
import { useUIStore } from '../stores/uiStore'
import { apiClient, API_ENDPOINTS } from '../services/api'
import { mockApi } from '../services/mockApi'
import { LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../types'
import { useRouter } from 'expo-router'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { login, logout, setLoading } = useAuthStore()
  const { showToast } = useUIStore()

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      setLoading(true)
      const response = await mockApi.login(credentials)
      return response.data
    },
    onSuccess: (data) => {
      login(data)
      showToast('Login successful!', 'success')
      router.replace('/(main)/targets')
    },
    onError: (error: any) => {
      showToast(error.message || 'Login failed', 'error')
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<AuthResponse> => {
      setLoading(true)
      const response = await mockApi.register(userData)
      return response.data
    },
    onSuccess: (data) => {
      login(data)
      showToast('Registration successful!', 'success')
      router.replace('/(main)/targets')
    },
    onError: (error: any) => {
      showToast(error.message || 'Registration failed', 'error')
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Mock logout - just return success
      return Promise.resolve()
    },
    onSuccess: () => {
      logout()
      queryClient.clear() // Clear all cached data
      showToast('Logged out successfully', 'success')
      router.replace('/(auth)/login')
    },
    onError: (error: any) => {
      // Even if logout API fails, we should still logout locally
      logout()
      queryClient.clear()
      showToast('Logged out', 'info')
      router.replace('/(auth)/login')
    },
  })

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      // Mock forgot password
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { success: true }
    },
    onSuccess: () => {
      showToast('Password reset email sent!', 'success')
    },
    onError: (error: any) => {
      showToast(error.message || 'Failed to send reset email', 'error')
    },
  })

  return {
    // Mutations
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    
    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isSendingResetEmail: forgotPasswordMutation.isPending,
    
    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    forgotPasswordError: forgotPasswordMutation.error,
  }
} 

export default useAuth