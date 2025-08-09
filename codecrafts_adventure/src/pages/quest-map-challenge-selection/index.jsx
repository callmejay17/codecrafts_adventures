import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHUD from '../../components/ui/GameHUD';
import QuestMapCanvas from './components/QuestMapCanvas';
import QuestFilters from './components/QuestFilters';
import QuestDetails from './components/QuestDetails';
import MobileQuestList from './components/MobileQuestList';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QuestMapChallengeSelection = () => {
  const navigate = useNavigate();
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const [filters, setFilters] = useState({
    search: '',
    difficulty: 'all',
    topic: 'all',
    status: 'all',
    showOnlyUnlocked: false,
    sortBy: 'order'
  });

  // Mock quest data
  const allQuests = [
    {
      id: 1,
      title: "The Variable Village",
      difficulty: 'beginner',
      category: 'variables',
      xpReward: 150,
      timeEstimate: '15 min',
      description: `Learn the fundamentals of variables and data types in this peaceful village setting. Master the art of storing and manipulating data while helping the villagers organize their magical inventories.`,
      completed: true,
      locked: false,
      inProgress: false,
      prerequisites: []
    },
    {
      id: 2,
      title: "Loop Labyrinth",
      difficulty: 'beginner',
      category: 'loops',
      xpReward: 200,
      timeEstimate: '20 min',
      description: `Navigate through the mystical Loop Labyrinth where repetition is the key to escape. Master for loops, while loops, and iteration patterns to find your way through the enchanted maze.`,
      completed: false,
      locked: false,
      inProgress: true,
      prerequisites: [1]
    },
    {
      id: 3,
      title: "Function Forest",
      difficulty: 'intermediate',
      category: 'functions',
      xpReward: 300,
      timeEstimate: '30 min',
      description: `Deep in the Function Forest, learn to create reusable spells (functions) that can be called upon whenever needed. Master parameters, return values, and scope in this magical woodland.`,
      completed: false,
      locked: false,
      inProgress: false,
      prerequisites: [1, 2]
    },
    {
      id: 4,
      title: "Array Adventure",
      difficulty: 'intermediate',
      category: 'arrays',
      xpReward: 350,
      timeEstimate: '35 min',
      description: `Embark on an epic adventure through the Array Archipelago. Learn to manipulate lists of data, master array methods, and discover the power of indexed collections.`,
      completed: false,
      locked: false,
      inProgress: false,
      prerequisites: [1, 2, 3]
    },
    {
      id: 5,
      title: "Object Oriented Odyssey",
      difficulty: 'advanced',
      category: 'objects',
      xpReward: 500,
      timeEstimate: '45 min',
      description: `Journey through the Object-Oriented Odyssey where you'll learn to create complex data structures. Master classes, objects, inheritance, and encapsulation in this challenging realm.`,
      completed: false,
      locked: true,
      inProgress: false,
      prerequisites: [1, 2, 3, 4]
    },
    {
      id: 6,
      title: "Debug Dungeon",
      difficulty: 'beginner',category: 'debugging',xpReward: 180,timeEstimate: '25 min',
      description: `Descend into the Debug Dungeon where bugs and errors lurk in every shadow. Learn to identify, track, and eliminate coding errors using debugging tools and techniques.`,
      completed: false,
      locked: false,
      inProgress: false,
      prerequisites: [1]
    },
    {
      id: 7,
      title: "Algorithm Academy",
      difficulty: 'advanced',category: 'algorithms',xpReward: 600,timeEstimate: '60 min',
      description: `Enter the prestigious Algorithm Academy where the most efficient solutions are taught. Master sorting algorithms, search techniques, and optimization strategies.`,
      completed: false,
      locked: true,
      inProgress: false,
      prerequisites: [1, 2, 3, 4]
    },
    {
      id: 8,
      title: "Data Structure Domain",
      difficulty: 'advanced',category: 'data-structures',xpReward: 550,timeEstimate: '50 min',
      description: `Rule over the Data Structure Domain where complex data organizations reign supreme. Learn stacks, queues, trees, and graphs to become a master of data architecture.`,
      completed: false,
      locked: true,
      inProgress: false,
      prerequisites: [1, 2, 3, 4, 5]
    },
    {
      id: 9,
      title: "Recursion Realm",
      difficulty: 'expert',category: 'algorithms',xpReward: 750,timeEstimate: '75 min',
      description: `Enter the mind-bending Recursion Realm where functions call themselves in infinite loops of logic. Master the art of recursive thinking and solve complex problems elegantly.`,
      completed: false,
      locked: true,
      inProgress: false,
      prerequisites: [1, 2, 3, 4, 5, 7]
    },
    {
      id: 10,
      title: "Concurrency Castle",
      difficulty: 'expert',category: 'algorithms',xpReward: 800,timeEstimate: '90 min',
      description: `Scale the heights of Concurrency Castle where multiple processes work in harmony. Learn about threading, async programming, and parallel processing in this ultimate challenge.`,
      completed: false,
      locked: true,
      inProgress: false,
      prerequisites: [1, 2, 3, 4, 5, 7, 8, 9]
    }
  ];

  // Filter and sort quests
  const filteredQuests = allQuests?.filter(quest => {
    // Search filter
    if (filters?.search && !quest?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
        !quest?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }

    // Difficulty filter
    if (filters?.difficulty !== 'all' && quest?.difficulty !== filters?.difficulty) {
      return false;
    }

    // Topic filter
    if (filters?.topic !== 'all' && quest?.category !== filters?.topic) {
      return false;
    }

    // Status filter
    if (filters?.status !== 'all') {
      if (filters?.status === 'completed' && !quest?.completed) return false;
      if (filters?.status === 'available' && (quest?.locked || quest?.completed || quest?.inProgress)) return false;
      if (filters?.status === 'in-progress' && !quest?.inProgress) return false;
      if (filters?.status === 'locked' && !quest?.locked) return false;
    }

    // Show only unlocked filter
    if (filters?.showOnlyUnlocked && quest?.locked) {
      return false;
    }

    return true;
  })?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'difficulty':
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
        return difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty];
      case 'xp':
        return b?.xpReward - a?.xpReward;
      case 'time':
        return parseInt(a?.timeEstimate) - parseInt(b?.timeEstimate);
      case 'title':
        return a?.title?.localeCompare(b?.title);
      default: // 'order'
        return a?.id - b?.id;
    }
  });

  // Calculate quest statistics
  const questStats = {
    total: allQuests?.length,
    completed: allQuests?.filter(q => q?.completed)?.length,
    available: allQuests?.filter(q => !q?.locked && !q?.completed && !q?.inProgress)?.length,
    locked: allQuests?.filter(q => q?.locked)?.length
  };

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleQuestSelect = (quest) => {
    setSelectedQuest(quest);
  };

  const handleStartQuest = (quest) => {
    // Navigate to main game interface with selected quest
    navigate('/main-game-interface', { 
      state: { selectedQuest: quest } 
    });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <GameHUD />
        
        <div className="pt-16 h-screen flex flex-col">
          {/* Mobile Header */}
          <div className="p-4 bg-card border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Map" size={20} color="var(--color-accent)" />
                <h1 className="font-pixel text-pixel-sm text-accent">Quest Map</h1>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFilters}
                iconName="Filter"
                iconPosition="left"
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="bg-card border-b border-border">
              <div className="p-4">
                <QuestFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  questStats={questStats}
                />
              </div>
            </div>
          )}

          {/* Mobile Quest List */}
          <div className="flex-1">
            <MobileQuestList
              quests={filteredQuests}
              selectedQuest={selectedQuest}
              onQuestSelect={handleQuestSelect}
              onStartQuest={handleStartQuest}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GameHUD />
      <div className="pt-16 h-screen flex">
        {/* Left Sidebar - Quest Filters */}
        <div className="w-80 flex-shrink-0">
          <QuestFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            questStats={questStats}
          />
        </div>

        {/* Main Content - Quest Map */}
        <div className="flex-1 flex flex-col">
          {/* Map Header */}
          <div className="p-4 bg-card border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Map" size={24} color="var(--color-accent)" />
                <div>
                  <h1 className="font-pixel text-pixel-lg text-accent">Quest Map</h1>
                  <p className="text-sm text-muted-foreground">
                    Explore the world of CodeCrafts and choose your next adventure
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-sm text-muted-foreground">
                  {filteredQuests?.length} of {allQuests?.length} quests
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedQuest(null)}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset View
                </Button>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="flex-1">
            <QuestMapCanvas
              selectedQuest={selectedQuest}
              onQuestSelect={handleQuestSelect}
              filteredQuests={filteredQuests}
              zoomLevel={zoomLevel}
              onZoomChange={setZoomLevel}
            />
          </div>
        </div>

        {/* Right Sidebar - Quest Details */}
        <div className="w-80 flex-shrink-0">
          <QuestDetails
            selectedQuest={selectedQuest}
            onStartQuest={handleStartQuest}
            onCloseDetails={() => setSelectedQuest(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestMapChallengeSelection;