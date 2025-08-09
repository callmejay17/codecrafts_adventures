import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeEditor = ({
  initialCode = '',
  onCodeChange = () => {},
  onRunCode = () => {},
  onResetCode = () => {},
  currentQuest = null,
  isRunning = false,
  hasError = false
}) => {
  const [code, setCode] = useState(initialCode);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    const lines = code?.split('\n')?.length;
    setLineCount(lines);
    onCodeChange(code);
  }, [code, onCodeChange]);

  const handleCodeChange = (e) => {
    setCode(e?.target?.value);
  };

  const handleRunCode = () => {
    onRunCode(code);
  };

  const handleResetCode = () => {
    setCode(initialCode);
    onResetCode();
  };

  const getLineNumbers = () => {
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  };

  return (
    <div className="h-full flex flex-col bg-card border border-border">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/20">
        <div className="flex items-center space-x-2">
          <Icon name="Code" size={18} color="var(--color-accent)" />
          <span className="font-pixel text-pixel-xs text-accent">Code Editor</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetCode}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={14}
          >
            Reset
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={handleRunCode}
            loading={isRunning}
            iconName="Play"
            iconPosition="left"
            iconSize={14}
            className={hasError ? 'border-error' : ''}
          >
            Run Code
          </Button>
        </div>
      </div>
      {/* Quest Instructions */}
      {currentQuest && (
        <div className="p-4 border-b border-border bg-muted/10">
          <div className="flex items-start space-x-3">
            <Icon name="BookOpen" size={16} color="var(--color-primary)" className="mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-pixel text-pixel-xs text-primary mb-2">{currentQuest?.title}</h3>
              <p className="text-sm text-foreground mb-3">{currentQuest?.description}</p>
              
              {/* Quest Requirements */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Requirements:</h4>
                <ul className="space-y-1">
                  {currentQuest?.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Icon name="ArrowRight" size={12} color="var(--color-muted-foreground)" className="mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hints */}
              {currentQuest?.hints && currentQuest?.hints?.length > 0 && (
                <div className="mt-3 p-2 bg-accent/10 border border-accent/20 rounded-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Lightbulb" size={14} color="var(--color-accent)" />
                    <span className="text-xs font-medium text-accent">Hint</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{currentQuest?.hints?.[0]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Code Editor Area */}
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="w-12 bg-muted/20 border-r border-border p-2 text-right">
          {getLineNumbers()?.map((lineNum) => (
            <div
              key={lineNum}
              className="text-xs text-muted-foreground font-mono leading-6 h-6"
            >
              {lineNum}
            </div>
          ))}
        </div>

        {/* Code Input */}
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className={`w-full h-full p-3 bg-input text-foreground font-mono text-sm leading-6 resize-none focus:outline-none focus:ring-2 focus:ring-ring ${
              hasError ? 'border-l-4 border-error' : ''
            }`}
            placeholder={currentQuest?.starterCode || `// Welcome to CodeCrafts Adventure!\n// Write your code here...\n\nfunction solve() {\n    // Your solution goes here\n    return "Hello, World!";\n}`}
            spellCheck={false}
            style={{
              fontFamily: 'JetBrains Mono, Roboto Mono, monospace',
              tabSize: 2
            }}
          />

          {/* Syntax Error Indicator */}
          {hasError && (
            <div className="absolute top-2 right-2 bg-error text-error-foreground px-2 py-1 rounded-sm text-xs flex items-center space-x-1">
              <Icon name="AlertTriangle" size={12} />
              <span>Syntax Error</span>
            </div>
          )}
        </div>
      </div>
      {/* Editor Footer */}
      <div className="flex items-center justify-between p-2 border-t border-border bg-muted/10 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Lines: {lineCount}</span>
          <span>Characters: {code?.length}</span>
          <span>Language: JavaScript</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Keyboard" size={12} />
          <span>Ctrl+Enter to run</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;