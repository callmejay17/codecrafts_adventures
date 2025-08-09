import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConsoleOutput = ({
  output = [],
  isExpanded = false,
  onToggleExpanded = () => {},
  isRunning = false,
  onClearConsole = () => {}
}) => {
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && output?.length > 0) {
      const consoleElement = document.getElementById('console-output');
      if (consoleElement) {
        consoleElement.scrollTop = consoleElement?.scrollHeight;
      }
    }
  }, [output, autoScroll]);

  const getOutputIcon = (type) => {
    switch (type) {
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      default: return 'Terminal';
    }
  };

  const getOutputColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'info': return 'text-primary';
      default: return 'text-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`bg-card border-t border-border game-transition ${
      isExpanded ? 'h-64' : 'h-12'
    }`}>
      {/* Console Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/20">
        <div className="flex items-center space-x-2">
          <Icon name="Terminal" size={16} color="var(--color-accent)" />
          <span className="font-pixel text-pixel-xs text-accent">Console</span>
          {output?.length > 0 && (
            <span className="text-xs text-muted-foreground">({output?.length})</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Auto-scroll toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoScroll(!autoScroll)}
            iconName={autoScroll ? "ArrowDown" : "ArrowDownToLine"}
            iconSize={14}
            className={autoScroll ? 'text-accent' : 'text-muted-foreground'}
          />
          
          {/* Clear console */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearConsole}
            iconName="Trash2"
            iconSize={14}
            disabled={output?.length === 0}
          />
          
          {/* Expand/Collapse */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            iconName={isExpanded ? "ChevronDown" : "ChevronUp"}
            iconSize={16}
          />
        </div>
      </div>
      {/* Console Output */}
      {isExpanded && (
        <div 
          id="console-output"
          className="flex-1 overflow-y-auto p-3 bg-input font-mono text-sm"
          style={{ maxHeight: '200px' }}
        >
          {output?.length === 0 && !isRunning ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Icon name="Terminal" size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Console output will appear here</p>
                <p className="text-xs mt-1">Run your code to see results</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Running indicator */}
              {isRunning && (
                <div className="flex items-center space-x-2 text-primary animate-pulse">
                  <Icon name="Loader2" size={14} className="animate-spin" />
                  <span className="text-sm">Running code...</span>
                </div>
              )}
              
              {/* Output entries */}
              {output?.map((entry, index) => (
                <div key={index} className="flex items-start space-x-2 py-1">
                  <span className="text-xs text-muted-foreground font-sans mt-1 flex-shrink-0">
                    {formatTimestamp(entry?.timestamp)}
                  </span>
                  <Icon 
                    name={getOutputIcon(entry?.type)} 
                    size={14} 
                    className={`${getOutputColor(entry?.type)} mt-0.5 flex-shrink-0`} 
                  />
                  <div className="flex-1 min-w-0">
                    <pre className={`text-sm ${getOutputColor(entry?.type)} whitespace-pre-wrap break-words`}>
                      {entry?.message}
                    </pre>
                    {entry?.details && (
                      <pre className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap break-words">
                        {entry?.details}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Collapsed Preview */}
      {!isExpanded && output?.length > 0 && (
        <div className="px-3 py-2 text-sm text-muted-foreground truncate">
          {output?.[output?.length - 1]?.message || 'Console output available'}
        </div>
      )}
    </div>
  );
};

export default ConsoleOutput;