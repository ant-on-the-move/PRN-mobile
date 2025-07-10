import { StyleSheet } from 'react-native'
import { Input, YStack, InputProps } from 'tamagui'

export const InputComponent = ({ placeholder, ...props }: InputProps) => {
    return (
        <YStack>
            <Input
                style={styles.inputStyle}
                placeholder={placeholder}
                {...props}
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

export default InputComponent