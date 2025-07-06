import { TargetCard } from 'app/components/TargetCard'
import { YStack } from 'tamagui'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet } from 'react-native'

const MOCK_TARGETS = [1, 2, 3, 4, 5]

export default function Targets() {
    return (
        <YStack flex={1} px="$4" bg="#F8F9FA">
            <FlashList
                data={MOCK_TARGETS}
                renderItem={() => <TargetCard />}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={250}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <YStack style={styles.separator} />}
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