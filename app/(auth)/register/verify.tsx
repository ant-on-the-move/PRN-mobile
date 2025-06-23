import { PrimaryButtonComponent } from 'app/components/ButtonComponent'
import { StepperComponent } from 'app/components/StepperComponent'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { StyleSheet, type TextInput } from 'react-native'
import { YStack, Text, XStack, Input } from 'tamagui'

export default function Verify() {
    const router = useRouter()
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
    const [isError, setIsError] = useState(false)
    const inputsRef = useRef<(TextInput | null)[]>([])

    const handleOtpChange = (text: string, index: number) => {
        if (isError) {
            setIsError(false)
        }
        const newOtp = [...otp]
        newOtp[index] = text
        setOtp(newOtp)

        if (text && index < 5) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    const handleVerify = () => {
        const enteredOtp = otp.join('')
        // Mock verification. In a real app, you'd call your API.
        if (enteredOtp.length !== 6 || enteredOtp !== '123456') {
            setIsError(true)
            return
        }
        setIsError(false)
        console.log('OTP Verified Successfully')
        router.push('/register/connect')
    }

    return (
        <YStack style={styles.container}>
            <StepperComponent currentStep={1} />
            <YStack style={styles.contentContainer}>
                <YStack style={styles.emailContainer}>
                    <Text style={styles.emailLabel}>Email</Text>
                    <Text style={styles.emailText}>Georgerrtestingot@gmail.com</Text>
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
                    {isError && <Text style={styles.errorText}>OTP Incorrect</Text>}
                </XStack>

                <PrimaryButtonComponent
                    name="Verify Code"
                    onPress={handleVerify}
                    disabled={otp.join('').length !== 6}
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

