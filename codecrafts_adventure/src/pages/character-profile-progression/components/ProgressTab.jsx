import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProgressTab = ({ isDesktop = false }) => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [selectedQuest, setSelectedQuest] = useState(null);

  const timeFilterOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'recent', label: 'Recent Activity' }
  ];

  const skillProgress = [
    { 
      skill: 'JavaScript', 
      level: 8, 
      maxLevel: 10, 
      xp: 1200, 
      maxXp: 1500,
      color: 'bg-accent',
      description: 'Modern web development language'
    },
    { 
      skill: 'Python', 
      level: 6, 
      maxLevel: 10, 
      xp: 800, 
      maxXp: 1200,
      color: 'bg-primary',
      description: 'Versatile programming language'
    },
    { 
      skill: 'React', 
      level: 7, 
      maxLevel: 10, 
      xp: 950, 
      maxXp: 1350,
      color: 'bg-secondary',
      description: 'Frontend library for building UIs'
    },
    { 
      skill: 'Algorithms', 
      level: 5, 
      maxLevel: 10, 
      xp: 600, 
      maxXp: 1000,
      color: 'bg-success',
      description: 'Problem-solving methodologies'
    },
    { 
      skill: 'Data Structures', 
      level: 4, 
      maxLevel: 10, 
      xp: 400, 
      maxXp: 800,
      color: 'bg-warning',
      description: 'Organizing and storing data'
    }
  ];

  const questHistory = [
    {
      id: 1,
      title: 'Array Dragon',
      difficulty: 'beginner',
      completedDate: '2025-02-08',
      timeSpent: '12 minutes',
      xpEarned: 150,
      accuracy: 95,
      attempts: 1,
      category: 'Data Structures',
      codeSnippet: `function slayArrayDragon(arr) {\n  return arr.filter(item => item !== 'bug')\n    .map(item => item.toUpperCase());\n}`,
      description: 'Successfully defeated the Array Dragon by mastering array manipulation methods.',
      feedback: 'Excellent work! Your solution was clean and efficient.'
    },
    {
      id: 2,
      title: 'Loop Labyrinth',
      difficulty: 'beginner',
      completedDate: '2025-02-07',
      timeSpent: '18 minutes',
      xpEarned: 200,
      accuracy: 88,
      attempts: 2,
      category: 'Algorithms',
      codeSnippet: `function escapeLabyrinth(maze) {\n  for (let i = 0; i < maze.length; i++) {\n    if (maze[i] === 'exit') {\n      return i;\n    }\n  }\n  return -1;\n}`,
      description: 'Navigated through the Loop Labyrinth using iteration techniques.',
      feedback: 'Good solution! Consider edge cases for future challenges.'
    },
    {
      id: 3,
      title: 'Function Forest',
      difficulty: 'intermediate',
      completedDate: '2025-02-06',
      timeSpent: '25 minutes',
      xpEarned: 300,
      accuracy: 92,
      attempts: 1,
      category: 'Functions',
      codeSnippet: `function clearForest(trees) {\n  const processTree = (tree) => {\n    return tree.healthy ? tree.grow() : tree.remove();\n  };\n  \n  return trees.map(processTree);\n}`,
      description: 'Cleared the Function Forest by creating reusable and efficient functions.',
      feedback: 'Outstanding! Your functional approach was very elegant.'
    },
    {
      id: 4,
      title: 'Variable Valley',
      difficulty: 'beginner',
      completedDate: '2025-02-05',
      timeSpent: '8 minutes',
      xpEarned: 100,
      accuracy: 100,
      attempts: 1,
      category: 'Variables',
      codeSnippet: `let treasureChest = {\n  gold: 100,\n  gems: 25,\n  magic: true\n};\n\nconst totalValue = treasureChest.gold + treasureChest.gems;`,
      description: 'Explored Variable Valley and learned proper variable declaration and usage.',
      feedback: 'Perfect execution! You understand variable scope well.'
    },
    {
      id: 5,
      title: 'Conditional Castle',
      difficulty: 'intermediate',
      completedDate: '2025-02-04',
      timeSpent: '22 minutes',
      xpEarned: 250,
      accuracy: 85,
      attempts: 3,
      category: 'Conditionals',
      codeSnippet: `function enterCastle(player) {\n  if (player.level >= 5 && player.hasKey) {\n    return 'Welcome to the castle!';\n  } else if (player.level < 5) {\n    return 'Level up first!';\n  } else {\n    return 'Find the key!';\n  }\n}`,
      description: 'Conquered the Conditional Castle using if-else logic and boolean operations.',
      feedback: 'Well done! Your conditional logic was clear and comprehensive.'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success bg-success/10 border-success';
      case 'intermediate': return 'text-warning bg-warning/10 border-warning';
      case 'advanced': return 'text-error bg-error/10 border-error';
      default: return 'text-muted-foreground bg-muted/10 border-muted';
    }
  };

  const filteredQuests = questHistory?.filter(quest => {
    const questDate = new Date(quest.completedDate);
    const now = new Date();
    
    switch (timeFilter) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return questDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return questDate >= monthAgo;
      case 'recent':
        const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
        return questDate >= threeDaysAgo;
      default:
        return true;
    }
  });

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
  };

  const closeModal = () => {
    setSelectedQuest(null);
  };

  const totalXpEarned = questHistory?.reduce((sum, quest) => sum + quest?.xpEarned, 0);
  const averageAccuracy = Math.round(questHistory?.reduce((sum, quest) => sum + quest?.accuracy, 0) / questHistory?.length);

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="font-pixel text-pixel-lg text-accent">{questHistory?.length}</div>
          <div className="text-sm text-muted-foreground">Quests Completed</div>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="font-pixel text-pixel-lg text-success">{totalXpEarned?.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total XP Earned</div>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="font-pixel text-pixel-lg text-warning">{averageAccuracy}%</div>
          <div className="text-sm text-muted-foreground">Average Accuracy</div>
        </div>
      </div>
      {/* Skill Progression */}
      <div className="bg-card border border-border rounded-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
          <h3 className="font-pixel text-pixel-sm text-foreground">Skill Progression</h3>
        </div>
        <div className="space-y-4">
          {skillProgress?.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{skill?.skill}</span>
                  <span className="text-xs text-muted-foreground">Level {skill?.level}/{skill?.maxLevel}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {skill?.xp}/{skill?.maxXp} XP
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
                <div 
                  className={`h-full ${skill?.color} game-transition`}
                  style={{ width: `${(skill?.xp / skill?.maxXp) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{skill?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Quest Timeline */}
      <div className="bg-card border border-border rounded-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} color="var(--color-accent)" />
            <h3 className="font-pixel text-pixel-sm text-foreground">Quest Timeline</h3>
          </div>
          <Select
            options={timeFilterOptions}
            value={timeFilter}
            onChange={setTimeFilter}
            className="w-48"
          />
        </div>

        <div className="space-y-4">
          {filteredQuests?.map((quest, index) => (
            <div
              key={quest?.id}
              onClick={() => handleQuestClick(quest)}
              className="p-4 border border-border rounded-sm hover:bg-muted/20 cursor-pointer game-transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-pixel text-pixel-xs text-foreground">{quest?.title}</h4>
                    <span className={`px-2 py-1 rounded-sm text-xs font-medium border capitalize ${getDifficultyColor(quest?.difficulty)}`}>
                      {quest?.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{quest?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{new Date(quest.completedDate)?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{quest?.timeSpent}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={12} />
                      <span>{quest?.accuracy}% accuracy</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Icon name="Zap" size={14} color="var(--color-accent)" />
                    <span className="text-sm text-accent font-medium">+{quest?.xpEarned} XP</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{quest?.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredQuests?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Clock" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No quests found for the selected time period</p>
            <Button variant="ghost" onClick={() => setTimeFilter('all')}>
              Show All Quests
            </Button>
          </div>
        )}
      </div>
      {/* Quest Detail Modal */}
      {selectedQuest && (
        <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm" onClick={closeModal}>
          <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-card border border-border rounded-sm retro-shadow overflow-hidden" onClick={(e) => e?.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <h2 className="font-pixel text-pixel-lg text-foreground">{selectedQuest?.title}</h2>
                  <span className={`px-2 py-1 rounded-sm text-xs font-medium border capitalize ${getDifficultyColor(selectedQuest?.difficulty)}`}>
                    {selectedQuest?.difficulty}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={closeModal} iconName="X" iconSize={20} />
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-6">
                {/* Quest Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-muted-foreground">Completed: {new Date(selectedQuest.completedDate)?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-muted-foreground">Time Spent: {selectedQuest?.timeSpent}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-muted-foreground">Accuracy: {selectedQuest?.accuracy}%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Zap" size={16} color="var(--color-accent)" />
                      <span className="text-sm text-foreground">XP Earned: +{selectedQuest?.xpEarned}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="RotateCcw" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-muted-foreground">Attempts: {selectedQuest?.attempts}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Tag" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-muted-foreground">Category: {selectedQuest?.category}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Quest Summary</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedQuest?.description}
                  </p>
                </div>

                {/* Code Solution */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Your Solution</h3>
                  <div className="bg-muted/20 border border-border rounded-sm p-4 overflow-x-auto">
                    <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                      <code>{selectedQuest?.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Feedback</h3>
                  <div className="p-4 bg-success/10 border border-success/20 rounded-sm">
                    <p className="text-sm text-foreground">{selectedQuest?.feedback}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button variant="outline" iconName="RotateCcw" iconPosition="left">
                Retry Quest
              </Button>
              <Button variant="ghost" iconName="Share" iconPosition="left">
                Share Solution
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTab;