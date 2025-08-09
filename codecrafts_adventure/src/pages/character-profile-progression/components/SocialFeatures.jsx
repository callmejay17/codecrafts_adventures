import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialFeatures = ({ isDesktop = false }) => {
  const [activeTab, setActiveTab] = useState('friends');

  const friends = [
    {
      id: 1,
      name: 'AlgoMaster',
      level: 15,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      status: 'online',
      currentQuest: 'Database Dungeon',
      totalXp: 8750,
      lastActive: 'now'
    },
    {
      id: 2,
      name: 'CodeNinja',
      level: 18,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      status: 'offline',
      currentQuest: 'Completed all quests',
      totalXp: 12400,
      lastActive: '2 hours ago'
    },
    {
      id: 3,
      name: 'DebugHero',
      level: 10,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      status: 'online',
      currentQuest: 'Function Forest',
      totalXp: 4200,
      lastActive: 'now'
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'CodeMaster Pro',
      level: 25,
      totalXp: 18500,
      questsCompleted: 45,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      badge: 'legendary'
    },
    {
      rank: 2,
      name: 'AlgorithmQueen',
      level: 23,
      totalXp: 16200,
      questsCompleted: 42,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      badge: 'epic'
    },
    {
      rank: 3,
      name: 'BugSlayer',
      level: 22,
      totalXp: 15800,
      questsCompleted: 40,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      badge: 'epic'
    },
    {
      rank: 4,
      name: 'CodeCrafter',
      level: 12,
      totalXp: 5750,
      questsCompleted: 23,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      badge: 'rare',
      isCurrentUser: true
    },
    {
      rank: 5,
      name: 'SyntaxSorcerer',
      level: 11,
      totalXp: 5200,
      questsCompleted: 21,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      badge: 'rare'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'AlgoMaster',
      action: 'completed',
      target: 'Array Dragon quest',
      time: '5 minutes ago',
      xp: 150,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      user: 'CodeNinja',
      action: 'unlocked',
      target: 'Speed Coder achievement',
      time: '1 hour ago',
      xp: 200,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      user: 'DebugHero',
      action: 'reached',
      target: 'Level 10',
      time: '3 hours ago',
      xp: 500,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'legendary': return 'bg-warning text-warning-foreground';
      case 'epic': return 'bg-accent text-accent-foreground';
      case 'rare': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-success' : 'bg-muted';
  };

  const shareAchievement = () => {
    console.log('Sharing achievement to social media');
  };

  const inviteFriend = () => {
    console.log('Inviting friend to join');
  };

  return (
    <div className="space-y-6">
      {/* Social Navigation */}
      <div className="flex border-b border-border bg-muted/10 rounded-sm">
        {[
          { id: 'friends', label: 'Friends', icon: 'Users' },
          { id: 'leaderboard', label: 'Leaderboard', icon: 'Trophy' },
          { id: 'activity', label: 'Activity', icon: 'Activity' }
        ]?.map((tab) => (
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
      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-pixel text-pixel-sm text-foreground">Your Friends ({friends?.length})</h3>
            <Button variant="outline" size="sm" onClick={inviteFriend} iconName="UserPlus" iconPosition="left">
              Invite Friends
            </Button>
          </div>

          <div className="grid gap-4">
            {friends?.map((friend) => (
              <div key={friend?.id} className="bg-card border border-border rounded-sm p-4 hover:bg-muted/20 game-transition">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-secondary rounded-sm overflow-hidden">
                      <img 
                        src={friend?.avatar} 
                        alt={friend?.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(friend?.status)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-pixel text-pixel-xs text-foreground">{friend?.name}</h4>
                      <span className="text-xs text-muted-foreground">Level {friend?.level}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{friend?.currentQuest}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{friend?.totalXp?.toLocaleString()} XP</span>
                      <span>Last active: {friend?.lastActive}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="MessageCircle" />
                    <Button variant="ghost" size="sm" iconName="UserX" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-pixel text-pixel-sm text-foreground">Global Leaderboard</h3>
            <div className="text-sm text-muted-foreground">Updated hourly</div>
          </div>

          <div className="space-y-3">
            {leaderboard?.map((player) => (
              <div 
                key={player?.rank} 
                className={`p-4 rounded-sm border game-transition ${
                  player?.isCurrentUser 
                    ? 'border-accent bg-accent/10 hover:bg-accent/20' :'border-border bg-card hover:bg-muted/20'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center font-pixel text-pixel-xs ${
                      player?.rank <= 3 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {player?.rank}
                    </div>
                    <div className="w-10 h-10 bg-secondary rounded-sm overflow-hidden">
                      <img 
                        src={player?.avatar} 
                        alt={player?.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-pixel text-pixel-xs text-foreground">{player?.name}</h4>
                      {player?.isCurrentUser && (
                        <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm text-xs font-medium">
                          You
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-sm text-xs font-medium capitalize ${getBadgeColor(player?.badge)}`}>
                        {player?.badge}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Level {player?.level}</span>
                      <span>{player?.totalXp?.toLocaleString()} XP</span>
                      <span>{player?.questsCompleted} quests</span>
                    </div>
                  </div>

                  {player?.rank <= 3 && (
                    <Icon 
                      name={player?.rank === 1 ? 'Crown' : 'Medal'} 
                      size={20} 
                      color="var(--color-accent)" 
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-pixel text-pixel-sm text-foreground">Recent Activity</h3>
            <Button variant="outline" size="sm" onClick={shareAchievement} iconName="Share" iconPosition="left">
              Share Progress
            </Button>
          </div>

          <div className="space-y-3">
            {recentActivity?.map((activity) => (
              <div key={activity?.id} className="bg-card border border-border rounded-sm p-4 hover:bg-muted/20 game-transition">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-secondary rounded-sm overflow-hidden">
                    <img 
                      src={activity?.avatar} 
                      alt={activity?.user}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm text-foreground mb-1">
                      <span className="font-medium">{activity?.user}</span> {activity?.action} <span className="font-medium">{activity?.target}</span>
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{activity?.time}</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Zap" size={12} color="var(--color-accent)" />
                        <span className="text-accent">+{activity?.xp} XP</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Heart" />
                    <Button variant="ghost" size="sm" iconName="MessageCircle" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Sharing */}
          <div className="bg-card border border-border rounded-sm p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Icon name="Share" size={20} color="var(--color-accent)" />
                <h4 className="font-pixel text-pixel-sm text-foreground">Share Your Progress</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Let your friends know about your coding achievements!
              </p>
              <div className="flex items-center justify-center space-x-3">
                <Button variant="outline" size="sm" iconName="Twitter">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" iconName="Facebook">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" iconName="Linkedin">
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialFeatures;