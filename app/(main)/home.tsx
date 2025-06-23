import { HomeHeader } from 'app/components/HomeHeader'
import { YStack, Popover, Button, Adapt, XStack, Text } from 'tamagui'
import { Plus } from '@tamagui/lucide-icons'
import Targets from './targets'
import Requests from './requests'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useState } from 'react'

export default function Home() {
    const [activeTab, setActiveTab] = useState('targets')

    return (
        <YStack flex={1} pt={10} bg="white">
            <HomeHeader />
            
            {/* Custom Tab Header */}
            <XStack style={styles.tabContainer}>
                <Button
                    style={[styles.tabButton, activeTab === 'targets' && styles.activeTabButton]}
                    onPress={() => setActiveTab('targets')}
                >
                    <Text style={[styles.tabText, activeTab === 'targets' && styles.activeTabText]}>
                        Targets
                    </Text>
                </Button>
                <Button
                    style={[styles.tabButton, activeTab === 'requests' && styles.activeTabButton]}
                    onPress={() => setActiveTab('requests')}
                >
                    <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
                        Requests
                    </Text>
                </Button>
            </XStack>

            {/* Tab Content */}
            {activeTab === 'targets' ? <Targets /> : <Requests />}

            <Popover size="$5" allowFlip>
                <Popover.Trigger asChild>
                    <Button
                        icon={Plus}
                        circular
                        size="$6"
                        style={styles.fab}
                    />
                </Popover.Trigger>

                <Adapt when="sm" platform="touch">
                    <Popover.Sheet modal dismissOnSnapToBottom>
                        <Popover.Sheet.Frame p="$4">
                            <Adapt.Contents />
                        </Popover.Sheet.Frame>
                        <Popover.Sheet.Handle />
                    </Popover.Sheet>
                </Adapt>

                <Popover.Content
                    borderWidth={1}
                    borderColor="$borderColor"
                    enterStyle={{ y: -10, opacity: 0 }}
                    exitStyle={{ y: -10, opacity: 0 }}
                    elevate
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                >
                    <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

                    <YStack space="$3">
                        <Button>Create Request</Button>
                        <Button>Invite Target</Button>
                        <Button>Add New Target</Button>
                    </YStack>
                </Popover.Content>
            </Popover>
        </YStack>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        elevation: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: 'white',
    },
    tabButton: {
        flex: 1,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        paddingVertical: 2,
    },
    activeTabButton: {
        borderBottomColor: '#0077FF',
    },
    tabText: {
        fontSize: 16,
        color: '#616B80',
        textAlign: 'center',
    },
    activeTabText: {
        color: '#0077FF',
        fontWeight: '600',
    }
})
