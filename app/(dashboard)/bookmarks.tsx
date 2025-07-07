import { X } from "@tamagui/lucide-icons";
import { TargetCard } from "app/components/TargetCard";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";

export default function Bookmarks() {
    return (
        <YStack style={styles.container}>
            <XStack style={styles.header} >
                <Text style={styles.headerTitle}>Bookmarks(1)</Text>
                <Button icon={<X />} size="$3" style={styles.headerButton} onPress={() => router.back()}/>
            </XStack>
            <YStack style={styles.bookmarksContainer}>
                <TargetCard />
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
    bookmarksContainer: {
        marginTop: 10,
        gap: 10,
    },
})