import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const QuestMapCanvas = ({ 
  selectedQuest, 
  onQuestSelect, 
  filteredQuests = [],
  zoomLevel = 1,
  onZoomChange = () => {}
}) => {
  const canvasRef = useRef(null);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredQuest, setHoveredQuest] = useState(null);

  // Quest positions on the map (pixel coordinates)
  const questPositions = {
    1: { x: 150, y: 400, region: 'starter-village' },
    2: { x: 280, y: 350, region: 'starter-village' },
    3: { x: 420, y: 300, region: 'forest-path' },
    4: { x: 580, y: 250, region: 'forest-path' },
    5: { x: 720, y: 200, region: 'mountain-peak' },
    6: { x: 300, y: 500, region: 'debug-dungeon' },
    7: { x: 500, y: 480, region: 'algorithm-academy' },
    8: { x: 650, y: 420, region: 'data-structure-domain' },
    9: { x: 800, y: 350, region: 'advanced-arena' },
    10: { x: 900, y: 280, region: 'expert-empire' }
  };

  const regions = {
    'starter-village': { 
      name: 'Starter Village', 
      color: '#4CAF50', 
      unlocked: true,
      description: 'Learn the basics of programming'
    },
    'forest-path': { 
      name: 'Forest Path', 
      color: '#2D5A27', 
      unlocked: true,
      description: 'Master control structures and loops'
    },
    'debug-dungeon': { 
      name: 'Debug Dungeon', 
      color: '#8B4513', 
      unlocked: true,
      description: 'Hunt down bugs and errors'
    },
    'algorithm-academy': { 
      name: 'Algorithm Academy', 
      color: '#FFD700', 
      unlocked: false,
      description: 'Learn sorting and searching'
    },
    'data-structure-domain': { 
      name: 'Data Structure Domain', 
      color: '#FF9800', 
      unlocked: false,
      description: 'Master arrays, objects, and more'
    },
    'mountain-peak': { 
      name: 'Mountain Peak', 
      color: '#9C27B0', 
      unlocked: false,
      description: 'Conquer advanced challenges'
    },
    'advanced-arena': { 
      name: 'Advanced Arena', 
      color: '#F44336', 
      unlocked: false,
      description: 'Face complex programming puzzles'
    },
    'expert-empire': { 
      name: 'Expert Empire', 
      color: '#E91E63', 
      unlocked: false,
      description: 'Ultimate coding mastery awaits'
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e?.clientX - mapPosition?.x,
      y: e?.clientY - mapPosition?.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setMapPosition({
        x: e?.clientX - dragStart?.x,
        y: e?.clientY - dragStart?.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e?.preventDefault();
    const delta = e?.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(2, zoomLevel + delta));
    onZoomChange(newZoom);
  };

  const getQuestNodeStyle = (quest) => {
    const position = questPositions?.[quest?.id];
    if (!position) return {};

    const baseSize = 40;
    const size = baseSize * zoomLevel;
    
    return {
      position: 'absolute',
      left: (position?.x * zoomLevel) + mapPosition?.x - size/2,
      top: (position?.y * zoomLevel) + mapPosition?.y - size/2,
      width: size,
      height: size,
      transform: `scale(${zoomLevel})`,
      transformOrigin: 'center',
      transition: 'all 0.3s ease'
    };
  };

  const getQuestStatusColor = (quest) => {
    if (quest?.locked) return 'bg-muted border-muted-foreground';
    if (quest?.completed) return 'bg-success border-success';
    if (quest?.inProgress) return 'bg-warning border-warning';
    return 'bg-primary border-primary';
  };

  const getQuestStatusIcon = (quest) => {
    if (quest?.locked) return 'Lock';
    if (quest?.completed) return 'Check';
    if (quest?.inProgress) return 'Play';
    return 'Circle';
  };

  const handleQuestClick = (quest) => {
    if (!quest?.locked) {
      onQuestSelect(quest);
    }
  };

  const renderConnectionPaths = () => {
    return filteredQuests?.map(quest => {
      if (!quest?.prerequisites || quest?.prerequisites?.length === 0) return null;
      
      return quest?.prerequisites?.map(prereqId => {
        const prereqQuest = filteredQuests?.find(q => q?.id === prereqId);
        if (!prereqQuest) return null;

        const startPos = questPositions?.[prereqId];
        const endPos = questPositions?.[quest?.id];
        if (!startPos || !endPos) return null;

        const startX = (startPos?.x * zoomLevel) + mapPosition?.x;
        const startY = (startPos?.y * zoomLevel) + mapPosition?.y;
        const endX = (endPos?.x * zoomLevel) + mapPosition?.x;
        const endY = (endPos?.y * zoomLevel) + mapPosition?.y;

        const pathColor = quest?.locked ? '#404040' : '#2D5A27';
        const pathWidth = quest?.locked ? 2 : 3;

        return (
          <svg
            key={`path-${prereqId}-${quest?.id}`}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={pathColor}
              strokeWidth={pathWidth}
              strokeDasharray={quest?.locked ? "5,5" : "none"}
              opacity={0.7}
            />
          </svg>
        );
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (canvas) {
      canvas?.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas?.removeEventListener('wheel', handleWheel);
    }
  }, [zoomLevel]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-900/20 to-brown-900/20 overflow-hidden rounded-sm border border-border">
      {/* Map Background */}
      <div
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(45, 90, 39, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(139, 69, 19, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 90% 20%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '400px 400px, 600px 600px, 300px 300px'
        }}
      >
        {/* Region Labels */}
        {Object.entries(regions)?.map(([regionId, region]) => {
          const regionQuests = filteredQuests?.filter(q => 
            questPositions?.[q?.id]?.region === regionId
          );
          if (regionQuests?.length === 0) return null;

          const avgX = regionQuests?.reduce((sum, q) => sum + questPositions?.[q?.id]?.x, 0) / regionQuests?.length;
          const avgY = regionQuests?.reduce((sum, q) => sum + questPositions?.[q?.id]?.y, 0) / regionQuests?.length;

          return (
            <div
              key={regionId}
              className={`absolute pointer-events-none ${region?.unlocked ? 'opacity-100' : 'opacity-40'}`}
              style={{
                left: (avgX * zoomLevel) + mapPosition?.x - 60,
                top: (avgY * zoomLevel) + mapPosition?.y - 80,
                transform: `scale(${Math.max(0.8, zoomLevel)})`,
                transformOrigin: 'center'
              }}
            >
              <div className="text-center">
                <div 
                  className="font-pixel text-pixel-xs px-2 py-1 rounded-sm border"
                  style={{ 
                    backgroundColor: region?.color + '20',
                    borderColor: region?.color,
                    color: region?.color
                  }}
                >
                  {region?.name}
                </div>
              </div>
            </div>
          );
        })}

        {/* Connection Paths */}
        {renderConnectionPaths()}

        {/* Quest Nodes */}
        {filteredQuests?.map(quest => {
          const position = questPositions?.[quest?.id];
          if (!position) return null;

          return (
            <div
              key={quest?.id}
              className={`absolute rounded-full border-4 cursor-pointer game-transition flex items-center justify-center ${getQuestStatusColor(quest)} ${
                selectedQuest?.id === quest?.id ? 'ring-4 ring-accent ring-opacity-50' : ''
              } ${
                quest?.locked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 hover:shadow-lg'
              } ${
                quest?.inProgress ? 'animate-pulse' : ''
              }`}
              style={{
                ...getQuestNodeStyle(quest),
                zIndex: hoveredQuest?.id === quest?.id ? 10 : 5
              }}
              onClick={() => handleQuestClick(quest)}
              onMouseEnter={() => setHoveredQuest(quest)}
              onMouseLeave={() => setHoveredQuest(null)}
            >
              <Icon 
                name={getQuestStatusIcon(quest)} 
                size={Math.max(16, 20 * zoomLevel)} 
                color="white"
              />
              {/* Quest Number Badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                {quest?.id}
              </div>
              {/* Hover Tooltip */}
              {hoveredQuest?.id === quest?.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-popover border border-border rounded-sm retro-shadow min-w-64 z-20">
                  <h3 className="font-pixel text-pixel-xs text-foreground mb-2">{quest?.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{quest?.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Icon name="Zap" size={12} color="var(--color-accent)" />
                      <span className="text-accent">{quest?.xpReward} XP</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground">{quest?.timeEstimate}</span>
                    </div>
                  </div>
                  {quest?.prerequisites && quest?.prerequisites?.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border">
                      <div className="flex items-center space-x-1">
                        <Icon name="Link" size={12} color="var(--color-muted-foreground)" />
                        <span className="text-xs text-muted-foreground">
                          Requires: {quest?.prerequisites?.length} quest{quest?.prerequisites?.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
        <button
          onClick={() => onZoomChange(Math.min(2, zoomLevel + 0.2))}
          className="w-10 h-10 bg-card border border-border rounded-sm flex items-center justify-center hover:bg-muted game-transition"
        >
          <Icon name="Plus" size={16} />
        </button>
        <button
          onClick={() => onZoomChange(Math.max(0.5, zoomLevel - 0.2))}
          className="w-10 h-10 bg-card border border-border rounded-sm flex items-center justify-center hover:bg-muted game-transition"
        >
          <Icon name="Minus" size={16} />
        </button>
        <button
          onClick={() => {
            setMapPosition({ x: 0, y: 0 });
            onZoomChange(1);
          }}
          className="w-10 h-10 bg-card border border-border rounded-sm flex items-center justify-center hover:bg-muted game-transition"
        >
          <Icon name="Home" size={16} />
        </button>
      </div>
      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-card border border-border rounded-sm text-sm text-muted-foreground">
        {Math.round(zoomLevel * 100)}%
      </div>
      {/* Legend */}
      <div className="absolute bottom-4 left-4 p-3 bg-card border border-border rounded-sm space-y-2">
        <h4 className="font-pixel text-pixel-xs text-foreground mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success border border-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={8} color="white" />
            </div>
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning border border-warning rounded-full flex items-center justify-center">
              <Icon name="Play" size={8} color="white" />
            </div>
            <span className="text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary border border-primary rounded-full flex items-center justify-center">
              <Icon name="Circle" size={8} color="white" />
            </div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted border border-muted-foreground rounded-full flex items-center justify-center opacity-50">
              <Icon name="Lock" size={8} color="white" />
            </div>
            <span className="text-muted-foreground">Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestMapCanvas;