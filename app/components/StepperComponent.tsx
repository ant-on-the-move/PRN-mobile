import { StyleSheet } from 'react-native'
import { XStack, YStack, Text, Circle } from 'tamagui'

const steps = ['Basic Details', 'Connect', 'Review']

export function StepperComponent({ currentStep = 0 }: { currentStep: number }) {
  return (
    <YStack>
        <YStack gap={8}>
            <Text style={styles.title}>Let's get you started</Text>
            <Text style={styles.titleDescription}>Enter few details to start with PRF</Text>
        </YStack>

        <XStack style={styles.stepperContainer}>
            {steps.map((label, index) => {
                const isActive = currentStep === index
                const isCompleted = index < currentStep

                return (
                    <YStack key={label} style={styles.stepperItem}>
                    <Circle
                        size={36}
                        bg={isActive ? '#0077FF' : isCompleted ? '#d0ebff' : '#f1f3f5'}
                        borderWidth={isActive ? 0 : 1}
                        borderColor="#ced4da"
                    >
                        <Text
                        color={isActive ? 'white' : '#495057'}
                        fontWeight="700"
                        >
                        {index + 1}
                        </Text>
                    </Circle>                    
                    <Text style={styles.stepperItemText}>{label}</Text>
                </YStack>                    
                )
            })}
        </XStack>
    </YStack>
  )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Nunito',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 26.8,
        letterSpacing: 0,
        verticalAlign: 'middle',
        color: '#232A38'
    },
    titleDescription: {
        fontFamily: 'Nunito',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: 0,
        color: '#616B80'
    },
    stepperContainer: {
        marginTop: 24,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stepperItem: {
        alignItems: 'center',
        gap: 8,
    },
    stepperItemText: {
        fontFamily: 'Nunito',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 14.4,
        letterSpacing: 0,
        color: '#232A38'
    },
})