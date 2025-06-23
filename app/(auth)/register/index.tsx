import { GoogleButtonComponent, PrimaryButtonComponent } from 'app/components/ButtonComponent'
import { InputComponent } from 'app/components/InputComponent'
import { StepperComponent } from 'app/components/StepperComponent'
import { Link, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { YStack, Text, Button, Separator, XStack } from 'tamagui'

export default function Register() {
    const router = useRouter()

    const handleContinue = () => {
        router.push('/register/verify')
    }

    return (
        <YStack style={styles.container}>
            <StepperComponent currentStep={0} />
            <YStack style={styles.inputContainer}>
                <GoogleButtonComponent />
                <Separator style={styles.separator} />
                <InputComponent placeholder='Name' />
                <InputComponent placeholder='Email' />
                <InputComponent placeholder='Password' />
                <InputComponent placeholder='Re-enter Password' />
                <PrimaryButtonComponent name="Continue" onPress={handleContinue}/>
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
    }
})

