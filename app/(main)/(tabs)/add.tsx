import { Text, YStack } from 'tamagui'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function AddScreen() {
  const router = useRouter()
  useEffect(() => {
    // This screen is just for the button, it should not be an active screen.
    // If somehow navigated here, go back.
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace('/home')
    }
  }, [router])
  return (
    <YStack style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Screen</Text>
    </YStack>
  )
} 