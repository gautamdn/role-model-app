import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen, Button, Input } from '../../components';
import { useAuthStore } from '../../services';
import { colors, spacing, textStyles } from '../../theme';
import type { AuthStackParamList } from '../../types';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;
};

export function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { signUp, isLoading, clearError } = useAuthStore();

  const validate = (): boolean => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    clearError();

    if (!validate()) return;

    const result = await signUp(email, password);

    if (result.error) {
      Alert.alert('Sign Up Failed', result.error);
    } else {
      Alert.alert(
        'Check your email',
        'We sent you a verification link. Please check your email to complete sign up.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    }
  };

  return (
    <Screen scrollable keyboardAvoiding>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Start your family's character development journey
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            error={errors.email}
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            helper="At least 8 characters"
            placeholder="Create a password"
            secureTextEntry={true}
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword)
                setErrors({ ...errors, confirmPassword: undefined });
            }}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
            secureTextEntry={true}
          />

          <Text style={styles.terms}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          <Button
            title="Create Account"
            onPress={handleSignUp}
            loading={isLoading}
            size="lg"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
  },
  form: {
    marginBottom: spacing[8],
  },
  terms: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  termsLink: {
    color: colors.primary[500],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  footerLink: {
    ...textStyles.body,
    color: colors.primary[500],
    fontWeight: '600',
  },
});
