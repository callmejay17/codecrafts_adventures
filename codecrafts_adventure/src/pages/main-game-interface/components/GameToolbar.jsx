import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameToolbar = ({
  currentQuest = null,
  questProgress = 0,
  availableActions = [],
  onActionClick = () => {},
  onShowHint = () => {},
  onOpenChat = () => {},
  hintsUsed = 0,
  maxHints = 3
}) => {
  const [showActions, setShowActions] = useState(false);

  const defaultActions = [
    {
      id: 'inventory',
      label: 'Inventory',
      icon: 'Package',
      description: 'View your collected items',
      available: true
    },
    {
      id: 'map',
      label: 'Map',
      icon: 'Map',
      description: 'Open quest map',
      available: true
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: 'BookOpen',
      description: 'View skill tree',
      available: true
    },
    {
      id: 'save',
      label: 'Save',
      icon: 'Save',
      description: 'Save game progress',
      available: true
    }
  ];

  const allActions = [...defaultActions, ...availableActions];

  const getProgressColor = () => {
    if (questProgress >= 100) return 'bg-success';
    if (questProgress >= 75) return 'bg-accent';
    if (questProgress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="h-16 bg-card border-t border-border flex items-center justify-between px-4">
      {/* Quest Progress Section */}
      <div className="flex items-center space-x-4 flex-1">
        {currentQuest ? (
          <>
            {/* Quest Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="Target" size={20} color="var(--color-primary-foreground)" />
              </div>
              <div className="min-w-0">
                <h3 className="font-pixel text-pixel-xs text-foreground truncate">
                  {currentQuest?.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {currentQuest?.objective || 'Complete the coding challenge'}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 max-w-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs text-accent font-medium">{questProgress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor()} game-transition`}
                  style={{ width: `${questProgress}%` }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Icon name="Compass" size={20} />
            <span className="text-sm">No active quest - Visit the quest map to start your adventure!</span>
          </div>
        )}
      </div>
      {/* Action Buttons Section */}
      <div className="flex items-center space-x-2">
        
        {/* Hint Button */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={onShowHint}
            iconName="Lightbulb"
            iconPosition="left"
            iconSize={14}
            disabled={hintsUsed >= maxHints}
            className="relative"
          >
            Hint
            {hintsUsed < maxHints && (
              <span className="ml-1 text-xs text-muted-foreground">
                ({maxHints - hintsUsed})
              </span>
            )}
          </Button>
          
          {hintsUsed >= maxHints && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover border border-border rounded-sm text-xs text-popover-foreground whitespace-nowrap retro-shadow">
              No hints remaining
            </div>
          )}
        </div>

        {/* Chat/Help Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenChat}
          iconName="MessageCircle"
          iconPosition="left"
          iconSize={14}
        >
          Help
        </Button>

        {/* Actions Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowActions(!showActions)}
            iconName="MoreHorizontal"
            iconSize={16}
          />
          
          {showActions && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-popover border border-border rounded-sm retro-shadow z-dropdown">
              <div className="py-2">
                {allActions?.map((action) => (
                  <button
                    key={action?.id}
                    onClick={() => {
                      onActionClick(action);
                      setShowActions(false);
                    }}
                    disabled={!action?.available}
                    className={`w-full px-4 py-2 text-left text-sm game-transition flex items-center space-x-3 ${
                      action?.available
                        ? 'text-popover-foreground hover:bg-muted'
                        : 'text-muted-foreground cursor-not-allowed opacity-50'
                    }`}
                  >
                    <Icon name={action?.icon} size={16} />
                    <div className="flex-1">
                      <div className="font-medium">{action?.label}</div>
                      <div className="text-xs text-muted-foreground">{action?.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Click outside to close dropdown */}
      {showActions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default GameToolbar;