import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Button, ProgressBar } from '../components';
import { colors, spacing, typography } from '../styles/theme';

export const IdentitySetupScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [displayName, setDisplayName] = useState('');
  const [avatarType, setAvatarType] = useState<string>('');

  const avatarOptions = [
    { id: 'circle', label: '⭕ Circle' },
    { id: 'triangle', label: '△ Triangle' },
    { id: 'square', label: '□ Square' },
    { id: 'star', label: '⭐ Star' },
  ];

  const isComplete = displayName.trim().length > 0 && avatarType;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProgressBar current={1} total={3} label="Identity Setup" />

      <Text style={styles.title}>Choose your pseudo identity</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your anonymous name"
          placeholderTextColor={colors.textTertiary}
          value={displayName}
          onChangeText={setDisplayName}
          maxLength={20}
        />
        <Text style={styles.charCount}>{displayName.length}/20</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Abstract Avatar</Text>
        <View style={styles.avatarGrid}>
          {avatarOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.avatarOption,
                avatarType === option.id && styles.avatarSelected,
              ]}
              onPress={() => setAvatarType(option.id)}
            >
              <Text style={styles.avatarLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.info}>
        Your identity remains anonymous. You control what to reveal later.
      </Text>

      <View style={styles.buttonContainer}>
        <Button label="Continue" onPress={onComplete} disabled={!isComplete} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.heading2,
    color: colors.text,
    marginVertical: spacing.lg,
  },
  section: {
    marginVertical: spacing.md,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  input: {
    ...typography.body,
    color: colors.text,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  charCount: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  avatarOption: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceLight,
  },
  avatarLabel: {
    ...typography.body,
    color: colors.text,
  },
  info: {
    ...typography.caption,
    color: colors.textSecondary,
    marginVertical: spacing.lg,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
});
