import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHUD from '../../components/ui/GameHUD';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CharacterAvatar from './components/CharacterAvatar';
import StatsTab from './components/StatsTab';
import InventoryTab from './components/InventoryTab';
import AchievementsTab from './components/AchievementsTab';
import ProgressTab from './components/ProgressTab';
import SocialFeatures from './components/SocialFeatures';

const CharacterProfileProgression = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [isDesktop, setIsDesktop] = useState(false);

  // Mock character data
  const character = {
    name: 'CodeCrafter',
    level: 12,
    xp: 2450,
    maxXp: 3000,
    health: 85,
    maxHealth: 100,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
    class: 'Full Stack Wizard',
    joinDate: '2025-01-15',
    totalXp: 15750,
    questsCompleted: 23,
    achievements: 8,
    streak: 7,
    bugsDefeated: 47,
    linesOfCode: 2847
  };

  const tabs = [
    { id: 'stats', label: 'Stats', icon: 'BarChart3', description: 'Character statistics and skill tree' },
    { id: 'inventory', label: 'Inventory', icon: 'Package', description: 'Items, weapons, and equipment' },
    { id: 'achievements', label: 'Achievements', icon: 'Trophy', description: 'Unlocked badges and milestones' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp', description: 'Quest timeline and skill progression' },
    { id: 'social', label: 'Social', icon: 'Users', description: 'Friends, leaderboard, and activity' }
  ];

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return <StatsTab character={character} isDesktop={isDesktop} />;
      case 'inventory':
        return <InventoryTab isDesktop={isDesktop} />;
      case 'achievements':
        return <AchievementsTab isDesktop={isDesktop} />;
      case 'progress':
        return <ProgressTab isDesktop={isDesktop} />;
      case 'social':
        return <SocialFeatures isDesktop={isDesktop} />;
      default:
        return <StatsTab character={character} isDesktop={isDesktop} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GameHUD character={character} />
      <div className="pt-16">
        {isDesktop ? (
          // Desktop Layout - Sidebar + Content
          (<div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-80 bg-card border-r border-border overflow-y-auto">
              <div className="p-6">
                <CharacterAvatar character={character} isDesktop={true} />
              </div>
              
              {/* Navigation */}
              <nav className="px-4 pb-6">
                <div className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => handleTabChange(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm text-left game-transition ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={20} />
                      <div className="flex-1">
                        <div className="font-medium">{tab?.label}</div>
                        <div className="text-xs opacity-80">{tab?.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </nav>

              {/* Quick Actions */}
              <div className="px-4 pb-6 border-t border-border pt-4">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => handleNavigation('/main-game-interface')}
                    iconName="Gamepad2"
                    iconPosition="left"
                  >
                    Return to Game
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    onClick={() => handleNavigation('/quest-map-challenge-selection')}
                    iconName="Map"
                    iconPosition="left"
                  >
                    Quest Map
                  </Button>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="font-pixel text-pixel-xl text-foreground mb-2">
                        {tabs?.find(tab => tab?.id === activeTab)?.label}
                      </h1>
                      <p className="text-muted-foreground">
                        {tabs?.find(tab => tab?.id === activeTab)?.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleNavigation('/settings-game-configuration')}
                      iconName="Settings"
                      iconPosition="left"
                    >
                      Settings
                    </Button>
                  </div>
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>)
        ) : (
          // Mobile Layout - Stacked
          (<div className="pb-20">
            {/* Character Avatar */}
            <div className="p-4">
              <CharacterAvatar character={character} isDesktop={false} />
            </div>
            {/* Tab Navigation */}
            <div className="sticky top-16 z-10 bg-background border-b border-border">
              <div className="flex overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => handleTabChange(tab?.id)}
                    className={`flex-shrink-0 px-4 py-3 text-sm font-medium game-transition flex items-center space-x-2 ${
                      activeTab === tab?.id
                        ? 'text-accent border-b-2 border-accent bg-accent/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Content */}
            <div className="p-4">
              {renderTabContent()}
            </div>
            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-20">
              <div className="grid grid-cols-4 gap-1 p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('/main-game-interface')}
                  iconName="Gamepad2"
                  className="flex-col h-12 text-xs"
                >
                  Game
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('/quest-map-challenge-selection')}
                  iconName="Map"
                  className="flex-col h-12 text-xs"
                >
                  Quests
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="User"
                  className="flex-col h-12 text-xs"
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('/settings-game-configuration')}
                  iconName="Settings"
                  className="flex-col h-12 text-xs"
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

export default CharacterProfileProgression;