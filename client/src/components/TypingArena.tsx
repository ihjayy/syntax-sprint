import React, { useState, useEffect, useRef } from 'react';
import { tokenizeCode } from '../utils/tokenizer';
import { calculateMetrics } from '../utils/metrics';

interface TypingArenaProps {
  codeSnippet: string;
  onTestComplete?: (results: any) => void;
}

export const TypingArena: React.FC<TypingArenaProps> = ({ codeSnippet, onTestComplete }) => {
  const tokens = tokenizeCode(codeSnippet);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [keyMisses, setKeyMisses] = useState<Record<string, number>>({});
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let timer: any;
    if (startTime) {
      timer = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());

    // Key Miss Tracking logic
    if (val.length > input.length) {
      const newCharIndex = val.length - 1;
      const expected = tokens[newCharIndex]?.char;
      const typed = val[newCharIndex];

      if (expected && typed !== expected) {
        setKeyMisses((prev) => ({
          ...prev,
          [expected]: (prev[expected] || 0) + 1,
        }));
      }
    }

    setInput(val);

    if (val.length >= tokens.length && startTime) {
      const finalTime = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      let correctCount = 0;
      tokens.forEach((t, i) => {
        if (val[i] === t.char) correctCount++;
      });

      const metrics = calculateMetrics(val.length, correctCount, finalTime);
      if (onTestComplete) {
        onTestComplete({ ...metrics, keyMisses, timeSeconds: finalTime });
      }
    }
  };

  const metrics = calculateMetrics(
    input.length,
    tokens.filter((t, i) => input[i] === t.char).length,
    elapsedSeconds
  );

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px', background: '#1e1e1e', color: '#fff', borderRadius: '8px' }}>
      {/* Header Stats */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '18px' }}>
        <div>WPM: <strong>{metrics.wpm}</strong></div>
        <div>Accuracy: <strong>{metrics.accuracy}%</strong></div>
        <div>Time: <strong>{elapsedSeconds}s</strong></div>
      </div>

      {/* Invisible Focus Capturer */}
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        autoFocus
      />

      {/* Typing Container */}
      <div 
        onClick={() => inputRef.current?.focus()} 
        style={{ cursor: 'text', lineHeight: '1.6', fontSize: '18px', whiteSpace: 'pre-wrap' }}
      >
        {tokens.map((t, i) => {
          let color = '#666'; // pending
          if (i < input.length) {
            color = input[i] === t.char ? '#4caf50' : '#f44336'; // correct vs incorrect
          }
          const isCaret = i === input.length;

          return (
            <span
              key={i}
              style={{
                color,
                borderLeft: isCaret ? '2px solid #00bcd4' : 'none',
                backgroundColor: i < input.length && input[i] !== t.char ? 'rgba(244, 67, 54, 0.2)' : 'transparent',
              }}
            >
              {t.char}
            </span>
          );
        })}
      </div>
    </div>
  );
};