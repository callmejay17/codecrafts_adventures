import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HintModal = ({
  isOpen = false,
  onClose = () => {},
  currentQuest = null,
  hintsUsed = 0,
  maxHints = 3,
  onUseHint = () => {}
}) => {
  const [selectedHintIndex, setSelectedHintIndex] = useState(0);

  const questHints = currentQuest?.hints || [
    "Start by understanding what the problem is asking for",
    "Break down the problem into smaller, manageable steps",
    "Consider what data structures or algorithms might be helpful",
    "Test your solution with simple examples first"
  ];

  const generalHints = [
    {
      title: "Debugging Tips",
      content: `• Check the console for error messages\n• Use console.log() to track variable values\n• Verify your syntax and bracket matching\n• Make sure variable names are spelled correctly`
    },
    {
      title: "Algorithm Approach",
      content: `• Read the problem statement carefully\n• Identify the input and expected output\n• Think about edge cases\n• Start with a simple solution, then optimize`
    },
    {
      title: "Code Structure",
      content: `• Use meaningful variable names\n• Break complex logic into smaller functions\n• Add comments to explain your thinking\n• Follow consistent indentation`
    }
  ];

  const handleUseHint = () => {
    if (hintsUsed < maxHints) {
      onUseHint(questHints?.[selectedHintIndex]);
      onClose();
    }
  };

  if (!isOpen) return null;

  const canUseHint = hintsUsed < maxHints;
  const remainingHints = maxHints - hintsUsed;

  return (
    <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-sm retro-shadow max-w-2xl w-full max-h-[80vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
          <div className="flex items-center space-x-3">
            <Icon name="Lightbulb" size={24} color="var(--color-accent)" />
            <div>
              <h2 className="font-pixel text-pixel-sm text-foreground">Quest Hints</h2>
              <p className="text-sm text-muted-foreground">
                {remainingHints} hint{remainingHints !== 1 ? 's' : ''} remaining
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="overflow-y-auto max-h-96">
          {/* Quest-Specific Hints */}
          {currentQuest && (
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Target" size={18} color="var(--color-primary)" />
                <h3 className="font-pixel text-pixel-xs text-primary">
                  {currentQuest?.title} - Hints
                </h3>
              </div>

              <div className="space-y-3">
                {questHints?.map((hint, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-sm border cursor-pointer game-transition ${
                      selectedHintIndex === index
                        ? 'border-accent bg-accent/10' :'border-border bg-muted/20 hover:bg-muted/40'
                    }`}
                    onClick={() => setSelectedHintIndex(index)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        selectedHintIndex === index
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <p className="text-sm text-foreground flex-1">{hint}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hint Usage Warning */}
              {!canUseHint && (
                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                    <span className="text-sm text-warning font-medium">
                      No hints remaining for this session
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* General Hints */}
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="BookOpen" size={18} color="var(--color-secondary)" />
              <h3 className="font-pixel text-pixel-xs text-secondary">General Coding Tips</h3>
            </div>

            <div className="space-y-4">
              {generalHints?.map((hint, index) => (
                <div key={index} className="p-4 bg-muted/20 border border-border rounded-sm">
                  <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                    <Icon name="Info" size={14} color="var(--color-primary)" />
                    <span>{hint?.title}</span>
                  </h4>
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                    {hint?.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Hints help you learn, but try solving on your own first!</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            
            {currentQuest && (
              <Button
                variant="default"
                onClick={handleUseHint}
                disabled={!canUseHint}
                iconName="Lightbulb"
                iconPosition="left"
                iconSize={14}
              >
                Use Hint ({remainingHints} left)
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HintModal;