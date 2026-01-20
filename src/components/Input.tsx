import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, spacing, borderRadius, textStyles, typography } from '../theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  containerStyle,
  secureTextEntry,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry === true;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.inputContainerFocused : undefined,
          error ? styles.inputContainerError : undefined,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            (rightIcon || isPassword) ? styles.inputWithRightIcon : undefined,
          ]}
          placeholderTextColor={colors.neutral[400]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword ? !showPassword : false}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showHideText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && !isPassword && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {helper && !error ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    ...textStyles.bodySmall,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputContainerFocused: {
    borderColor: colors.primary[500],
    backgroundColor: colors.neutral[0],
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    ...textStyles.body,
    color: colors.text.primary,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    minHeight: 48,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing[2],
  },
  inputWithRightIcon: {
    paddingRight: spacing[2],
  },
  leftIcon: {
    paddingLeft: spacing[4],
  },
  rightIcon: {
    paddingRight: spacing[4],
  },
  showHideText: {
    ...textStyles.bodySmall,
    color: colors.primary[500],
    fontWeight: typography.fontWeight.medium,
  },
  error: {
    ...textStyles.caption,
    color: colors.error,
    marginTop: spacing[1],
  },
  helper: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
});
