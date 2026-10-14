import { TypingArena } from './components/TypingArena';

const sampleSnippet = `const syntaxSprint = () => {\n  return "Speed & Precision";\n};`;

export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1>SyntaxSprint Arena</h1>
      <TypingArena 
        codeSnippet={sampleSnippet} 
        onTestComplete={(res) => console.log('Test Finished:', res)} 
      />
    </div>
  );
}