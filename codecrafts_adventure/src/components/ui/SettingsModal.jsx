import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';
import { Checkbox } from './Checkbox';

const SettingsModal = ({ 
  isOpen = false, 
  onClose = () => {},
  onSave = () => {} 
}) => {
  const [settings, setSettings] = useState({
    // Game Settings
    difficulty: 'normal',
    soundEnabled: true,
    musicEnabled: true,
    soundVolume: 75,
    musicVolume: 50,
    autoSave: true,
    
    // Display Settings
    theme: 'dark',
    fontSize: 'medium',
    codeTheme: 'dark',
    showLineNumbers: true,
    wordWrap: true,
    
    // Accessibility Settings
    reducedMotion: false,
    highContrast: false,
    screenReader: false,
    keyboardNavigation: true,
    
    // Notification Settings
    questReminders: true,
    achievementNotifications: true,
    dailyStreak: true,
    emailNotifications: false,
    
    // Privacy Settings
    profileVisibility: 'public',
    shareProgress: true,
    analytics: true
  });

  const [activeSection, setActiveSection] = useState('game');

  const sections = [
    { id: 'game', label: 'Game', icon: 'Gamepad2' },
    { id: 'display', label: 'Display', icon: 'Monitor' },
    { id: 'accessibility', label: 'Accessibility', icon: 'Eye' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy - More hints and guidance' },
    { value: 'normal', label: 'Normal - Balanced experience' },
    { value: 'hard', label: 'Hard - Minimal assistance' },
    { value: 'expert', label: 'Expert - No hints or guidance' }
  ];

  const themeOptions = [
    { value: 'dark', label: 'Dark Theme' },
    { value: 'light', label: 'Light Theme' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' }
  ];

  const codeThemeOptions = [
    { value: 'dark', label: 'Dark Code Theme' },
    { value: 'light', label: 'Light Code Theme' },
    { value: 'high-contrast', label: 'High Contrast' }
  ];

  const profileVisibilityOptions = [
    { value: 'public', label: 'Public - Visible to everyone' },
    { value: 'friends', label: 'Friends Only' },
    { value: 'private', label: 'Private - Only you' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const handleReset = () => {
    setSettings({
      difficulty: 'normal',
      soundEnabled: true,
      musicEnabled: true,
      soundVolume: 75,
      musicVolume: 50,
      autoSave: true,
      theme: 'dark',
      fontSize: 'medium',
      codeTheme: 'dark',
      showLineNumbers: true,
      wordWrap: true,
      reducedMotion: false,
      highContrast: false,
      screenReader: false,
      keyboardNavigation: true,
      questReminders: true,
      achievementNotifications: true,
      dailyStreak: true,
      emailNotifications: false,
      profileVisibility: 'public',
      shareProgress: true,
      analytics: true
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-card border border-border rounded-sm retro-shadow overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={24} color="var(--color-accent)" />
            <h1 className="font-pixel text-pixel-lg text-foreground">Game Settings</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="flex h-full">
          {/* Sidebar Navigation */}
          <div className="w-64 border-r border-border bg-muted/10 p-4">
            <nav className="space-y-2">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-sm text-left game-transition ${
                    activeSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section?.icon} size={18} />
                  <span className="font-medium">{section?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              
              {/* Game Settings */}
              {activeSection === 'game' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-pixel text-pixel-sm text-foreground mb-4">Game Configuration</h2>
                    
                    <div className="space-y-4">
                      <Select
                        label="Difficulty Level"
                        description="Adjust the challenge level and amount of guidance provided"
                        options={difficultyOptions}
                        value={settings?.difficulty}
                        onChange={(value) => handleSettingChange('difficulty', value)}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Checkbox
                          label="Enable Sound Effects"
                          description="Play sound effects for actions and feedback"
                          checked={settings?.soundEnabled}
                          onChange={(e) => handleSettingChange('soundEnabled', e?.target?.checked)}
                        />

                        <Checkbox
                          label="Enable Background Music"
                          description="Play ambient music during gameplay"
                          checked={settings?.musicEnabled}
                          onChange={(e) => handleSettingChange('musicEnabled', e?.target?.checked)}
                        />

                        <Checkbox
                          label="Auto-Save Progress"
                          description="Automatically save your progress"
                          checked={settings?.autoSave}
                          onChange={(e) => handleSettingChange('autoSave', e?.target?.checked)}
                        />
                      </div>

                      {/* Volume Controls */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Sound Volume: {settings?.soundVolume}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={settings?.soundVolume}
                            onChange={(e) => handleSettingChange('soundVolume', parseInt(e?.target?.value))}
                            className="w-full h-2 bg-muted rounded-sm appearance-none cursor-pointer"
                            disabled={!settings?.soundEnabled}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Music Volume: {settings?.musicVolume}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={settings?.musicVolume}
                            onChange={(e) => handleSettingChange('musicVolume', parseInt(e?.target?.value))}
                            className="w-full h-2 bg-muted rounded-sm appearance-none cursor-pointer"
                            disabled={!settings?.musicEnabled}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Display Settings */}
              {activeSection === 'display' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-pixel text-pixel-sm text-foreground mb-4">Display & Interface</h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          label="Theme"
                          description="Choose your preferred color theme"
                          options={themeOptions}
                          value={settings?.theme}
                          onChange={(value) => handleSettingChange('theme', value)}
                        />

                        <Select
                          label="Font Size"
                          description="Adjust text size throughout the interface"
                          options={fontSizeOptions}
                          value={settings?.fontSize}
                          onChange={(value) => handleSettingChange('fontSize', value)}
                        />
                      </div>

                      <Select
                        label="Code Editor Theme"
                        description="Choose the color scheme for the code editor"
                        options={codeThemeOptions}
                        value={settings?.codeTheme}
                        onChange={(value) => handleSettingChange('codeTheme', value)}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Checkbox
                          label="Show Line Numbers"
                          description="Display line numbers in code editor"
                          checked={settings?.showLineNumbers}
                          onChange={(e) => handleSettingChange('showLineNumbers', e?.target?.checked)}
                        />

                        <Checkbox
                          label="Word Wrap"
                          description="Wrap long lines in code editor"
                          checked={settings?.wordWrap}
                          onChange={(e) => handleSettingChange('wordWrap', e?.target?.checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Accessibility Settings */}
              {activeSection === 'accessibility' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-pixel text-pixel-sm text-foreground mb-4">Accessibility Options</h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Checkbox
                          label="Reduce Motion"
                          description="Minimize animations and transitions"
                          checked={settings?.reducedMotion}
                          onChange={(e) => handleSettingChange('reducedMotion', e?.target?.checked)}
                        />

                        <Checkbox
                          label="High Contrast Mode"
                          description="Increase contrast for better visibility"
                          checked={settings?.highContrast}
                          onChange={(e) => handleSettingChange('highContrast', e?.target?.checked)}
                        />

                        <Checkbox
                          label="Screen Reader Support"
                          description="Optimize for screen reader compatibility"
                          checked={settings?.screenReader}
                          onChange={(e) => handleSettingChange('screenReader', e?.target?.checked)}
                        />

                        <Checkbox
                          label="Keyboard Navigation"
                          description="Enable full keyboard navigation support"
                          checked={settings?.keyboardNavigation}
                          onChange={(e) => handleSettingChange('keyboardNavigation', e?.target?.checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-pixel text-pixel-sm text-foreground mb-4">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Checkbox
                          label="Quest Reminders"
                          description="Get reminded about incomplete quests"
                          checked={settings?.questReminders}
                          onChange={(e) => handleSettingChange('questReminders', e?.target?.checked)}
                        />

                        <Checkbox
                          label="Achievement Notifications"
                          description="Show notifications when you unlock achievements"
                          checked={settings?.achievementNotifications}
                          onChange={(e) => handleSettingChange('achievementNotifications', e?.target?.checked)}
                        />

                        <Checkbox
                          label="Daily Streak Reminders"
                          description="Get reminded to maintain your coding streak"
                          checked={settings?.dailyStreak}
                          onChange={(e) => handleSettingChange('dailyStreak', e?.target?.checked)}
                        />

                        <Checkbox
                          label="Email Notifications"
                          description="Receive notifications via email"
                          checked={settings?.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-pixel text-pixel-sm text-foreground mb-4">Privacy & Data</h2>
                    
                    <div className="space-y-4">
                      <Select
                        label="Profile Visibility"
                        description="Control who can see your profile and progress"
                        options={profileVisibilityOptions}
                        value={settings?.profileVisibility}
                        onChange={(value) => handleSettingChange('profileVisibility', value)}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Checkbox
                          label="Share Progress"
                          description="Allow sharing of your coding progress"
                          checked={settings?.shareProgress}
                          onChange={(e) => handleSettingChange('shareProgress', e?.target?.checked)}
                        />

                        <Checkbox
                          label="Analytics & Improvement"
                          description="Help improve the platform with usage data"
                          checked={settings?.analytics}
                          onChange={(e) => handleSettingChange('analytics', e?.target?.checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <Button
            variant="outline"
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset to Defaults
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;