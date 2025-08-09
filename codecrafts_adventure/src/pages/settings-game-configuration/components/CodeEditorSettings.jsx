import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CodeEditorSettings = ({ isExpanded, onToggle }) => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    fontSize: '14',
    fontFamily: 'jetbrains-mono',
    tabSize: '2',
    showLineNumbers: true,
    wordWrap: true,
    autoComplete: true,
    syntaxHighlighting: true,
    bracketMatching: true,
    autoIndent: true,
    showMinimap: false,
    highlightCurrentLine: true
  });

  const themeOptions = [
    { value: 'dark', label: 'Dark Theme', description: 'Dark background with light text' },
    { value: 'light', label: 'Light Theme', description: 'Light background with dark text' },
    { value: 'high-contrast', label: 'High Contrast', description: 'Maximum contrast for accessibility' },
    { value: 'monokai', label: 'Monokai', description: 'Popular dark theme with vibrant colors' },
    { value: 'solarized', label: 'Solarized Dark', description: 'Easy on the eyes dark theme' }
  ];

  const fontSizeOptions = [
    { value: '12', label: '12px - Small' },
    { value: '14', label: '14px - Default' },
    { value: '16', label: '16px - Medium' },
    { value: '18', label: '18px - Large' },
    { value: '20', label: '20px - Extra Large' }
  ];

  const fontFamilyOptions = [
    { value: 'jetbrains-mono', label: 'JetBrains Mono', description: 'Designed for developers' },
    { value: 'fira-code', label: 'Fira Code', description: 'Monospace with programming ligatures' },
    { value: 'source-code-pro', label: 'Source Code Pro', description: 'Adobe\'s monospace font' },
    { value: 'consolas', label: 'Consolas', description: 'Microsoft\'s programming font' },
    { value: 'monaco', label: 'Monaco', description: 'Classic monospace font' }
  ];

  const tabSizeOptions = [
    { value: '2', label: '2 spaces' },
    { value: '4', label: '4 spaces' },
    { value: '8', label: '8 spaces' },
    { value: 'tab', label: 'Tab character' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Code editor settings saved:', settings);
  };

  const getThemePreview = (theme) => {
    const themes = {
      dark: { bg: 'bg-gray-900', text: 'text-green-400', comment: 'text-gray-500' },
      light: { bg: 'bg-white', text: 'text-blue-600', comment: 'text-gray-600' },
      'high-contrast': { bg: 'bg-black', text: 'text-yellow-400', comment: 'text-white' },
      monokai: { bg: 'bg-gray-800', text: 'text-pink-400', comment: 'text-gray-400' },
      solarized: { bg: 'bg-blue-900', text: 'text-cyan-300', comment: 'text-blue-300' }
    };
    return themes[theme] || themes.dark;
  };

  const currentTheme = getThemePreview(settings.theme);

  return (
    <div className="border border-border rounded-sm bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 game-transition"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Code" size={20} color="var(--color-accent)" />
          <div>
            <h3 className="font-pixel text-pixel-sm text-foreground">Code Editor</h3>
            <p className="text-sm text-muted-foreground">Customize your coding environment</p>
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
          {/* Theme and Appearance */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Theme & Appearance</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Select
                  label="Editor Theme"
                  description="Choose your preferred color scheme"
                  options={themeOptions}
                  value={settings.theme}
                  onChange={(value) => handleSettingChange('theme', value)}
                />
                
                <Select
                  label="Font Size"
                  description="Adjust text size in the editor"
                  options={fontSizeOptions}
                  value={settings.fontSize}
                  onChange={(value) => handleSettingChange('fontSize', value)}
                />
                
                <Select
                  label="Font Family"
                  description="Choose your preferred coding font"
                  options={fontFamilyOptions}
                  value={settings.fontFamily}
                  onChange={(value) => handleSettingChange('fontFamily', value)}
                />
              </div>

              {/* Theme Preview */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Preview</label>
                <div className={`p-4 rounded-sm border ${currentTheme.bg} font-mono text-sm`}>
                  <div className={`${currentTheme.comment} mb-1`}>// Example code preview</div>
                  <div className={currentTheme.text}>
                    <span className="text-purple-400">function</span>{' '}
                    <span className="text-yellow-300">calculateSum</span>
                    <span className="text-white">(</span>
                    <span className="text-orange-400">a</span>
                    <span className="text-white">, </span>
                    <span className="text-orange-400">b</span>
                    <span className="text-white">) {'{'}</span>
                  </div>
                  <div className={`${currentTheme.text} ml-4`}>
                    <span className="text-purple-400">return</span>{' '}
                    <span className="text-orange-400">a</span>{' '}
                    <span className="text-white">+</span>{' '}
                    <span className="text-orange-400">b</span>
                    <span className="text-white">;</span>
                  </div>
                  <div className={`${currentTheme.text}`}>
                    <span className="text-white">{'}'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Behavior */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Editor Behavior</h4>
            
            <Select
              label="Tab Size"
              description="Number of spaces for indentation"
              options={tabSizeOptions}
              value={settings.tabSize}
              onChange={(value) => handleSettingChange('tabSize', value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Show Line Numbers"
                description="Display line numbers in the editor"
                checked={settings.showLineNumbers}
                onChange={(e) => handleSettingChange('showLineNumbers', e.target.checked)}
              />
              
              <Checkbox
                label="Word Wrap"
                description="Wrap long lines to fit the editor width"
                checked={settings.wordWrap}
                onChange={(e) => handleSettingChange('wordWrap', e.target.checked)}
              />
              
              <Checkbox
                label="Auto Complete"
                description="Show code completion suggestions"
                checked={settings.autoComplete}
                onChange={(e) => handleSettingChange('autoComplete', e.target.checked)}
              />
              
              <Checkbox
                label="Syntax Highlighting"
                description="Highlight code syntax with colors"
                checked={settings.syntaxHighlighting}
                onChange={(e) => handleSettingChange('syntaxHighlighting', e.target.checked)}
              />
              
              <Checkbox
                label="Bracket Matching"
                description="Highlight matching brackets and parentheses"
                checked={settings.bracketMatching}
                onChange={(e) => handleSettingChange('bracketMatching', e.target.checked)}
              />
              
              <Checkbox
                label="Auto Indent"
                description="Automatically indent new lines"
                checked={settings.autoIndent}
                onChange={(e) => handleSettingChange('autoIndent', e.target.checked)}
              />
              
              <Checkbox
                label="Show Minimap"
                description="Display a miniature overview of the code"
                checked={settings.showMinimap}
                onChange={(e) => handleSettingChange('showMinimap', e.target.checked)}
              />
              
              <Checkbox
                label="Highlight Current Line"
                description="Highlight the line where the cursor is located"
                checked={settings.highlightCurrentLine}
                onChange={(e) => handleSettingChange('highlightCurrentLine', e.target.checked)}
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
              Save Editor Settings
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setSettings({
                  theme: 'dark',
                  fontSize: '14',
                  fontFamily: 'jetbrains-mono',
                  tabSize: '2',
                  showLineNumbers: true,
                  wordWrap: true,
                  autoComplete: true,
                  syntaxHighlighting: true,
                  bracketMatching: true,
                  autoIndent: true,
                  showMinimap: false,
                  highlightCurrentLine: true
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

export default CodeEditorSettings;