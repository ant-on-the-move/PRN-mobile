import { YStack, XStack, Text, Checkbox, Button, TextArea } from 'tamagui'
import { ArrowLeft, Plus, Check } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { InputComponent } from '../components/InputComponent'
import { PrimaryButtonComponent } from '../components/ButtonComponent'

export default function AddTargetScreen() {
    const router = useRouter()
    const { top } = useSafeAreaInsets()
    const [isNegotiable, setIsNegotiable] = useState(true)

    return (
        <YStack flex={1} bg="white" pt={20} px="$4" gap="$5">
            {/* Header */}
            <XStack style={{ alignItems: 'center' }} gap="$3">
                <Button size="$1" icon={<ArrowLeft size="$1" />} chromeless onPress={() => router.back()} />
                <Text fontSize="$5" fontWeight="bold">Create Referal</Text>
            </XStack>

            {/* Form */}
            <YStack gap="$4" flex={1}>
                <InputComponent placeholder="Name" />
                <TextArea
                    placeholder="About the person"
                    style={styles.textArea}
                    height={120}
                />
                <Button icon={Plus} chromeless style={{ justifyContent: 'flex-start' }} p={0}>
                    <Text color="#0077FF">#Add Tags</Text>
                </Button>
                <InputComponent placeholder="Connection Type" />
                <InputComponent placeholder="Payment (Optional)" />
                <XStack style={{ alignItems: 'center' }} gap="$2">
                    <Checkbox
                        checked={isNegotiable}
                        onCheckedChange={() => setIsNegotiable(!isNegotiable)}
                        size="$4"
                        id="negotiable-checkbox"
                        value="negotiable"
                        backgroundColor="#F8F9FA"
                    >
                        <Checkbox.Indicator>
                            <Check />
                        </Checkbox.Indicator>
                    </Checkbox>
                    <Text>negotiable</Text>
                </XStack>
            </YStack>

            {/* Submit Button */}
            <YStack mt="auto" mb="$4">
                <PrimaryButtonComponent name="Create Referal" onPress={() => { }} />
            </YStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    textArea: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#F8F9FA'
    }
}) 