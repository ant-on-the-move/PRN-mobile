import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User, AuthResponse } from '../types'
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  // State
  access_token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  userId: number | null
  // Actions
  login: (authData: AuthResponse) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      // user: null,
      access_token: null,
      // refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      userId: null,

      // Actions
      login: (authData: AuthResponse) => {
        const decoded = jwtDecode<{ id: number }>(authData.access_token)
        console.log(decoded)
        set({
          access_token: authData.access_token,
          isAuthenticated: true,
          isLoading: false,
          userId: decoded.id
        })
      },

      logout: () => {
        set({
          access_token: null,
          isAuthenticated: false,
          isLoading: false,
          userId: null
        })
      },

      // updateUser: (user: User) => {
      //   set({ user })
      // },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      // refreshAuth: (token: string, refreshToken: string) => {
      //   set({
      //     token,
      //     refreshToken,
      //   })
      // },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // user: state.user,
        access_token: state.access_token,
        // refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        userId: state.userId
      }),
    }
  )
) 

export default useAuthStore