import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBlockProps {
  code: string;
  language: string;
  theme?: 'light' | 'dark';
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, theme = 'light' }) => {
  return (
    <div className="my-6 overflow-hidden rounded-lg">
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {language.toUpperCase()}
        </span>
        <button 
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          onClick={() => {
            navigator.clipboard.writeText(code);
          }}
        >
          Copy
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === 'light' ? atomOneLight : atomOneDark}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          borderRadius: '0 0 0.5rem 0.5rem',
          fontSize: '0.9rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;