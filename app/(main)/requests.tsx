import { StyleSheet } from 'react-native'
import { Text, YStack } from 'tamagui'

export default function Requests() {
    return (
        <YStack style={styles.container}>
            <Text>Requests will be shown here.</Text>
            
        </YStack>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}) 