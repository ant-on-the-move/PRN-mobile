import { X } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import { Button, XStack, YStack } from 'tamagui'
import { DRequestCard } from 'app/components/DRequestCard'

export default function Requests() {
    return (
        <YStack style={styles.container}>
            <XStack style={styles.header} >
                <Text style={styles.headerTitle}>Requests(3)</Text>
                <Button icon={<X />} size="$3" style={styles.headerButton} onPress={() => router.back()}/>
            </XStack>
            <YStack style={styles.requestsContainer}>
                <DRequestCard />
                <DRequestCard />
                <DRequestCard />
            </YStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Nunito',
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 20,
    },
    headerButton: {
        backgroundColor: 'transparent',
        color: 'white',
    },
    requestsContainer: {
        marginTop: 10,
        gap: 10,
    },
})