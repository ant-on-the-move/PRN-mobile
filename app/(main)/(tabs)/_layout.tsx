import { Tabs } from 'expo-router'
import { Home, MessageCircle, Plus, Bell, Search } from '@tamagui/lucide-icons'
import { Text, View } from 'tamagui'
import { TouchableOpacity } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0077FF',
        tabBarInactiveTintColor: '#616B80',
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color as any} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MessageCircle color={color as any} />,
          tabBarBadge: 5,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          tabBarButton: () => (
            <TouchableOpacity
              style={{
                top: -25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#0077FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Plus color="white" size={24} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <Bell color={color as any} />,
          tabBarBadge: 1,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Search color={color as any} />,
        }}
      />
    </Tabs>
  )
} 