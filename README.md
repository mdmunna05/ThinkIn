# ThinkIn - Mind Mapping & Thought Alignment Platform

> Discover and connect with people by how they think — not how they look.

## Overview

ThinkIn is a React Native (Expo) application designed to connect users based on cognitive alignment rather than superficial characteristics. It's anonymous-first, depth-focused, and built to foster meaningful connections between thinkers, learners, builders, and creators.

## Key Features

✨ **Anonymous Discovery** - No profile photos, no swiping, no judgement
🧠 **Mind Mapping** - Answer 15 thoughtful questions to reveal your thinking patterns  
🔗 **Alignment-Based Matching** - Connect with complementary minds, not just similar ones
💭 **Thought Sparks** - Share anonymous reflections and react meaningfully
📍 **Depth-First** - Interactions are contextual, not transactional
🔐 **Privacy-Controlled Identity** - Reveal yourself only when you choose

## Tech Stack

- **Frontend:** React Native + Expo
- **State Management:** Zustand
- **Backend:** Firebase or Supabase
- **Database:** NoSQL (Firestore / Postgres)
- **Authentication:** Anonymous → Optional Email
- **Styling:** Custom theme system (dark-friendly)

## Project Structure

```
thinkin-app/
├── src/
│   ├── screens/          # UI screens
│   ├── components/       # Reusable UI components
│   ├── services/         # Business logic & APIs
│   ├── store/            # State management (Zustand)
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript interfaces
│   ├── styles/           # Theme & design tokens
│   ├── utils/            # Helper functions
│   ├── constants/        # App constants & prompts
│   └── App.tsx           # Root component
├── docs/
│   ├── ARCHITECTURE.md         # Overall design
│   ├── DATABASE_SCHEMA.md      # Data model
│   ├── MATCHING_ALGORITHM.md   # Alignment logic
│   ├── STATE_FLOW.md           # State management
│   └── COMPONENT_BREAKDOWN.md  # UI components
├── app.json              # Expo configuration
├── package.json          # Dependencies
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/mdmunna05/ThinkIn.git
cd thinkin-app

# Install dependencies
npm install
# or
yarn install

# Configure environment variables
cp .env.example .env.local
# Add your Firebase/Supabase credentials

# Start Expo
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## App Flow

### 1. Welcome
- Intro screen: "Let's map how you think."
- Button: Begin Mapping

### 2. Identity Setup
- Choose pseudo display name
- Select abstract avatar (geometric shapes)
- Explain anonymity

### 3. Mind Mapping (15 Questions)
- One question per screen
- 4 multiple-choice options each
- Progress indicator
- Questions mapped to 8 personality traits

### 4. Mind Snapshot
- Display calculated trait profile
- 5 key traits with percentages
- "This evolves over time"

### 5. Home Screen (Main Interface)
- **Thought Sparks:** Anonymous thoughts with reactions (Relate/Curious/Disagree)
- **Alignments:** 3 minds that align with yours (shared + complementary traits)
- **Daily Prompt:** One reflective question per day

### 6. Interactions
- React to thoughts → Signals captured
- Respond to prompt → Track engagement & depth
- Explore alignment → See shared traits
- Send thought prompt → Context-based message
- **Chat unlocks after meaningful mutual interaction**

### 7. Identity Reveal (Optional)
- User controls when to reveal name/photo/social
- No forced reveal

## Core Principles

### No Dating App Vibes
- ❌ No swiping
- ❌ No profile photos initially
- ❌ No "match" language
- ❌ No follower counts
- ✅ Depth-first conversation
- ✅ Complementary matching (not just similarity)

### Anonymous-First
- All users start anonymous
- Identity revelation is optional and controlled
- Behavioral signals tracked silently
- Pseudonyms enable honest thinking

### Intelligent Matching
The matching algorithm considers:
- **Trait Similarity (40%)** - How similarly do you think?
- **Complementary Traits (35%)** - What can you learn from each other?
- **Behavioral Patterns (25%)** - Do you engage similarly?

**Key Feature:** Perfect matches are avoided (capped at 90% similarity) to encourage growth.

## Mind Mapping Traits

The algorithm calculates 8 core thinking traits:

1. **Curiosity** - Drive to explore and understand
2. **Creativity** - Ability to generate novel ideas
3. **Structure** - Preference for order and systems
4. **Risk Tolerance** - Comfort with uncertainty
5. **Social Energy** - Preference for interaction
6. **Empathy** - Understanding others' perspectives
7. **Analytical** - Logical, detail-oriented thinking
8. **Intuitive** - Pattern recognition, gut feelings

## Behavioral Intelligence

ThinkIn silently tracks:
- **Response Time** - How quickly users engage
- **Depth Score** - Length and quality of responses
- **Completion Rate** - Consistency with daily prompts
- **Reaction Patterns** - Which reactions user tends to give
- **Interaction Frequency** - Engagement patterns

This data refines alignments over time.

## Documentation

Comprehensive documentation is in the `docs/` folder:

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System design & folder structure
- [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Complete data model
- [MATCHING_ALGORITHM.md](docs/MATCHING_ALGORITHM.md) - Alignment calculation logic
- [STATE_FLOW.md](docs/STATE_FLOW.md) - State management & data flow
- [COMPONENT_BREAKDOWN.md](docs/COMPONENT_BREAKDOWN.md) - UI components guide

## Development

### Code Style

```typescript
// Use TypeScript everywhere
// Import types explicitly
import type { User, ThoughtSpark } from '@/types';

// Use Zustand stores for state
import { useUserStore } from '@/store';

// Import design tokens
import { colors, spacing, typography } from '@/styles/theme';

// Services handle business logic
import { matchingService } from '@/services';
```

### Adding a Screen

1. Create file in `src/screens/`
2. Import components from `@/components`
3. Use theme tokens from `@/styles/theme`
4. Use stores from `@/store` for state
5. Call services for backend operations

### Adding a Component

1. Create file in `src/components/`
2. Use `StyleSheet.create()` for styling
3. Import theme tokens
4. Export from `src/components/index.ts`
5. Use in screens

### Running Tests

```bash
npm run test
```

## Deployment

### Firebase Setup

```bash
# Initialize Firebase
npm install firebase

# Add credentials to .env.local
EXPO_PUBLIC_FIREBASE_API_KEY=xxx
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
# ... other configs
```

### Build for Production

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Both
eas build
```

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Project: [GitHub](https://github.com/mdmunna05/ThinkIn)
- Email: hello@thinkin.app (when live)

## Roadmap

### Phase 1 (MVP)
- [x] Project structure
- [ ] Authentication (anonymous + email)
- [ ] Mind mapping questionnaire
- [ ] Trait calculation
- [ ] Home feed (thought sparks)
- [ ] Basic matching algorithm
- [ ] Reaction system

### Phase 2
- [ ] Daily prompts
- [ ] Thought prompts (context-based messaging)
- [ ] Identity reveal feature
- [ ] Behavioral tracking refinement
- [ ] Admin panel for prompts

### Phase 3
- [ ] Chat unlocking logic
- [ ] Conversation system
- [ ] Algorithm refinement based on feedback
- [ ] User analytics
- [ ] Moderation tools

### Phase 4+
- [ ] Groups & communities
- [ ] Content discovery (longer essays, ideas)
- [ ] Integration with learning platforms
- [ ] Mobile app optimizations
- [ ] Expand to universities and companies

## Special Thanks

Built with ❤️ for thinkers who want to connect meaningfully.

---

**ThinkIn:** Where connections form through clarity of thought, not clarity of photos.
