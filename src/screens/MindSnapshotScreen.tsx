import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

export const MindSnapshotScreen: React.FC<{ onComplete: () => void; onRestart: () => void }> = ({ onComplete, onRestart }) => {
  const traits = {
    Curiosity: 72,
    Creativity: 65,
    Structure: 58,
    'Risk Tolerance': 68,
    'Social Energy': 62,
    Empathy: 78,
    Analytical: 71,
    Intuitive: 64,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Your Mind Snapshot</Text>
      <Text style={styles.subtitle}>✨ This evolves over time as you interact.</Text>

      <View style={styles.traitsContainer}>
        {Object.entries(traits).map(([trait, score]) => (
          <View key={trait} style={styles.traitItem}>
            <View style={styles.traitHeader}>
              <Text style={styles.traitName}>{trait}</Text>
              <Text style={styles.traitScore}>{score}%</Text>
            </View>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${score}%`,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.info}>
        These traits are calculated from your answers. They help us find aligned minds.
      </Text>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={onRestart}>
          <Text style={styles.secondaryButtonText}>🔄 Take Survey Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={onComplete}>
          <Text style={styles.primaryButtonText}>✓ Continue</Text>
        </TouchableOpacity>
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
    ...typography.heading1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  traitsContainer: {
    marginVertical: spacing.lg,
    gap: spacing.md,
  },
  traitItem: {
    marginBottom: spacing.md,
  },
  traitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  traitName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  traitScore: {
    ...typography.bodySmall,
    color: colors.accent,
    fontWeight: '600',
  },
  barContainer: {
    height: 6,
    backgroundColor: colors.surface,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  info: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    fontStyle: 'italic',
  },
  actionContainer: {
    flexDirection: 'column',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  primaryButton: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...typography.body,
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  secondaryButtonText: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '600',
  },
});
