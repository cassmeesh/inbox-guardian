import { useCallback } from 'react';

export function useSound() {
  const playDing = useCallback(() => {
    const audio = new Audio('/ding.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, []);

  return { playDing };
}
