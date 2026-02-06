# ThinkIn Matching Algorithm

## Overview

The matching algorithm calculates alignment scores between users based on:
1. **Trait Similarity** (40%)
2. **Complementary Traits** (35%)
3. **Behavioral Compatibility** (25%)

Key principle: **Avoid 100% matches** to encourage diversity and growth.

## Algorithm Details

### 1. Trait Similarity Calculation

**Purpose:** Find users with similar thinking patterns.

**Formula:**
```
similarity = 100 - (average_trait_difference)
capped_similarity = min(90, similarity)  // Never 100%
```

**Example:**
```
User A traits: {curiosity: 80, creativity: 70, structure: 40}
User B traits: {curiosity: 75, creativity: 65, structure: 35}

Differences: [5, 5, 5]
Average diff: 5
Similarity: 100 - 5 = 95
Capped: min(90, 95) = 90
```

**Code:**
```typescript
calculateTraitSimilarity(userTraits, candidateTraits) {
  let totalDifference = 0;
  const traitCount = Object.keys(userTraits).length;

  Object.keys(userTraits).forEach((trait) => {
    const diff = Math.abs(userTraits[trait] - candidateTraits[trait]);
    totalDifference += diff;
  });

  const averageDifference = totalDifference / traitCount;
  const similarity = 100 - averageDifference;
  return Math.max(0, Math.min(90, similarity));
}
```

### 2. Complementary Traits Detection

**Purpose:** Find people whose strengths complement your weaknesses.

**Trait Pairs:**
- `structure` ↔ `creativity`
- `analytical` ↔ `intuitive`
- `socialEnergy` ↔ `introspection`
- `riskTolerance` ↔ `cautiousness`

**Detection Logic:**
```
For each pair (trait1, trait2):
  if user.trait1 > 60 
     AND candidate.trait2 > 60 
     AND abs(user.trait1 - candidate.trait1) > 30:
    → Add to complementary list
```

**Example:**
```
User A: {structure: 75, creativity: 30, analytical: 80, intuitive: 20}
User B: {structure: 20, creativity: 85, analytical: 30, intuitive: 90}

Complementary pairs found:
- structure (A:75) + creativity (B:85) ✓
- analytical (A:80) + intuitive (B:90) ✓
```

**Impact:** Each complementary pair adds 5 points to alignment score.

### 3. Behavioral Compatibility

**Purpose:** Ensure users will actually engage meaningfully.

**Factors:**
- Response time similarity
- Depth score similarity
- Engagement level match

**Formula:**
```
responseTimeScore = max(0, 100 - abs(userRT - candidateRT) / 100)
depthScore = max(0, 100 - abs(userDepth - candidateDepth))
engagementScore = (1 - abs(userEngagement - candidateEngagement)) * 100

compatibilityScore = (responseTimeScore + depthScore + engagementScore) / 3
```

**Interpretation:**
- Users who respond quickly paired with quick responders
- Deep thinkers paired with other deep thinkers
- Consistent engagers matched with consistent engagers

### 4. Final Alignment Score

**Formula:**
```
alignmentScore = 
  (traitSimilarity × 0.40) +
  (complementaryTraits.length × 5 × 0.35) +
  (behaviorScore × 0.25)

capped = min(100, alignmentScore)
```

**Example Calculation:**
```
traitSimilarity = 75
complementaryTraits = 2 (pair count)
behaviorScore = 80

Score = (75 × 0.40) + (2 × 5 × 0.35) + (80 × 0.25)
      = 30 + 3.5 + 20
      = 53.5
```

## Algorithm Properties

### Diversity-First

- Scores never hit 100 (similarity capped at 90)
- Complementary traits actively encouraged (35% weight)
- Behavioral mismatch not a dealbreaker

### Anti-Echo Chamber

```
Good match: {similarity: 75, complementary: 2, behavior: 80}
            → score: 53.5 (good growth potential)

Bad match:  {similarity: 100, complementary: 0, behavior: 50}
            → capped at 90, score only 32.5 (no growth)
```

### Behavioral Filtering

Users with vastly different engagement patterns won't be matched.

```
User A: Quick (50ms), shallow (0.2 depth), low engagement (0.3)
User B: Slow (2000ms), deep (0.9 depth), high engagement (0.9)

Response time diff: |50 - 2000| = 1950 → score: 0
Depth diff: |0.2 - 0.9| = 0.7 → score: 30
Engagement diff: |0.3 - 0.9| = 0.6 → score: 40

Behavior score = (0 + 30 + 40) / 3 = 23.3
Final score = (75 × 0.4) + (3.5 × 0.35) + (23.3 × 0.25)
            = 30 + 1.225 + 5.825 = 37 (below threshold)
```

## Minimum Alignment Score

Default threshold: **50**

Users below this score won't be shown as aligned minds.

## Recalculation Triggers

Alignment scores update when:
1. User completes mind mapping questions (new snapshot)
2. Behavioral signals reach significance threshold
3. New interaction recorded (thought reaction, prompt response)
4. Manual recalculation (daily cron)

## Pseudo-Code: Main Algorithm

```python
def calculate_alignment(user, candidate, user_behavior=None, 
                        candidate_behavior=None):
    # Trait similarity
    trait_sim = calculate_trait_similarity(
        user.mind_snapshot.traits,
        candidate.mind_snapshot.traits
    )
    
    # Complementary traits
    complementary = find_complementary_traits(
        user.mind_snapshot.traits,
        candidate.mind_snapshot.traits
    )
    
    # Behavior compatibility
    behavior_score = 50  # neutral default
    if user_behavior and candidate_behavior:
        behavior_score = calculate_behavior_compatibility(
            user_behavior,
            candidate_behavior
        )
    
    # Final calculation
    alignment_score = min(100, 
        trait_sim * 0.40 +
        len(complementary) * 5 * 0.35 +
        behavior_score * 0.25
    )
    
    return {
        user_id: user.id,
        aligned_user_id: candidate.id,
        alignment_score: alignment_score,
        shared_traits: find_similar_traits(user, candidate),
        complementary_traits: complementary,
        created_at: now()
    }


def find_top_alignments(user_id, limit=3):
    all_candidates = fetch_all_users(exclude=user_id)
    
    alignments = []
    for candidate in all_candidates:
        alignment = calculate_alignment(
            user=fetch_user(user_id),
            candidate=candidate,
            user_behavior=fetch_behavior(user_id),
            candidate_behavior=fetch_behavior(candidate.id)
        )
        
        if alignment.score >= MIN_THRESHOLD:
            alignments.append(alignment)
    
    return sorted(alignments, 
                  key=lambda x: x.alignment_score, 
                  reverse=True)[:limit]
```

## Testing Strategy

**Test Cases:**
1. Perfect match avoidance → Should cap at 90
2. Complementary high score → Should boost score 15%+
3. Behavioral mismatch → Should lower score significantly
4. Mixed signals → Should balance all factors

**Example Test:**
```
User A (highly curious, deep, consistent)
User B (highly curious, deep, consistent)

Expected: ~53 (similar + behavior good, but similarity capped)
```

## Future Enhancements

1. **Temporal decay:** Recent interactions weighted higher
2. **Feedback loop:** Adjust weights based on interaction outcome
3. **Clustering:** Find groups of 3+ aligned minds
4. **Anti-preference:** Avoid re-matching archived pairs
5. **Context-aware:** Different matching for different interaction types
