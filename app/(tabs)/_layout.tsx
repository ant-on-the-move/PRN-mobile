import React from 'react';
import { Tabs } from 'expo-router';
import { Home, MessageCircle, Bell, Search, Plus } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0077FF',
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Home color={color as any} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color }) => <MessageCircle color={color as any} />,
        }}
      />
      <Tabs.Screen
        name="three"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            // Open your FAB menu or modal here
          },
        }}
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: () => (
            <Button
              icon={Plus}
              circular
              size="$5"
              bg="#0077FF"
              position="relative"
              y={-20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Notifications',
          headerShown: false,
          tabBarIcon: ({ color }) => <Bell color={color as any} />,
          tabBarBadge: 1,
        }}
      />
      <Tabs.Screen
        name="five"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color }) => <Search color={color as any} />,
        }}
      />
    </Tabs>
  );
}
