# ThinkIn Database Schema

## Firestore/Supabase Collections

### 1. users

Stores user profiles and identity information.

```
collection: users
├── id: string (UUID)
├── anonymousId: string (UUID, immutable)
├── displayName: string
├── avatarType: 'geometric' | 'nature' | 'abstract' | 'symbol'
├── avatarIcon: string (e.g., 'circle', 'triangle', 'star')
├── isAnonymous: boolean
├── revealedIdentity: {
│   ├── realName: string
│   ├── photoUrl: string (optional)
│   └── socialLinks: {
│       ├── twitter: string (optional)
│       ├── instagram: string (optional)
│       └── linkedin: string (optional)
│   }
├── createdAt: timestamp
├── lastActive: timestamp
└── onboardingCompleted: boolean
```

### 2. mindSnapshots

Stores calculated trait profiles. Versioned for evolution tracking.

```
collection: mindSnapshots
├── id: string
├── userId: string (reference to users)
├── traits: {
│   ├── curiosity: number (0-100)
│   ├── creativity: number
│   ├── structure: number
│   ├── riskTolerance: number
│   ├── socialEnergy: number
│   ├── empathy: number
│   ├── analytical: number
│   └── intuitive: number
├── generatedAt: timestamp
├── version: number
└── questionVersion: number
```

### 3. mindMapQuestions

Pre-configured questions for onboarding.

```
collection: mindMapQuestions
├── id: string
├── order: number
├── question: string
├── type: 'opinion' | 'scenario' | 'ranking'
├── options: string[]
├── traitWeights: {
│   ├── curiosity: number (0-1)
│   ├── creativity: number
│   └── ... (other traits)
├── category: string
└── version: number
```

### 4. mindMapAnswers

User responses to mind mapping questions.

```
collection: mindMapAnswers
├── id: string
├── userId: string
├── questionId: string
├── answer: string | string[] | number
├── respondedAt: timestamp
└── questionVersion: number
```

### 5. thoughtSparks

Anonymous thoughts from users.

```
collection: thoughtSparks
├── id: string
├── userId: string (reference to users)
├── anonymousId: string
├── content: string (max 280 chars)
├── mindCategory: string (optional, e.g., 'curiosity', 'creativity')
├── reactions: {
│   ├── relate: number
│   ├── curious: number
│   └── disagree: number
├── createdAt: timestamp
└── isDaily: boolean
```

### 6. userReactions

Tracks user reactions to thoughts.

```
collection: userReactions
├── id: string
├── userId: string
├── thoughtId: string
├── reactionType: 'relate' | 'curious' | 'disagree'
└── createdAt: timestamp
```

### 7. dailyPrompts

One prompt per day for reflection.

```
collection: dailyPrompts
├── id: string
├── date: string (YYYY-MM-DD)
├── question: string
├── category: string
├── responseCount: number
└── createdAt: timestamp
```

### 8. dailyPromptResponses

User responses to daily prompts.

```
collection: dailyPromptResponses
├── id: string
├── userId: string
├── promptId: string
├── response: string
├── respondedAt: timestamp
├── characterCount: number
└── depth: number (0-1, calculated from response)
```

### 9. alignments

Pre-calculated alignments between users.

```
collection: alignments
├── id: string
├── userId: string
├── alignedUserId: string
├── alignmentScore: number (0-100)
├── sharedTraits: string[]
├── complementaryTraits: string[]
├── createdAt: timestamp
├── updatedAt: timestamp
├── interactionCount: number
└── status: 'active' | 'archived'
```

### 10. thoughtPrompts

Context-based interaction before unlock.

```
collection: thoughtPrompts
├── id: string
├── senderId: string
├── recipientId: string
├── content: string
├── context: string (reference to reaction/thought)
├── sentAt: timestamp
├── respondedAt: timestamp (optional)
└── response: string (optional)
```

### 11. conversations

Chat sessions (unlocked after meaningful interaction).

```
collection: conversations
├── id: string
├── userId1: string
├── userId2: string
├── unlockedAt: timestamp (null if not yet unlocked)
├── messages: [
│   ├── id: string
│   ├── senderId: string
│   ├── content: string
│   ├── sentAt: timestamp
│   └── readAt: timestamp (optional)
│ ]
├── lastMessageAt: timestamp
└── status: 'active' | 'archived'
```

### 12. userBehavior

Silently tracked behavioral signals.

```
collection: userBehavior
├── id: string
├── userId: string
├── responseTime: number (average ms)
├── depthScore: number (0-1)
├── promptCompletionRate: number (0-1)
├── reactionPatterns: {
│   ├── relate: number (frequency)
│   ├── curious: number
│   └── disagree: number
├── lastUpdated: timestamp
└── engagementLevel: 'low' | 'medium' | 'high'
```

## Indexes (Critical for Performance)

```
users: [lastActive DESC]
thoughtSparks: [createdAt DESC], [userId], [isDaily]
userReactions: [thoughtId, userId]
alignments: [userId, alignmentScore DESC]
conversations: [userId1], [userId2], [lastMessageAt DESC]
dailyPrompts: [date DESC]
```

## Access Patterns

```
Get user's mind snapshot:
  users/{userId}/mindSnapshots (latest)

Get user's thought sparks:
  thoughtSparks?userId=X&limit=50

Get today's prompt + responses:
  dailyPrompts?date=TODAY
  dailyPromptResponses?promptId=X

Get aligned minds for user:
  alignments?userId=X&limit=3&sort=alignmentScore

Get user behavior:
  userBehavior/{userId} (latest)
```

## Privacy Considerations

- Anonymous IDs remain constant for pseudonymity
- Actual names only stored if user reveals
- Thought sparks never reveal real identity initially
- Behavioral data is aggregated, not individual
- Conversations end-to-end concept (no server-side read)

## Retention Policy

- Active users: Keep all data
- Inactive 1 year: Archive conversations
- Delete on request: Purge all data except anonymized aggregates
