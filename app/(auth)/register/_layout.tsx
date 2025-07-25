import { Stack } from 'expo-router'

export default function RegisterLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom',
            }}
        />
    )
}
