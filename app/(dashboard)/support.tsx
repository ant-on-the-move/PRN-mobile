import { AtSign, Phone, X } from "@tamagui/lucide-icons";
import { TargetCard } from "app/components/TargetCard";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button, Input, Paragraph, Separator, Text, TextArea, XStack, YStack } from "tamagui";

export default function Support() {
    return (
        <YStack style={styles.container}>
            <XStack style={styles.header} >
                <Text style={styles.headerTitle}>Support</Text>
                <Button icon={<X />} size="$3" style={styles.headerButton} onPress={() => router.back()}/>
            </XStack>
            <YStack style={styles.supportContainer}>
                <Paragraph>
                    Contact us through email or mobile given below we will reach out within 24 hours of initail contact made.
                </Paragraph>
                <XStack style={styles.supportContact}>
                    <AtSign size={20} />
                    <Text style={styles.supportText}>prnsupport@gmail.com</Text>
                </XStack>
                <XStack style={styles.supportContact}>
                    <Phone size={20} />
                    <Text style={styles.supportText}>+91 9876543210</Text>
                </XStack>
                <Separator />
                <YStack style={styles.supportForm}>
                    <Text style={styles.supportFormTitle}>Submit a Request</Text>
                    <Input placeholder="Ticket Reason" /> 
                    <TextArea placeholder="Description" height={200} />
                    <Button style={styles.supportFormButton}>
                        <Text style={styles.supportFormButtonText}>Submit</Text>
                    </Button>
                </YStack>
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
    supportContainer: {
        marginTop: 10,
        gap: 20,
    },
    supportContact: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    supportText: {
        fontFamily: 'Nunito',
        fontWeight: '500',
        fontStyle: 'normal',
        fontSize: 16,
    },
    supportForm: {
        marginTop: 10,
        gap: 10,
    },
    supportFormTitle: {
        fontFamily: 'Nunito',
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 20,
    },
    supportFormButton: {
        backgroundColor: '#0077FF',
    },
    supportFormButtonText: {
        color: '#ffffff',
        fontFamily: 'Nunito',
        fontWeight: '900',
        fontStyle: 'normal',
        fontSize: 16,
    },
})