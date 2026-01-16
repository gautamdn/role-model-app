import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen, Button } from '../../components';
import { colors, spacing, textStyles } from '../../theme';
import type { AuthStackParamList } from '../../types';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>RM</Text>
          </View>
          <Text style={styles.title}>Role Model</Text>
          <Text style={styles.tagline}>
            Build character, not comparisons.{'\n'}Learn from the best, become your best.
          </Text>
        </View>

        <View style={styles.features}>
          <FeatureItem
            emoji="🌟"
            text="Inspiring stories from real role models"
          />
          <FeatureItem
            emoji="🎯"
            text="Fun activities to build character traits"
          />
          <FeatureItem
            emoji="📈"
            text="Track your child's growth journey"
          />
        </View>

        <View style={styles.buttons}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('SignUp')}
            size="lg"
          />
          <Button
            title="I already have an account"
            onPress={() => navigation.navigate('Login')}
            variant="ghost"
            size="lg"
          />
        </View>
      </View>
    </Screen>
  );
}

function FeatureItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[8],
  },
  heroSection: {
    alignItems: 'center',
    marginTop: spacing[8],
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.neutral[0],
  },
  title: {
    ...textStyles.h1,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  tagline: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    marginVertical: spacing[8],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
    paddingHorizontal: spacing[4],
  },
  featureEmoji: {
    fontSize: 28,
    marginRight: spacing[4],
  },
  featureText: {
    ...textStyles.body,
    color: colors.text.primary,
    flex: 1,
  },
  buttons: {
    gap: spacing[3],
  },
});
