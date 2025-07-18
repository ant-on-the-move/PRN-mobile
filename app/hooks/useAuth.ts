import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../stores/authStore'
import { useToastController } from '@tamagui/toast'
import { apiClient, API_ENDPOINTS } from '../services/api'
import { LoginRequest, RegisterRequest, AuthResponse, ApiResponse, VerifyEmailRequest } from '../types'
import { useRouter } from 'expo-router'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { login, logout, setLoading } = useAuthStore()
  const toast = useToastController()

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      setLoading(true)
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials)
      return response.data
    },
    onSuccess: (data) => {
      login(data)
      toast.show('Login successful!', {
        theme: 'green',
        duration: 3000
      })
      router.replace('/(main)/(tabs)/home');
    },
    onError: (error: any) => {
      toast.show(error.message || 'Login failed', {
        theme: 'red',
        duration: 3000
      })
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<AuthResponse> => {
      setLoading(true)
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData)
      return response.data
    },
    onSuccess: (data, variables) => {
      // login(data)
      toast.show('Please verify your email', {
        theme: 'green',
        duration: 3000
      })
      router.replace({ pathname: '/register/verify', params: { 
          email: variables.email,
          name: variables.name,
          password: variables.password
        } 
      })
    },
    onError: (error: any) => {
      toast.show('User already exists. Please use login instead.', {
        theme: 'red',
        duration: 3000
      })
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
      toast.show('Logged out successfully', {
        theme: 'green',
        duration: 3000
      })
      router.replace('/(auth)/login')
    },
    onError: (error: any) => {
      // Even if logout API fails, we should still logout locally
      logout()
      queryClient.clear()
      toast.show('Logged out', {
        theme: 'blue',
        duration: 3000
      })
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
      toast.show('Password reset email sent!', {
        theme: 'green',
        duration: 3000
      })
    },
    onError: (error: any) => {
      toast.show(error.message || 'Failed to send reset email', {
        theme: 'red',
        duration: 3000
      })
    },
  })

  // Verify email mutation
  const verifyEmailMutation = useMutation({
    mutationFn: async (userData: VerifyEmailRequest): Promise<AuthResponse> => {
      setLoading(true)
      const response = await apiClient.post(API_ENDPOINTS.VERIFY_EMAIL, userData)
      return response.data
    },
    onSuccess: (data, variables) => {
      // login(data)
      toast.show('Registration successful!', {
        theme: 'green',
        duration: 3000
      })
      router.replace('/register/connect')
    },
    onError: (error: any) => {
      toast.show('User already exists. Please use login instead.', {
        theme: 'red',
        duration: 3000
      })
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  return {
    // Mutations
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    verifyEmail: verifyEmailMutation.mutate,
    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isSendingResetEmail: forgotPasswordMutation.isPending,
    isVerifyingEmail: verifyEmailMutation.isPending,
    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    forgotPasswordError: forgotPasswordMutation.error,
    verifyEmailError: verifyEmailMutation.error,
  }
} 

export default useAuth