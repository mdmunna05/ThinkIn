import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';
import type { ReactionType } from '../types';

interface ReactionButtonsProps {
  onReact: (type: ReactionType) => void;
  counts?: Record<ReactionType, number>;
}

export const ReactionButtons: React.FC<ReactionButtonsProps> = ({ onReact, counts }) => {
  const reactions: ReactionType[] = ['relate', 'curious', 'disagree'];

  return (
    <View style={styles.container}>
      {reactions.map((reaction) => (
        <TouchableOpacity
          key={reaction}
          style={styles.button}
          onPress={() => onReact(reaction)}
        >
          <Text style={styles.icon}>{getReactionIcon(reaction)}</Text>
          <Text style={styles.label}>{reaction}</Text>
          {counts && counts[reaction] > 0 && (
            <Text style={styles.count}>{counts[reaction]}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const getReactionIcon = (type: ReactionType): string => {
  const icons: Record<ReactionType, string> = {
    relate: '✓',
    curious: '?',
    disagree: '✗',
  };
  return icons[type];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  icon: {
    fontSize: 20,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  count: {
    ...typography.caption,
    color: colors.accent,
    marginTop: 2,
    fontSize: 10,
  },
});
