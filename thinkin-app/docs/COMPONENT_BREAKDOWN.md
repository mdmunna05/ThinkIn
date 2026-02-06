# ThinkIn Component Breakdown

## Screen Components

### WelcomeScreen
**Purpose:** Initial landing screen

**Props:**
- `onStart: () => void` - Begin mapping callback

**State:** None (stateless)

**UI Elements:**
- Title: "Let's map how you think."
- Subtitle: Value proposition
- CTA Button: "Begin Mapping"

**Responsibilities:**
- Present value prop
- Trigger onboarding flow

---

### IdentitySetupScreen
**Purpose:** Choose pseudo identity and avatar

**Props:**
- `onComplete: () => void` - Proceed to mind mapping

**State:**
- `displayName: string`
- `avatarType: string`

**UI Elements:**
- ProgressBar (1/3)
- TextInput: Display name
- Avatar grid: 4 geometric shapes
- Button: Continue
- Info text about anonymity

**Responsibilities:**
- Collect display name
- Select abstract avatar
- Store in currentUser
- Show progress indicator

---

### MindMappingScreen
**Purpose:** Answer 15 trait-mapping questions

**Props:**
- `onComplete: () => void` - Finish and calculate snapshot

**State:**
- `currentQuestionIndex: number`
- `answers: MindMapAnswer[]`

**UI Elements:**
- ProgressBar: Question progress
- Question text (large)
- Option buttons (4 per question)
- Button: Next/Finish
- Skip button (optional)

**Responsibilities:**
- Display one question per screen
- Record user answers
- Calculate trait weights
- Call mindMapService on finish

**Flow:**
```
Q1 → Q2 → Q3 → ... → Q15 → Calculate → MindSnapshotScreen
```

---

### MindSnapshotScreen
**Purpose:** Display calculated mind profile

**Props:**
- `snapshot: MindSnapshot` (from store)

**State:** None (read-only)

**UI Elements:**
- Title: "Your Mind Snapshot"
- Subtitle: "This evolves over time..."
- 5 trait bars (horizontal, animated)
- Trait name + percentage
- Info text about traits

**Responsibilities:**
- Visualize mind snapshot
- Explain trait meanings
- Allow user to proceed to home

**Visual:**
```
Curiosity      ████████░░ 78%
Creativity     ██████░░░░ 65%
Structure      ████░░░░░░ 42%
Risk Tolerance █████░░░░░ 58%
Social Energy  ███████░░░ 72%
```

---

### HomeScreen
**Purpose:** Main feed with 3 sections

**Props:** None (uses stores)

**State:**
- `activeTab: 'sparks' | 'alignments' | 'prompt'`

**Sub-sections:**

#### A. Thought Sparks
**Components:**
- ThoughtCard (multiple)
  - Anonymous thought text
  - ReactionButtons
  - Reaction counts

**Interactions:**
- Tap reaction → feedService.reactToThought()
- Tap thought → AlignmentDetailsScreen (context)

#### B. Alignments
**Components:**
- AlignmentCard (max 3)
  - "3 minds align with yours"
  - Shared traits list
  - Complementary traits
  - CTA: "Explore"

**Interactions:**
- Tap card → AlignmentDetailsScreen
- Show mini profile preview

#### C. Daily Prompt
**Components:**
- Prompt text (large, centered)
- Optional response input
- Submit button
- Skip option

**Interactions:**
- Type response → feedService.respondToPrompt()
- Skip → Track skips for behavioral signal

---

### AlignmentDetailsScreen
**Purpose:** Detailed view of a matched user

**Props:**
- `alignment: Alignment`
- `alignedUser: User`

**State:** None (read-only)

**UI Elements:**
- User avatar + pseudo name
- Shared traits (with percentages)
- Complementary traits (with explanation)
- Alignment score (visual)
- CTA: "Send Thought Prompt"

**Responsibilities:**
- Show detailed alignment info
- Explain compatibility
- Trigger thought prompt flow

---

### ThoughtPromptScreen
**Purpose:** Send context-based message before chat unlock

**Props:**
- `recipientId: string`
- `contextThoughtId: string`

**State:**
- `prompt: string`

**UI Elements:**
- Context (referenced thought/reaction)
- TextInput: Your prompt
- Button: Send
- Info: "Start meaningful conversation"

**Responsibilities:**
- Craft context-aware message
- Reference original thought
- Send to backend
- Track as meaningful interaction

---

### ConversationScreen
**Purpose:** 1-on-1 chat (post-unlock)

**Props:**
- `conversation: Conversation`

**State:**
- `messages: ConversationMessage[]`
- `newMessage: string`

**UI Elements:**
- Message list (scroll)
- Message bubbles (mine vs theirs)
- TextInput + Send button
- Timestamp on messages
- Read receipts (optional)

**Responsibilities:**
- Display messages
- Handle sending
- Real-time updates
- Show typing indicator

---

### ProfileScreen
**Purpose:** View and edit user identity

**Props:** None (uses currentUser store)

**State:**
- `editMode: boolean`
- `revealedName: string`
- `photoUrl: string` (optional)

**UI Elements:**
- User avatar
- Pseudo name (always shown)
- Toggle: "Reveal identity"
- If revealed:
  - Real name input
  - Photo picker
  - Social links inputs
- Mind snapshot (collapsible)
- Logout button

**Responsibilities:**
- Show current profile
- Allow identity reveal
- Update revealedIdentity
- Account management

---

## Reusable Components

### Button
**Purpose:** Consistent CTA styling

**Props:**
```typescript
{
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}
```

**Variants:**
- Primary (accent bg)
- Secondary (border, transparent)

---

### ProgressBar
**Purpose:** Show progress through multi-step flows

**Props:**
```typescript
{
  current: number;
  total: number;
  label?: string;
}
```

**Display:**
```
Mapping your mind…
████░░░░░░░░░░░░ 3 of 15
```

---

### ReactionButtons
**Purpose:** Three-way reaction UI

**Props:**
```typescript
{
  onReact: (type: ReactionType) => void;
  counts?: Record<ReactionType, number>;
}
```

**Reactions:**
- ✓ Relate
- ? Curious
- ✗ Disagree

**Display:**
```
✓ Relate (42)    ? Curious (15)    ✗ Disagree (3)
```

---

### ThoughtCard
**Purpose:** Display single thought spark

**Props:**
```typescript
{
  thought: ThoughtSpark;
  onReact: (type: ReactionType) => void;
}
```

**Content:**
- Italic thought text
- ReactionButtons component
- Tap to expand context

---

### AlignmentCard
**Purpose:** Show one alignment match

**Props:**
```typescript
{
  alignment: Alignment;
  alignedUser: User;
  onTap: () => void;
}
```

**Content:**
- User avatar
- Alignment score (0-100)
- Shared traits (3-4)
- "Explore" CTA

---

### MindTraitVisualization
**Purpose:** Animated trait profile view

**Props:**
```typescript
{
  snapshot: MindSnapshot;
  animated?: boolean;
}
```

**Display:**
- Horizontal bars for each trait
- Percentage labels
- Color coding (accent)

---

## Component Tree

```
App
├── WelcomeScreen
├── OnboardingStack
│   ├── IdentitySetupScreen
│   ├── MindMappingScreen
│   │   └── ProgressBar
│   │   └── Button
│   └── MindSnapshotScreen
│       └── MindTraitVisualization
├── MainStack
│   ├── HomeScreen (Tabs)
│   │   ├── ThoughtSparks
│   │   │   └── ThoughtCard (×N)
│   │   │       └── ReactionButtons
│   │   ├── Alignments
│   │   │   └── AlignmentCard (×3)
│   │   └── DailyPrompt
│   │       └── Button
│   ├── AlignmentDetailsScreen
│   │   └── MindTraitVisualization
│   │   └── Button
│   ├── ThoughtPromptScreen
│   │   └── Button
│   ├── ConversationScreen
│   │   └── (messages)
│   └── ProfileScreen
│       └── MindTraitVisualization
│       └── Button
```

## Component Dependencies

### Imports Pattern
```typescript
// Screens import components
import { Button, ProgressBar } from '@/components';

// Components import theme
import { colors, spacing, typography } from '@/styles/theme';

// Screens import services
import { feedService, matchingService } from '@/services';

// Screens import stores
import { useUserStore, useHomeStore } from '@/store';

// Screens/components import types
import type { ThoughtSpark, User } from '@/types';
```

## Styling

**All components:**
1. Import from `@/styles/theme`
2. Use theme tokens (no hardcoded colors)
3. Maintain spacing consistency
4. Use `StyleSheet.create()` for performance

**Example:**
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  title: {
    ...typography.heading2,
    color: colors.text,
  },
});
```

## Accessibility

**Checklist:**
- [ ] All buttons have `accessible` prop
- [ ] Text contrast meets WCAG AA
- [ ] Touch targets are 48×48 min
- [ ] Labels for inputs
- [ ] Screen reader support

## Performance

**Optimization:**
1. `useMemo()` for calculated values
2. `useCallback()` for stable functions
3. `FlatList` for long lists (not ScrollView)
4. `React.memo` for pure components
5. Lazy load images with `Image.prefetch()`
