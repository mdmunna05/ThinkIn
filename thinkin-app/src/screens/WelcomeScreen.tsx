import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from '../components';
import { colors, spacing, typography } from '../styles/theme';

export const WelcomeScreen: React.FC<{ onStart: () => Promise<void> | void }> = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);
    console.log('🔵 Button pressed - calling onStart');
    try {
      await onStart();
      console.log('✅ onStart completed');
    } catch (error) {
      console.error('❌ Error in onStart:', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Let's map how you think.</Text>
        <Text style={styles.subtitle}>
          Discover and connect with people based on how they think, not how they look.
        </Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.loadingText}>Setting up your profile...</Text>
        </View>
      ) : (
        <Button label="Begin Mapping" onPress={handleStart} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.heading1,
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
