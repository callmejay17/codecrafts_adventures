import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const QuestFilters = ({ 
  filters, 
  onFiltersChange,
  questStats = { total: 0, completed: 0, available: 0, locked: 0 }
}) => {
  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const topicOptions = [
    { value: 'all', label: 'All Topics' },
    { value: 'variables', label: 'Variables & Data Types' },
    { value: 'loops', label: 'Loops & Iteration' },
    { value: 'functions', label: 'Functions & Methods' },
    { value: 'arrays', label: 'Arrays & Lists' },
    { value: 'objects', label: 'Objects & Classes' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'data-structures', label: 'Data Structures' },
    { value: 'debugging', label: 'Debugging & Testing' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'game-development', label: 'Game Development' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'available', label: 'Available' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'locked', label: 'Locked' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      difficulty: 'all',
      topic: 'all',
      status: 'all',
      showOnlyUnlocked: false,
      sortBy: 'order'
    });
  };

  const hasActiveFilters = 
    filters?.search !== '' ||
    filters?.difficulty !== 'all' ||
    filters?.topic !== 'all' ||
    filters?.status !== 'all' ||
    filters?.showOnlyUnlocked ||
    filters?.sortBy !== 'order';

  return (
    <div className="h-full bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} color="var(--color-accent)" />
            <h2 className="font-pixel text-pixel-sm text-accent">Quest Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground game-transition"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search quests..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="mb-4"
        />
      </div>
      {/* Filters */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Difficulty Filter */}
        <div>
          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={filters?.difficulty}
            onChange={(value) => handleFilterChange('difficulty', value)}
          />
        </div>

        {/* Topic Filter */}
        <div>
          <Select
            label="Programming Topic"
            options={topicOptions}
            value={filters?.topic}
            onChange={(value) => handleFilterChange('topic', value)}
            searchable
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            label="Quest Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground text-sm">Options</h3>
          
          <Checkbox
            label="Show only unlocked quests"
            description="Hide locked and prerequisite-blocked quests"
            checked={filters?.showOnlyUnlocked}
            onChange={(e) => handleFilterChange('showOnlyUnlocked', e?.target?.checked)}
          />
        </div>

        {/* Sort Options */}
        <div>
          <Select
            label="Sort By"
            options={[
              { value: 'order', label: 'Story Order' },
              { value: 'difficulty', label: 'Difficulty Level' },
              { value: 'xp', label: 'XP Reward' },
              { value: 'time', label: 'Estimated Time' },
              { value: 'title', label: 'Alphabetical' }
            ]}
            value={filters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground text-sm">Quick Filters</h3>
          
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleFilterChange('difficulty', 'beginner')}
              className="p-2 text-left text-sm rounded-sm border border-border hover:bg-muted game-transition flex items-center space-x-2"
            >
              <Icon name="Leaf" size={16} color="var(--color-success)" />
              <span>Beginner Quests</span>
            </button>
            
            <button
              onClick={() => handleFilterChange('status', 'available')}
              className="p-2 text-left text-sm rounded-sm border border-border hover:bg-muted game-transition flex items-center space-x-2"
            >
              <Icon name="Play" size={16} color="var(--color-primary)" />
              <span>Ready to Start</span>
            </button>
            
            <button
              onClick={() => handleFilterChange('topic', 'algorithms')}
              className="p-2 text-left text-sm rounded-sm border border-border hover:bg-muted game-transition flex items-center space-x-2"
            >
              <Icon name="Cpu" size={16} color="var(--color-accent)" />
              <span>Algorithm Challenges</span>
            </button>
          </div>
        </div>
      </div>
      {/* Quest Statistics */}
      <div className="p-4 border-t border-border bg-muted/20">
        <h3 className="font-pixel text-pixel-xs text-foreground mb-3">Quest Progress</h3>
        
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-2 bg-card rounded-sm border border-border">
            <div className="font-pixel text-pixel-xs text-success">{questStats?.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          
          <div className="p-2 bg-card rounded-sm border border-border">
            <div className="font-pixel text-pixel-xs text-primary">{questStats?.available}</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
          
          <div className="p-2 bg-card rounded-sm border border-border">
            <div className="font-pixel text-pixel-xs text-warning">{questStats?.locked}</div>
            <div className="text-xs text-muted-foreground">Locked</div>
          </div>
          
          <div className="p-2 bg-card rounded-sm border border-border">
            <div className="font-pixel text-pixel-xs text-accent">{questStats?.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Overall Progress</span>
            <span>{questStats?.total > 0 ? Math.round((questStats?.completed / questStats?.total) * 100) : 0}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
            <div 
              className="h-full bg-success game-transition"
              style={{ 
                width: `${questStats?.total > 0 ? (questStats?.completed / questStats?.total) * 100 : 0}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestFilters;