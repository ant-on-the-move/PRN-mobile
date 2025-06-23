import { TargetCard } from 'app/components/TargetCard'
import { YStack } from 'tamagui'
import { FlashList } from '@shopify/flash-list'
import { StyleSheet } from 'react-native'

const MOCK_TARGETS = [1, 2, 3, 4, 5]

export default function Targets() {
    return (
        <YStack flex={1} px="$4">
            <FlashList
                data={MOCK_TARGETS}
                renderItem={() => <TargetCard />}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={250}
                style={styles.flashList}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <YStack style={styles.separator} />}
            />
        </YStack>
    )
}

const styles = StyleSheet.create({
    flashList: {
        backgroundColor: '#F8F9FA',
    },
    contentContainer: {
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    separator: {
        height: 16,
    }
}) 