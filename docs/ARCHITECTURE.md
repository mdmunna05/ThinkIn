# ThinkIn App - Project Architecture

## Overview

ThinkIn is a React Native (Expo) mind-mapping and thought-alignment platform. It connects people based on how they think, not how they look.

## Folder Structure

```
thinkin-app/
├── src/
│   ├── screens/              # All screen components
│   │   ├── WelcomeScreen.tsx
│   │   ├── IdentitySetupScreen.tsx
│   │   ├── MindMappingScreen.tsx
│   │   ├── MindSnapshotScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── AlignmentDetailsScreen.tsx
│   │   ├── ThoughtPromptScreen.tsx
│   │   ├── ConversationScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ReactionButtons.tsx
│   │   ├── MindTraitVisualization.tsx
│   │   ├── ThoughtCard.tsx
│   │   └── AlignmentCard.tsx
│   │
│   ├── services/             # Business logic & API integration
│   │   ├── backend.ts        # Firebase/Supabase init
│   │   ├── authService.ts    # Anonymous auth, session
│   │   ├── mindMapService.ts # Questions, snapshot calculation
│   │   ├── matchingService.ts # Alignment algorithm
│   │   ├── feedService.ts    # Thoughts, reactions, prompts
│   │   └── conversationService.ts # Messaging
│   │
│   ├── store/                # Zustand state management
│   │   ├── userStore.ts      # Current user state
│   │   ├── homeStore.ts      # Feed, alignments, prompts
│   │   └── index.ts
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useUser.ts        # User store shortcuts
│   │   ├── useHome.ts        # Home store shortcuts
│   │   ├── useFetch.ts       # Data fetching
│   │   └── useBehaviorTracking.ts # Behavioral signals
│   │
│   ├── types/                # TypeScript interfaces
│   │   ├── user.ts           # User, MindTrait, MindSnapshot
│   │   ├── thought.ts        # Thoughts, reactions, prompts
│   │   ├── alignment.ts      # Alignments, conversations
│   │   └── index.ts
│   │
│   ├── styles/               # Theme & styling
│   │   ├── theme.ts          # Colors, typography, spacing
│   │   └── globalStyles.ts   # Global styles
│   │
│   ├── utils/                # Helper functions
│   │   ├── uuid.ts           # ID generation
│   │   ├── validators.ts     # Input validation
│   │   ├── formatters.ts     # Data formatting
│   │   └── logger.ts         # Logging utility
│   │
│   ├── constants/            # App constants
│   │   ├── questions.ts      # Mind mapping questions
│   │   ├── prompts.ts        # Daily prompts
│   │   └── config.ts         # App configuration
│   │
│   └── App.tsx               # Root component with navigation
│
├── docs/
│   ├── DATABASE_SCHEMA.md    # Firestore/Supabase schema
│   ├── MATCHING_ALGORITHM.md # Alignment calculation logic
│   ├── API_INTEGRATION.md    # Backend API endpoints
│   ├── STATE_FLOW.md         # State management flow
│   └── COMPONENT_BREAKDOWN.md
│
├── app.json                  # Expo config
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── README.md                 # Project setup
```

## Key Architectural Decisions

### 1. State Management (Zustand)

Two main stores:
- **userStore**: Current user, mind snapshot, identity
- **homeStore**: Feed (thought sparks), alignments, daily prompts

Lightweight and performant for React Native.

### 2. Service Layer

Decoupled from UI, handles:
- API calls (Firebase/Supabase)
- Business logic (matching algorithm, trait calculation)
- Behavioral tracking (silent intelligence gathering)

### 3. Type Safety

Comprehensive TypeScript interfaces for:
- Users and identity
- Thoughts and interactions
- Alignments and matching
- Ensures maintainability at scale

### 4. Styling System

Single source of truth:
- `theme.ts` defines all design tokens
- Colors (dark-friendly palette)
- Typography (hierarchy)
- Spacing system
- Radius and shadows

All components import from theme for consistency.

### 5. Anonymous-First Flow

1. Welcome → Begin Mapping
2. Create anonymous user (UUID)
3. Identity setup (pseudo name + abstract avatar)
4. Mind mapping (15 questions)
5. Mind snapshot view
6. Home screen (discover)
7. Optional identity reveal

## Data Flow

```
User Action
    ↓
Component Handler
    ↓
Service Call (API)
    ↓
Store Update (Zustand)
    ↓
Component Re-render
```

## Screen Flow

```
Welcome
    ↓ (Begin Mapping)
Identity Setup
    ↓ (Pseudo name + Avatar)
Mind Mapping (15 questions)
    ↓ (Calculate traits)
Mind Snapshot
    ↓ (View profile)
Home Screen (MAIN)
    ├─ Thought Sparks (A)
    ├─ Alignments (B)
    └─ Daily Prompt (C)
    
From Home:
- Tap alignment → Alignment Details → Thought Prompt → (unlock Chat?)
- Tap thought → Reactions + Context
- Daily prompt → Optional response
```

## Component Hierarchy

```
App
├── WelcomeScreen
├── OnboardingStack
│   ├── IdentitySetupScreen
│   ├── MindMappingScreen
│   └── MindSnapshotScreen
└── MainStack
    ├── HomeScreen (Tabs)
    │   ├── ThoughtSparks
    │   ├── Alignments
    │   └── DailyPrompt
    ├── AlignmentDetailsScreen
    ├── ThoughtPromptScreen
    ├── ConversationScreen
    └── ProfileScreen (Identity Reveal)
```

## Database Schema Overview

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for full details.

**Main Collections:**
- `users` - User profiles and identity
- `mindSnapshots` - Trait data
- `mindMapAnswers` - User responses
- `thoughtSparks` - Anonymous thoughts
- `userReactions` - Reactions to thoughts
- `dailyPrompts` - Daily questions
- `alignments` - Calculated matches
- `conversations` - Chat messages
- `userBehavior` - Behavioral signals

## Matching Algorithm

See [MATCHING_ALGORITHM.md](./MATCHING_ALGORITHM.md)

**Factors:**
1. Trait Similarity (40%)
2. Complementary Traits (35%)
3. Behavioral Patterns (25%)

**Key Feature:** Avoids 100% matches for diversity.

## Next Steps

1. Connect Firebase/Supabase
2. Implement all screens
3. Add navigation (expo-router)
4. Implement all service methods
5. Add behavioral tracking
6. Test matching algorithm
7. Build admin dashboard for prompts
