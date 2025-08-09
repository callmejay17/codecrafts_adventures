import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CharacterAvatar = ({ character, isDesktop = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAvatarClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const xpPercentage = (character?.xp / character?.maxXp) * 100;

  return (
    <div className={`bg-card border border-border rounded-sm p-6 ${isDesktop ? 'p-8' : ''}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Character Avatar */}
        <div 
          className={`relative cursor-pointer ${isDesktop ? 'w-32 h-32' : 'w-24 h-24'} ${
            isAnimating ? 'animate-pulse' : ''
          }`}
          onClick={handleAvatarClick}
        >
          <div className={`w-full h-full bg-secondary rounded-sm flex items-center justify-center overflow-hidden ${
            isAnimating ? 'ring-4 ring-accent' : ''
          } game-transition`}>
            <Image
              src={character?.avatar}
              alt={`${character?.name} avatar`}
              className="w-full h-full object-cover pixel-perfect"
            />
          </div>
          
          {/* Level Badge */}
          <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-sm px-2 py-1 min-w-[2rem] text-center">
            <span className="font-pixel text-pixel-xs">{character?.level}</span>
          </div>
        </div>

        {/* Character Info */}
        <div className="text-center space-y-2">
          <h2 className={`font-pixel text-foreground ${isDesktop ? 'text-pixel-lg' : 'text-pixel-md'}`}>
            {character?.name}
          </h2>
          <p className="text-sm text-muted-foreground">{character?.class}</p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>Joined {new Date(character.joinDate)?.toLocaleDateString()}</span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Experience</span>
            <span className="text-accent font-medium">
              {character?.xp?.toLocaleString()}/{character?.maxXp?.toLocaleString()} XP
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-sm overflow-hidden">
            <div 
              className="h-full bg-accent game-transition"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
          <div className="text-center text-xs text-muted-foreground">
            {Math.round(xpPercentage)}% to next level
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="text-center p-3 bg-muted/20 rounded-sm">
            <div className="font-pixel text-pixel-sm text-success">{character?.questsCompleted}</div>
            <div className="text-xs text-muted-foreground">Quests</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-sm">
            <div className="font-pixel text-pixel-sm text-warning">{character?.streak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterAvatar;