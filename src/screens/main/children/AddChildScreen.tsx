import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen, Button, Input } from '../../../components';
import { useChildStore } from '../../../services';
import { colors, spacing, textStyles } from '../../../theme';
import type { MainStackParamList } from '../../../types';

type AddChildScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'AddChild'>;
};

export function AddChildScreen({ navigation }: AddChildScreenProps) {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [errors, setErrors] = useState<{ name?: string; birth?: string }>({});

  const { addChild, isLoading } = useChildStore();

  const validate = (): boolean => {
    const newErrors: { name?: string; birth?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your child's name";
    }

    if (birthYear) {
      const year = parseInt(birthYear, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < currentYear - 18 || year > currentYear) {
        newErrors.birth = 'Please enter a valid birth year';
      }
    }

    if (birthMonth) {
      const month = parseInt(birthMonth, 10);
      if (isNaN(month) || month < 1 || month > 12) {
        newErrors.birth = 'Please enter a valid month (1-12)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddChild = async () => {
    if (!validate()) return;

    let birthDate: string | null = null;
    if (birthYear) {
      const month = birthMonth ? birthMonth.padStart(2, '0') : '01';
      birthDate = `${birthYear}-${month}-01`;
    }

    const result = await addChild({
      name: name.trim(),
      birth_date: birthDate,
      interests: [],
      focus_traits: [],
      avatar_url: null,
    });

    if (result.error) {
      Alert.alert('Error', result.error);
    } else if (result.childId) {
      // Navigate to interests selection for the new child
      navigation.replace('SelectInterests', {
        childId: result.childId,
        childName: name.trim(),
        isNewChild: true,
      });
    }
  };

  return (
    <Screen scrollable keyboardAvoiding>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Child</Text>
          <Text style={styles.subtitle}>
            Tell us about your child so we can personalize their experience
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Child's Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            error={errors.name}
            placeholder="Enter name"
            autoCapitalize="words"
          />

          <Text style={styles.sectionLabel}>Birth Date (Optional)</Text>
          <Text style={styles.sectionHint}>
            This helps us recommend age-appropriate content
          </Text>

          <View style={styles.dateRow}>
            <View style={styles.dateInput}>
              <Input
                label="Year"
                value={birthYear}
                onChangeText={(text) => {
                  setBirthYear(text.replace(/[^0-9]/g, ''));
                  if (errors.birth) setErrors({ ...errors, birth: undefined });
                }}
                placeholder="2015"
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
            <View style={styles.dateInput}>
              <Input
                label="Month"
                value={birthMonth}
                onChangeText={(text) => {
                  setBirthMonth(text.replace(/[^0-9]/g, ''));
                  if (errors.birth) setErrors({ ...errors, birth: undefined });
                }}
                placeholder="6"
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
          </View>
          {errors.birth && <Text style={styles.errorText}>{errors.birth}</Text>}

          <View style={styles.buttons}>
            <Button
              title="Add Child"
              onPress={handleAddChild}
              loading={isLoading}
              size="lg"
            />
            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              variant="ghost"
              size="lg"
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: spacing[4],
  },
  header: {
    marginBottom: spacing[6],
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
    flex: 1,
  },
  sectionLabel: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  sectionHint: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing[3],
  },
  dateRow: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  dateInput: {
    flex: 1,
  },
  errorText: {
    ...textStyles.caption,
    color: colors.error,
    marginTop: -spacing[2],
    marginBottom: spacing[4],
  },
  buttons: {
    marginTop: spacing[6],
    gap: spacing[3],
  },
});
