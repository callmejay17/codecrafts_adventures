import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AchievementsTab = ({ isDesktop = false }) => {
  const [filter, setFilter] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const filterOptions = [
    { value: 'all', label: 'All Achievements' },
    { value: 'unlocked', label: 'Unlocked' },
    { value: 'locked', label: 'Locked' },
    { value: 'recent', label: 'Recently Earned' }
  ];

  const achievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first coding quest and begin your programming journey.',
      icon: 'Baby',
      unlocked: true,
      unlockedDate: '2025-01-16',
      category: 'Beginner',
      rarity: 'common',
      xpReward: 50,
      progress: 100,
      requirements: 'Complete 1 quest',
      tips: 'Start with the Array Dragon quest for an easy introduction to coding challenges.'
    },
    {
      id: 2,
      name: 'Bug Hunter',
      description: 'Successfully identify and fix 10 bugs in a single coding session.',
      icon: 'Bug',
      unlocked: true,
      unlockedDate: '2025-01-20',
      category: 'Debugging',
      rarity: 'uncommon',
      xpReward: 100,
      progress: 100,
      requirements: 'Fix 10 bugs in one session',
      tips: 'Focus on syntax errors and logical mistakes to quickly accumulate bug fixes.'
    },
    {
      id: 3,
      name: 'Speed Coder',
      description: 'Complete any coding challenge in under 5 minutes with perfect accuracy.',
      icon: 'Zap',
      unlocked: true,
      unlockedDate: '2025-01-25',
      category: 'Performance',
      rarity: 'rare',
      xpReward: 200,
      progress: 100,
      requirements: 'Complete quest in &lt;5 minutes',
      tips: 'Practice basic algorithms to improve your coding speed and accuracy.'
    },
    {
      id: 4,
      name: 'Perfectionist',
      description: 'Achieve 100% accuracy on 5 consecutive coding challenges without any errors.',
      icon: 'Target',
      unlocked: false,
      unlockedDate: null,
      category: 'Accuracy',
      rarity: 'epic',
      xpReward: 300,
      progress: 60,
      requirements: '5 perfect quests in a row',
      tips: 'Take your time to review code before submission. Current progress: 3/5 perfect quests.'
    },
    {
      id: 5,
      name: 'Marathon Runner',
      description: 'Code continuously for 4 hours straight without taking a break.',
      icon: 'Timer',
      unlocked: false,
      unlockedDate: null,
      category: 'Endurance',
      rarity: 'epic',
      xpReward: 400,
      progress: 25,
      requirements: '4 hours continuous coding',
      tips: 'Plan your coding sessions and stay hydrated. Current progress: 1 hour completed.'
    },
    {
      id: 6,
      name: 'Master Craftsman',
      description: 'Reach level 25 and demonstrate mastery across multiple programming concepts.',
      icon: 'Crown',
      unlocked: false,
      unlockedDate: null,
      category: 'Mastery',
      rarity: 'legendary',
      xpReward: 500,
      progress: 48,
      requirements: 'Reach level 25',
      tips: 'Continue completing quests and challenges. Current level: 12/25.'
    },
    {
      id: 7,
      name: 'Social Coder',
      description: 'Share your achievements and connect with 10 other coding adventurers.',
      icon: 'Users',
      unlocked: false,
      unlockedDate: null,
      category: 'Social',
      rarity: 'uncommon',
      xpReward: 150,
      progress: 30,
      requirements: 'Connect with 10 users',
      tips: 'Use the social features to connect with other learners. Current connections: 3/10.'
    },
    {
      id: 8,
      name: 'Algorithm Master',
      description: 'Successfully solve 20 algorithm-based challenges with optimal solutions.',
      icon: 'Brain',
      unlocked: false,
      unlockedDate: null,
      category: 'Algorithms',
      rarity: 'epic',
      xpReward: 350,
      progress: 15,
      requirements: '20 optimal algorithm solutions',
      tips: 'Focus on time and space complexity. Current progress: 3/20 optimal solutions.'
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-muted text-muted-foreground';
      case 'uncommon': return 'border-success text-success';
      case 'rare': return 'border-primary text-primary';
      case 'epic': return 'border-accent text-accent';
      case 'legendary': return 'border-warning text-warning';
      default: return 'border-muted text-muted-foreground';
    }
  };

  const getRarityBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-muted text-muted-foreground';
      case 'uncommon': return 'bg-success text-success-foreground';
      case 'rare': return 'bg-primary text-primary-foreground';
      case 'epic': return 'bg-accent text-accent-foreground';
      case 'legendary': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredAchievements = achievements?.filter(achievement => {
    switch (filter) {
      case 'unlocked': return achievement?.unlocked;
      case 'locked': return !achievement?.unlocked;
      case 'recent': return achievement?.unlocked && new Date(achievement.unlockedDate) > new Date('2025-01-20');
      default: return true;
    }
  });

  const unlockedCount = achievements?.filter(a => a?.unlocked)?.length;
  const totalCount = achievements?.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const closeModal = () => {
    setSelectedAchievement(null);
  };

  const shareAchievement = (achievement) => {
    // Mock share functionality
    console.log(`Sharing achievement: ${achievement?.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Achievement Overview */}
      <div className="bg-card border border-border rounded-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Trophy" size={24} color="var(--color-accent)" />
            <div>
              <h3 className="font-pixel text-pixel-sm text-foreground">Achievement Progress</h3>
              <p className="text-sm text-muted-foreground">{unlockedCount} of {totalCount} unlocked</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-pixel text-pixel-lg text-accent">{completionPercentage}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>
        
        <div className="w-full h-3 bg-muted rounded-sm overflow-hidden">
          <div 
            className="h-full bg-accent game-transition"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Select
          options={filterOptions}
          value={filter}
          onChange={setFilter}
          placeholder="Filter achievements"
          className="w-full sm:w-64"
        />
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-sm"></div>
            <span>Unlocked ({achievements?.filter(a => a?.unlocked)?.length})</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-muted rounded-sm"></div>
            <span>Locked ({achievements?.filter(a => !a?.unlocked)?.length})</span>
          </div>
        </div>
      </div>
      {/* Achievements Grid */}
      <div className={`grid gap-4 ${isDesktop ? 'grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {filteredAchievements?.map((achievement) => (
          <div
            key={achievement?.id}
            onClick={() => handleAchievementClick(achievement)}
            className={`p-4 rounded-sm border-2 cursor-pointer game-transition hover:scale-105 ${
              achievement?.unlocked 
                ? `${getRarityColor(achievement?.rarity)} bg-card hover:bg-muted/20` 
                : 'border-muted bg-muted/20 opacity-60 hover:opacity-80'
            }`}
          >
            {/* Achievement Header */}
            <div className="flex items-start justify-between mb-3">
              <div className={`p-3 rounded-sm ${
                achievement?.unlocked 
                  ? getRarityBadgeColor(achievement?.rarity)
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={achievement?.icon} size={24} />
              </div>
              {achievement?.unlocked && (
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={16} color="var(--color-success)" />
                  <span className="text-xs text-success font-medium">Unlocked</span>
                </div>
              )}
            </div>

            {/* Achievement Info */}
            <div className="space-y-2">
              <h3 className="font-pixel text-pixel-xs text-foreground">{achievement?.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{achievement?.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-sm font-medium capitalize ${getRarityBadgeColor(achievement?.rarity)}`}>
                  {achievement?.rarity}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={12} color="var(--color-accent)" />
                  <span className="text-xs text-accent font-medium">+{achievement?.xpReward} XP</span>
                </div>
              </div>

              {/* Progress Bar for Locked Achievements */}
              {!achievement?.unlocked && achievement?.progress > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs text-accent">{achievement?.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
                    <div 
                      className="h-full bg-accent game-transition"
                      style={{ width: `${achievement?.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Unlock Date */}
              {achievement?.unlocked && achievement?.unlockedDate && (
                <div className="text-xs text-success">
                  Unlocked {new Date(achievement.unlockedDate)?.toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredAchievements?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Trophy" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No achievements found matching your criteria</p>
          <Button variant="ghost" onClick={() => setFilter('all')}>
            Show All Achievements
          </Button>
        </div>
      )}
      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm" onClick={closeModal}>
          <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-card border border-border rounded-sm retro-shadow overflow-hidden" onClick={(e) => e?.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-sm flex items-center justify-center ${
                  selectedAchievement?.unlocked 
                    ? getRarityBadgeColor(selectedAchievement?.rarity)
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={selectedAchievement?.icon} size={32} />
                </div>
                <div>
                  <h2 className="font-pixel text-pixel-lg text-foreground">{selectedAchievement?.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-sm text-xs font-medium capitalize ${getRarityBadgeColor(selectedAchievement?.rarity)}`}>
                      {selectedAchievement?.rarity}
                    </span>
                    <span className="text-sm text-muted-foreground">{selectedAchievement?.category}</span>
                    {selectedAchievement?.unlocked && (
                      <span className="px-2 py-1 bg-success text-success-foreground rounded-sm text-xs font-medium">
                        Unlocked
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={closeModal} iconName="X" iconSize={20} />
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedAchievement?.description}
                  </p>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Requirements</h3>
                  <div className="p-3 bg-muted/20 rounded-sm">
                    <p className="text-sm text-foreground" dangerouslySetInnerHTML={{ __html: selectedAchievement?.requirements }} />
                  </div>
                </div>

                {/* Progress */}
                {!selectedAchievement?.unlocked && (
                  <div>
                    <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Progress</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Completion</span>
                        <span className="text-sm text-accent font-medium">{selectedAchievement?.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-sm overflow-hidden">
                        <div 
                          className="h-full bg-accent game-transition"
                          style={{ width: `${selectedAchievement?.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Tips</h3>
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-sm">
                    <p className="text-sm text-foreground">{selectedAchievement?.tips}</p>
                  </div>
                </div>

                {/* Reward */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Reward</h3>
                  <div className="flex items-center space-x-2 p-3 bg-accent/10 border border-accent/20 rounded-sm">
                    <Icon name="Zap" size={20} color="var(--color-accent)" />
                    <span className="text-sm text-foreground font-medium">+{selectedAchievement?.xpReward} XP</span>
                  </div>
                </div>

                {/* Unlock Date */}
                {selectedAchievement?.unlocked && selectedAchievement?.unlockedDate && (
                  <div>
                    <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Unlocked</h3>
                    <div className="flex items-center space-x-2 text-sm text-success">
                      <Icon name="Calendar" size={16} />
                      <span>{new Date(selectedAchievement.unlockedDate)?.toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            {selectedAchievement?.unlocked && (
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={() => shareAchievement(selectedAchievement)}
                  iconName="Share" 
                  iconPosition="left"
                >
                  Share Achievement
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsTab;