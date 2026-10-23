import { TypingArena } from './components/TypingArena';

const sampleSnippet = `const syntaxSprint = () => {\n  return "Speed & Precision";\n};`;

export default function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">SyntaxSprint Arena</h1>
      <TypingArena 
        codeSnippet={sampleSnippet} 
        onTestComplete={(res) => console.log('Test Finished:', res)} 
      />
    </div>
  );
}