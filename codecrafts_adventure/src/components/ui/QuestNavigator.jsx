import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const QuestNavigator = ({ 
  isCollapsed = false,
  onQuestSelect = () => {},
  selectedQuest = null 
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'data-structures', label: 'Data Structures' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'game-development', label: 'Game Development' },
    { value: 'databases', label: 'Databases' }
  ];

  const quests = [
    {
      id: 1,
      title: 'The Array Dragon',
      difficulty: 'beginner',
      category: 'data-structures',
      xpReward: 150,
      timeEstimate: '15 min',
      description: 'Master array manipulation to defeat the Array Dragon',
      completed: true,
      locked: false,
      prerequisites: []
    },
    {
      id: 2,
      title: 'Loop Labyrinth',
      difficulty: 'beginner',
      category: 'algorithms',
      xpReward: 200,
      timeEstimate: '20 min',
      description: 'Navigate through complex loops to escape the labyrinth',
      completed: false,
      locked: false,
      prerequisites: [1]
    },
    {
      id: 3,
      title: 'Function Forest',
      difficulty: 'intermediate',
      category: 'algorithms',
      xpReward: 300,
      timeEstimate: '30 min',
      description: 'Create powerful functions to clear the enchanted forest',
      completed: false,
      locked: false,
      prerequisites: [1, 2]
    },
    {
      id: 4,
      title: 'Object Oriented Odyssey',
      difficulty: 'intermediate',
      category: 'web-development',
      xpReward: 400,
      timeEstimate: '45 min',
      description: 'Build classes and objects to complete your epic journey',
      completed: false,
      locked: true,
      prerequisites: [1, 2, 3]
    },
    {
      id: 5,
      title: 'Database Dungeon',
      difficulty: 'advanced',
      category: 'databases',
      xpReward: 500,
      timeEstimate: '60 min',
      description: 'Query your way through the depths of the database dungeon',
      completed: false,
      locked: true,
      prerequisites: [1, 2, 3, 4]
    }
  ];

  const filteredQuests = quests?.filter(quest => {
    const matchesDifficulty = selectedDifficulty === 'all' || quest?.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || quest?.category === selectedCategory;
    const matchesSearch = quest?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         quest?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success';
      case 'intermediate': return 'text-warning';
      case 'advanced': return 'text-error';
      case 'expert': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Leaf';
      case 'intermediate': return 'Flame';
      case 'advanced': return 'Sword';
      case 'expert': return 'Crown';
      default: return 'Circle';
    }
  };

  const handleQuestClick = (quest) => {
    if (!quest?.locked) {
      onQuestSelect(quest);
    }
  };

  return (
    <div className={`bg-card border-r border-border h-full flex flex-col ${
      isCollapsed ? 'w-16' : 'w-80'
    } game-transition`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Map" size={20} color="var(--color-accent)" />
          {!isCollapsed && (
            <h2 className="font-pixel text-pixel-sm text-accent">Quest Map</h2>
          )}
        </div>

        {/* Search and Filters */}
        {!isCollapsed && (
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search quests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-sm text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring game-transition"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-2">
              <Select
                options={difficultyOptions}
                value={selectedDifficulty}
                onChange={setSelectedDifficulty}
                placeholder="Filter by difficulty"
              />
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Filter by category"
              />
            </div>
          </div>
        )}
      </div>
      {/* Quest List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredQuests?.map((quest) => (
          <div
            key={quest?.id}
            onClick={() => handleQuestClick(quest)}
            className={`p-4 rounded-sm border cursor-pointer game-transition ${
              quest?.locked 
                ? 'border-muted bg-muted/20 opacity-50 cursor-not-allowed' 
                : quest?.completed
                ? 'border-success bg-success/10 hover:bg-success/20'
                : selectedQuest?.id === quest?.id
                ? 'border-accent bg-accent/10' :'border-border bg-card hover:bg-muted'
            }`}
          >
            {isCollapsed ? (
              <div className="flex flex-col items-center space-y-2">
                <Icon 
                  name={getDifficultyIcon(quest?.difficulty)} 
                  size={20} 
                  className={getDifficultyColor(quest?.difficulty)} 
                />
                {quest?.completed && (
                  <Icon name="Check" size={16} color="var(--color-success)" />
                )}
                {quest?.locked && (
                  <Icon name="Lock" size={16} color="var(--color-muted-foreground)" />
                )}
              </div>
            ) : (
              <>
                {/* Quest Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getDifficultyIcon(quest?.difficulty)} 
                      size={16} 
                      className={getDifficultyColor(quest?.difficulty)} 
                    />
                    <h3 className="font-pixel text-pixel-xs text-foreground">{quest?.title}</h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    {quest?.completed && (
                      <Icon name="Check" size={16} color="var(--color-success)" />
                    )}
                    {quest?.locked && (
                      <Icon name="Lock" size={16} color="var(--color-muted-foreground)" />
                    )}
                  </div>
                </div>

                {/* Quest Details */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {quest?.description}
                </p>

                {/* Quest Stats */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={12} color="var(--color-accent)" />
                      <span className="text-accent font-medium">{quest?.xpReward} XP</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground">{quest?.timeEstimate}</span>
                    </div>
                  </div>
                  <span className={`capitalize font-medium ${getDifficultyColor(quest?.difficulty)}`}>
                    {quest?.difficulty}
                  </span>
                </div>

                {/* Prerequisites */}
                {quest?.prerequisites?.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <div className="flex items-center space-x-1">
                      <Icon name="Link" size={12} color="var(--color-muted-foreground)" />
                      <span className="text-xs text-muted-foreground">
                        Requires: {quest?.prerequisites?.length} quest{quest?.prerequisites?.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {filteredQuests?.length === 0 && !isCollapsed && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">No quests found matching your criteria</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedDifficulty('all');
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="mt-2"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="font-pixel text-pixel-xs text-success">
                {quests?.filter(q => q?.completed)?.length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="font-pixel text-pixel-xs text-accent">
                {quests?.filter(q => !q?.locked && !q?.completed)?.length}
              </div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestNavigator;