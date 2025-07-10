import { PrimaryButtonComponent } from 'app/components/ButtonComponent'
import { StepperComponent } from 'app/components/StepperComponent'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { StyleSheet, type TextInput } from 'react-native'
import { YStack, Text, XStack, Input } from 'tamagui'
import { useLocalSearchParams } from 'expo-router'
import useAuth from 'app/hooks/useAuth'

export default function Verify() {
    const router = useRouter()
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const inputsRef = useRef<(TextInput | null)[]>([])
    const { email, name, password } = useLocalSearchParams()
    const { verifyEmail, isVerifyingEmail } = useAuth()

    const handleOtpChange = (text: string, index: number) => {
        if (isError) {
            setIsError(false)
        }
        // Only allow digits
        let value = text.replace(/\D/g, '')
        // If user pastes multiple digits, fill them in order
        if (value.length > 1) {
            const newOtp = [...otp]
            for (let i = 0; i < value.length && index + i < 6; i++) {
                newOtp[index + i] = value[i]
            }
            setOtp(newOtp)
            // Focus the last filled input
            const nextIndex = Math.min(index + value.length, 5)
            inputsRef.current[nextIndex]?.focus()
            return
        }
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    const isOtpComplete = otp.every((digit) => digit.length === 1)

    const handleVerify = async () => {
        const enteredOtp = otp.join('')
        // Check if all fields are filled
        if (!isOtpComplete) {
            setIsError(true)
            setErrorMessage('Please fill all OTP fields')
            return
        }
        setIsError(false)
        setErrorMessage('')
        await verifyEmail({
            name: name as string,
            email: email as string,
            password: password as string,
            otp: enteredOtp,
        })
    }

    return (
        <YStack style={styles.container}>
            <StepperComponent currentStep={1} />
            <YStack style={styles.contentContainer}>
                <YStack style={styles.emailContainer}>
                    <Text style={styles.emailLabel}>Email</Text>
                    <Text style={styles.emailText}>{email}</Text>
                </YStack>

                <XStack style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            ref={(ref) => {
                                inputsRef.current[index] = ref
                            }}
                            style={[styles.otpInput, isError && styles.otpInputError]}
                            maxLength={1}
                            keyboardType="numeric"
                            value={digit}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                        />
                    ))}
                </XStack>

                <XStack style={styles.bottomTextContainer}>
                    <Text style={styles.resendText}>Resend OTP</Text>
                    {isError && <Text style={styles.errorText}>{errorMessage}</Text>}
                </XStack>

                <PrimaryButtonComponent
                    name="Verify Code"
                    onPress={handleVerify}
                />
            </YStack>
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
    contentContainer: {
        marginTop: 40,
        gap: 24,
    },
    emailContainer: {
        gap: 8,
    },
    emailLabel: {
        fontFamily: 'Nunito',
        fontWeight: '500',
        fontSize: 14,
        color: '#616B80',
    },
    emailText: {
        fontFamily: 'Nunito',
        fontWeight: '600',
        fontSize: 16,
        color: '#232A38',
        borderBottomWidth: 1,
        borderBottomColor: '#CED4DA',
        paddingBottom: 8,
    },
    otpContainer: {
        justifyContent: 'space-between',
        gap: 12,
    },
    otpInput: {
        width: 48,
        height: 48,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#CED4DA',
        borderRadius: 8,
    },
    otpInputError: {
        borderColor: 'red',
    },
    bottomTextContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    resendText: {
        fontFamily: 'Nunito',
        fontWeight: '600',
        fontSize: 14,
        color: '#0077FF',
    },
    errorText: {
        fontFamily: 'Nunito',
        fontWeight: '600',
        fontSize: 14,
        color: 'red',
    },
})

