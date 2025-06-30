import { View, Text, YStack, XStack, Image } from "tamagui";
import { X as Close, CheckCircle, XCircle } from '@tamagui/lucide-icons';
import { StyleSheet } from "react-native";

export default function TransactionResult({
  status = "fail", // or "fail"
  amount = 12000,
  transactionId = "12345123412341234",
  date = "24 jun",
  user = { name: "Emilia Clarke", avatar: "https://i.pravatar.cc/50?img=47" }
}) {
  const isSuccess = status === "success";
  return (
    <YStack style={styles.container}>
      {/* Top section */}
      <YStack  style={[styles.topSection, { backgroundColor: isSuccess ? "#2DA771" : "#F35B5B" }]}>
        <XStack style={styles.closeButton}>
          <Close color="#fff" size={24} />
        </XStack>
        {isSuccess ? (
          <Image source={require("../../assets/images/transaction_success.png")} width={105} height={105} />
        ) : (
          <Image source={require("../../assets/images/transaction_fail.png")} width={105} height={105} />
        )}
        <Text style={styles.title}>
          {isSuccess ? "Transaction Successful" : "Transaction Failed"}
        </Text>
        <Text style={styles.amount}>
          ${amount.toLocaleString()}
        </Text>
        {!isSuccess && (
          <Text style={styles.description}>
            If any amount debited will be credited back in 24 hours
          </Text>
        )}
      </YStack>

      {/* Card section */}
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
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: "relative",
    height: '50%',
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  amount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
    maxWidth: 250,
  },
  cardSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: -40,
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
});