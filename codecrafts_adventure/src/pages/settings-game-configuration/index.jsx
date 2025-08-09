import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GameHUD from '../../components/ui/GameHUD';
import AccountSettings from './components/AccountSettings';
import GamePreferences from './components/GamePreferences';
import CodeEditorSettings from './components/CodeEditorSettings';
import AudioVisualSettings from './components/AudioVisualSettings';
import PrivacySettings from './components/PrivacySettings';
import SettingsExportImport from './components/SettingsExportImport';

const SettingsGameConfiguration = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    account: false,
    game: false,
    editor: false,
    audioVisual: false,
    privacy: false
  });
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-expand first section on mobile
  useEffect(() => {
    if (isMobile && Object.values(expandedSections)?.every(val => !val)) {
      setExpandedSections(prev => ({ ...prev, account: true }));
    }
  }, [isMobile, expandedSections]);

  const handleSectionToggle = (section) => {
    if (isMobile) {
      // On mobile, only allow one section open at a time
      setExpandedSections(prev => ({
        account: false,
        game: false,
        editor: false,
        audioVisual: false,
        privacy: false,
        [section]: !prev?.[section]
      }));
    } else {
      // On desktop, allow multiple sections
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev?.[section]
      }));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleResetAllSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to their default values? This action cannot be undone.')) {
      // Reset all settings logic
      console.log('Resetting all settings to defaults...');
      setHasUnsavedChanges(false);
    }
  };

  const handleSaveAllSettings = () => {
    console.log('Saving all settings...');
    setHasUnsavedChanges(false);
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: 'User', component: AccountSettings },
    { id: 'game', label: 'Game', icon: 'Gamepad2', component: GamePreferences },
    { id: 'editor', label: 'Editor', icon: 'Code', component: CodeEditorSettings },
    { id: 'audioVisual', label: 'A/V', icon: 'Volume2', component: AudioVisualSettings },
    { id: 'privacy', label: 'Privacy', icon: 'Shield', component: PrivacySettings }
  ];

  const character = {
    name: 'CodeCrafter',
    level: 12,
    xp: 2450,
    maxXp: 3000,
    health: 85,
    maxHealth: 100,
    avatar: '/assets/images/character-avatar.png'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Game HUD */}
      <GameHUD character={character} />
      {/* Main Content */}
      <div className="pt-16">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/main-game-interface')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Game
                </Button>
                <div>
                  <h1 className="font-pixel text-pixel-lg text-foreground">Settings & Configuration</h1>
                  <p className="text-sm text-muted-foreground">Customize your CodeCrafts Adventure experience</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetAllSettings}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset All
                </Button>
                {hasUnsavedChanges && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSaveAllSettings}
                    iconName="Save"
                    iconPosition="left"
                  >
                    Save All
                  </Button>
                )}
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Home" size={14} />
              <span>/</span>
              <button 
                onClick={() => navigate('/main-game-interface')}
                className="hover:text-foreground game-transition"
              >
                Game
              </button>
              <span>/</span>
              <span className="text-foreground">Settings</span>
            </div>
          </div>

          {/* Desktop Tabbed Interface */}
          {!isMobile ? (
            <div className="bg-card border border-border rounded-sm retro-shadow">
              {/* Tab Navigation */}
              <div className="flex border-b border-border bg-muted/10">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => handleTabChange(tab?.id)}
                    className={`flex-1 px-4 py-3 text-sm font-medium game-transition flex items-center justify-center space-x-2 ${
                      activeTab === tab?.id
                        ? 'text-accent border-b-2 border-accent bg-accent/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {tabs?.map((tab) => {
                  const Component = tab?.component;
                  return activeTab === tab?.id ? (
                    <Component
                      key={tab?.id}
                      isExpanded={true}
                      onToggle={() => {}}
                    />
                  ) : null;
                })}
              </div>
            </div>
          ) : (
            /* Mobile Accordion Interface */
            (<div className="space-y-4">
              <AccountSettings
                isExpanded={expandedSections?.account}
                onToggle={() => handleSectionToggle('account')}
              />
              <GamePreferences
                isExpanded={expandedSections?.game}
                onToggle={() => handleSectionToggle('game')}
              />
              <CodeEditorSettings
                isExpanded={expandedSections?.editor}
                onToggle={() => handleSectionToggle('editor')}
              />
              <AudioVisualSettings
                isExpanded={expandedSections?.audioVisual}
                onToggle={() => handleSectionToggle('audioVisual')}
              />
              <PrivacySettings
                isExpanded={expandedSections?.privacy}
                onToggle={() => handleSectionToggle('privacy')}
              />
            </div>)
          )}

          {/* Export/Import Section */}
          <div className="mt-6">
            <SettingsExportImport />
          </div>

          {/* Mobile Quick Actions */}
          {isMobile && (
            <div className="mt-6 flex flex-col space-y-3">
              <Button
                variant="outline"
                onClick={handleResetAllSettings}
                iconName="RotateCcw"
                iconPosition="left"
                fullWidth
              >
                Reset All Settings
              </Button>
              {hasUnsavedChanges && (
                <Button
                  variant="default"
                  onClick={handleSaveAllSettings}
                  iconName="Save"
                  iconPosition="left"
                  fullWidth
                >
                  Save All Changes
                </Button>
              )}
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 p-4 bg-primary/10 rounded-sm border border-primary/20">
            <div className="flex items-start space-x-3">
              <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
              <div>
                <h3 className="font-medium text-foreground mb-1">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Having trouble with settings? Check out our help documentation or contact support.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="link" size="sm">Documentation</Button>
                  <Button variant="link" size="sm">Contact Support</Button>
                  <Button variant="link" size="sm">Keyboard Shortcuts</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              CodeCrafts Adventure v1.0.0 • Settings last updated: {new Date()?.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 p-4 bg-warning text-warning-foreground rounded-sm retro-shadow">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm">You have unsaved changes</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveAllSettings}
              className="text-warning-foreground hover:bg-warning/20"
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsGameConfiguration;