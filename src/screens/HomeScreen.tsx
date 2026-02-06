import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ReactionButtons } from '../components';
import { colors, spacing, typography } from '../styles/theme';
import type { ReactionType } from '../types';

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sparks' | 'alignments' | 'prompt'>('sparks');

  const handleReact = (type: ReactionType) => {
    console.log('Reacted:', type);
    // Call feedService.reactToThought()
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thought Sparks</Text>
      </View>

      {activeTab === 'sparks' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.thoughtCard}>
            <Text style={styles.thought}>
              "The best ideas come when you're not actively looking for them."
            </Text>
            <ReactionButtons onReact={handleReact} counts={{ relate: 42, curious: 15, disagree: 3 }} />
          </View>

          <View style={styles.thoughtCard}>
            <Text style={styles.thought}>
              "Deep work requires saying no to most opportunities."
            </Text>
            <ReactionButtons onReact={handleReact} counts={{ relate: 28, curious: 8, disagree: 2 }} />
          </View>
        </ScrollView>
      )}

      {activeTab === 'alignments' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>3 minds align with yours</Text>
          <View style={styles.alignmentCard}>
            <Text style={styles.alignmentLabel}>Shared traits:</Text>
            <Text style={styles.traits}>Curiosity • Creativity • Analytical</Text>
            <Text style={styles.alignmentLabel}>Complementary:</Text>
            <Text style={styles.traits}>Structure + Creativity</Text>
          </View>
        </ScrollView>
      )}

      {activeTab === 'prompt' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.dailyPrompt}>What's one assumption you challenged today?</Text>
        </ScrollView>
      )}

      <View style={styles.tabs}>
        {['sparks', 'alignments', 'prompt'].map((tab) => (
          <Text
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab === 'sparks' ? '✦' : tab === 'alignments' ? '◆' : '◇'}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.heading2,
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  thoughtCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  thought: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.text,
    marginVertical: spacing.md,
  },
  alignmentCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  alignmentLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  traits: {
    ...typography.bodySmall,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  dailyPrompt: {
    ...typography.heading3,
    color: colors.text,
    marginVertical: spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  tab: {
    ...typography.heading3,
    color: colors.textSecondary,
    padding: spacing.sm,
  },
  tabActive: {
    color: colors.accent,
  },
});
