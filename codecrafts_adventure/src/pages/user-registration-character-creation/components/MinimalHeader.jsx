import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MinimalHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <Icon name="Code" size={20} color="var(--color-primary-foreground)" />
          </div>
          <span className="font-pixel text-pixel-sm text-accent hidden sm:block">
            CodeCrafts Adventure
          </span>
        </div>

        {/* Help Button */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="HelpCircle"
            iconSize={18}
            onClick={() => {
              // Show help modal or navigate to help page
              console.log('Help clicked');
            }}
          >
            <span className="hidden sm:inline ml-2">Help</span>
          </Button>

          {/* Login Link */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/user-login')}
            iconName="LogIn"
            iconPosition="left"
            iconSize={16}
          >
            <span className="hidden sm:inline">Sign In</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MinimalHeader;