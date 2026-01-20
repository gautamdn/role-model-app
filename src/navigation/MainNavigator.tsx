import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet } from 'react-native';
import { HomeScreen } from '../screens/main';
import { AddChildScreen } from '../screens/main/children/AddChildScreen';
import { SelectInterestsScreen } from '../screens/main/children/SelectInterestsScreen';
import { SelectTraitsScreen } from '../screens/main/children/SelectTraitsScreen';
import { StoryDetailScreen } from '../screens/main/stories/StoryDetailScreen';
import { ActivityDetailScreen } from '../screens/main/activities/ActivityDetailScreen';
import type { MainStackParamList, MainTabParamList } from '../types';
import { colors, spacing } from '../theme';

const Stack = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Placeholder screens for tabs
function ExploreScreen() {
  return <PlaceholderScreen title="Explore" emoji="🔍" />;
}

function ProgressScreen() {
  return <PlaceholderScreen title="Progress" emoji="📊" />;
}

function SettingsScreen() {
  return <PlaceholderScreen title="Settings" emoji="⚙️" />;
}

function PlaceholderScreen({ title, emoji }: { title: string; emoji: string }) {
  return (
    <Text style={styles.placeholder}>
      {emoji} {title} - Coming Soon
    </Text>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let emoji = '';
          switch (route.name) {
            case 'Home':
              emoji = '🏠';
              break;
            case 'Explore':
              emoji = '🔍';
              break;
            case 'Progress':
              emoji = '📊';
              break;
            case 'Settings':
              emoji = '⚙️';
              break;
          }
          return (
            <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
              {emoji}
            </Text>
          );
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen
        name="AddChild"
        component={AddChildScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="SelectInterests"
        component={SelectInterestsScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="SelectTraits"
        component={SelectTraitsScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="StoryDetail"
        component={StoryDetailScreen}
        options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    color: colors.text.secondary,
    paddingTop: '50%',
  },
  tabBar: {
    backgroundColor: colors.background.primary,
    borderTopColor: colors.neutral[200],
    paddingTop: spacing[2],
    height: 80,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: spacing[2],
  },
  tabIcon: {
    fontSize: 24,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
});
