import React, { useState } from 'react'
import { Text, YStack, XStack, Button, Avatar, Separator, Tabs, ScrollView } from 'tamagui'

// Dummy notification data
const notifications = [
  {
    id: 1,
    type: 'alert',
    avatar: require('../../../assets/images/icon.png'),
    title: 'Jenifer is looking for',
    target: 'brad pit',
    time: '1d',
    action: 'invite',
  },
  {
    id: 2,
    type: 'alert',
    avatar: require('../../../assets/images/icon.png'),
    title: 'two people are looking for',
    target: 'brad pit',
    time: '2w',
    action: 'invite',
  },
  {
    id: 3,
    type: 'request',
    avatar: require('../../../assets/images/icon.png'),
    sender: 'Kit Harington',
    receiver: 'Emilia Clarke',
    time: '2w',
    action: 'connect',
  },
  {
    id: 4,
    type: 'alert',
    avatar: require('../../../assets/images/icon.png'),
    title: 'Brad pit accepted your target invitation',
    time: '2w',
    action: null,
  },
]

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Requests', value: 'request' },
  { label: 'Alerts', value: 'alert' },
]

export default function NotificationsScreen() {
  const [filter, setFilter] = useState('all')

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((n) => n.type === filter)

  return (
    <YStack flex={1} bg="$background">
      {/* Header */}
      <YStack px="$4" pt="$4" pb="$2" bg="$background">
        <Text fontWeight="700" fontSize={20}>Notification</Text>
        <Tabs value={filter} onValueChange={setFilter} orientation="horizontal">
          <XStack space="$2" mt="$2">
            {FILTERS.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                <Button
                  size="$2"
                  chromeless={filter !== tab.value}
                  onPress={() => setFilter(tab.value)}
                >
                  {tab.label}
                </Button>
              </Tabs.Tab>
            ))}
          </XStack>
        </Tabs>
      </YStack>
      <Separator />
      {/* Notification List */}
      <ScrollView flex={1} px="$4" py="$2">
        <YStack space="$3">
          {filteredNotifications.map((n) => (
            <YStack
              key={n.id}
              bg="$color2"
              style={{borderRadius: 12}}
              p="$3"
              space="$2"
              shadowColor="#000"
              shadowOpacity={0.05}
              shadowRadius={4}
            >
              <XStack style={{alignItems: 'center', gap: 10}}>
                {/* Avatars */}
                <Avatar circular size="$4">
                    <Avatar.Image src={n.avatar} />
                </Avatar>
                <YStack flex={1}>
                  {n.type === 'request' ? (
                    <Text>
                      <Text fontWeight="700">{n.sender}</Text> Wants to Connect
                      <Text fontWeight="700"> {n.receiver}</Text>
                    </Text>
                  ) : (
                    <Text>
                      {n.title}{' '}
                      {n.target && <Text fontWeight="700">{n.target}</Text>}
                    </Text>
                  )}
                  <Text color="$color8" fontSize={12}>{n.time}</Text>
                </YStack>
                {/* Actions */}
                {n.action === 'invite' && (
                  <Button size="$2">Send Invite</Button>
                )}
                {n.action === 'connect' && (
                  <XStack space="$2">
                    <Button size="$2"  style={{backgroundColor: '#0077FF', color: '#ffffff'}}>Accept</Button>
                    <Button size="$2"  style={{backgroundColor: '#0077FF', color: '#ffffff'}}>Decline</Button>
                  </XStack>
                )}
              </XStack>
            </YStack>
          ))}
          {filteredNotifications.length === 0 && (
            <YStack style={{alignItems: 'center', marginTop: 24}}>
              <Text color="$color8">No notifications</Text>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
} 