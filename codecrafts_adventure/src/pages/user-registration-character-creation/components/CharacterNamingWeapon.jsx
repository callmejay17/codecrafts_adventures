import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const CharacterNamingWeapon = ({ onNext, onPrevious, formData, setFormData, onComplete }) => {
  const [characterName, setCharacterName] = useState(formData?.characterName || '');
  const [selectedWeapon, setSelectedWeapon] = useState(formData?.weapon || null);
  const [nameError, setNameError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const weapons = [
    {
      id: 'debuggers-staff',
      name: "Debugger\'s Staff",
      description: `A mystical staff that reveals hidden bugs and logical errors in your code.\nGrants +2 Error Detection and +1 Code Clarity.\nPerfect for methodical problem-solvers who prefer to understand before acting.`,
      icon: 'Wand2',
      stats: { errorDetection: 2, codeClarity: 1, speed: 0 },
      rarity: 'uncommon',
      color: 'text-primary'
    },
    {
      id: 'syntax-sword',
      name: 'Syntax Sword',
      description: `A sharp blade forged from pure syntax knowledge.\nGrants +2 Code Speed and +1 Syntax Mastery.\nIdeal for warriors who code fast and strike true with perfect syntax.`,
      icon: 'Sword',
      stats: { codeSpeed: 2, syntaxMastery: 1, debugging: 0 },
      rarity: 'rare',
      color: 'text-accent'
    },
    {
      id: 'logic-bow',
      name: 'Logic Bow',
      description: `An elegant bow that shoots arrows of pure logic and reasoning.\nGrants +2 Algorithm Design and +1 Problem Solving.\nBest suited for strategic thinkers who plan their approach carefully.`,
      icon: 'Target',
      stats: { algorithmDesign: 2, problemSolving: 1, creativity: 0 },
      rarity: 'epic',
      color: 'text-success'
    }
  ];

  const validateName = (name) => {
    if (!name?.trim()) {
      return "Character name is required";
    }
    if (name?.length < 2) {
      return "Name must be at least 2 characters long";
    }
    if (name?.length > 20) {
      return "Name must be less than 20 characters";
    }
    if (!/^[a-zA-Z0-9\s]+$/?.test(name)) {
      return "Name can only contain letters, numbers, and spaces";
    }
    return '';
  };

  const handleNameChange = (value) => {
    setCharacterName(value);
    const error = validateName(value);
    setNameError(error);
  };

  const handleComplete = async () => {
    const nameValidationError = validateName(characterName);
    if (nameValidationError) {
      setNameError(nameValidationError);
      return;
    }

    if (!selectedWeapon) {
      return;
    }

    setIsCreating(true);

    // Update form data
    setFormData(prev => ({
      ...prev,
      characterName: characterName?.trim(),
      weapon: selectedWeapon
    }));

    // Simulate character creation process
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'uncommon': return 'border-primary bg-primary/10';
      case 'rare': return 'border-accent bg-accent/10';
      case 'epic': return 'border-success bg-success/10';
      default: return 'border-border bg-card';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-pixel text-pixel-lg text-foreground mb-2">Name Your Character</h2>
        <p className="text-sm text-muted-foreground">
          Choose a name and starting weapon for your coding adventure
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Character Naming */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-sm p-6">
            <h3 className="font-pixel text-pixel-sm text-foreground mb-4">Character Name</h3>
            
            <Input
              label="Enter your character's name"
              type="text"
              placeholder="e.g., CodeMaster, BugSlayer, AlgoWizard"
              value={characterName}
              onChange={(e) => handleNameChange(e?.target?.value)}
              error={nameError}
              required
              description="This name will be displayed throughout your adventure"
              maxLength={20}
            />

            {characterName && !nameError && (
              <div className="mt-4 p-4 bg-success/10 border border-success rounded-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={16} color="var(--color-success)" />
                  <span className="text-sm text-success font-medium">
                    Great choice! "{characterName}" is available
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Character Summary */}
          {characterName && selectedWeapon && (
            <div className="bg-muted/20 border border-border rounded-sm p-6">
              <h4 className="font-pixel text-pixel-sm text-foreground mb-4">Character Summary</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="font-medium text-foreground">{characterName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Class:</span>
                  <span className="font-medium text-foreground">
                    {formData?.avatar !== undefined ? 
                      ['Warrior', 'Mage', 'Archer', 'Rogue', 'Paladin', 'Scholar']?.[formData?.avatar] : 
                      'Adventurer'
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Weapon:</span>
                  <span className="font-medium text-foreground">
                    {weapons?.find(w => w?.id === selectedWeapon)?.name}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Weapon Selection */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-sm p-6">
            <h3 className="font-pixel text-pixel-sm text-foreground mb-4">Choose Starting Weapon</h3>
            
            <div className="space-y-4">
              {weapons?.map((weapon) => (
                <button
                  key={weapon?.id}
                  type="button"
                  onClick={() => setSelectedWeapon(weapon?.id)}
                  className={`w-full p-4 rounded-sm border-2 text-left game-transition ${
                    selectedWeapon === weapon?.id
                      ? `${getRarityColor(weapon?.rarity)} border-opacity-100`
                      : 'border-border bg-card hover:border-muted-foreground hover:bg-muted/20'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-sm ${weapon?.color} bg-current/10`}>
                      <Icon name={weapon?.icon} size={24} className={weapon?.color} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-pixel text-pixel-xs text-foreground">{weapon?.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-sm bg-muted ${weapon?.color} capitalize`}>
                          {weapon?.rarity}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
                        {weapon?.description}
                      </p>
                      
                      {/* Weapon Stats */}
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(weapon?.stats)?.map(([stat, value]) => (
                          value > 0 && (
                            <span key={stat} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-sm">
                              +{value} {stat?.replace(/([A-Z])/g, ' $1')?.trim()}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                    
                    {selectedWeapon === weapon?.id && (
                      <Icon name="Check" size={20} color="var(--color-success)" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
          disabled={isCreating}
        >
          Previous
        </Button>

        <Button
          variant="default"
          onClick={handleComplete}
          disabled={!characterName || !selectedWeapon || nameError || isCreating}
          loading={isCreating}
          iconName={isCreating ? "Loader2" : "Sparkles"}
          iconPosition="right"
          className="font-pixel"
        >
          {isCreating ? 'Creating Character...' : 'Begin Adventure!'}
        </Button>
      </div>
      {/* Creation Animation Overlay */}
      {isCreating && (
        <div className="fixed inset-0 z-modal bg-background/90 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border border-border rounded-sm p-8 text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-accent rounded-sm flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon name="Sparkles" size={32} color="var(--color-accent-foreground)" />
            </div>
            <h3 className="font-pixel text-pixel-sm text-foreground mb-2">Creating Your Character</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Forging your destiny in the realm of code...
            </p>
            <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
              <div className="h-full bg-accent animate-pulse" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterNamingWeapon;