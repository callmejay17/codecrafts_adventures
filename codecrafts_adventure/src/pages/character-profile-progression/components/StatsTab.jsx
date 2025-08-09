import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsTab = ({ character, isDesktop = false }) => {
  const stats = [
    { 
      label: 'Total XP Earned', 
      value: character?.totalXp?.toLocaleString(), 
      icon: 'Zap', 
      color: 'text-accent',
      description: 'Experience points gained from all activities'
    },
    { 
      label: 'Quests Completed', 
      value: character?.questsCompleted, 
      icon: 'CheckCircle', 
      color: 'text-success',
      description: 'Successfully finished coding challenges'
    },
    { 
      label: 'Bugs Defeated', 
      value: character?.bugsDefeated || 47, 
      icon: 'Bug', 
      color: 'text-error',
      description: 'Code errors fixed and resolved'
    },
    { 
      label: 'Lines of Code', 
      value: (character?.linesOfCode || 2847)?.toLocaleString(), 
      icon: 'Code', 
      color: 'text-primary',
      description: 'Total lines of code written'
    },
    { 
      label: 'Current Streak', 
      value: `${character?.streak} days`, 
      icon: 'Flame', 
      color: 'text-warning',
      description: 'Consecutive days of coding activity'
    },
    { 
      label: 'Achievements', 
      value: character?.achievements, 
      icon: 'Trophy', 
      color: 'text-accent',
      description: 'Unlocked badges and milestones'
    }
  ];

  const skillTree = [
    { 
      skill: 'Variables', 
      mastered: true, 
      icon: 'Database', 
      description: 'Data storage and manipulation' 
    },
    { 
      skill: 'Loops', 
      mastered: true, 
      icon: 'RotateCw', 
      description: 'Iteration and repetition control' 
    },
    { 
      skill: 'Functions', 
      mastered: true, 
      icon: 'Zap', 
      description: 'Reusable code blocks and procedures' 
    },
    { 
      skill: 'Algorithms', 
      mastered: false, 
      icon: 'Brain', 
      description: 'Problem-solving methodologies' 
    },
    { 
      skill: 'Data Structures', 
      mastered: false, 
      icon: 'Network', 
      description: 'Organizing and storing data efficiently' 
    },
    { 
      skill: 'Object-Oriented', 
      mastered: false, 
      icon: 'Box', 
      description: 'Classes, objects, and inheritance' 
    }
  ];

  const favoriteLanguages = [
    { name: 'JavaScript', percentage: 65, color: 'bg-accent' },
    { name: 'Python', percentage: 25, color: 'bg-primary' },
    { name: 'HTML/CSS', percentage: 10, color: 'bg-secondary' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className={`grid gap-4 ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {stats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-sm p-4 hover:bg-muted/20 game-transition">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-sm bg-muted ${stat?.color}`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-pixel text-pixel-sm text-foreground mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{stat?.label}</div>
                {isDesktop && (
                  <div className="text-xs text-muted-foreground">{stat?.description}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Skill Tree */}
      <div className="bg-card border border-border rounded-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TreePine" size={20} color="var(--color-accent)" />
          <h3 className="font-pixel text-pixel-sm text-foreground">Skill Tree</h3>
        </div>
        <div className={`grid gap-3 ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {skillTree?.map((skill, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-sm border-2 game-transition ${
                skill?.mastered 
                  ? 'border-success bg-success/10 hover:bg-success/20' :'border-muted bg-muted/20 hover:bg-muted/30 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-sm ${
                  skill?.mastered ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={skill?.icon} size={16} />
                </div>
                <div className="flex-1">
                  <div className="font-pixel text-pixel-xs text-foreground">{skill?.skill}</div>
                  {skill?.mastered && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon name="Check" size={12} color="var(--color-success)" />
                      <span className="text-xs text-success">Mastered</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{skill?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Favorite Languages */}
      <div className="bg-card border border-border rounded-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Code2" size={20} color="var(--color-accent)" />
          <h3 className="font-pixel text-pixel-sm text-foreground">Favorite Languages</h3>
        </div>
        <div className="space-y-4">
          {favoriteLanguages?.map((lang, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground font-medium">{lang?.name}</span>
                <span className="text-sm text-muted-foreground">{lang?.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
                <div 
                  className={`h-full ${lang?.color} game-transition`}
                  style={{ width: `${lang?.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Activity Summary */}
      <div className="bg-card border border-border rounded-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Activity" size={20} color="var(--color-accent)" />
          <h3 className="font-pixel text-pixel-sm text-foreground">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-sm">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <div className="flex-1">
              <div className="text-sm text-foreground">Completed "Array Dragon" quest</div>
              <div className="text-xs text-muted-foreground">2 hours ago • +150 XP</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-sm">
            <Icon name="Trophy" size={16} color="var(--color-accent)" />
            <div className="flex-1">
              <div className="text-sm text-foreground">Unlocked "Bug Hunter" achievement</div>
              <div className="text-xs text-muted-foreground">1 day ago • +50 XP</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-sm">
            <Icon name="Flame" size={16} color="var(--color-warning)" />
            <div className="flex-1">
              <div className="text-sm text-foreground">Maintained 7-day coding streak</div>
              <div className="text-xs text-muted-foreground">Today • +25 XP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTab;