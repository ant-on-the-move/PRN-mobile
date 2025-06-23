import { Drawer } from 'expo-router/drawer'
import { Text, YStack, XStack } from 'tamagui'
import { LogOut, ChevronRight, Settings, HelpCircle, History, Bookmark, Send } from '@tamagui/lucide-icons'
import { StyleSheet } from 'react-native'
import { useAuth } from 'app/context/auth'

function CustomDrawerContent() {
    const { logout } = useAuth()
    return (
        <YStack style={styles.container}>
            <YStack>
                <Text>Logo Here</Text>
            </YStack>

            <YStack style={styles.menuContainer}>
                <XStack style={styles.menuItem}>
                    <XStack style={styles.menuItemContent}>
                        <Send />
                        <Text>Requests</Text>
                    </XStack>
                    <ChevronRight />
                </XStack>
                <XStack style={styles.menuItem}>
                    <XStack style={styles.menuItemContent}>
                        <Bookmark />
                        <Text>Bookmarks</Text>
                    </XStack>
                    <ChevronRight />
                </XStack>
                <XStack style={styles.menuItem}>
                    <XStack style={styles.menuItemContent}>
                        <History />
                        <Text>Payment History</Text>
                    </XStack>
                    <ChevronRight />
                </XStack>
                <XStack style={styles.menuItem}>
                    <XStack style={styles.menuItemContent}>
                        <HelpCircle />
                        <Text>Support</Text>
                    </XStack>
                    <ChevronRight />
                </XStack>
                <XStack style={styles.menuItem}>
                    <XStack style={styles.menuItemContent}>
                        <Settings />
                        <Text>Settings</Text>
                    </XStack>
                    <ChevronRight />
                </XStack>
            </YStack>

            <XStack
                style={styles.logoutContainer}
                onPress={() => logout()}
            >
                <LogOut />
                <Text>Log out</Text>
            </XStack>
        </YStack>
    )
}

export default function DrawerLayout() {
    return (
        <Drawer 
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: 'white',
                    width: 280,
                },
                drawerPosition: 'left',
            }}
        >
            <Drawer.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
        </Drawer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    menuContainer: {
        gap: 16,
        marginTop: 32,
    },
    menuItem: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
    },
    menuItemContent: {
        gap: 12,
        alignItems: 'center',
    },
    logoutContainer: {
        gap: 12,
        alignItems: 'center',
        marginTop: 'auto',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    }
}) 