# ThinkIn - Quick Start Guide

## For Developers

### 1. Clone & Install

```bash
cd thinkin-app
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your Firebase/Supabase credentials
```

### 3. Start Development

```bash
# Start Expo
npm start

# Or directly:
expo start
```

### 4. Run on Device

```bash
# Press 'i' for iOS
# Press 'a' for Android
# Press 'w' for Web
```

---

## Project Overview

### What is ThinkIn?

A React Native app that connects people based on **how they think**, not how they look.

**Key Principle:** Anonymous-first, depth-first, complementary-matching-first.

### Tech Stack

- **Frontend:** React Native + Expo
- **State:** Zustand (lightweight stores)
- **Backend:** Firebase or Supabase
- **Styling:** Custom theme system (dark-friendly)

### Core Features

1. **Anonymous Entry** - Users start without profile photos
2. **Mind Mapping** - Answer 15 questions to reveal thinking patterns
3. **Trait Calculation** - 8 personality traits scored (curiosity, creativity, etc.)
4. **Intelligent Matching** - Find people with similar AND complementary traits
5. **Thought Sparks** - Share anonymous reflections
6. **Daily Prompts** - One reflective question per day
7. **Depth-First Interactions** - No swiping, no vanity metrics

---

## File Organization

```
src/
├── screens/        ← User-facing screens (9 total)
├── components/     ← Reusable UI components
├── services/       ← Business logic & APIs
├── store/          ← Zustand state management
├── types/          ← TypeScript interfaces
├── styles/         ← Design tokens (theme.ts)
├── utils/          ← Helper functions
├── constants/      ← App constants
└── App.tsx         ← Root component
```

**Key Pattern:** Screens import components and call services. Services update stores. Stores trigger re-renders.

---

## Adding a New Screen

1. **Create the file** in `src/screens/YourScreen.tsx`

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';
import { Button } from '../components';

export const YourScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Screen</Text>
      <Button label="Action" onPress={() => console.log('Tapped')} />
    </View>
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
  },
});
```

2. **Import in App.tsx** and add to state machine

3. **Use stores** if you need state:

```typescript
import { useUserStore } from '../store';

const { currentUser } = useUserStore();
```

4. **Call services** for backend operations:

```typescript
import { matchingService } from '../services';

const alignments = await matchingService.findAlignedMinds(currentUser.id);
```

---

## Understanding the Matching Algorithm

### Three Factors

1. **Trait Similarity (40%)** - How similarly do they think?
   - Compares all 8 traits
   - Capped at 90% (never perfect matches)

2. **Complementary Traits (35%)** - What can they learn from each other?
   - Detects opposite strengths
   - Adds 5 points per complementary pair

3. **Behavioral Compatibility (25%)** - Will they engage similarly?
   - Response time compatibility
   - Depth score alignment
   - Engagement consistency

### Formula

```
score = (similarity × 0.40) + 
        (complementary_count × 5 × 0.35) + 
        (behavior_score × 0.25)
```

**Example:** Similarity 75 + 2 complementary traits + behavior 80 = **~53.5 score**

See [MATCHING_ALGORITHM.md](../docs/MATCHING_ALGORITHM.md) for full details.

---

## Understanding the Data Flow

### Simple User Action

```
User taps "React to Thought"
    ↓
Component calls feedService.reactToThought()
    ↓
Service sends API call to backend
    ↓
Service updates homeStore with new reaction counts
    ↓
Component re-renders from store subscription
```

### Complex Flow: Identity Setup

```
User enters name + chooses avatar
    ↓
Component calls authService.updateProfile()
    ↓
Service sends update to Firebase/Supabase
    ↓
Service calls useUserStore.updateUser()
    ↓
Store updates currentUser
    ↓
App.tsx detects onboardingStep should change
    ↓
Next screen renders
```

---

## Important Concepts

### Anonymous-First

- All users start **anonymous** (no profile photos)
- Each user gets a **UUID** (`anonymousId`)
- Display name is **pseudo** (not real name)
- Identity reveal is **optional** and user-controlled

### No Dating App Vibes

- ❌ No swiping
- ❌ No follower counts
- ❌ No "match" messages
- ✅ Depth-first design
- ✅ Complementary matching
- ✅ Meaningful interactions

### Behavioral Signals (Silent)

The app tracks (without being obvious):
- How fast users respond
- How deeply they think (response length)
- How often they complete prompts
- Which reactions they prefer

This data **refines alignments** over time.

---

## Common Tasks

### Add a Service Method

```typescript
// In src/services/yourService.ts

export const yourService = {
  doSomething: async (userId: string): Promise<Result> => {
    // Call backend
    // return data
  },
};

// Export in src/services/index.ts
export { yourService } from './yourService';

// Use in screen
import { yourService } from '../services';
const result = await yourService.doSomething(userId);
```

### Add a Store

```typescript
// In src/store/yourStore.ts
import { create } from 'zustand';

interface YourStore {
  data: any;
  setData: (data: any) => void;
}

export const useYourStore = create<YourStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));

// Export in src/store/index.ts
export { useYourStore } from './yourStore';

// Use in component
import { useYourStore } from '../store';
const { data, setData } = useYourStore();
```

### Update Theme

```typescript
// In src/styles/theme.ts
export const colors = {
  background: '#0a0a0a', // Change this
  // ... other colors
};

// Automatically used everywhere that imports colors
```

---

## Debugging

### Enable Logging

```typescript
import { logger } from '../utils/logger';

logger.info('User created', { userId });
logger.error('API failed', error);
```

### Check Store State

```typescript
// In component
const { currentUser } = useUserStore();
console.log('Current user:', currentUser);
```

### React DevTools

```bash
# Install React DevTools
npm install -g react-devtools

# Run it
react-devtools

# Connect in Expo
# Shake device → "Toggle Element Inspector"
```

---

## Testing

### Test a Service

```typescript
import { mindMapService } from '@/services';

test('calculateMindSnapshot', async () => {
  const answers = [{ questionId: 'q1', answer: 'option1' }];
  const snapshot = await mindMapService.calculateMindSnapshot(answers);
  expect(snapshot.traits.curiosity).toBeGreaterThan(0);
});
```

### Test a Component

```typescript
import { render } from '@testing-library/react-native';
import { Button } from '@/components';

test('button renders', () => {
  const { getByText } = render(<Button label="Click" onPress={() => {}} />);
  expect(getByText('Click')).toBeTruthy();
});
```

---

## Deployment

### Build for iOS

```bash
eas build --platform ios
```

### Build for Android

```bash
eas build --platform android
```

### Submit to App Store / Play Store

```bash
eas submit --platform ios
eas submit --platform android
```

---

## Resources

- **Docs:** See `docs/` folder for comprehensive documentation
- **React Native:** https://reactnative.dev/
- **Expo:** https://docs.expo.dev/
- **Zustand:** https://github.com/pmndrs/zustand
- **TypeScript:** https://www.typescriptlang.org/

---

## Quick Reference

| What | Where |
|------|-------|
| Add screen | `src/screens/` |
| Add component | `src/components/` |
| Add business logic | `src/services/` |
| Add state | `src/store/` |
| Add types | `src/types/` |
| Change theme | `src/styles/theme.ts` |
| Add utility | `src/utils/` |
| Tweak constants | `src/constants/` |

---

## Support

For detailed documentation, see:
- [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- [DATABASE_SCHEMA.md](../docs/DATABASE_SCHEMA.md)
- [MATCHING_ALGORITHM.md](../docs/MATCHING_ALGORITHM.md)
- [STATE_FLOW.md](../docs/STATE_FLOW.md)
- [COMPONENT_BREAKDOWN.md](../docs/COMPONENT_BREAKDOWN.md)

---

**Ready to build? Start with `npm start` and explore!**
