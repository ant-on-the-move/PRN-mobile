import { YStack, Text, Button } from 'tamagui'
import { useRouter } from 'expo-router'

export default function GoogleOptScreen() {
    const router = useRouter()

    return (
        <YStack flex={1} p="$4" gap="$4">
            <Text fontSize="$6">Google Login Screen</Text>
            <Button onPress={() => router.back()}>Go Back</Button>
        </YStack>
    )
}
