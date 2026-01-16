import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen, Button } from '../../components';
import { useAuthStore } from '../../services';
import { colors, spacing, textStyles } from '../../theme';

export function HomeScreen() {
  const { user, signOut } = useAuthStore();

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Role Model!</Text>
        <Text style={styles.subtitle}>
          You're signed in as {user?.email}
        </Text>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>🏠</Text>
          <Text style={styles.placeholderText}>
            Home screen coming soon...{'\n'}
            This will show today's stories and activities
          </Text>
        </View>

        <Button
          title="Sign Out"
          onPress={signOut}
          variant="outline"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing[8],
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing[8],
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    marginBottom: spacing[6],
    padding: spacing[6],
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: spacing[4],
  },
  placeholderText: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
