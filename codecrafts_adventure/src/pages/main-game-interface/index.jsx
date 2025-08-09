import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHUD from '../../components/ui/GameHUD';
import GameWorld from './components/GameWorld';
import CodeEditor from './components/CodeEditor';
import ConsoleOutput from './components/ConsoleOutput';
import GameToolbar from './components/GameToolbar';
import NPCDialogue from './components/NPCDialogue';
import HintModal from './components/HintModal';

import Icon from '../../components/AppIcon';

const MainGameInterface = () => {
  const navigate = useNavigate();
  
  // Game State
  const [character, setCharacter] = useState({
    name: 'CodeCrafter',
    level: 12,
    xp: 2450,
    maxXp: 3000,
    health: 85,
    maxHealth: 100,
    avatar: '/assets/images/character-avatar.png'
  });

  // Current Quest State
  const [currentQuest, setCurrentQuest] = useState({
    id: 1,
    title: 'The Array Dragon',
    description: 'Master array manipulation to defeat the mighty Array Dragon and claim its treasure.',
    objective: 'Create an array with 5 elements and display its length',
    difficulty: 'beginner',
    xpReward: 150,
    timeEstimate: '15 min',
    requirements: [
      'Create an array called "dragonTreasure" with 5 different items',
      'Use console.log() to display the array length',
      'Return the array from your function'
    ],
    hints: [
      'Arrays in JavaScript are created using square brackets: []',
      'You can add elements to an array by separating them with commas',
      'Use the .length property to get the number of elements in an array',
      'Remember to return your array at the end of the function'
    ],
    starterCode: `// Welcome to the Array Dragon Quest!\n// Your mission: Create an array with 5 treasures\n\nfunction defeatArrayDragon() {\n    // Create your array here\n    let dragonTreasure = [];\n    \n    // Add 5 different treasures to your array\n    \n    // Log the array length\n    \n    // Return the array\n    return dragonTreasure;\n}\n\n// Call your function\ndefeatArrayDragon();`
  });

  // UI State
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeTab, setActiveTab] = useState('world'); // 'world' or 'code'
  const [showNPCDialogue, setShowNPCDialogue] = useState(false);
  const [selectedNPC, setSelectedNPC] = useState(null);
  const [showHintModal, setShowHintModal] = useState(false);

  // Code Editor State
  const [code, setCode] = useState(currentQuest?.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);

  // Game State
  const [questProgress, setQuestProgress] = useState(25);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [maxHints] = useState(3);
  const [bugEncounter, setBugEncounter] = useState(null);
  const [questComplete, setQuestComplete] = useState(false);
  const [xpGain, setXpGain] = useState(0);

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey && e?.key === 'Enter') {
        e?.preventDefault();
        handleRunCode();
      }
      if (e?.key === 'Escape') {
        setShowNPCDialogue(false);
        setShowHintModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setHasError(false);
  };

  const handleRunCode = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setHasError(false);
    
    const timestamp = Date.now();
    
    try {
      // Add running message
      setConsoleOutput(prev => [...prev, {
        type: 'info',
        message: 'Running code...',
        timestamp
      }]);

      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple code validation for the quest
      const codeLines = code?.toLowerCase();
      let output = [];
      let progress = questProgress;
      let hasErrors = false;

      // Check for array creation
      if (codeLines?.includes('dragontreasure') && codeLines?.includes('[')) {
        output?.push({
          type: 'success',
          message: '✓ Array "dragonTreasure" created successfully!',
          timestamp: timestamp + 100
        });
        progress = Math.max(progress, 40);
      } else {
        output?.push({
          type: 'error',
          message: '✗ Array "dragonTreasure" not found. Make sure to create an array with this name.',
          timestamp: timestamp + 100
        });
        hasErrors = true;
      }

      // Check for array length usage
      if (codeLines?.includes('.length')) {
        output?.push({
          type: 'success',
          message: '✓ Array length property used correctly!',
          timestamp: timestamp + 200
        });
        progress = Math.max(progress, 70);
      } else {
        output?.push({
          type: 'warning',
          message: '⚠ Consider using the .length property to get array size.',
          timestamp: timestamp + 200
        });
      }

      // Check for console.log
      if (codeLines?.includes('console.log')) {
        output?.push({
          type: 'success',
          message: '✓ Console output detected!',
          timestamp: timestamp + 300
        });
        progress = Math.max(progress, 85);
      }

      // Check for return statement
      if (codeLines?.includes('return')) {
        output?.push({
          type: 'success',
          message: '✓ Function returns a value!',
          timestamp: timestamp + 400
        });
        progress = Math.max(progress, 100);
      }

      // Simulate execution result
      if (!hasErrors) {
        output?.push({
          type: 'info',
          message: 'Output: ["Gold Coin", "Magic Sword", "Health Potion", "Ancient Scroll", "Dragon Scale"]',
          details: 'Array length: 5',
          timestamp: timestamp + 500
        });
      }

      setConsoleOutput(prev => [...prev, ...output]);
      setQuestProgress(progress);
      setHasError(hasErrors);

      // Handle quest completion
      if (progress >= 100 && !questComplete) {
        setQuestComplete(true);
        setXpGain(currentQuest?.xpReward);
        
        // Update character XP
        setTimeout(() => {
          setCharacter(prev => ({
            ...prev,
            xp: Math.min(prev?.xp + currentQuest?.xpReward, prev?.maxXp)
          }));
          setQuestComplete(false);
          setXpGain(0);
        }, 3000);
      }

      // Handle bug encounter for errors
      if (hasErrors) {
        setBugEncounter({
          type: 'syntax',
          message: 'A wild Syntax Bug appeared! Fix your code to continue.'
        });
        setTimeout(() => setBugEncounter(null), 2000);
      }

    } catch (error) {
      setConsoleOutput(prev => [...prev, {
        type: 'error',
        message: 'Runtime Error: ' + error?.message,
        timestamp: Date.now()
      }]);
      setHasError(true);
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    setCode(currentQuest?.starterCode);
    setConsoleOutput([]);
    setHasError(false);
    setQuestProgress(25);
  };

  const handleClearConsole = () => {
    setConsoleOutput([]);
  };

  const handleNPCInteraction = (npc) => {
    setSelectedNPC(npc);
    setShowNPCDialogue(true);
  };

  const handleObjectInteraction = (object) => {
    const timestamp = Date.now();
    setConsoleOutput(prev => [...prev, {
      type: 'info',
      message: `Interacted with ${object?.type}: ${object?.description || 'Mysterious object'}`,
      timestamp
    }]);
  };

  const handleMoveCharacter = (position) => {
    // Character movement logic
    console.log('Character moved to:', position);
  };

  const handleActionClick = (action) => {
    switch (action?.id) {
      case 'inventory': console.log('Opening inventory...');
        break;
      case 'map': navigate('/quest-map-challenge-selection');
        break;
      case 'skills': navigate('/character-profile-progression');
        break;
      case 'save':
        const timestamp = Date.now();
        setConsoleOutput(prev => [...prev, {
          type: 'success',
          message: 'Game progress saved successfully!',
          timestamp
        }]);
        break;
      default:
        console.log('Action clicked:', action);
    }
  };

  const handleShowHint = () => {
    setShowHintModal(true);
  };

  const handleUseHint = (hint) => {
    if (hintsUsed < maxHints) {
      setHintsUsed(prev => prev + 1);
      const timestamp = Date.now();
      setConsoleOutput(prev => [...prev, {
        type: 'info',
        message: `💡 Hint: ${hint}`,
        timestamp
      }]);
    }
  };

  const handleOpenChat = () => {
    const timestamp = Date.now();
    setConsoleOutput(prev => [...prev, {
      type: 'info',
      message: 'Chat system coming soon! For now, try talking to NPCs in the game world.',
      timestamp
    }]);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Game HUD */}
      <GameHUD character={character} />
      {/* Main Game Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Layout */}
        {!isMobileView ? (
          <>
            {/* Left Panel - Code Editor */}
            <div className="w-2/5 flex flex-col border-r border-border">
              <CodeEditor
                initialCode={currentQuest?.starterCode}
                onCodeChange={handleCodeChange}
                onRunCode={handleRunCode}
                onResetCode={handleResetCode}
                currentQuest={currentQuest}
                isRunning={isRunning}
                hasError={hasError}
              />
              
              {/* Console Output */}
              <ConsoleOutput
                output={consoleOutput}
                isExpanded={isConsoleExpanded}
                onToggleExpanded={() => setIsConsoleExpanded(!isConsoleExpanded)}
                isRunning={isRunning}
                onClearConsole={handleClearConsole}
              />
            </div>

            {/* Right Panel - Game World */}
            <div className="w-3/5 flex flex-col">
              <div className="flex-1">
                <GameWorld
                  currentQuest={currentQuest}
                  character={character}
                  onNPCInteraction={handleNPCInteraction}
                  onObjectInteraction={handleObjectInteraction}
                  onMoveCharacter={handleMoveCharacter}
                  bugEncounter={bugEncounter}
                  questComplete={questComplete}
                  xpGain={xpGain}
                />
              </div>
            </div>
          </>
        ) : (
          /* Mobile/Tablet Layout */
          (<div className="flex-1 flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-border bg-card">
              <button
                onClick={() => setActiveTab('world')}
                className={`flex-1 px-4 py-3 text-sm font-medium game-transition flex items-center justify-center space-x-2 ${
                  activeTab === 'world' ?'text-accent border-b-2 border-accent bg-accent/10' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Gamepad2" size={16} />
                <span>Game World</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex-1 px-4 py-3 text-sm font-medium game-transition flex items-center justify-center space-x-2 ${
                  activeTab === 'code' ?'text-accent border-b-2 border-accent bg-accent/10' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Code" size={16} />
                <span>Code Editor</span>
              </button>
            </div>
            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'world' ? (
                <GameWorld
                  currentQuest={currentQuest}
                  character={character}
                  onNPCInteraction={handleNPCInteraction}
                  onObjectInteraction={handleObjectInteraction}
                  onMoveCharacter={handleMoveCharacter}
                  bugEncounter={bugEncounter}
                  questComplete={questComplete}
                  xpGain={xpGain}
                />
              ) : (
                <div className="h-full flex flex-col">
                  <CodeEditor
                    initialCode={currentQuest?.starterCode}
                    onCodeChange={handleCodeChange}
                    onRunCode={handleRunCode}
                    onResetCode={handleResetCode}
                    currentQuest={currentQuest}
                    isRunning={isRunning}
                    hasError={hasError}
                  />
                  
                  <ConsoleOutput
                    output={consoleOutput}
                    isExpanded={isConsoleExpanded}
                    onToggleExpanded={() => setIsConsoleExpanded(!isConsoleExpanded)}
                    isRunning={isRunning}
                    onClearConsole={handleClearConsole}
                  />
                </div>
              )}
            </div>
          </div>)
        )}
      </div>
      {/* Bottom Toolbar */}
      <GameToolbar
        currentQuest={currentQuest}
        questProgress={questProgress}
        onActionClick={handleActionClick}
        onShowHint={handleShowHint}
        onOpenChat={handleOpenChat}
        hintsUsed={hintsUsed}
        maxHints={maxHints}
      />
      {/* Modals */}
      <NPCDialogue
        npc={selectedNPC}
        isOpen={showNPCDialogue}
        onClose={() => setShowNPCDialogue(false)}
        onQuestAccept={(quest) => {
          console.log('Quest accepted:', quest);
          setShowNPCDialogue(false);
        }}
        onQuestDecline={(quest) => {
          console.log('Quest declined:', quest);
          setShowNPCDialogue(false);
        }}
      />
      <HintModal
        isOpen={showHintModal}
        onClose={() => setShowHintModal(false)}
        currentQuest={currentQuest}
        hintsUsed={hintsUsed}
        maxHints={maxHints}
        onUseHint={handleUseHint}
      />
    </div>
  );
};

export default MainGameInterface;