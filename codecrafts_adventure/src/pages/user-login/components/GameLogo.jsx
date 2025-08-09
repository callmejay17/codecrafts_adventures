import React from 'react';
import Icon from '../../../components/AppIcon';

const GameLogo = () => {
  return (
    <div className="text-center mb-8">
      {/* Main Logo */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          {/* Logo Background */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-sm flex items-center justify-center retro-shadow">
            <Icon name="Code" size={32} color="var(--color-primary-foreground)" />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
            <Icon name="Sparkles" size={12} color="var(--color-accent-foreground)" />
          </div>
          
          <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-warning rounded-sm flex items-center justify-center">
            <Icon name="Sword" size={12} color="var(--color-warning-foreground)" />
          </div>
        </div>
      </div>

      {/* Game Title */}
      <h1 className="font-pixel text-pixel-xl text-accent mb-2 tracking-wider">
        CodeCrafts
      </h1>
      <h2 className="font-pixel text-pixel-lg text-foreground mb-1">
        Adventure
      </h2>
      
      {/* Subtitle */}
      <p className="text-sm text-muted-foreground font-medium">
        Learn to code through epic quests
      </p>
      
      {/* Decorative Pixel Art Elements */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        <div className="w-2 h-2 bg-success rounded-sm animate-pulse"></div>
        <div className="w-2 h-2 bg-warning rounded-sm animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-error rounded-sm animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        <div className="w-2 h-2 bg-accent rounded-sm animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        <div className="w-2 h-2 bg-primary rounded-sm animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      </div>
    </div>
  );
};

export default GameLogo;