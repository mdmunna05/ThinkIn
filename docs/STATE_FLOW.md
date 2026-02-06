# ThinkIn State Flow

## Overview

ThinkIn uses **Zustand** for state management with two primary stores:
1. **userStore** - User identity, profile, mind snapshot
2. **homeStore** - Feed content, alignments, prompts

## User Store Flow

```
Initial State
  ├─ currentUser: null
  ├─ isLoading: false
  └─ (empty)

User Launch
  │
  └─→ [authService.createAnonymousUser()]
      │
      └─→ setCurrentUser(newUser)
          └─ currentUser = {
              id, anonymousId, displayName, 
              avatarType, mindSnapshot, ...
            }

User Completes Onboarding
  │
  └─→ [mindMapService.calculateMindSnapshot()]
      │
      └─→ updateMindSnapshot(snapshot)
          └─ currentUser.mindSnapshot = {
              traits: {...}, generatedAt, version
            }

User Reveals Identity
  │
  └─→ updateUser({ revealedIdentity: {...} })
      └─ currentUser.revealedIdentity = {
          realName, photoUrl, socialLinks
        }
```

## Home Store Flow

```
Initial State
  ├─ thoughtSparks: []
  ├─ alignments: []
  ├─ dailyPrompt: null
  └─ isLoadingThoughts: false

Home Screen Loads
  │
  ├─→ [feedService.getThoughtSparks()]
  │   │
  │   └─→ setThoughtSparks(sparks)
  │       └─ thoughtSparks = [
  │           { id, userId, content, reactions, ... },
  │           ...
  │         ]
  │
  ├─→ [matchingService.findAlignedMinds()]
  │   │
  │   └─→ setAlignments(alignments)
  │       └─ alignments = [
  │           { userId, alignedUserId, score, traits, ... },
  │           ...
  │         ]
  │
  └─→ [feedService.getDailyPrompt()]
      │
      └─→ setDailyPrompt(prompt)
          └─ dailyPrompt = {
              id, date, question, category
            }

User Reacts to Thought
  │
  ├─→ [feedService.reactToThought(userId, thoughtId, type)]
  │   │   (Updates backend)
  │   │
  │   └─→ [recordBehavioralSignal()]
  │       (Tracks response time, pattern)
  │
  └─→ setThoughtSparks(updated)
      └─ thoughtSparks[i].reactions.relate++

User Responds to Daily Prompt
  │
  ├─→ [feedService.respondToPrompt(userId, promptId, response)]
  │   │   (Updates backend)
  │   │
  │   └─→ [recordBehavioralSignal()]
  │       (Tracks depth, completion rate)
  │
  └─→ setDailyPrompt(null)
      └─ Hide prompt until tomorrow
```

## Behavioral Tracking (Silent)

```
User Interaction
  │
  └─→ [recordBehavioralSignal(userId, type, data)]
      │
      ├─ Measure response_time = now() - action_start
      ├─ Measure depth = analyze(content)
      ├─ Track completion_rate
      ├─ Count reactions by type
      │
      └─→ Update userBehavior document
          └─ behavior = {
              responseTime, depthScore, 
              promptCompletionRate, 
              reactionPatterns
            }
```

## Data Synchronization

```
Backend (Firebase/Supabase)
      ↑
      │ (read)    (write)
      │ ←─────────→
      │
State Store (Zustand)
      ↑
      │ (subscribe)
      │ ←─────────→
      │
React Components
```

**Pattern:**
1. Component calls service method
2. Service calls backend API
3. Service updates store
4. Component re-renders from store subscription

## Error Handling Flow

```
Service Call
  │
  ├─ Success
  │  └─ updateStore()
  │     └─ Component re-renders
  │
  └─ Error
     ├─ Log error
     ├─ Show toast/alert to user
     └─ Keep previous state
        (UI doesn't break)
```

## Persistence

```
On App Launch
  │
  ├─→ [authService.restoreSession()]
  │   │
  │   └─ Fetch user from backend
  │
  └─→ setCurrentUser(restoredUser)
      └─ Load previous state

On App Pause
  │
  └─→ Auto-save to backend
      (handled by backend SDK)
```

## State Relationships

```
currentUser (userStore)
    ↓
    ├─ ID references userBehavior
    ├─ ID references thoughtSparks authored
    ├─ ID references userReactions
    └─ ID references alignments

alignments (homeStore)
    ↓
    ├─ Reference aligned users' mindSnapshots
    └─ Reference shared/complementary traits

thoughtSparks (homeStore)
    ↓
    └─ Reference reactions & userBehavior patterns
```

## Performance Optimizations

```
1. Pagination
   thoughtSparks: Fetch 10 at a time, infinite scroll

2. Caching
   dailyPrompt: Cache for 24 hours
   alignments: Cache for 1 hour
   
3. Lazy Loading
   User profile: Only load when tapped
   Conversation history: Load on demand
   
4. Debouncing
   Search: Debounce 500ms
   Reaction tracking: Batch signals every 10s
```

## State Example: Complete Flow

```typescript
// 1. App starts
const { currentUser } = useUserStore();
// currentUser = null

// 2. User creates account
const user = await authService.createAnonymousUser();
setCurrentUser(user);
// currentUser = { id, anonymousId, displayName, ... }

// 3. User completes mind mapping
const answers = [{ questionId: 'q1', answer: 'option1' }, ...];
const snapshot = await mindMapService.calculateMindSnapshot(answers);
updateMindSnapshot(snapshot);
// currentUser.mindSnapshot = { traits: {...}, version: 1 }

// 4. Home screen loads
const sparks = await feedService.getThoughtSparks(currentUser.id);
setThoughtSparks(sparks);
// thoughtSparks = [{ id, content, reactions }, ...]

const alignments = await matchingService.findAlignedMinds(currentUser.id);
setAlignments(alignments);
// alignments = [{ userId, alignedUserId, score }, ...]

// 5. User reacts to thought
await feedService.reactToThought(currentUser.id, sparkId, 'relate');
// Backend updates thoughtSparks[i].reactions.relate++
// recordBehavioralSignal() tracks response time

// 6. Updated state auto-syncs
const { thoughtSparks } = useHomeStore();
// UI re-renders with updated reaction count
```

## Testing State Changes

```typescript
// In test file
import { useUserStore, useHomeStore } from '@/store';

test('user setup flow', async () => {
  // Initial state
  expect(useUserStore.getState().currentUser).toBeNull();
  
  // Create user
  const user = await authService.createAnonymousUser();
  useUserStore.getState().setCurrentUser(user);
  
  // Verify state
  expect(useUserStore.getState().currentUser?.id).toBeDefined();
  expect(useUserStore.getState().currentUser?.isAnonymous).toBe(true);
});
```
