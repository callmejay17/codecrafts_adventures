import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-modal">
      <div className="bg-card border border-border rounded-sm p-8 retro-shadow">
        <div className="text-center">
          {/* Animated Spinner */}
          <div className="relative mb-4">
            <div className="w-16 h-16 border-4 border-muted rounded-sm animate-spin border-t-accent mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="Code" size={24} color="var(--color-accent)" />
            </div>
          </div>
          
          {/* Loading Message */}
          <p className="font-pixel text-pixel-sm text-foreground mb-2">{message}</p>
          <p className="text-sm text-muted-foreground">Please wait while we prepare your adventure...</p>
          
          {/* Animated Dots */}
          <div className="flex items-center justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-accent rounded-sm animate-bounce"></div>
            <div className="w-2 h-2 bg-accent rounded-sm animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-accent rounded-sm animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;