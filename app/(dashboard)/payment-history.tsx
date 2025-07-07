import { X } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { Button, Image, XStack, YStack, Text } from 'tamagui'
import { DRequestCard } from 'app/components/DRequestCard'

export default function PaymentHistory({
    status = "fail", // or "fail"
    amount = 12000,
    transactionId = "12345123412341234",
    date = "24 jun",
    user = { name: "Emilia Clarke", avatar: "https://i.pravatar.cc/50?img=47" }
  }) {
    const isSuccess = status === "success";
    return (
        <YStack style={styles.container}>
            <XStack style={styles.header} >
                <Text style={styles.headerTitle}>Payment History(3)</Text>
                <Button icon={<X />} size="$3" style={styles.headerButton} onPress={() => router.back()}/>
            </XStack>
            <YStack style={styles.paymentHistoryContainer}>
                <View style={styles.cardSection} >
                    <XStack style={styles.cardHeader}>
                    <XStack style={styles.cardHeaderContent}>
                        <Image
                        source={{ uri: user.avatar }}
                        width={40}
                        height={40}
                        borderRadius={20}
                        />
                        <Text fontWeight="bold" fontSize={16}>{user.name}</Text>
                    </XStack>
                    <Text color="#888" fontSize={14}>{date}</Text>
                    </XStack>
                    <XStack style={styles.cardContent}>
                    <YStack>
                        <Text color="#888" fontSize={12}>Amount</Text>
                        <Text fontWeight="bold" fontSize={16}>${amount.toLocaleString()}</Text>
                    </YStack>
                    <YStack>
                        <Text color="#888" fontSize={12}>Status</Text>
                        <Text fontWeight="bold" fontSize={16} color={isSuccess ? "#2DA771" : "#F35B5B"}>
                        {isSuccess ? "Success" : "Failed"}
                        </Text>
                    </YStack>
                    </XStack>
                    <YStack style={styles.cardFooter}>
                    <Text color="#888" fontSize={12}>Transaction ID</Text>
                    <Text fontSize={14}>{transactionId}</Text>
                    </YStack>
                </View>
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
    paymentHistoryContainer: {
        marginTop: 10,
        gap: 10,
    },
    cardSection: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        alignItems: "center",
        justifyContent: "space-between",
    },
    cardHeaderContent: {
        alignItems: "center",
        gap: 10,
    },
    cardContent: {
        marginTop: 16,
        gap: 32,
    },
    cardFooter: {
        marginTop: 16,
    },
})