import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen, Button, Input } from '../../components';
import { useAuthStore } from '../../services';
import { colors, spacing, textStyles } from '../../theme';
import type { AuthStackParamList } from '../../types';

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

export function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  const { resetPassword, isLoading, clearError } = useAuthStore();

  const validate = (): boolean => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleResetPassword = async () => {
    clearError();

    if (!validate()) return;

    const result = await resetPassword(email);

    if (result.error) {
      Alert.alert('Error', result.error);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <Screen>
        <View style={styles.content}>
          <View style={styles.successContainer}>
            <Text style={styles.successEmoji}>📧</Text>
            <Text style={styles.successTitle}>Check your email</Text>
            <Text style={styles.successMessage}>
              We sent a password reset link to{'\n'}
              <Text style={styles.emailHighlight}>{email}</Text>
            </Text>
            <Text style={styles.successHint}>
              Didn't receive the email? Check your spam folder or try again.
            </Text>
          </View>

          <View style={styles.buttons}>
            <Button
              title="Back to Login"
              onPress={() => navigation.navigate('Login')}
              size="lg"
            />
            <Button
              title="Try Again"
              onPress={() => setSent(false)}
              variant="ghost"
              size="lg"
            />
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scrollable keyboardAvoiding>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your
            password.
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError(undefined);
            }}
            error={error}
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={isLoading}
            size="lg"
          />
        </View>

        <Button
          title="Back to Login"
          onPress={() => navigation.goBack()}
          variant="ghost"
          size="lg"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: spacing[8],
  },
  header: {
    marginBottom: spacing[8],
  },
  title: {
    ...textStyles.h1,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  form: {
    marginBottom: spacing[4],
    gap: spacing[4],
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: spacing[6],
  },
  successTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing[3],
    textAlign: 'center',
  },
  successMessage: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  emailHighlight: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  successHint: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  buttons: {
    gap: spacing[3],
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[6],
  },
});
