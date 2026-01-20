import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}` as keyof typeof styles],
    disabled ? styles.disabled : undefined,
    style,
  ];

  const textStyles_ = [
    styles.text,
    styles[`text_${variant}` as keyof typeof styles],
    styles[`textSize_${size}` as keyof typeof styles],
    disabled ? styles.textDisabled : undefined,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? colors.primary[500] : colors.neutral[0]}
          size="small"
        />
      ) : (
        <Text style={textStyles_}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: colors.secondary[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  size_sm: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    minHeight: 36,
  },
  size_md: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    minHeight: 48,
  },
  size_lg: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    minHeight: 56,
  },

  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    ...textStyles.button,
  },
  text_primary: {
    color: colors.neutral[0],
  },
  text_secondary: {
    color: colors.neutral[0],
  },
  text_outline: {
    color: colors.primary[500],
  },
  text_ghost: {
    color: colors.primary[500],
  },

  textSize_sm: {
    ...textStyles.buttonSmall,
  },
  textSize_md: {
    ...textStyles.button,
  },
  textSize_lg: {
    ...textStyles.button,
    fontSize: 18,
  },

  textDisabled: {
    opacity: 0.7,
  },
});
