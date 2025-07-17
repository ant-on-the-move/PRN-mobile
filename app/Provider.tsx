import { useColorScheme } from 'react-native'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { Toast, ToastProvider, ToastViewport } from '@tamagui/toast'
import { config } from '../tamagui.config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/auth'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false
        }
        return failureCount < 3
      },
    },
    mutations: {
      retry: false,
    },
  },
})

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
        {...rest}
      >
        <AuthProvider>

            <ToastProvider
              swipeDirection="horizontal"
              duration={6000}
              native={
                [
                  // uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go
                  // 'mobile'
                ]
              }
            >
              {children}
              <ToastViewport top="$10" left={0} right={0} />
            </ToastProvider>

        </AuthProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}

export default Provider
