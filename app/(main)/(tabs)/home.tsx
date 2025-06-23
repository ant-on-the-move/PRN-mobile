import { HomeHeader } from 'app/components/HomeHeader'
import { YStack, XStack, Text, Button } from 'tamagui'
import Targets from '../targets'
import Requests from '../requests'
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