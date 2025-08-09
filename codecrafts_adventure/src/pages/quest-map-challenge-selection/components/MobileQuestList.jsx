import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileQuestList = ({ 
  quests = [], 
  selectedQuest, 
  onQuestSelect,
  onStartQuest = () => {} 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success border-success';
      case 'intermediate': return 'text-warning border-warning';
      case 'advanced': return 'text-error border-error';
      case 'expert': return 'text-accent border-accent';
      default: return 'text-muted-foreground border-muted';
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
    if (quest?.locked) return { text: 'Locked', color: 'text-muted-foreground', icon: 'Lock', bgColor: 'bg-muted/20' };
    if (quest?.completed) return { text: 'Completed', color: 'text-success', icon: 'Check', bgColor: 'bg-success/10' };
    if (quest?.inProgress) return { text: 'In Progress', color: 'text-warning', icon: 'Play', bgColor: 'bg-warning/10' };
    return { text: 'Available', color: 'text-primary', icon: 'Circle', bgColor: 'bg-primary/10' };
  };

  const handleQuestClick = (quest) => {
    onQuestSelect(quest);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    onQuestSelect(null);
  };

  const handleStartQuest = (quest) => {
    onStartQuest(quest);
  };

  if (showDetails && selectedQuest) {
    const statusInfo = getStatusInfo(selectedQuest);
    
    return (
      <div className="h-full bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToList}
              iconName="ArrowLeft"
              iconSize={16}
            />
            <h2 className="font-pixel text-pixel-sm text-foreground">Quest Details</h2>
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={getDifficultyIcon(selectedQuest?.difficulty)} 
              size={20} 
              className={getDifficultyColor(selectedQuest?.difficulty)?.split(' ')?.[0]} 
            />
            <h3 className="font-pixel text-pixel-xs text-foreground">{selectedQuest?.title}</h3>
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
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-muted/20 rounded-sm border border-border">
              <Icon name="Zap" size={16} color="var(--color-accent)" className="mx-auto mb-1" />
              <div className="font-pixel text-pixel-xs text-accent">{selectedQuest?.xpReward}</div>
              <div className="text-xs text-muted-foreground">XP</div>
            </div>
            
            <div className="text-center p-3 bg-muted/20 rounded-sm border border-border">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" className="mx-auto mb-1" />
              <div className="font-pixel text-pixel-xs text-foreground">{selectedQuest?.timeEstimate}</div>
              <div className="text-xs text-muted-foreground">Time</div>
            </div>
            
            <div className="text-center p-3 bg-muted/20 rounded-sm border border-border">
              <Icon name="Tag" size={16} color="var(--color-muted-foreground)" className="mx-auto mb-1" />
              <div className="font-pixel text-pixel-xs text-foreground capitalize">
                {selectedQuest?.category?.replace('-', ' ')?.split(' ')?.[0]}
              </div>
              <div className="text-xs text-muted-foreground">Topic</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedQuest?.description}
            </p>
          </div>

          {/* Prerequisites */}
          {selectedQuest?.prerequisites && selectedQuest?.prerequisites?.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Prerequisites</h4>
              <div className="flex flex-wrap gap-2">
                {selectedQuest?.prerequisites?.map((prereqId) => (
                  <div key={prereqId} className="px-2 py-1 bg-primary/20 text-primary rounded-sm text-xs border border-primary/30">
                    Quest #{prereqId}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Learning Objectives */}
          <div>
            <h4 className="font-medium text-foreground mb-2">What You'll Learn</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-sm">
                <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Master {selectedQuest?.category?.replace('-', ' ')} concepts</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Apply problem-solving strategies</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Write clean, efficient code</span>
              </div>
            </div>
          </div>

          {/* Rewards */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Rewards</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/20 rounded-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={14} color="var(--color-accent)" />
                  <span className="text-sm">Experience Points</span>
                </div>
                <span className="text-accent font-medium">+{selectedQuest?.xpReward}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/20 rounded-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Coins" size={14} color="var(--color-warning)" />
                  <span className="text-sm">Gold Coins</span>
                </div>
                <span className="text-warning font-medium">+{selectedQuest?.xpReward * 2}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Action Button */}
        <div className="p-4 border-t border-border">
          {selectedQuest?.locked ? (
            <Button variant="outline" disabled fullWidth>
              <Icon name="Lock" size={16} className="mr-2" />
              Quest Locked
            </Button>
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
            <Button 
              variant="default" 
              fullWidth 
              onClick={() => handleStartQuest(selectedQuest)}
              iconName="Play"
              iconPosition="left"
            >
              {selectedQuest?.inProgress ? 'Continue Quest' : 'Start Quest'}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Map" size={20} color="var(--color-accent)" />
          <h2 className="font-pixel text-pixel-sm text-accent">Available Quests</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Choose your next coding adventure
        </p>
      </div>
      {/* Quest List */}
      <div className="flex-1 overflow-y-auto">
        {quests?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mb-4 opacity-50" />
            <h3 className="font-pixel text-pixel-sm text-muted-foreground mb-2">No Quests Found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to find more quests
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {quests?.map((quest) => {
              const statusInfo = getStatusInfo(quest);
              
              return (
                <div
                  key={quest?.id}
                  onClick={() => !quest?.locked && handleQuestClick(quest)}
                  className={`p-4 rounded-sm border cursor-pointer game-transition ${
                    quest?.locked 
                      ? 'border-muted bg-muted/20 opacity-50 cursor-not-allowed' 
                      : `border-border bg-card hover:bg-muted ${statusInfo?.bgColor}`
                  }`}
                >
                  {/* Quest Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2 flex-1">
                      <Icon 
                        name={getDifficultyIcon(quest?.difficulty)} 
                        size={16} 
                        className={getDifficultyColor(quest?.difficulty)?.split(' ')?.[0]} 
                      />
                      <h3 className="font-pixel text-pixel-xs text-foreground">{quest?.title}</h3>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`flex items-center space-x-1 ${statusInfo?.color}`}>
                        <Icon name={statusInfo?.icon} size={12} />
                      </div>
                      <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
                    </div>
                  </div>
                  {/* Quest Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {quest?.description}
                  </p>
                  {/* Quest Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Icon name="Zap" size={12} color="var(--color-accent)" />
                        <span className="text-accent font-medium">{quest?.xpReward} XP</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                        <span className="text-muted-foreground">{quest?.timeEstimate}</span>
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-sm border text-xs font-medium capitalize ${getDifficultyColor(quest?.difficulty)}`}>
                      {quest?.difficulty}
                    </div>
                  </div>
                  {/* Prerequisites Indicator */}
                  {quest?.prerequisites && quest?.prerequisites?.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border">
                      <div className="flex items-center space-x-1">
                        <Icon name="Link" size={12} color="var(--color-muted-foreground)" />
                        <span className="text-xs text-muted-foreground">
                          Requires {quest?.prerequisites?.length} quest{quest?.prerequisites?.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileQuestList;