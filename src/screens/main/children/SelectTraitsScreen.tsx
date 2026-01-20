import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Screen, Button } from '../../../components';
import { useChildStore } from '../../../services';
import { CHARACTER_TRAITS, getRecommendedTraits, CharacterTrait } from '../../../constants';
import { colors, spacing, textStyles, borderRadius } from '../../../theme';
import type { MainStackParamList } from '../../../types';

type SelectTraitsScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'SelectTraits'>;
  route: RouteProp<MainStackParamList, 'SelectTraits'>;
};

export function SelectTraitsScreen({ navigation, route }: SelectTraitsScreenProps) {
  const { childId, childName, isNewChild } = route.params;
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [recommendedTraits, setRecommendedTraits] = useState<CharacterTrait[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { children, updateChild } = useChildStore();

  // Get the child's interests to recommend traits
  useEffect(() => {
    const child = children.find((c) => c.id === childId);
    if (child?.interests && child.interests.length > 0) {
      const recommended = getRecommendedTraits(child.interests, 3);
      setRecommendedTraits(recommended);
    }
  }, [childId, children]);

  const toggleTrait = (traitId: string) => {
    setSelectedTraits((prev) => {
      if (prev.includes(traitId)) {
        return prev.filter((id) => id !== traitId);
      }
      // Limit to 5 traits max
      if (prev.length >= 5) {
        Alert.alert('Limit Reached', 'You can select up to 5 character traits.');
        return prev;
      }
      return [...prev, traitId];
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateChild(childId, { focus_traits: selectedTraits });
    setIsSaving(false);

    if (result.error) {
      Alert.alert('Error', result.error);
    } else {
      navigation.popToTop();
    }
  };

  const handleSkip = () => {
    navigation.popToTop();
  };

  const isRecommended = (traitId: string) =>
    recommendedTraits.some((t) => t.id === traitId);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isNewChild ? `Choose traits for ${childName}` : 'Update Focus Traits'}
          </Text>
          <Text style={styles.subtitle}>
            Select up to 5 character traits to focus on. We'll recommend stories and activities that build these qualities.
          </Text>
        </View>

        {recommendedTraits.length > 0 && (
          <View style={styles.recommendedSection}>
            <Text style={styles.recommendedLabel}>
              Recommended based on interests
            </Text>
          </View>
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {CHARACTER_TRAITS.map((trait) => {
            const isSelected = selectedTraits.includes(trait.id);
            const recommended = isRecommended(trait.id);

            return (
              <TouchableOpacity
                key={trait.id}
                style={[
                  styles.traitCard,
                  isSelected && styles.traitCardSelected,
                  { borderLeftColor: trait.color },
                ]}
                onPress={() => toggleTrait(trait.id)}
                activeOpacity={0.7}
              >
                <View style={styles.traitHeader}>
                  <View style={styles.traitTitleRow}>
                    <Text style={styles.traitEmoji}>{trait.emoji}</Text>
                    <Text style={[styles.traitName, isSelected && styles.traitNameSelected]}>
                      {trait.name}
                    </Text>
                    {recommended && (
                      <View style={styles.recommendedBadge}>
                        <Text style={styles.recommendedBadgeText}>Recommended</Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && { backgroundColor: trait.color, borderColor: trait.color },
                    ]}
                  >
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </View>
                <Text style={styles.traitDescription}>{trait.description}</Text>
                <Text style={styles.roleModels}>
                  Role models: {trait.exampleRoleModels.slice(0, 2).join(', ')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.selectedCount}>
            {selectedTraits.length}/5 traits selected
          </Text>
          <View style={styles.buttons}>
            <Button
              title={selectedTraits.length > 0 ? 'Continue' : 'Skip for Now'}
              onPress={selectedTraits.length > 0 ? handleSave : handleSkip}
              loading={isSaving}
              size="lg"
            />
            {isNewChild && selectedTraits.length > 0 && (
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
  recommendedSection: {
    marginBottom: spacing[3],
  },
  recommendedLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[4],
  },
  traitCard: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    borderLeftWidth: 4,
    borderWidth: 2,
    borderColor: colors.neutral[200],
  },
  traitCardSelected: {
    backgroundColor: colors.neutral[50],
    borderColor: colors.neutral[300],
  },
  traitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  traitTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  traitEmoji: {
    fontSize: 24,
    marginRight: spacing[2],
  },
  traitName: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  traitNameSelected: {
    fontWeight: '700',
  },
  recommendedBadge: {
    backgroundColor: colors.secondary[100],
    paddingVertical: 2,
    paddingHorizontal: spacing[2],
    borderRadius: borderRadius.full,
    marginLeft: spacing[2],
  },
  recommendedBadgeText: {
    ...textStyles.caption,
    color: colors.secondary[700],
    fontWeight: '600',
    fontSize: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: colors.neutral[0],
    fontSize: 14,
    fontWeight: '700',
  },
  traitDescription: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing[2],
  },
  roleModels: {
    ...textStyles.caption,
    color: colors.text.secondary,
    fontStyle: 'italic',
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
