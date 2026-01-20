import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen, Button, ChildProfileCardCompact, AddChildCardCompact } from '../../components';
import { useAuthStore, useChildStore } from '../../services';
import { colors, spacing, textStyles, borderRadius } from '../../theme';
import type { MainStackParamList } from '../../types';

type HomeScreenNavProp = NativeStackNavigationProp<MainStackParamList, 'HomeTabs'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavProp>();
  const { user, signOut } = useAuthStore();
  const { children, selectedChild, isLoading, fetchChildren, selectChild } = useChildStore();

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleAddChild = () => {
    navigation.navigate('AddChild');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getAge = (birthDate: string | null): number | null => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading && children.length === 0) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </View>
      </Screen>
    );
  }

  // No children yet - show onboarding
  if (children.length === 0) {
    return (
      <Screen>
        <View style={styles.container}>
          <Text style={styles.greeting}>{getGreeting()}!</Text>

          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>👨‍👩‍👧‍👦</Text>
            <Text style={styles.emptyTitle}>Add Your First Child</Text>
            <Text style={styles.emptyText}>
              Get started by adding your child's profile. We'll personalize stories and activities based on their age and interests.
            </Text>
            <Button
              title="Add Child"
              onPress={handleAddChild}
              size="lg"
              style={styles.addButton}
            />
          </View>

          <Button
            title="Sign Out"
            onPress={signOut}
            variant="ghost"
          />
        </View>
      </Screen>
    );
  }

  // Has children - show dashboard
  return (
    <Screen scrollable>
      <View style={styles.container}>
        {/* Header with greeting */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}!</Text>
            {selectedChild && (
              <Text style={styles.childContext}>
                {selectedChild.name}'s learning journey
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={signOut} style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Child selector */}
        <View style={styles.childSelectorSection}>
          <Text style={styles.sectionLabel}>Switch Child</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.childSelector}
          >
            {children.map((child) => (
              <ChildProfileCardCompact
                key={child.id}
                child={child}
                isSelected={selectedChild?.id === child.id}
                onPress={() => selectChild(child)}
              />
            ))}
            <AddChildCardCompact onPress={handleAddChild} />
          </ScrollView>
        </View>

        {/* Today's Content */}
        {selectedChild && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Today's Story</Text>
              <TouchableOpacity style={styles.storyCard}>
                <View style={styles.storyPlaceholder}>
                  <Text style={styles.placeholderEmoji}>📚</Text>
                  <Text style={styles.placeholderText}>
                    Stories coming soon!
                  </Text>
                  <Text style={styles.placeholderHint}>
                    We're adding inspiring role models for{' '}
                    {selectedChild.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Today's Activity</Text>
              <TouchableOpacity style={styles.activityCard}>
                <View style={styles.activityPlaceholder}>
                  <Text style={styles.placeholderEmoji}>🎯</Text>
                  <Text style={styles.placeholderText}>
                    Activities coming soon!
                  </Text>
                  <Text style={styles.placeholderHint}>
                    Fun character-building exercises await
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Progress</Text>
              <View style={styles.progressCard}>
                <View style={styles.progressItem}>
                  <Text style={styles.progressValue}>0</Text>
                  <Text style={styles.progressLabel}>Stories Read</Text>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressItem}>
                  <Text style={styles.progressValue}>0</Text>
                  <Text style={styles.progressLabel}>Activities Done</Text>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressItem}>
                  <Text style={styles.progressValue}>0</Text>
                  <Text style={styles.progressLabel}>Day Streak</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing[4],
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[6],
  },
  greeting: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  childContext: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  settingsButton: {
    padding: spacing[2],
  },
  settingsIcon: {
    fontSize: 24,
  },

  // Child selector
  childSelectorSection: {
    marginBottom: spacing[6],
  },
  sectionLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing[3],
  },
  childSelector: {
    paddingRight: spacing[4],
  },

  // Sections
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing[3],
  },

  // Story card
  storyCard: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  storyPlaceholder: {
    padding: spacing[6],
    alignItems: 'center',
    backgroundColor: colors.primary[50],
  },

  // Activity card
  activityCard: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  activityPlaceholder: {
    padding: spacing[6],
    alignItems: 'center',
    backgroundColor: colors.secondary[50],
  },

  placeholderEmoji: {
    fontSize: 48,
    marginBottom: spacing[3],
  },
  placeholderText: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  placeholderHint: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },

  // Progress card
  progressCard: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressItem: {
    alignItems: 'center',
    flex: 1,
  },
  progressValue: {
    ...textStyles.h2,
    color: colors.primary[500],
  },
  progressLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing[1],
    textAlign: 'center',
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral[200],
  },

  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  emptyTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  emptyText: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing[6],
  },
  addButton: {
    minWidth: 200,
  },
});
