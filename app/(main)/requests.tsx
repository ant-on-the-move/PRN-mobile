import { RequestCard } from 'app/components/RequestCard';
import { ScrollView, StyleSheet } from 'react-native';
import { YStack } from 'tamagui'


const MOCK_TARGETS = [1, 2, 3, 4, 5]
export default function Requests() {
    return (
        <ScrollView>    
            <YStack style={styles.container}>
                <RequestCard />
                <RequestCard />
                <RequestCard />
            </YStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
    contentContainer: {
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    separator: {
        height: 16,
    }
}) 
