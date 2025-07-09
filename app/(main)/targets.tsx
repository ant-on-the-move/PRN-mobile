import { TargetCard } from 'app/components/TargetCard'
import { YStack, Text, Spinner } from 'tamagui'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet } from 'react-native'
import { useTargets } from '../hooks/useTargets'
import { useUIStore } from '../stores/uiStore'

export default function Targets() {
    const { targets, isLoading, isError, error, refetch } = useTargets()
    const { activeTab } = useUIStore()

    if (isLoading) {
        return (
            <YStack flex={1} style={{ justifyContent: 'center', alignItems: 'center' }} bg="#F8F9FA">
                <Spinner size="large" color="#0077FF" />
                <Text mt="$2" color="#616B80">Loading targets...</Text>
            </YStack>
        )
    }

    if (isError) {
        return (
            <YStack flex={1} style={{ justifyContent: 'center', alignItems: 'center' }} bg="#F8F9FA">
                <Text color="red" style={{ textAlign: 'center' }} px="$4">
                    {error?.message || 'Failed to load targets'}
                </Text>
                <Text 
                    mt="$2" 
                    color="#0077FF" 
                    onPress={() => refetch()}
                    style={{ textDecorationLine: 'underline' }}
                >
                    Tap to retry
                </Text>
            </YStack>
        )
    }

    if (targets.length === 0) {
        return (
            <YStack flex={1} style={{ justifyContent: 'center', alignItems: 'center' }} bg="#F8F9FA">
                <Text color="#616B80" style={{ textAlign: 'center' }} px="$4">
                    No targets found. Create your first target to get started!
                </Text>
            </YStack>
        )
    }

    return (
        <YStack flex={1} px="$4" bg="#F8F9FA">
            <FlashList
                data={targets}
                renderItem={({ item }) => <TargetCard key={item.id} target={item} />}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={250}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <YStack style={styles.separator} />}
                onRefresh={refetch}
                refreshing={isLoading}
            />
        </YStack>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    separator: {
        height: 16,
    }
}) 