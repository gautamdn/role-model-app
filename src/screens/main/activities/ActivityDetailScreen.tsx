import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Screen, Button } from '../../../components';
import { getActivityById, getTraitById } from '../../../constants';
import { colors, spacing, textStyles, borderRadius } from '../../../theme';
import type { MainStackParamList } from '../../../types';

type ActivityDetailScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'ActivityDetail'>;
  route: RouteProp<MainStackParamList, 'ActivityDetail'>;
};

type Step = 'intro' | 'instructions' | 'doing' | 'reflection' | 'complete';

export function ActivityDetailScreen({ navigation, route }: ActivityDetailScreenProps) {
  const { activityId } = route.params;
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [currentInstruction, setCurrentInstruction] = useState(0);

  const activity = getActivityById(activityId);
  const trait = activity ? getTraitById(activity.traitId) : null;

  if (!activity) {
    return (
      <Screen>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Activity not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  const handleStart = () => {
    setCurrentStep('instructions');
  };

  const handleNextInstruction = () => {
    if (currentInstruction < activity.instructions.length - 1) {
      setCurrentInstruction((prev) => prev + 1);
    } else {
      setCurrentStep('doing');
    }
  };

  const handlePrevInstruction = () => {
    if (currentInstruction > 0) {
      setCurrentInstruction((prev) => prev - 1);
    }
  };

  const handleDone = () => {
    setCurrentStep('reflection');
  };

  const handleFinish = () => {
    setCurrentStep('complete');
  };

  const handleComplete = () => {
    navigation.goBack();
  };

  // Intro screen
  if (currentStep === 'intro') {
    return (
      <Screen>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeIcon}>x</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.introHeader}>
              <View
                style={[
                  styles.emojiContainer,
                  { backgroundColor: trait?.color ? `${trait.color}15` : colors.secondary[50] },
                ]}
              >
                <Text style={styles.largeEmoji}>{activity.emoji}</Text>
              </View>
              <Text style={styles.introTitle}>{activity.title}</Text>
              <Text style={styles.introDescription}>{activity.description}</Text>

              <View style={styles.metaRow}>
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
            </View>

            {/* Materials needed */}
            {activity.materials.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>What You'll Need</Text>
                {activity.materials.map((material, index) => (
                  <View key={index} style={styles.materialItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.materialText}>{material}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Tips */}
            {activity.tips.length > 0 && (
              <View style={[styles.tipsCard, { backgroundColor: trait?.color ? `${trait.color}10` : colors.primary[50] }]}>
                <Text style={styles.tipsTitle}>Tips for Success</Text>
                {activity.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Text style={styles.tipBullet}>💡</Text>
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title="Let's Start!"
              onPress={handleStart}
              size="lg"
            />
          </View>
        </View>
      </Screen>
    );
  }

  // Instructions screen
  if (currentStep === 'instructions') {
    const progress = ((currentInstruction + 1) / activity.instructions.length) * 100;

    return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
              <Text style={styles.closeIcon}>x</Text>
            </TouchableOpacity>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%`, backgroundColor: trait?.color || colors.secondary[500] },
                ]}
              />
            </View>
          </View>

          <View style={styles.instructionContainer}>
            <Text style={styles.stepLabel}>
              Step {currentInstruction + 1} of {activity.instructions.length}
            </Text>
            <Text style={styles.instructionText}>
              {activity.instructions[currentInstruction]}
            </Text>
          </View>

          <View style={styles.footer}>
            {currentInstruction > 0 ? (
              <TouchableOpacity onPress={handlePrevInstruction} style={styles.navButton}>
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.navButton} />
            )}
            <Button
              title={currentInstruction < activity.instructions.length - 1 ? 'Next' : 'Got it!'}
              onPress={handleNextInstruction}
              size="lg"
              style={{ flex: 1, marginLeft: spacing[3] }}
            />
          </View>
        </View>
      </Screen>
    );
  }

  // Doing screen
  if (currentStep === 'doing') {
    return (
      <Screen>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeIcon}>x</Text>
          </TouchableOpacity>

          <View style={styles.doingContainer}>
            <Text style={styles.doingEmoji}>{activity.emoji}</Text>
            <Text style={styles.doingTitle}>Time to do it!</Text>
            <Text style={styles.doingText}>
              Complete the activity at your own pace. When you're done, tap the button below.
            </Text>

            {activity.estimatedMinutes > 0 && (
              <View style={styles.timerHint}>
                <Text style={styles.timerHintText}>
                  Suggested time: {activity.estimatedMinutes} minutes
                </Text>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <Button
              title="I'm Done!"
              onPress={handleDone}
              size="lg"
            />
          </View>
        </View>
      </Screen>
    );
  }

  // Reflection screen
  if (currentStep === 'reflection') {
    return (
      <Screen>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeIcon}>x</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.reflectionHeader}>
              <Text style={styles.reflectionEmoji}>🤔</Text>
              <Text style={styles.reflectionTitle}>Time to Reflect</Text>
              <Text style={styles.reflectionSubtitle}>
                Think about or discuss these questions
              </Text>
            </View>

            {activity.reflectionPrompts.map((prompt, index) => (
              <View key={index} style={styles.reflectionCard}>
                <View style={[styles.questionNumber, { backgroundColor: trait?.color || colors.secondary[500] }]}>
                  <Text style={styles.questionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.reflectionQuestion}>{prompt}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title="Finish Activity"
              onPress={handleFinish}
              size="lg"
            />
          </View>
        </View>
      </Screen>
    );
  }

  // Complete screen
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>🎉</Text>
          <Text style={styles.completeTitle}>Great Job!</Text>
          <Text style={styles.completeText}>
            You've completed today's activity for{' '}
            <Text style={{ color: trait?.color, fontWeight: '600' }}>{trait?.name}</Text>!
          </Text>
          <Text style={styles.completeSubtext}>
            Keep practicing and you'll grow stronger in this trait every day.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Back to Home"
            onPress={handleComplete}
            size="lg"
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
    marginVertical: spacing[2],
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

  // Intro screen
  introHeader: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  largeEmoji: {
    fontSize: 64,
  },
  introTitle: {
    ...textStyles.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  introDescription: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing[4],
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
  traitEmoji: {
    fontSize: 14,
    marginRight: spacing[1],
  },
  traitName: {
    ...textStyles.caption,
    fontWeight: '600',
  },
  duration: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },

  // Sections
  section: {
    marginBottom: spacing[5],
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing[3],
  },
  materialItem: {
    flexDirection: 'row',
    marginBottom: spacing[2],
  },
  bulletPoint: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginRight: spacing[2],
  },
  materialText: {
    ...textStyles.body,
    color: colors.text.primary,
    flex: 1,
  },

  // Tips
  tipsCard: {
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    marginBottom: spacing[4],
  },
  tipsTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing[3],
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: spacing[2],
  },
  tipBullet: {
    fontSize: 14,
    marginRight: spacing[2],
  },
  tipText: {
    ...textStyles.body,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 22,
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

  // Instructions screen
  instructionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
  },
  stepLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing[4],
  },
  instructionText: {
    ...textStyles.h3,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 36,
  },

  // Doing screen
  doingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
  },
  doingEmoji: {
    fontSize: 80,
    marginBottom: spacing[4],
  },
  doingTitle: {
    ...textStyles.h1,
    color: colors.text.primary,
    marginBottom: spacing[3],
  },
  doingText: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing[4],
  },
  timerHint: {
    backgroundColor: colors.neutral[100],
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.full,
  },
  timerHintText: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },

  // Reflection screen
  reflectionHeader: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  reflectionEmoji: {
    fontSize: 56,
    marginBottom: spacing[3],
  },
  reflectionTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  reflectionSubtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  reflectionCard: {
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
  reflectionQuestion: {
    ...textStyles.body,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 24,
  },

  // Complete screen
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
  },
  completeEmoji: {
    fontSize: 80,
    marginBottom: spacing[4],
  },
  completeTitle: {
    ...textStyles.h1,
    color: colors.text.primary,
    marginBottom: spacing[3],
  },
  completeText: {
    ...textStyles.body,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing[2],
  },
  completeSubtext: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
