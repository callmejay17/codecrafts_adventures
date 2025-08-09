import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AudioVisualSettings = ({ isExpanded, onToggle }) => {
  const [settings, setSettings] = useState({
    masterVolume: 75,
    soundEffectsVolume: 80,
    musicVolume: 60,
    voiceVolume: 70,
    soundEffectsEnabled: true,
    musicEnabled: true,
    voiceEnabled: false,
    animationSpeed: 'normal',
    particleEffects: true,
    screenShake: true,
    reducedMotion: false,
    highContrast: false,
    screenReaderSupport: false,
    keyboardNavigation: true,
    focusIndicators: true
  });

  const animationSpeedOptions = [
    { value: 'slow', label: 'Slow', description: '0.5x speed for better visibility' },
    { value: 'normal', label: 'Normal', description: 'Default animation speed' },
    { value: 'fast', label: 'Fast', description: '1.5x speed for quicker gameplay' },
    { value: 'instant', label: 'Instant', description: 'Skip most animations' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleVolumeChange = (key, value) => {
    const numValue = parseInt(value);
    setSettings(prev => ({
      ...prev,
      [key]: numValue
    }));
  };

  const handleSave = () => {
    console.log('Audio & Visual settings saved:', settings);
  };

  const VolumeSlider = ({ label, value, onChange, disabled = false, icon }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={16} color="var(--color-muted-foreground)" />
          <label className="text-sm font-medium text-foreground">{label}</label>
        </div>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e?.target?.value))}
          disabled={disabled}
          className={`w-full h-2 bg-muted rounded-sm appearance-none cursor-pointer game-transition ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            background: disabled 
              ? 'var(--color-muted)' 
              : `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${value}%, var(--color-muted) ${value}%, var(--color-muted) 100%)`
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="border border-border rounded-sm bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 game-transition"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Volume2" size={20} color="var(--color-accent)" />
          <div>
            <h3 className="font-pixel text-pixel-sm text-foreground">Audio & Visual</h3>
            <p className="text-sm text-muted-foreground">Sound, music, and visual effects</p>
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
          {/* Audio Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Audio Settings</h4>
            
            {/* Master Volume */}
            <VolumeSlider
              label="Master Volume"
              value={settings?.masterVolume}
              onChange={(value) => handleVolumeChange('masterVolume', value)}
              icon="Volume2"
            />

            {/* Individual Volume Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Checkbox
                  label="Sound Effects"
                  description="Enable UI and gameplay sound effects"
                  checked={settings?.soundEffectsEnabled}
                  onChange={(e) => handleSettingChange('soundEffectsEnabled', e?.target?.checked)}
                />
                
                <VolumeSlider
                  label="Sound Effects Volume"
                  value={settings?.soundEffectsVolume}
                  onChange={(value) => handleVolumeChange('soundEffectsVolume', value)}
                  disabled={!settings?.soundEffectsEnabled}
                  icon="Zap"
                />
              </div>

              <div className="space-y-4">
                <Checkbox
                  label="Background Music"
                  description="Enable ambient background music"
                  checked={settings?.musicEnabled}
                  onChange={(e) => handleSettingChange('musicEnabled', e?.target?.checked)}
                />
                
                <VolumeSlider
                  label="Music Volume"
                  value={settings?.musicVolume}
                  onChange={(value) => handleVolumeChange('musicVolume', value)}
                  disabled={!settings?.musicEnabled}
                  icon="Music"
                />
              </div>
            </div>

            {/* Voice Settings */}
            <div className="space-y-4">
              <Checkbox
                label="Voice Narration"
                description="Enable voice narration for quests and tutorials"
                checked={settings?.voiceEnabled}
                onChange={(e) => handleSettingChange('voiceEnabled', e?.target?.checked)}
              />
              
              {settings?.voiceEnabled && (
                <VolumeSlider
                  label="Voice Volume"
                  value={settings?.voiceVolume}
                  onChange={(value) => handleVolumeChange('voiceVolume', value)}
                  icon="Mic"
                />
              )}
            </div>
          </div>

          {/* Visual Effects */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Visual Effects</h4>
            
            <Select
              label="Animation Speed"
              description="Control the speed of animations and transitions"
              options={animationSpeedOptions}
              value={settings?.animationSpeed}
              onChange={(value) => handleSettingChange('animationSpeed', value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Particle Effects"
                description="Show particle effects for actions and achievements"
                checked={settings?.particleEffects}
                onChange={(e) => handleSettingChange('particleEffects', e?.target?.checked)}
              />
              
              <Checkbox
                label="Screen Shake"
                description="Enable screen shake effects for emphasis"
                checked={settings?.screenShake}
                onChange={(e) => handleSettingChange('screenShake', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Accessibility Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Accessibility</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Reduced Motion"
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
                description="Optimize interface for screen readers"
                checked={settings?.screenReaderSupport}
                onChange={(e) => handleSettingChange('screenReaderSupport', e?.target?.checked)}
              />
              
              <Checkbox
                label="Keyboard Navigation"
                description="Enable full keyboard navigation support"
                checked={settings?.keyboardNavigation}
                onChange={(e) => handleSettingChange('keyboardNavigation', e?.target?.checked)}
              />
              
              <Checkbox
                label="Focus Indicators"
                description="Show clear focus indicators for navigation"
                checked={settings?.focusIndicators}
                onChange={(e) => handleSettingChange('focusIndicators', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Audio Test */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Audio Test</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Play"
                iconPosition="left"
                onClick={() => console.log('Playing sound effect test')}
              >
                Test Sound Effects
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Music"
                iconPosition="left"
                onClick={() => console.log('Playing music test')}
              >
                Test Music
              </Button>
              
              {settings?.voiceEnabled && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Mic"
                  iconPosition="left"
                  onClick={() => console.log('Playing voice test')}
                >
                  Test Voice
                </Button>
              )}
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
              Save A/V Settings
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setSettings({
                  masterVolume: 75,
                  soundEffectsVolume: 80,
                  musicVolume: 60,
                  voiceVolume: 70,
                  soundEffectsEnabled: true,
                  musicEnabled: true,
                  voiceEnabled: false,
                  animationSpeed: 'normal',
                  particleEffects: true,
                  screenShake: true,
                  reducedMotion: false,
                  highContrast: false,
                  screenReaderSupport: false,
                  keyboardNavigation: true,
                  focusIndicators: true
                });
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset Defaults
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioVisualSettings;