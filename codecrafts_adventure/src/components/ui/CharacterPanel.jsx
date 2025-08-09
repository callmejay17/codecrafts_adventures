import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CharacterPanel = ({ 
  isOpen = false, 
  onClose = () => {},
  character = {
    name: 'CodeCrafter',
    level: 12,
    xp: 2450,
    maxXp: 3000,
    health: 85,
    maxHealth: 100,
    avatar: '/assets/images/character-avatar.png',
    class: 'Full Stack Wizard',
    joinDate: '2025-01-15',
    totalXp: 15750,
    questsCompleted: 23,
    achievements: 8,
    streak: 7
  }
}) => {
  const [activeTab, setActiveTab] = useState('stats');

  const tabs = [
    { id: 'stats', label: 'Stats', icon: 'BarChart3' },
    { id: 'inventory', label: 'Inventory', icon: 'Package' },
    { id: 'achievements', label: 'Achievements', icon: 'Trophy' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  const stats = [
    { label: 'Level', value: character?.level, icon: 'Star', color: 'text-accent' },
    { label: 'Total XP', value: character?.totalXp?.toLocaleString(), icon: 'Zap', color: 'text-accent' },
    { label: 'Quests Completed', value: character?.questsCompleted, icon: 'CheckCircle', color: 'text-success' },
    { label: 'Current Streak', value: `${character?.streak} days`, icon: 'Flame', color: 'text-warning' },
    { label: 'Achievements', value: character?.achievements, icon: 'Trophy', color: 'text-accent' },
    { label: 'Member Since', value: new Date(character.joinDate)?.toLocaleDateString(), icon: 'Calendar', color: 'text-muted-foreground' }
  ];

  const inventory = [
    { id: 1, name: 'Debugging Sword', type: 'weapon', rarity: 'rare', description: 'Cuts through bugs with precision' },
    { id: 2, name: 'Logic Shield', type: 'armor', rarity: 'common', description: 'Protects against logical errors' },
    { id: 3, name: 'Refactor Potion', type: 'consumable', rarity: 'uncommon', description: 'Instantly improves code quality' },
    { id: 4, name: 'Algorithm Scroll', type: 'consumable', rarity: 'epic', description: 'Reveals optimal solutions' },
    { id: 5, name: 'Memory Crystal', type: 'accessory', rarity: 'legendary', description: 'Increases learning retention' }
  ];

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first quest', icon: 'Baby', unlocked: true, date: '2025-01-16' },
    { id: 2, name: 'Bug Hunter', description: 'Fix 10 bugs in a single quest', icon: 'Bug', unlocked: true, date: '2025-01-20' },
    { id: 3, name: 'Speed Coder', description: 'Complete a quest in under 5 minutes', icon: 'Zap', unlocked: true, date: '2025-01-25' },
    { id: 4, name: 'Perfectionist', description: 'Complete 5 quests with 100% accuracy', icon: 'Target', unlocked: false },
    { id: 5, name: 'Marathon Runner', description: 'Code for 4 hours straight', icon: 'Timer', unlocked: false },
    { id: 6, name: 'Master Craftsman', description: 'Reach level 25', icon: 'Crown', unlocked: false }
  ];

  const progressData = [
    { skill: 'JavaScript', level: 8, maxLevel: 10, xp: 1200, maxXp: 1500 },
    { skill: 'Python', level: 6, maxLevel: 10, xp: 800, maxXp: 1200 },
    { skill: 'React', level: 7, maxLevel: 10, xp: 950, maxXp: 1350 },
    { skill: 'Algorithms', level: 5, maxLevel: 10, xp: 600, maxXp: 1000 },
    { skill: 'Data Structures', level: 4, maxLevel: 10, xp: 400, maxXp: 800 }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground border-muted';
      case 'uncommon': return 'text-success border-success';
      case 'rare': return 'text-primary border-primary';
      case 'epic': return 'text-accent border-accent';
      case 'legendary': return 'text-warning border-warning';
      default: return 'text-muted-foreground border-muted';
    }
  };

  const xpPercentage = (character?.xp / character?.maxXp) * 100;
  const healthPercentage = (character?.health / character?.maxHealth) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-card border border-border rounded-sm retro-shadow overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-secondary rounded-sm flex items-center justify-center">
              <Icon name="User" size={32} color="var(--color-secondary-foreground)" />
            </div>
            <div>
              <h1 className="font-pixel text-pixel-lg text-foreground">{character?.name}</h1>
              <p className="text-sm text-muted-foreground">{character?.class}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Character Overview */}
        <div className="p-6 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* XP Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Experience</span>
                <span className="text-sm text-accent font-medium">
                  {character?.xp}/{character?.maxXp} XP
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-accent game-transition"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>

            {/* Health */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Health</span>
                <span className="text-sm text-error font-medium">
                  {character?.health}/{character?.maxHealth} HP
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-error game-transition"
                  style={{ width: `${healthPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-muted/10">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium game-transition flex items-center justify-center space-x-2 ${
                activeTab === tab?.id
                  ? 'text-accent border-b-2 border-accent bg-accent/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats?.map((stat, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-sm border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name={stat?.icon} size={20} className={stat?.color} />
                    <div>
                      <div className="font-pixel text-pixel-sm text-foreground">{stat?.value}</div>
                      <div className="text-xs text-muted-foreground">{stat?.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventory?.map((item) => (
                <div key={item?.id} className={`p-4 rounded-sm border-2 ${getRarityColor(item?.rarity)} bg-card hover:bg-muted/20 game-transition`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-pixel text-pixel-xs text-foreground">{item?.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-sm bg-muted ${getRarityColor(item?.rarity)} capitalize`}>
                      {item?.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item?.description}</p>
                  <div className="text-xs text-muted-foreground capitalize">{item?.type}</div>
                </div>
              ))}
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements?.map((achievement) => (
                <div key={achievement?.id} className={`p-4 rounded-sm border ${
                  achievement?.unlocked 
                    ? 'border-success bg-success/10' :'border-muted bg-muted/20 opacity-60'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-sm ${
                      achievement?.unlocked ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={achievement?.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-pixel text-pixel-xs text-foreground mb-1">{achievement?.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement?.description}</p>
                      {achievement?.unlocked && achievement?.date && (
                        <div className="text-xs text-success">
                          Unlocked on {new Date(achievement.date)?.toLocaleDateString()}
                        </div>
                      )}
                      {!achievement?.unlocked && (
                        <div className="text-xs text-muted-foreground">Locked</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h3 className="font-pixel text-pixel-sm text-foreground mb-4">Skill Progression</h3>
              {progressData?.map((skill, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-sm border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{skill?.skill}</span>
                    <span className="text-sm text-muted-foreground">
                      Level {skill?.level}/{skill?.maxLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      {skill?.xp}/{skill?.maxXp} XP
                    </span>
                    <span className="text-xs text-accent">
                      {Math.round((skill?.xp / skill?.maxXp) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
                    <div 
                      className="h-full bg-primary game-transition"
                      style={{ width: `${(skill?.xp / skill?.maxXp) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterPanel;