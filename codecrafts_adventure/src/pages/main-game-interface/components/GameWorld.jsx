import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const GameWorld = ({ 
  currentQuest = null,
  character = {},
  onNPCInteraction = () => {},
  onObjectInteraction = () => {},
  onMoveCharacter = () => {},
  bugEncounter = null,
  questComplete = false,
  xpGain = 0
}) => {
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 60 });
  const [hoveredObject, setHoveredObject] = useState(null);
  const [showXPGain, setShowXPGain] = useState(false);
  const [showBugOverlay, setShowBugOverlay] = useState(false);

  // Mock world objects and NPCs
  const worldObjects = [
    {
      id: 'tree1',
      type: 'tree',
      x: 20,
      y: 30,
      interactive: false,
      sprite: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=64&h=64&fit=crop'
    },
    {
      id: 'chest1',
      type: 'chest',
      x: 80,
      y: 40,
      interactive: true,
      sprite: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?w=64&h=64&fit=crop',
      description: 'Mysterious treasure chest'
    },
    {
      id: 'portal1',
      type: 'portal',
      x: 90,
      y: 20,
      interactive: true,
      sprite: 'https://images.pixabay.com/photo/2017/06/07/15/47/portal-2381155_960_720.jpg?w=64&h=64&fit=crop',
      description: 'Portal to next area'
    }
  ];

  const npcs = [
    {
      id: 'wizard1',
      name: 'Code Wizard Merlin',
      x: 30,
      y: 50,
      sprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop',
      dialogue: `Greetings, young coder! I sense you're working on the ${currentQuest?.title || 'Array Dragon'} quest. \n\nRemember: Arrays are like magical containers that hold multiple values. \n\nUse square brackets [] to create them!`,
      questGiver: true
    },
    {
      id: 'merchant1',name: 'Debug Merchant',x: 70,y: 70,sprite: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=64&h=64&fit=crop',
      dialogue: `Welcome to my shop! I sell debugging tools and syntax guides. \n\nNeed help with your code? Check the console for error messages!`,
      questGiver: false
    }
  ];

  // Handle XP gain animation
  useEffect(() => {
    if (xpGain > 0) {
      setShowXPGain(true);
      const timer = setTimeout(() => setShowXPGain(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [xpGain]);

  // Handle bug encounter animation
  useEffect(() => {
    if (bugEncounter) {
      setShowBugOverlay(true);
      const timer = setTimeout(() => setShowBugOverlay(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [bugEncounter]);

  const handleWorldClick = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
    
    setCharacterPosition({ x, y });
    onMoveCharacter({ x, y });
  };

  const handleObjectClick = (object, e) => {
    e?.stopPropagation();
    if (object?.interactive) {
      onObjectInteraction(object);
    }
  };

  const handleNPCClick = (npc, e) => {
    e?.stopPropagation();
    onNPCInteraction(npc);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-blue-400 via-green-400 to-green-600 overflow-hidden pixel-perfect">
      {/* Sky and Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500 opacity-80" />
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-600 to-green-500" />
      {/* World Objects */}
      {worldObjects?.map((object) => (
        <div
          key={object?.id}
          className={`absolute w-12 h-12 cursor-pointer game-transition ${
            object?.interactive ? 'hover:scale-110' : ''
          }`}
          style={{ 
            left: `${object?.x}%`, 
            top: `${object?.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={(e) => handleObjectClick(object, e)}
          onMouseEnter={() => object?.interactive && setHoveredObject(object)}
          onMouseLeave={() => setHoveredObject(null)}
        >
          <div className="w-full h-full bg-secondary rounded-sm flex items-center justify-center retro-shadow">
            <Icon 
              name={object?.type === 'chest' ? 'Package' : object?.type === 'portal' ? 'Zap' : 'TreePine'} 
              size={24} 
              color="var(--color-secondary-foreground)" 
            />
          </div>
          
          {/* Object tooltip */}
          {hoveredObject?.id === object?.id && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover border border-border rounded-sm text-xs text-popover-foreground whitespace-nowrap retro-shadow z-10">
              {object?.description}
            </div>
          )}
        </div>
      ))}
      {/* NPCs */}
      {npcs?.map((npc) => (
        <div
          key={npc?.id}
          className="absolute w-16 h-16 cursor-pointer hover:scale-105 game-transition"
          style={{ 
            left: `${npc?.x}%`, 
            top: `${npc?.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={(e) => handleNPCClick(npc, e)}
        >
          <div className="w-full h-full bg-accent rounded-sm flex items-center justify-center retro-shadow">
            <Icon name="User" size={28} color="var(--color-accent-foreground)" />
          </div>
          
          {/* NPC name label */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-card border border-border rounded-sm text-xs text-card-foreground whitespace-nowrap retro-shadow">
            {npc?.name}
          </div>
          
          {/* Quest indicator */}
          {npc?.questGiver && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center animate-pulse">
              <Icon name="AlertCircle" size={14} color="var(--color-warning-foreground)" />
            </div>
          )}
        </div>
      ))}
      {/* Character Sprite */}
      <div
        className="absolute w-14 h-14 cursor-pointer game-transition z-10"
        style={{ 
          left: `${characterPosition?.x}%`, 
          top: `${characterPosition?.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-full h-full bg-primary rounded-sm flex items-center justify-center retro-shadow">
          <Icon name="User" size={24} color="var(--color-primary-foreground)" />
        </div>
        
        {/* Character name */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-primary border border-border rounded-sm text-xs text-primary-foreground whitespace-nowrap retro-shadow">
          {character?.name || 'CodeCrafter'}
        </div>
      </div>
      {/* Click area for movement */}
      <div 
        className="absolute inset-0 cursor-crosshair"
        onClick={handleWorldClick}
      />
      {/* Quest Objective Indicator */}
      {currentQuest && (
        <div className="absolute top-4 left-4 bg-card border border-border rounded-sm p-3 retro-shadow max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} color="var(--color-accent)" />
            <span className="font-pixel text-pixel-xs text-accent">Current Quest</span>
          </div>
          <h3 className="font-pixel text-pixel-xs text-foreground mb-1">{currentQuest?.title}</h3>
          <p className="text-xs text-muted-foreground">{currentQuest?.objective}</p>
        </div>
      )}
      {/* XP Gain Animation */}
      {showXPGain && xpGain > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 animate-bounce">
          <div className="bg-accent text-accent-foreground px-4 py-2 rounded-sm font-pixel text-pixel-sm retro-shadow">
            +{xpGain} XP!
          </div>
        </div>
      )}
      {/* Bug Encounter Overlay */}
      {showBugOverlay && bugEncounter && (
        <div className="absolute inset-0 bg-error/20 flex items-center justify-center z-20">
          <div className="bg-card border-2 border-error rounded-sm p-6 retro-shadow animate-pulse">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Bug" size={32} color="var(--color-error)" />
              <div>
                <h3 className="font-pixel text-pixel-sm text-error">Bug Encounter!</h3>
                <p className="text-sm text-muted-foreground">Fix your code to continue</p>
              </div>
            </div>
            <div className="bg-muted p-3 rounded-sm">
              <p className="text-sm text-foreground font-mono">{bugEncounter?.message}</p>
            </div>
          </div>
        </div>
      )}
      {/* Quest Complete Animation */}
      {questComplete && (
        <div className="absolute inset-0 bg-success/20 flex items-center justify-center z-20">
          <div className="bg-card border-2 border-success rounded-sm p-6 retro-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="CheckCircle" size={32} color="var(--color-success)" />
              <div>
                <h3 className="font-pixel text-pixel-sm text-success">Quest Complete!</h3>
                <p className="text-sm text-muted-foreground">Well done, adventurer!</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Movement Instructions */}
      <div className="absolute bottom-4 right-4 bg-card border border-border rounded-sm p-3 retro-shadow">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Mouse" size={14} />
          <span>Click to move</span>
        </div>
      </div>
    </div>
  );
};

export default GameWorld;