

# Add Ding Sound for Correct Answers

## Overview
Add a satisfying "ding" sound effect that plays when the user makes a correct decision in the phishing simulation. No sound will play for incorrect answers.

## Implementation Approach

### Option: Use a Static Audio File
This is the simplest and most reliable approach. We'll add a small ding sound file to the public folder and create a simple audio utility to play it.

---

## Implementation Steps

### 1. Add a Ding Sound File
Create or download a simple, pleasant "ding" or "success" sound effect (MP3 format, ~1-2 seconds) and add it to the `public` folder as `ding.mp3`.

### 2. Create an Audio Utility Hook
Create a new hook `useSound` that provides a function to play the ding sound:

**File:** `src/hooks/useSound.ts`
- Creates an Audio object with the ding sound file
- Exposes a `playDing()` function that plays the sound
- Handles resetting playback position for rapid successive plays

### 3. Integrate Sound into FeedbackModal
Update the `FeedbackModal` component to play the ding sound when showing positive feedback:

**File:** `src/components/simulation/FeedbackModal.tsx`
- Import the `useSound` hook
- Call `playDing()` when the modal appears and `isPositive` is true
- Use `useEffect` to trigger the sound on mount

---

## Technical Details

### useSound Hook Structure
```typescript
// src/hooks/useSound.ts
export function useSound() {
  const playDing = useCallback(() => {
    const audio = new Audio('/ding.mp3');
    audio.volume = 0.5;  // Moderate volume
    audio.play().catch(() => {});  // Ignore autoplay errors
  }, []);
  
  return { playDing };
}
```

### FeedbackModal Integration
```typescript
// In FeedbackModal.tsx
const { playDing } = useSound();

useEffect(() => {
  if (isPositive) {
    playDing();
  }
}, [isPositive, playDing]);
```

---

## Files to Create/Modify
| File | Action |
|------|--------|
| `public/ding.mp3` | Create - Add sound file |
| `src/hooks/useSound.ts` | Create - Audio utility hook |
| `src/components/simulation/FeedbackModal.tsx` | Modify - Add sound trigger |

---

## Notes
- The sound will only play for correct actions (`isPositive: true`)
- Using Web Audio API via HTML5 Audio element for simplicity
- Volume set to 50% for a pleasant, non-jarring experience
- Errors are silently caught to handle browsers that block autoplay

