import { StyleSheet } from 'react-native'
import { Input, YStack, InputProps } from 'tamagui'

export const InputComponent = ({ placeholder }) => {
    return (
        <YStack>
            <Input
                style={styles.inputStyle}
                placeholder={placeholder}
            />
        </YStack>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 48,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        fontSize: 14
    }
})