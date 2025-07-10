import { GoogleButtonComponent, PrimaryButtonComponent } from 'app/components/ButtonComponent'
import { InputComponent } from 'app/components/InputComponent'
import { StepperComponent } from 'app/components/StepperComponent'
import { Link, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { YStack, Text, Button, Separator, XStack } from 'tamagui'
import { useState } from 'react'
import useAuth from 'app/hooks/useAuth'

export default function Register() {
    const router = useRouter()
    const { register, isRegistering } = useAuth()
    
    // Form state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    // Error state
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const validateForm = () => {
        let isValid = true
        
        // Reset errors
        setNameError('')
        setEmailError('')
        setPasswordError('')
        setConfirmPasswordError('')
        
        // Name validation
        if (!name.trim()) {
            setNameError('Name is required')
            isValid = false
        } else if (name.trim().length < 2) {
            setNameError('Name must be at least 2 characters')
            isValid = false
        }
        
        // Email validation
        if (!email.trim()) {
            setEmailError('Email is required')
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Enter a valid email address')
            isValid = false
        }
        
        // Password validation
        if (!password) {
            setPasswordError('Password is required')
            isValid = false
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters')
            isValid = false
        }
        // } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        //     setPasswordError('Password must contain uppercase, lowercase, and number')
        //     isValid = false
        // }
        
        // Confirm password validation
        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password')
            isValid = false
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match')
            isValid = false
        }
        
        return isValid
    }

    const handleContinue = async () => {
        if (validateForm()) {
            await register({ name, email, password })
        }
    }

    return (
        <YStack style={styles.container}>
            <StepperComponent currentStep={0} />
            <YStack style={styles.inputContainer}>
                <GoogleButtonComponent />
                <Separator style={styles.separator} />
                <InputComponent 
                    placeholder='Name' 
                    value={name}
                    onChangeText={setName}
                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
                
                <InputComponent 
                    placeholder='Email' 
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                
                <InputComponent 
                    placeholder='Password' 
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                
                <InputComponent 
                    placeholder='Re-enter Password' 
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                
                <PrimaryButtonComponent name={isRegistering ? "Registering..." : "Continue"} onPress={handleContinue} disabled={isRegistering} />
            </YStack>
            <XStack style={styles.bottomText}>
                <Text>
                Already have an account? <Link href="../login" style={styles.linkText}>Login</Link>
                </Text>
            </XStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginRight: 24,
        marginLeft: 24,        
    },
    
    inputContainer: {
        marginTop: 50,
        gap: 24,
    },

    separator: {
        marginVertical: 10,
    },

    bottomText: {
        justifyContent: 'center',
        marginTop: 20,
    },

    linkText: {
        fontFamily: 'Nunito',
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 16.8,
        color: '#0077FF',
    },

    errorText: {
        color: '#dc3545',
        fontSize: 12,
        marginTop: -16,
        marginBottom: -8,
        fontFamily: 'Nunito',
    }
})

