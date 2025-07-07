import React, { useState } from 'react'
import { Text, YStack, XStack, Avatar, Separator, ScrollView, Button, Sheet } from 'tamagui'
import { ChevronLeft, ChevronDown } from '@tamagui/lucide-icons'
import PrimaryButtonComponent, { OutlinedButtonComponent } from '../../components/ButtonComponent'

// Reusable notification card
function NotificationCard({
    avatarSrc,
    name,
    actionText,
    targetAvatarSrc,
    targetName,
    buttonType = 'invite',
    time,
    secondaryName,
  }: {
    avatarSrc?: string
    name?: string
    actionText?: string
    targetAvatarSrc?: string
    targetName?: string
    buttonType?: string
    time: string    
    secondaryName?: string
  }) {
  return (
    <YStack bg="white" p={16} mb={12} style={{ borderRadius: 12 }}>
      <XStack style={{ alignItems: 'center', gap: 12 }}>
        <Avatar circular size={40}>
          <Avatar.Image src={avatarSrc} />
        </Avatar>
        <YStack flex={1}>
          <XStack flexWrap="wrap" gap={4} style={{ alignItems: 'center' }}>
            <Text fontWeight="bold">{name}</Text>
            <Text>{actionText}</Text>
            <XStack>
              {targetAvatarSrc && (
                <Avatar circular size={24} ml={4}>
                  <Avatar.Image src={targetAvatarSrc} />
                </Avatar>
              )}
              {targetName && (
                <Text fontWeight="bold" ml={4}>{targetName}</Text>
              )}
            </XStack>            
          </XStack>
          {secondaryName && (
            <XStack gap={4} mt={4} style={{ alignItems: 'center', flexWrap: 'nowrap', flex: 1 }} flex={1}>
              <Avatar circular size={24}>
                <Avatar.Image src={targetAvatarSrc} />
              </Avatar>
              <Text fontWeight="bold">{secondaryName}</Text>
            </XStack>
          )}
        </YStack>
      </XStack>
      <XStack mt={12} style={{ alignItems: 'center', gap: 8 }}>
        {buttonType === 'invite' && (
          <Button style={{ height: 36, backgroundColor: '#0077FF', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '900', fontSize: 16, lineHeight: 19.2 }}>Send Invite</Text>
          </Button>
        )}
        {buttonType === 'connect' && (
          <Button style={{ height: 36, backgroundColor: '#0077FF', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: '900', fontSize: 16, lineHeight: 19.2 }}>Accept</Text>
          </Button> 
        )}
        {buttonType === 'connect' && (
          <Button variant="outlined" style={{ height: 36, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text style={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '900', fontSize: 16, lineHeight: 19.2 }}>Decline</Text>
          </Button>
        )}
        <Text color="#616B80" fontSize={12} ml="auto">{time}</Text>
      </XStack>
    </YStack>
  )
}

const FILTERS = ['All', 'Requests', 'Alerts']

export default function NotificationsScreen() {
  // Example static data
  const notifications = [
    {
      avatarSrc: 'https://randomuser.me/api/portraits/women/1.jpg',
      name: 'Jenifer',
      actionText: 'is looking for',
      targetAvatarSrc: 'https://randomuser.me/api/portraits/men/2.jpg',
      targetName: 'brad pit',
      buttonType: 'invite',
      time: '1d',
      type: 'alert',
    },
    {
      avatarSrc: 'https://randomuser.me/api/portraits/men/3.jpg',
      name: 'two people',
      actionText: 'are looking for',
      targetAvatarSrc: 'https://randomuser.me/api/portraits/men/2.jpg',
      targetName: 'brad pit',
      buttonType: 'invite',
      time: '2w',
      type: 'alert',
    },
    {
      avatarSrc: 'https://randomuser.me/api/portraits/men/4.jpg',
      name: 'Kit Harington',
      actionText: 'Wants to Connect',
      targetAvatarSrc: 'https://randomuser.me/api/portraits/women/5.jpg',
      targetName: 'Emilia Clarke',
      buttonType: 'connect',
      time: '2w',
      type: 'request',
    },
  ]

  const [filter, setFilter] = useState('All')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Filter notifications based on filter
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'All') return true
    if (filter === 'Requests') return n.type === 'request'
    if (filter === 'Alerts') return n.type === 'alert'
    return true
  })

  return (
    <YStack flex={1} bg="#F6F8FA">
      {/* Header */}
      <XStack style={{alignItems: 'center', justifyContent: 'space-between'}} px={16} py={18} bg="white" borderBottomWidth={1} borderColor="#E5E5E5">
        <XStack style={{alignItems: 'center', gap: 8}}>
          <Button chromeless icon={<ChevronLeft size={24} />} />
          <Text fontWeight="bold" fontSize={20}>Notification</Text>
        </XStack>
        {/* Custom Dropdown */}
        <YStack position="relative">
          <Button
            chromeless
            onPress={() => setDropdownOpen(open => !open)}
            iconAfter={<ChevronDown size={16} />}
            style={{ minWidth: 80 }}
          >
            <Text color="#0077FF" fontWeight="bold">{filter}</Text>
          </Button>
          {dropdownOpen && (
            <YStack
              position="absolute"
              bg="white"
              style={{ marginTop: 40, right: 0, borderRadius: 8, borderWidth: 1, borderColor: '#E5E5E5', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, zIndex: 10, width: 120 }}
            >
              {FILTERS.map(option => (
                <Button
                  key={option}
                  chromeless
                  onPress={() => {
                    setFilter(option)
                    setDropdownOpen(false)
                  }}
                  style={{ justifyContent: 'flex-start', paddingVertical: 10, paddingHorizontal: 16 }}
                >
                  <Text color={filter === option ? '#0077FF' : '#222'} fontWeight={filter === option ? 'bold' : 'normal'}>
                    {option}
                  </Text>
                </Button>
              ))}
            </YStack>
          )}
        </YStack>
      </XStack>
      {/* Notifications List */}
      <ScrollView px={16} py={16} showsVerticalScrollIndicator={false}>
        {filteredNotifications.map((n, i) => (
          <React.Fragment key={i}>
            <NotificationCard {...n} />
            {i < filteredNotifications.length - 1 && <Separator my={4} />}
          </React.Fragment>
        ))}
      </ScrollView>
    </YStack>
  )
} 