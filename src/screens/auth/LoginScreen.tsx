import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen, Button, Input } from '../../components';
import { useAuthStore } from '../../services';
import { colors, spacing, textStyles } from '../../theme';
import type { AuthStackParamList } from '../../types';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, isLoading, error, clearError } = useAuthStore();

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    clearError();

    if (!validate()) return;

    const result = await signIn(email, password);

    if (result.error) {
      Alert.alert('Login Failed', result.error);
    }
  };

  return (
    <Screen scrollable keyboardAvoiding>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your family's journey
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
            autoComplete="email"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            placeholder="Enter your password"
            secureTextEntry
            autoComplete="password"
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            size="lg"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.footerLink}>Sign Up</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing[6],
    marginTop: -spacing[2],
  },
  forgotPasswordText: {
    ...textStyles.bodySmall,
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
