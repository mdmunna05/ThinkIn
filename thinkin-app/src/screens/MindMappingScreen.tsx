import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, ProgressBar } from '../components';
import { colors, spacing, typography } from '../styles/theme';

export const MindMappingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  
  const questions = [
    {
      id: 1,
      text: "When facing a new problem, what's your first instinct?",
      options: ['Explore multiple angles', 'Dive deep into one', 'Talk it through', 'Research first'],
    },
    {
      id: 2,
      text: "How do you prefer to spend time alone?",
      options: ['Creating something', 'Learning something new', 'Problem-solving', 'Reflecting & thinking'],
    },
    {
      id: 3,
      text: "What drives you most?",
      options: ['Understanding why', 'Making an impact', 'Connection & collaboration', 'Achievement & growth'],
    },
    {
      id: 4,
      text: "When you disagree with someone, you typically:",
      options: ['Explore their perspective first', 'Stand firm on your view', 'Find middle ground', 'Withdraw from conflict'],
    },
    {
      id: 5,
      text: "Your ideal next chapter involves:",
      options: ['Building something new', 'Going deeper into expertise', 'Helping others grow', 'Finding more freedom'],
    },
  ];

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];

  const handleSelectOption = (option: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: option });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isAnswered = selectedOption !== undefined;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProgressBar
        current={currentQuestionIndex + 1}
        total={totalQuestions}
        label="Mapping your mind…"
      />

      <View style={styles.content}>
        <Text style={styles.question}>{currentQuestion.text}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === option && styles.optionSelected,
              ]}
              onPress={() => handleSelectOption(option)}
            >
              <View style={[styles.radio, selectedOption === option && styles.radioSelected]} />
              <Text style={[styles.optionText, selectedOption === option && styles.optionTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.buttonGroup}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.secondaryButton} onPress={handlePrevious}>
            <Text style={styles.secondaryButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
        <Button
          label={isLastQuestion ? 'See Results' : 'Next'}
          onPress={handleNext}
          disabled={!isAnswered}
        />
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
  content: {
    flex: 1,
    marginVertical: spacing.lg,
  },
  question: {
    ...typography.heading2,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.accent,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    marginRight: spacing.md,
  },
  radioSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  optionText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.accent,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
});
