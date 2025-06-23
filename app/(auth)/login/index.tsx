import { YStack, Text, Button, Image, Input, XStack } from 'tamagui'
import { Link, useRouter } from 'expo-router'
import { Activity } from '@tamagui/lucide-icons'
import { StyleSheet } from 'react-native'
import { InputComponent } from 'app/components/InputComponent'
import { GoogleButtonComponent, PrimaryButtonComponent } from 'app/components/ButtonComponent'
import { useAuth } from 'app/context/auth'
import { useEffect } from 'react'
export default function LoginScreen() {
    const { isAuthenticated, login } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/home') // ✅ skip login if already logged in
        }
    }, [isAuthenticated])

    return (
        <YStack flex={1} p="$4" gap="$4" style={styles.container}>
            <YStack gap={32}>
                <YStack gap={12}>
                    <XStack style={styles.titleSection}>
                        <Text style={styles.titleText}>Welcome to PRF </Text>
                        <Image source={require("../../../assets/images/Group 14.png")} />
                    </XStack>
                    <XStack>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eor incididunt ut labore e
                        </Text>
                    </XStack>
                </YStack>
                <YStack style={styles.inputSection}>
                    <InputComponent placeholder='Email' />
                    <InputComponent placeholder='Password' />
                    <Text>Forgot Password</Text>
                </YStack>
                <YStack gap={16}>
                    <PrimaryButtonComponent name="Log in" onPress={() => {
                        login()
                    }} />
                    <GoogleButtonComponent />
                </YStack>
            </YStack>

            <XStack style={styles.bottomText}>
                <Text>
                    Don’t have an account? <Link href="../register" style={styles.linkText}>Create Account</Link>
                </Text>
            </XStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingTop: 60,
        height: '100%',
        justifyContent: 'space-between'

    },

    titleSection: {
        alignItems: 'center',
        gap: 8
    },

    titleText: {
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: 28.8,
        letterSpacing: 0,
        verticalAlign: 'middle'
    },

    inputSection: {
        gap: 24
    },

    bottomText: {
        justifyContent: 'center',
        paddingBottom: 0
    },

    linkText: {
        fontFamily: 'Nunito',
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 16.8,
        color: '#0077FF',
    }
})