import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Screen, Button } from '../../../components';
import { getStoryById, getRoleModelById, getTraitById } from '../../../constants';
import { colors, spacing, textStyles, borderRadius } from '../../../theme';
import type { MainStackParamList } from '../../../types';

type StoryDetailScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'StoryDetail'>;
  route: RouteProp<MainStackParamList, 'StoryDetail'>;
};

export function StoryDetailScreen({ navigation, route }: StoryDetailScreenProps) {
  const { storyId } = route.params;
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);

  const story = getStoryById(storyId);
  const roleModel = story ? getRoleModelById(story.roleModelId) : null;
  const trait = story ? getTraitById(story.traitId) : null;

  if (!story || !roleModel) {
    return (
      <Screen>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Story not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  const isLastParagraph = currentParagraph >= story.content.length - 1;
  const progress = ((currentParagraph + 1) / story.content.length) * 100;

  const handleNext = () => {
    if (isLastParagraph) {
      setShowQuestions(true);
    } else {
      setCurrentParagraph((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (showQuestions) {
      setShowQuestions(false);
    } else if (currentParagraph > 0) {
      setCurrentParagraph((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    navigation.goBack();
  };

  if (showQuestions) {
    return (
      <Screen>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
              <Text style={styles.closeIcon}>x</Text>
            </TouchableOpacity>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%', backgroundColor: trait?.color || colors.primary[500] }]} />
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Key Lesson */}
            <View style={[styles.lessonCard, { backgroundColor: trait?.color ? `${trait.color}15` : colors.primary[50] }]}>
              <Text style={styles.lessonLabel}>KEY LESSON</Text>
              <Text style={styles.lessonText}>{story.keyLesson}</Text>
            </View>

            {/* Discussion Questions */}
            <View style={styles.questionsSection}>
              <Text style={styles.questionsTitle}>Let's Talk About It</Text>
              <Text style={styles.questionsSubtitle}>
                Discuss these questions together
              </Text>
              {story.discussionQuestions.map((question, index) => (
                <View key={index} style={styles.questionCard}>
                  <View style={[styles.questionNumber, { backgroundColor: trait?.color || colors.primary[500] }]}>
                    <Text style={styles.questionNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.questionText}>{question}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
              <Text style={styles.navButtonText}>Back to Story</Text>
            </TouchableOpacity>
            <Button
              title="Finish"
              onPress={handleFinish}
              size="lg"
              style={{ flex: 1, marginLeft: spacing[3] }}
            />
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeIcon}>x</Text>
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: trait?.color || colors.primary[500] },
              ]}
            />
          </View>
        </View>

        {/* Story Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Role Model Header - shown on first paragraph */}
          {currentParagraph === 0 && (
            <View style={styles.storyHeader}>
              <View
                style={[
                  styles.roleModelImage,
                  { backgroundColor: trait?.color ? `${trait.color}20` : colors.primary[50] },
                ]}
              >
                <Text style={styles.roleModelEmoji}>{roleModel.imageEmoji}</Text>
              </View>
              <Text style={styles.storyTitle}>{story.title}</Text>
              <Text style={styles.storySubtitle}>{story.subtitle}</Text>
              <View style={styles.metaRow}>
                <View style={[styles.traitBadge, { backgroundColor: trait?.color ? `${trait.color}20` : colors.primary[50] }]}>
                  <Text style={styles.traitBadgeEmoji}>{trait?.emoji}</Text>
                  <Text style={[styles.traitBadgeText, { color: trait?.color || colors.primary[500] }]}>
                    {trait?.name}
                  </Text>
                </View>
                <Text style={styles.readTime}>{story.readTimeMinutes} min read</Text>
              </View>
            </View>
          )}

          {/* Current Paragraph */}
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraphText}>{story.content[currentParagraph]}</Text>
          </View>

          {/* Page indicator */}
          <View style={styles.pageIndicator}>
            <Text style={styles.pageIndicatorText}>
              {currentParagraph + 1} of {story.content.length}
            </Text>
          </View>
        </ScrollView>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          {currentParagraph > 0 ? (
            <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navButton} />
          )}
          <Button
            title={isLastParagraph ? 'Continue' : 'Next'}
            onPress={handleNext}
            size="lg"
            style={{ flex: 1, marginLeft: spacing[3] }}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },
  errorText: {
    ...textStyles.h3,
    color: colors.text.secondary,
    marginBottom: spacing[4],
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: colors.text.secondary,
    fontWeight: '300',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Scroll content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[6],
  },

  // Story header
  storyHeader: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  roleModelImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  roleModelEmoji: {
    fontSize: 56,
  },
  storyTitle: {
    ...textStyles.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  storySubtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  traitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    borderRadius: borderRadius.full,
  },
  traitBadgeEmoji: {
    fontSize: 14,
    marginRight: spacing[1],
  },
  traitBadgeText: {
    ...textStyles.caption,
    fontWeight: '600',
  },
  readTime: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },

  // Paragraph
  paragraphContainer: {
    paddingHorizontal: spacing[2],
  },
  paragraphText: {
    ...textStyles.body,
    fontSize: 20,
    lineHeight: 32,
    color: colors.text.primary,
    textAlign: 'left',
  },

  // Page indicator
  pageIndicator: {
    alignItems: 'center',
    marginTop: spacing[6],
  },
  pageIndicatorText: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  navButton: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    minWidth: 100,
  },
  navButtonText: {
    ...textStyles.button,
    color: colors.text.secondary,
  },

  // Lesson card
  lessonCard: {
    borderRadius: borderRadius.xl,
    padding: spacing[5],
    marginBottom: spacing[6],
  },
  lessonLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing[2],
  },
  lessonText: {
    ...textStyles.h4,
    color: colors.text.primary,
    lineHeight: 28,
  },

  // Questions section
  questionsSection: {
    marginBottom: spacing[4],
  },
  questionsTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  questionsSubtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing[4],
  },
  questionCard: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    alignItems: 'flex-start',
  },
  questionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  questionNumberText: {
    ...textStyles.button,
    color: colors.neutral[0],
    fontSize: 14,
  },
  questionText: {
    ...textStyles.body,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 24,
  },
});
