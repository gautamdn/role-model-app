import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Screen, Button } from '../../../components';
import { useChildStore } from '../../../services';
import { colors, spacing, textStyles, borderRadius } from '../../../theme';
import type { MainStackParamList } from '../../../types';

type SelectInterestsScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'SelectInterests'>;
  route: RouteProp<MainStackParamList, 'SelectInterests'>;
};

// Interest categories with child-friendly options
const INTEREST_CATEGORIES = [
  {
    title: 'Sports & Activities',
    interests: [
      { id: 'soccer', label: 'Soccer', emoji: '⚽' },
      { id: 'basketball', label: 'Basketball', emoji: '🏀' },
      { id: 'swimming', label: 'Swimming', emoji: '🏊' },
      { id: 'dancing', label: 'Dancing', emoji: '💃' },
      { id: 'gymnastics', label: 'Gymnastics', emoji: '🤸' },
      { id: 'martial_arts', label: 'Martial Arts', emoji: '🥋' },
    ],
  },
  {
    title: 'Arts & Creativity',
    interests: [
      { id: 'drawing', label: 'Drawing', emoji: '🎨' },
      { id: 'music', label: 'Music', emoji: '🎵' },
      { id: 'writing', label: 'Writing', emoji: '✍️' },
      { id: 'crafts', label: 'Crafts', emoji: '🧶' },
      { id: 'theater', label: 'Theater', emoji: '🎭' },
      { id: 'photography', label: 'Photography', emoji: '📷' },
    ],
  },
  {
    title: 'Science & Discovery',
    interests: [
      { id: 'science', label: 'Science', emoji: '🔬' },
      { id: 'space', label: 'Space', emoji: '🚀' },
      { id: 'nature', label: 'Nature', emoji: '🌿' },
      { id: 'animals', label: 'Animals', emoji: '🦁' },
      { id: 'technology', label: 'Technology', emoji: '💻' },
      { id: 'dinosaurs', label: 'Dinosaurs', emoji: '🦕' },
    ],
  },
  {
    title: 'Games & Fun',
    interests: [
      { id: 'video_games', label: 'Video Games', emoji: '🎮' },
      { id: 'board_games', label: 'Board Games', emoji: '🎲' },
      { id: 'puzzles', label: 'Puzzles', emoji: '🧩' },
      { id: 'lego', label: 'Building', emoji: '🧱' },
      { id: 'cooking', label: 'Cooking', emoji: '👨‍🍳' },
      { id: 'reading', label: 'Reading', emoji: '📚' },
    ],
  },
];

export function SelectInterestsScreen({ navigation, route }: SelectInterestsScreenProps) {
  const { childId, childName, isNewChild } = route.params;
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { updateChild } = useChildStore();

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateChild(childId, { interests: selectedInterests });
    setIsSaving(false);

    if (result.error) {
      Alert.alert('Error', result.error);
    } else if (isNewChild) {
      // For new children, go to trait selection next
      navigation.replace('SelectTraits', {
        childId,
        childName,
        isNewChild: true,
      });
    } else {
      // For existing children, go back to home
      navigation.popToTop();
    }
  };

  const handleSkip = () => {
    if (isNewChild) {
      // Skip to traits even if no interests selected
      navigation.replace('SelectTraits', {
        childId,
        childName,
        isNewChild: true,
      });
    } else {
      navigation.popToTop();
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isNewChild ? `What does ${childName} love?` : 'Update Interests'}
          </Text>
          <Text style={styles.subtitle}>
            Select interests to help us personalize stories and activities.
            You can always change these later.
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {INTEREST_CATEGORIES.map((category) => (
            <View key={category.title} style={styles.category}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <View style={styles.interestGrid}>
                {category.interests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <TouchableOpacity
                      key={interest.id}
                      style={[
                        styles.interestChip,
                        isSelected && styles.interestChipSelected,
                      ]}
                      onPress={() => toggleInterest(interest.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                      <Text
                        style={[
                          styles.interestLabel,
                          isSelected && styles.interestLabelSelected,
                        ]}
                      >
                        {interest.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.selectedCount}>
            {selectedInterests.length} selected
          </Text>
          <View style={styles.buttons}>
            <Button
              title={selectedInterests.length > 0 ? 'Continue' : 'Skip for Now'}
              onPress={selectedInterests.length > 0 ? handleSave : handleSkip}
              loading={isSaving}
              size="lg"
            />
            {isNewChild && selectedInterests.length > 0 && (
              <Button
                title="Skip for Now"
                onPress={handleSkip}
                variant="ghost"
                size="lg"
              />
            )}
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing[4],
  },
  header: {
    marginBottom: spacing[4],
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[4],
  },
  category: {
    marginBottom: spacing[5],
  },
  categoryTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing[3],
  },
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral[100],
    borderWidth: 2,
    borderColor: colors.neutral[100],
  },
  interestChipSelected: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[500],
  },
  interestEmoji: {
    fontSize: 18,
    marginRight: spacing[2],
  },
  interestLabel: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '500',
  },
  interestLabelSelected: {
    color: colors.primary[700],
  },
  footer: {
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  selectedCount: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  buttons: {
    gap: spacing[2],
  },
});
