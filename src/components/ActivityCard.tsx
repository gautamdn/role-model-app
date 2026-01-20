import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityData, getTraitById } from '../constants';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface ActivityCardProps {
  activity: ActivityData;
  onPress?: () => void;
}

export function ActivityCard({ activity, onPress }: ActivityCardProps) {
  const trait = getTraitById(activity.traitId);

  const getDifficultyLabel = (difficulty: 1 | 2 | 3) => {
    switch (difficulty) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Challenge';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'creative':
        return '🎨';
      case 'physical':
        return '🏃';
      case 'social':
        return '👥';
      case 'mindful':
        return '🧘';
      case 'learning':
        return '📚';
      default:
        return '✨';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: trait?.color ? `${trait.color}15` : colors.secondary[50] },
        ]}
      >
        <Text style={styles.emoji}>{activity.emoji}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {trait && (
            <View style={[styles.traitBadge, { backgroundColor: `${trait.color}20` }]}>
              <Text style={styles.traitEmoji}>{trait.emoji}</Text>
              <Text style={[styles.traitName, { color: trait.color }]}>
                {trait.name}
              </Text>
            </View>
          )}
          <Text style={styles.duration}>
            {activity.estimatedMinutes > 0 ? `${activity.estimatedMinutes} min` : 'All day'}
          </Text>
        </View>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {activity.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryIcon}>{getCategoryIcon(activity.category)}</Text>
            <Text style={styles.categoryText}>{activity.category}</Text>
          </View>
          <Text style={styles.difficulty}>{getDifficultyLabel(activity.difficulty)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface ActivityCardFeaturedProps {
  activity: ActivityData;
  onPress?: () => void;
}

export function ActivityCardFeatured({ activity, onPress }: ActivityCardFeaturedProps) {
  const trait = getTraitById(activity.traitId);

  const getDifficultyDots = (difficulty: 1 | 2 | 3) => {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <View
          key={i}
          style={[
            styles.difficultyDot,
            i < difficulty && { backgroundColor: trait?.color || colors.secondary[500] },
          ]}
        />
      ));
  };

  return (
    <TouchableOpacity
      style={styles.featuredContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.featuredIconContainer,
          { backgroundColor: trait?.color ? `${trait.color}15` : colors.secondary[50] },
        ]}
      >
        <Text style={styles.featuredEmoji}>{activity.emoji}</Text>
        {trait && (
          <View style={[styles.featuredTraitBadge, { backgroundColor: trait.color }]}>
            <Text style={styles.featuredTraitEmoji}>{trait.emoji}</Text>
          </View>
        )}
      </View>
      <View style={styles.featuredContent}>
        <Text style={styles.featuredLabel}>TODAY'S ACTIVITY</Text>
        <Text style={styles.featuredTitle}>{activity.title}</Text>
        <Text style={styles.featuredDescription} numberOfLines={2}>
          {activity.description}
        </Text>
        <View style={styles.featuredFooter}>
          <View style={styles.featuredMeta}>
            <Text style={styles.featuredDuration}>
              {activity.estimatedMinutes > 0 ? `${activity.estimatedMinutes} min` : 'All day'}
            </Text>
            <View style={styles.difficultyDots}>{getDifficultyDots(activity.difficulty)}</View>
          </View>
          <View style={[styles.startButton, { backgroundColor: trait?.color || colors.secondary[500] }]}>
            <Text style={styles.startButtonText}>Start</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Regular card styles
  container: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing[4],
  },
  iconContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 48,
  },
  content: {
    padding: spacing[4],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  traitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: spacing[2],
    borderRadius: borderRadius.full,
  },
  traitEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  traitName: {
    ...textStyles.caption,
    fontWeight: '600',
  },
  duration: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  title: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  description: {
    ...textStyles.body,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing[3],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: spacing[1],
  },
  categoryText: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
  difficulty: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },

  // Featured card styles
  featuredContainer: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  featuredIconContainer: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  featuredEmoji: {
    fontSize: 64,
  },
  featuredTraitBadge: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredTraitEmoji: {
    fontSize: 18,
  },
  featuredContent: {
    padding: spacing[4],
  },
  featuredLabel: {
    ...textStyles.caption,
    color: colors.secondary[500],
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing[2],
  },
  featuredTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  featuredDescription: {
    ...textStyles.body,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing[3],
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  featuredDuration: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  difficultyDots: {
    flexDirection: 'row',
    gap: 4,
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral[300],
  },
  startButton: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.full,
  },
  startButtonText: {
    ...textStyles.button,
    color: colors.neutral[0],
  },
});
