import { YStack, Text, Button, Image, Input, XStack } from 'tamagui'
import { Link, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { InputComponent } from 'app/components/InputComponent'
import { GoogleButtonComponent, PrimaryButtonComponent } from 'app/components/ButtonComponent'
import { useAuth } from 'app/hooks/useAuth'
import { useAuthStore } from 'app/stores/authStore'
import { useEffect, useState } from 'react'

export default function LoginScreen() {
    const { isAuthenticated } = useAuthStore()
    const { login, isLoggingIn } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/(main)/targets')
        }
    }, [isAuthenticated])

    const handleLogin = async () => {
        let valid = true;
        setEmailError('');
        setPasswordError('');

        // Email validation
        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Enter a valid email');
            valid = false;
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        }

        if (!valid) return;

        await login({ email, password })
    }

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
                    <InputComponent 
                        placeholder='Email' 
                        value={email}
                        onChangeText={setEmail}
                    />
                    {emailError ? <Text style={{ color: 'red', fontSize: 12, marginTop: 2 }}>{emailError}</Text> : null}
                    <InputComponent 
                        placeholder='Password' 
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {passwordError ? <Text style={{ color: 'red', fontSize: 12, marginTop: 2 }}>{passwordError}</Text> : null}
                    <Text>Forgot Password</Text>
                </YStack>
                <YStack gap={16}>
                    <PrimaryButtonComponent 
                        name={isLoggingIn ? "Logging in..." : "Log in"} 
                        onPress={handleLogin}
                        disabled={isLoggingIn}
                    />
                    <GoogleButtonComponent />
                </YStack>
            </YStack>

            <XStack style={styles.bottomText}>
                <Text>
                    Don't have an account? <Link href="../register" style={styles.linkText}>Create Account</Link>
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