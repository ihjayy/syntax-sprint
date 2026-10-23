import React from 'react';
import Header from '../components/common/Header';
import SpeedGuage from '../components/hud/SpeedGauge';
import AccuracyCard from '../components/hud/AccuracyCard';
import StreakMultiplier from '../components/hud/StreakMultiplier';
import CodeEditor from '../components/editor/CodeEditor';
import { useTypingEngine } from '../hooks/useTypingEngine';
import './SprintArena.css';

export const SprintArena: React.FC = () => {
    const { charState, currentIndex, stats, resetTest, handleKeyDown } = useTypingEngine({
        snippet: 'import React from 'react';\n\nexport const SyntaxSprint = () => {\n  return <div>Accelerate Your Code</div>;\n};',
        language: 'typescript'
    });

    return (
        <div className="arena-container" tabIndex={0} onKeyDown={handleKeyDown}>
            <Header />
            <main className="arena-grid">
                <section className="hud-column">
                    <SpeedGuage wpm={stats.wpm} peakWpm={110} streak={9} />
                    <AccuracyCard accuracy={stats.accuracy} errors={stats.errors} keystrokes={stats.totalTyped} />
                    <StreakMultiplier progress={84} multiplier="3x" />                  
                </section>

                <section className="editor-column">
                    <CodeEditor charStates={charState} currentIndex={currentIndex} onRestart={resetTest} />
                </section>
            </main>
        </div>
    );
};

export default SprintArena;