import { Avatar, Button, Text, XStack } from 'tamagui'
import { Menu, Search } from '@tamagui/lucide-icons'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export function HomeHeader() {
    const navigation = useNavigation()
    const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer())

    return (
        <XStack
            style={styles.container}
        >
            <XStack style={styles.innerContainer}>
                <Button icon={Menu} chromeless onPress={openDrawer} />
                <Text fontSize="$6" fontWeight="bold">Home</Text>
            </XStack>

            <XStack style={styles.innerContainer}>
                <Button icon={Search} chromeless />
                <Button size="$3" bg="#0077FF" color="white">+ Create</Button>
                <Avatar circular size="$3">
                    <Avatar.Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <Avatar.Fallback bg="blue" />
                </Avatar>
            </XStack>
        </XStack>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: 'white'
    },
    innerContainer: {
        alignItems: 'center',
        gap: 12
    }
}) 