import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const GamePreferences = ({ isExpanded, onToggle }) => {
  const [settings, setSettings] = useState({
    difficulty: 'normal',
    hintFrequency: 'balanced',
    autoSaveInterval: '5',
    showProgressBar: true,
    enableTutorials: true,
    skipAnimations: false,
    confirmActions: true,
    pauseOnFocusLoss: true
  });

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', description: 'More hints and guidance' },
    { value: 'normal', label: 'Normal', description: 'Balanced experience' },
    { value: 'hard', label: 'Hard', description: 'Minimal assistance' },
    { value: 'expert', label: 'Expert', description: 'No hints or guidance' }
  ];

  const hintOptions = [
    { value: 'frequent', label: 'Frequent', description: 'Show hints often' },
    { value: 'balanced', label: 'Balanced', description: 'Show hints when needed' },
    { value: 'minimal', label: 'Minimal', description: 'Show hints rarely' },
    { value: 'none', label: 'None', description: 'Never show hints' }
  ];

  const autoSaveOptions = [
    { value: '1', label: '1 minute' },
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '30', label: '30 minutes' },
    { value: 'manual', label: 'Manual only' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Save settings logic
    console.log('Game preferences saved:', settings);
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Leaf';
      case 'normal': return 'Flame';
      case 'hard': return 'Sword';
      case 'expert': return 'Crown';
      default: return 'Circle';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'normal': return 'text-warning';
      case 'hard': return 'text-error';
      case 'expert': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="border border-border rounded-sm bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 game-transition"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Gamepad2" size={20} color="var(--color-accent)" />
          <div>
            <h3 className="font-pixel text-pixel-sm text-foreground">Game Preferences</h3>
            <p className="text-sm text-muted-foreground">Customize your gameplay experience</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          color="var(--color-muted-foreground)" 
        />
      </button>
      {isExpanded && (
        <div className="p-4 border-t border-border space-y-6">
          {/* Difficulty Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Difficulty & Assistance</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Difficulty Level"
                description="Adjust the challenge level of quests"
                options={difficultyOptions}
                value={settings?.difficulty}
                onChange={(value) => handleSettingChange('difficulty', value)}
              />
              
              <Select
                label="Hint Frequency"
                description="How often hints are provided"
                options={hintOptions}
                value={settings?.hintFrequency}
                onChange={(value) => handleSettingChange('hintFrequency', value)}
              />
            </div>

            {/* Difficulty Preview */}
            <div className="p-3 bg-muted/20 rounded-sm border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={getDifficultyIcon(settings?.difficulty)} 
                  size={16} 
                  className={getDifficultyColor(settings?.difficulty)} 
                />
                <span className="font-pixel text-pixel-xs text-foreground capitalize">
                  {settings?.difficulty} Mode
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {difficultyOptions?.find(opt => opt?.value === settings?.difficulty)?.description}
              </p>
            </div>
          </div>

          {/* Auto-Save Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Save & Progress</h4>
            
            <Select
              label="Auto-Save Interval"
              description="How frequently your progress is automatically saved"
              options={autoSaveOptions}
              value={settings?.autoSaveInterval}
              onChange={(value) => handleSettingChange('autoSaveInterval', value)}
            />
          </div>

          {/* Gameplay Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Gameplay Options</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Show Progress Bar"
                description="Display quest progress indicators"
                checked={settings?.showProgressBar}
                onChange={(e) => handleSettingChange('showProgressBar', e?.target?.checked)}
              />
              
              <Checkbox
                label="Enable Tutorials"
                description="Show tutorial messages for new features"
                checked={settings?.enableTutorials}
                onChange={(e) => handleSettingChange('enableTutorials', e?.target?.checked)}
              />
              
              <Checkbox
                label="Skip Animations"
                description="Reduce or skip non-essential animations"
                checked={settings?.skipAnimations}
                onChange={(e) => handleSettingChange('skipAnimations', e?.target?.checked)}
              />
              
              <Checkbox
                label="Confirm Actions"
                description="Ask for confirmation on important actions"
                checked={settings?.confirmActions}
                onChange={(e) => handleSettingChange('confirmActions', e?.target?.checked)}
              />
              
              <Checkbox
                label="Pause on Focus Loss"
                description="Automatically pause when switching tabs"
                checked={settings?.pauseOnFocusLoss}
                onChange={(e) => handleSettingChange('pauseOnFocusLoss', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Save Preferences
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setSettings({
                  difficulty: 'normal',
                  hintFrequency: 'balanced',
                  autoSaveInterval: '5',
                  showProgressBar: true,
                  enableTutorials: true,
                  skipAnimations: false,
                  confirmActions: true,
                  pauseOnFocusLoss: true
                });
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePreferences;