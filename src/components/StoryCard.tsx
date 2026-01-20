import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StoryData, getRoleModelById } from '../constants';
import { getTraitById } from '../constants';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface StoryCardProps {
  story: StoryData;
  onPress?: () => void;
  size?: 'compact' | 'full';
}

export function StoryCard({ story, onPress, size = 'full' }: StoryCardProps) {
  const roleModel = getRoleModelById(story.roleModelId);
  const trait = getTraitById(story.traitId);

  if (!roleModel) return null;

  if (size === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compactContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.compactImageContainer}>
          <Text style={styles.compactEmoji}>{roleModel.imageEmoji}</Text>
        </View>
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {story.title}
          </Text>
          <Text style={styles.compactRoleModel} numberOfLines={1}>
            {roleModel.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: trait?.color ? `${trait.color}20` : colors.primary[50] },
        ]}
      >
        <Text style={styles.emoji}>{roleModel.imageEmoji}</Text>
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
          <Text style={styles.readTime}>{story.readTimeMinutes} min read</Text>
        </View>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {story.subtitle}
        </Text>
        <View style={styles.footer}>
          <View style={styles.roleModelInfo}>
            <Text style={styles.roleModelEmoji}>{roleModel.imageEmoji}</Text>
            <Text style={styles.roleModelName}>{roleModel.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface StoryCardFeaturedProps {
  story: StoryData;
  onPress?: () => void;
}

export function StoryCardFeatured({ story, onPress }: StoryCardFeaturedProps) {
  const roleModel = getRoleModelById(story.roleModelId);
  const trait = getTraitById(story.traitId);

  if (!roleModel) return null;

  return (
    <TouchableOpacity
      style={styles.featuredContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.featuredImageContainer,
          { backgroundColor: trait?.color ? `${trait.color}15` : colors.primary[50] },
        ]}
      >
        <Text style={styles.featuredEmoji}>{roleModel.imageEmoji}</Text>
        {trait && (
          <View style={[styles.featuredTraitBadge, { backgroundColor: trait.color }]}>
            <Text style={styles.featuredTraitEmoji}>{trait.emoji}</Text>
          </View>
        )}
      </View>
      <View style={styles.featuredContent}>
        <Text style={styles.featuredLabel}>TODAY'S STORY</Text>
        <Text style={styles.featuredTitle}>{story.title}</Text>
        <Text style={styles.featuredSubtitle} numberOfLines={2}>
          {story.subtitle}
        </Text>
        <View style={styles.featuredFooter}>
          <Text style={styles.featuredRoleModel}>
            {roleModel.imageEmoji} {roleModel.name}
          </Text>
          <Text style={styles.featuredReadTime}>
            {story.readTimeMinutes} min
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Full card styles
  container: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing[4],
  },
  imageContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
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
  readTime: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  title: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  subtitle: {
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
  roleModelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleModelEmoji: {
    fontSize: 20,
    marginRight: spacing[2],
  },
  roleModelName: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '500',
  },

  // Compact card styles
  compactContainer: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    marginRight: spacing[3],
    width: 200,
  },
  compactImageContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  compactEmoji: {
    fontSize: 28,
  },
  compactContent: {
    flex: 1,
  },
  compactTitle: {
    ...textStyles.button,
    color: colors.text.primary,
    marginBottom: 2,
  },
  compactRoleModel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },

  // Featured card styles
  featuredContainer: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  featuredImageContainer: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  featuredEmoji: {
    fontSize: 72,
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
    color: colors.primary[500],
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing[2],
  },
  featuredTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  featuredSubtitle: {
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
  featuredRoleModel: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '500',
  },
  featuredReadTime: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
});
