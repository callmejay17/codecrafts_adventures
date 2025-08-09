import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestDetails = ({ 
  selectedQuest, 
  onStartQuest = () => {},
  onCloseDetails = () => {} 
}) => {
  if (!selectedQuest) {
    return (
      <div className="h-full bg-card border-l border-border flex flex-col items-center justify-center p-8 text-center">
        <Icon name="Map" size={64} color="var(--color-muted-foreground)" className="mb-4 opacity-50" />
        <h3 className="font-pixel text-pixel-sm text-muted-foreground mb-2">No Quest Selected</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Click on a quest node in the map to view its details and requirements.
        </p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success border-success bg-success/10';
      case 'intermediate': return 'text-warning border-warning bg-warning/10';
      case 'advanced': return 'text-error border-error bg-error/10';
      case 'expert': return 'text-accent border-accent bg-accent/10';
      default: return 'text-muted-foreground border-muted bg-muted/10';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Leaf';
      case 'intermediate': return 'Flame';
      case 'advanced': return 'Sword';
      case 'expert': return 'Crown';
      default: return 'Circle';
    }
  };

  const getStatusInfo = (quest) => {
    if (quest?.locked) return { text: 'Locked', color: 'text-muted-foreground', icon: 'Lock' };
    if (quest?.completed) return { text: 'Completed', color: 'text-success', icon: 'Check' };
    if (quest?.inProgress) return { text: 'In Progress', color: 'text-warning', icon: 'Play' };
    return { text: 'Available', color: 'text-primary', icon: 'Circle' };
  };

  const statusInfo = getStatusInfo(selectedQuest);

  // Mock learning objectives and story context
  const learningObjectives = [
    `Master ${selectedQuest?.category?.replace('-', ' ')} concepts`,
    "Apply problem-solving strategies",
    "Write clean, efficient code",
    "Debug and test your solutions",
    "Understand time and space complexity"
  ];

  const storyContext = `Deep in the mystical realm of CodeCrafts, the ${selectedQuest?.title} awaits brave programmers willing to face its challenges. This quest will test your understanding of ${selectedQuest?.category?.replace('-', ' ')} while you navigate through enchanted algorithms and magical data structures.\n\nLegend speaks of great rewards for those who can solve the ancient coding puzzles that guard this domain. Are you ready to prove your programming prowess?`;

  const rewards = [
    { type: 'XP', amount: selectedQuest?.xpReward, icon: 'Zap', color: 'text-accent' },
    { type: 'Gold', amount: selectedQuest?.xpReward * 2, icon: 'Coins', color: 'text-warning' },
    { type: 'Skill Points', amount: Math.ceil(selectedQuest?.xpReward / 50), icon: 'Star', color: 'text-primary' }
  ];

  return (
    <div className="h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Icon 
                name={getDifficultyIcon(selectedQuest?.difficulty)} 
                size={20} 
                className={getDifficultyColor(selectedQuest?.difficulty)?.split(' ')?.[0]} 
              />
              <h2 className="font-pixel text-pixel-sm text-foreground">{selectedQuest?.title}</h2>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className={`flex items-center space-x-1 ${statusInfo?.color}`}>
                <Icon name={statusInfo?.icon} size={14} />
                <span>{statusInfo?.text}</span>
              </div>
              
              <div className={`px-2 py-1 rounded-sm border text-xs font-medium capitalize ${getDifficultyColor(selectedQuest?.difficulty)}`}>
                {selectedQuest?.difficulty}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onCloseDetails}
            iconName="X"
            iconSize={16}
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Quest Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/20 rounded-sm border border-border">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">Duration</span>
            </div>
            <div className="font-medium text-foreground">{selectedQuest?.timeEstimate}</div>
          </div>
          
          <div className="p-3 bg-muted/20 rounded-sm border border-border">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Tag" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">Category</span>
            </div>
            <div className="font-medium text-foreground capitalize">
              {selectedQuest?.category?.replace('-', ' ')}
            </div>
          </div>
        </div>

        {/* Story Context */}
        <div>
          <h3 className="font-pixel text-pixel-xs text-foreground mb-3 flex items-center space-x-2">
            <Icon name="BookOpen" size={16} />
            <span>Quest Story</span>
          </h3>
          <div className="p-4 bg-muted/20 rounded-sm border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {storyContext}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-pixel text-pixel-xs text-foreground mb-3 flex items-center space-x-2">
            <Icon name="FileText" size={16} />
            <span>Challenge Description</span>
          </h3>
          <div className="p-4 bg-muted/20 rounded-sm border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedQuest?.description}
            </p>
          </div>
        </div>

        {/* Learning Objectives */}
        <div>
          <h3 className="font-pixel text-pixel-xs text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Target" size={16} />
            <span>Learning Objectives</span>
          </h3>
          <div className="space-y-2">
            {learningObjectives?.map((objective, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 bg-muted/20 rounded-sm">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{objective}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        {selectedQuest?.prerequisites && selectedQuest?.prerequisites?.length > 0 && (
          <div>
            <h3 className="font-pixel text-pixel-xs text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Link" size={16} />
              <span>Prerequisites</span>
            </h3>
            <div className="p-4 bg-muted/20 rounded-sm border border-border">
              <p className="text-sm text-muted-foreground mb-2">
                Complete these quests before starting:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedQuest?.prerequisites?.map((prereqId) => (
                  <div key={prereqId} className="px-2 py-1 bg-primary/20 text-primary rounded-sm text-xs border border-primary/30">
                    Quest #{prereqId}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rewards */}
        <div>
          <h3 className="font-pixel text-pixel-xs text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Gift" size={16} />
            <span>Quest Rewards</span>
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {rewards?.map((reward, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-sm border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name={reward?.icon} size={16} className={reward?.color} />
                  <span className="text-sm text-foreground">{reward?.type}</span>
                </div>
                <span className={`font-medium ${reward?.color}`}>+{reward?.amount?.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div>
          <h3 className="font-pixel text-pixel-xs text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Lightbulb" size={16} />
            <span>Pro Tips</span>
          </h3>
          <div className="p-4 bg-accent/10 border border-accent/30 rounded-sm">
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Read the problem statement carefully before coding</li>
              <li>• Test your solution with different input cases</li>
              <li>• Don't hesitate to use the hint system if you get stuck</li>
              <li>• Focus on code readability and proper naming</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="p-4 border-t border-border bg-muted/20">
        {selectedQuest?.locked ? (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Complete prerequisite quests to unlock this challenge
            </p>
            <Button variant="outline" disabled fullWidth>
              <Icon name="Lock" size={16} className="mr-2" />
              Quest Locked
            </Button>
          </div>
        ) : selectedQuest?.completed ? (
          <div className="space-y-2">
            <Button variant="outline" fullWidth>
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Replay Quest
            </Button>
            <Button variant="ghost" fullWidth>
              <Icon name="Eye" size={16} className="mr-2" />
              View Solution
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button 
              variant="default" 
              fullWidth 
              onClick={() => onStartQuest(selectedQuest)}
              iconName="Play"
              iconPosition="left"
            >
              {selectedQuest?.inProgress ? 'Continue Quest' : 'Start Quest'}
            </Button>
            {selectedQuest?.inProgress && (
              <Button variant="outline" fullWidth>
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Reset Progress
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestDetails;