export interface TypingMetrics {
  wpm: number;
  rawWpm: number;
  accuracy: number;
}

export function calculateMetrics(
  typedCount: number,
  correctCount: number,
  timeInSeconds: number
): TypingMetrics {
  if (timeInSeconds <= 0 || typedCount <= 0) {
    return { wpm: 0, rawWpm: 0, accuracy: 100 };
  }

  const timeInMinutes = timeInSeconds / 60;
  
  // Standard WPM formula: 5 chars = 1 word
  const rawWpm = Math.round((typedCount / 5) / timeInMinutes);
  const netWpm = Math.max(0, Math.round((correctCount / 5) / timeInMinutes));
  const accuracy = Math.round((correctCount / typedCount) * 100);

  return {
    wpm: netWpm,
    rawWpm,
    accuracy: isNaN(accuracy) ? 100 : accuracy,
  };
}