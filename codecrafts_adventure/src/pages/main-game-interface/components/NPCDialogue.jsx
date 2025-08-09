import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NPCDialogue = ({
  npc = null,
  isOpen = false,
  onClose = () => {},
  onQuestAccept = () => {},
  onQuestDecline = () => {}
}) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const dialogueLines = npc?.dialogue ? npc?.dialogue?.split('\n') : [];

  useEffect(() => {
    if (isOpen && dialogueLines?.length > 0) {
      setCurrentDialogueIndex(0);
      setDisplayedText('');
      typeText(dialogueLines?.[0]);
    }
  }, [isOpen, npc]);

  const typeText = (text) => {
    setIsTyping(true);
    setDisplayedText('');
    
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < text?.length) {
        setDisplayedText(prev => prev + text?.[index]);
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  };

  const handleNext = () => {
    if (isTyping) {
      // Skip typing animation
      setIsTyping(false);
      setDisplayedText(dialogueLines?.[currentDialogueIndex]);
      return;
    }

    if (currentDialogueIndex < dialogueLines?.length - 1) {
      const nextIndex = currentDialogueIndex + 1;
      setCurrentDialogueIndex(nextIndex);
      typeText(dialogueLines?.[nextIndex]);
    }
  };

  const handleClose = () => {
    setCurrentDialogueIndex(0);
    setDisplayedText('');
    setIsTyping(false);
    onClose();
  };

  if (!isOpen || !npc) return null;

  const isLastDialogue = currentDialogueIndex >= dialogueLines?.length - 1;
  const hasQuest = npc?.questGiver && npc?.quest;

  return (
    <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-sm retro-shadow max-w-2xl w-full">
        
        {/* NPC Header */}
        <div className="flex items-center space-x-4 p-6 border-b border-border bg-muted/20">
          <div className="w-16 h-16 bg-accent rounded-sm flex items-center justify-center">
            <Icon name="User" size={32} color="var(--color-accent-foreground)" />
          </div>
          <div className="flex-1">
            <h2 className="font-pixel text-pixel-sm text-foreground">{npc?.name}</h2>
            <p className="text-sm text-muted-foreground">{npc?.title || 'Helpful NPC'}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Dialogue Content */}
        <div className="p-6">
          <div className="bg-muted/20 border border-border rounded-sm p-4 mb-6 min-h-32">
            <p className="text-foreground leading-relaxed font-mono text-sm">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-5 bg-accent ml-1 animate-pulse" />
              )}
            </p>
          </div>

          {/* Quest Information */}
          {hasQuest && isLastDialogue && !isTyping && (
            <div className="bg-primary/10 border border-primary/20 rounded-sm p-4 mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Scroll" size={20} color="var(--color-primary)" />
                <h3 className="font-pixel text-pixel-xs text-primary">New Quest Available</h3>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">{npc?.quest?.title}</h4>
                <p className="text-sm text-muted-foreground">{npc?.quest?.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={12} color="var(--color-accent)" />
                    <span className="text-accent">{npc?.quest?.xpReward} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{npc?.quest?.timeEstimate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Target" size={12} />
                    <span className="capitalize">{npc?.quest?.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="MessageSquare" size={14} />
              <span>
                {currentDialogueIndex + 1} of {dialogueLines?.length}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Quest Actions */}
              {hasQuest && isLastDialogue && !isTyping && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onQuestDecline(npc?.quest);
                      handleClose();
                    }}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      onQuestAccept(npc?.quest);
                      handleClose();
                    }}
                    iconName="CheckCircle"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Accept Quest
                  </Button>
                </>
              )}

              {/* Continue/Close Buttons */}
              {!hasQuest || !isLastDialogue || isTyping ? (
                <>
                  {!isLastDialogue ? (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleNext}
                      iconName={isTyping ? "FastForward" : "ArrowRight"}
                      iconPosition="right"
                      iconSize={14}
                    >
                      {isTyping ? 'Skip' : 'Continue'}
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleClose}
                      iconName="X"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Close
                    </Button>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="px-6 py-3 border-t border-border bg-muted/10 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Press Space or Enter to continue</span>
            <span>Press Escape to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPCDialogue;