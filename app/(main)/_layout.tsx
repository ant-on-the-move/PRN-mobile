import { Drawer } from 'expo-router/drawer'
import { Text, YStack, XStack } from 'tamagui'
import { LogOut, ChevronRight, Settings, HelpCircle, History, Bookmark, Send } from '@tamagui/lucide-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import useAuth from 'app/hooks/useAuth'

function CustomDrawerContent() {
    const { logout } = useAuth()
    return (
        <YStack style={styles.container}>
            <YStack>
                <Text>Logo Here</Text>
            </YStack>

            <YStack style={styles.menuContainer}>
                <XStack style={styles.menuItem}>
                    <TouchableOpacity onPress={() => router.push('/(dashboard)/requests')}>
                        <XStack style={styles.menuItemContent}>
                            <Send />
                            <Text>Requests</Text>
                        </XStack>
                    </TouchableOpacity>
                    <ChevronRight />
                </XStack>
                <XStack style={styles.menuItem}>
                    <TouchableOpacity onPress={() => router.push('/(dashboard)/bookmarks')}>
                        <XStack style={styles.menuItemContent}>
                            <Bookmark />
                            <Text>Bookmarks</Text>
                        </XStack>
                    </TouchableOpacity>
                    <ChevronRight />
                </XStack>
                <XStack style={styles.menuItem}>
                    <TouchableOpacity onPress={() => router.push('/(dashboard)/payment-history')}>
                        <XStack style={styles.menuItemContent}>
                            <History />
                            <Text>Payment History</Text>
                        </XStack>
                    </TouchableOpacity>
                    <ChevronRight />
                </XStack>
                <XStack style={styles.menuItem}>
                    <TouchableOpacity onPress={() => router.push('/(dashboard)/support')}>
                        <XStack style={styles.menuItemContent}>
                            <HelpCircle />
                            <Text>Support</Text>
                        </XStack>
                    </TouchableOpacity>
                    <ChevronRight />
                </XStack>
                <XStack style={styles.menuItem}>
                    <TouchableOpacity onPress={() => router.push('/(main)/edit-profile')}>
                        <XStack style={styles.menuItemContent}>
                            <Settings />
                            <Text>Settings</Text>
                        </XStack>
                    </TouchableOpacity>
                    <ChevronRight />
                </XStack>
            </YStack>

            <TouchableOpacity
                style={styles.logoutContainer}
                onPress={() => logout()}
            >
                <XStack style={styles.logoutContent}>
                    <LogOut />
                    <Text>Log out</Text>
                </XStack>
            </TouchableOpacity>
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
        marginTop: 'auto',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    logoutContent: {
        gap: 12,
        alignItems: 'center',
    }
}) 