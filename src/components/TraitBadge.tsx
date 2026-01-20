import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getTraitById } from '../constants';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface TraitBadgeProps {
  traitId: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  onPress?: () => void;
}

export function TraitBadge({
  traitId,
  size = 'md',
  showName = true,
  onPress,
}: TraitBadgeProps) {
  const trait = getTraitById(traitId);

  if (!trait) return null;

  const content = (
    <View
      style={[
        styles.container,
        styles[`container_${size}`],
        { backgroundColor: `${trait.color}15`, borderColor: trait.color },
      ]}
    >
      <Text style={[styles.emoji, styles[`emoji_${size}`]]}>{trait.emoji}</Text>
      {showName && (
        <Text
          style={[styles.name, styles[`name_${size}`], { color: trait.color }]}
        >
          {trait.name}
        </Text>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

interface TraitProgressCardProps {
  traitId: string;
  progress?: number; // 0-100
  onPress?: () => void;
}

export function TraitProgressCard({
  traitId,
  progress = 0,
  onPress,
}: TraitProgressCardProps) {
  const trait = getTraitById(traitId);

  if (!trait) return null;

  const content = (
    <View style={[styles.progressCard, { borderLeftColor: trait.color }]}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressEmoji}>{trait.emoji}</Text>
        <View style={styles.progressInfo}>
          <Text style={styles.progressName}>{trait.name}</Text>
          <Text style={styles.progressDescription} numberOfLines={1}>
            {trait.description}
          </Text>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${progress}%`, backgroundColor: trait.color },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{progress}% progress</Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  // TraitBadge styles
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  container_sm: {
    paddingVertical: 2,
    paddingHorizontal: spacing[2],
  },
  container_md: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
  },
  container_lg: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
  },
  emoji: {},
  emoji_sm: {
    fontSize: 12,
  },
  emoji_md: {
    fontSize: 16,
    marginRight: spacing[1],
  },
  emoji_lg: {
    fontSize: 20,
    marginRight: spacing[2],
  },
  name: {
    fontWeight: '600',
  },
  name_sm: {
    ...textStyles.caption,
    fontSize: 10,
  },
  name_md: {
    ...textStyles.caption,
  },
  name_lg: {
    ...textStyles.bodySmall,
  },

  // TraitProgressCard styles
  progressCard: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    borderLeftWidth: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  progressEmoji: {
    fontSize: 32,
    marginRight: spacing[3],
  },
  progressInfo: {
    flex: 1,
  },
  progressName: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  progressDescription: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.neutral[200],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing[2],
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'right',
  },
});
