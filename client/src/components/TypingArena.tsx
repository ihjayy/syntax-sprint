import React, { useState, useEffect, useRef } from 'react';
import { tokenizeCode } from '../utils/tokenizer';
import { calculateMetrics } from '../utils/metrics';
import '../styles/TypingArena.css';

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
    <div className="arena-card">
      {/* Header Live Metrics */}
      <div className="stats-bar">
        <div className="stat-item">WPM: <span className="stat-value">{metrics.wpm}</span></div>
        <div className="stat-item">Accuracy: <span className="stat-value">{metrics.accuracy}%</span></div>
        <div className="stat-item">Time: <span className="stat-value">{elapsedSeconds}s</span></div>
      </div>

      {/* Hidden Focus Capturer */}
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        className="hidden-input"
        autoFocus
      />

      {/* Typing Container */}
      <div className="code-display" onClick={() => inputRef.current?.focus()}>
        {tokens.map((t, i) => {
          let statusClass = 'char-pending';
          if (i < input.length) {
            statusClass = input[i] === t.char ? 'char-correct' : 'char-incorrect';
          }
          const isCaret = i === input.length;

          return (
            <span
              key={i}
              className={`char ${statusClass} ${isCaret ? 'char-caret' : ''}`}
            >
              {t.char}
            </span>
          );
        })}
      </div>
    </div>
  );
};