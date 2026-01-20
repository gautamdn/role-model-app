import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import type { Child } from '../types';

interface ChildProfileCardProps {
  child: Child;
  isSelected?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

function getAge(birthDate: string | null): number | null {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const avatarColors = [
    colors.primary[500],
    colors.secondary[500],
    colors.traits.perseverance,
    colors.traits.kindness,
    colors.traits.creativity,
    colors.traits.leadership,
    colors.traits.discipline,
    colors.traits.curiosity,
  ];
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export function ChildProfileCard({
  child,
  isSelected = false,
  onPress,
  onLongPress,
}: ChildProfileCardProps) {
  const age = getAge(child.birth_date);
  const initials = getInitials(child.name);
  const avatarColor = getAvatarColor(child.name);

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.containerSelected]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {child.name}
        </Text>
        {age !== null && (
          <Text style={styles.age}>
            {age} {age === 1 ? 'year' : 'years'} old
          </Text>
        )}
      </View>
      {isSelected && <View style={styles.selectedIndicator} />}
    </TouchableOpacity>
  );
}

// Compact version for horizontal list
export function ChildProfileCardCompact({
  child,
  isSelected = false,
  onPress,
}: ChildProfileCardProps) {
  const initials = getInitials(child.name);
  const avatarColor = getAvatarColor(child.name);

  return (
    <TouchableOpacity
      style={[styles.compactContainer, isSelected && styles.compactContainerSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.compactAvatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.compactAvatarText}>{initials}</Text>
      </View>
      <Text style={[styles.compactName, isSelected && styles.compactNameSelected]} numberOfLines={1}>
        {child.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );
}

// Add child button styled like a card
export function AddChildCard({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.addContainer} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.addAvatar}>
        <Text style={styles.addIcon}>+</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.addText}>Add Child</Text>
      </View>
    </TouchableOpacity>
  );
}

export function AddChildCardCompact({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.compactAddContainer} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.compactAddAvatar}>
        <Text style={styles.compactAddIcon}>+</Text>
      </View>
      <Text style={styles.compactAddText}>Add</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    borderWidth: 2,
    borderColor: 'transparent',
  },
  containerSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...textStyles.h3,
    color: colors.neutral[0],
    fontWeight: '700',
  },
  info: {
    flex: 1,
    marginLeft: spacing[4],
  },
  name: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  age: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Compact styles
  compactContainer: {
    alignItems: 'center',
    marginRight: spacing[4],
    paddingVertical: spacing[2],
  },
  compactContainerSelected: {},
  compactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
    borderWidth: 2,
    borderColor: 'transparent',
  },
  compactAvatarText: {
    ...textStyles.button,
    color: colors.neutral[0],
    fontWeight: '700',
  },
  compactName: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  compactNameSelected: {
    color: colors.primary[500],
    fontWeight: '600',
  },

  // Add child styles
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    borderWidth: 2,
    borderColor: colors.neutral[300],
    borderStyle: 'dashed',
  },
  addAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 32,
    color: colors.neutral[500],
    fontWeight: '300',
  },
  addText: {
    ...textStyles.h4,
    color: colors.text.secondary,
  },

  // Compact add styles
  compactAddContainer: {
    alignItems: 'center',
    marginRight: spacing[4],
    paddingVertical: spacing[2],
  },
  compactAddAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
    borderWidth: 2,
    borderColor: colors.neutral[300],
    borderStyle: 'dashed',
  },
  compactAddIcon: {
    fontSize: 24,
    color: colors.neutral[500],
    fontWeight: '300',
  },
  compactAddText: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
});
