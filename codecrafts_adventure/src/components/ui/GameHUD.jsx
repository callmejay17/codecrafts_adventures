import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const GameHUD = ({ 
  isCollapsed = false,
  character = {
    name: 'CodeCrafter',
    level: 12,
    xp: 2450,
    maxXp: 3000,
    health: 85,
    maxHealth: 100,
    avatar: '/assets/images/character-avatar.png'
  }
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCharacterPanel, setShowCharacterPanel] = useState(false);

  const xpPercentage = (character?.xp / character?.maxXp) * 100;
  const healthPercentage = (character?.health / character?.maxHealth) * 100;

  const navigationItems = [
    { 
      path: '/main-game-interface', 
      label: 'Game', 
      icon: 'Gamepad2',
      description: 'Main coding adventure'
    },
    { 
      path: '/quest-map-challenge-selection', 
      label: 'Quests', 
      icon: 'Map',
      description: 'Explore challenges'
    },
    { 
      path: '/character-profile-progression', 
      label: 'Profile', 
      icon: 'User',
      description: 'Character progression'
    },
  ];

  const secondaryItems = [
    { 
      path: '/settings-game-configuration', 
      label: 'Settings', 
      icon: 'Settings',
      description: 'Game configuration'
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    navigate('/user-login');
    setShowDropdown(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-hud bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <Icon name="Code" size={20} color="var(--color-primary-foreground)" />
            </div>
            <span className="font-pixel text-pixel-sm text-accent hidden sm:block">
              CodeCrafts Adventure
            </span>
          </div>
        </div>

        {/* Character Stats - Desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            {/* Character Avatar */}
            <button
              onClick={() => setShowCharacterPanel(!showCharacterPanel)}
              className="flex items-center space-x-2 p-2 rounded-sm hover:bg-muted game-transition"
            >
              <div className="w-8 h-8 bg-secondary rounded-sm flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-secondary-foreground)" />
              </div>
              <div className="text-left">
                <div className="font-pixel text-pixel-xs text-foreground">{character?.name}</div>
                <div className="font-sans text-xs text-muted-foreground">Level {character?.level}</div>
              </div>
            </button>

            {/* XP Bar */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={14} color="var(--color-accent)" />
                <span className="font-sans text-xs text-muted-foreground">
                  {character?.xp}/{character?.maxXp} XP
                </span>
              </div>
              <div className="w-24 h-2 bg-muted rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-accent game-transition"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>

            {/* Health Bar */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <Icon name="Heart" size={14} color="var(--color-error)" />
                <span className="font-sans text-xs text-muted-foreground">
                  {character?.health}/{character?.maxHealth} HP
                </span>
              </div>
              <div className="w-24 h-2 bg-muted rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-error game-transition"
                  style={{ width: `${healthPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-2">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="font-sans"
            >
              {item?.label}
            </Button>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDropdown(!showDropdown)}
              iconName="MoreHorizontal"
              iconSize={16}
            />
            
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-sm retro-shadow z-dropdown">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted game-transition flex items-center space-x-2"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                  <hr className="my-2 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted game-transition flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDropdown(!showDropdown)}
            iconName="Menu"
            iconSize={20}
          />
        </div>
      </div>
      {/* Mobile Navigation Dropdown */}
      {showDropdown && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-2 space-y-1">
            {/* Character Stats - Mobile */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-sm mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center">
                  <Icon name="User" size={20} color="var(--color-secondary-foreground)" />
                </div>
                <div>
                  <div className="font-pixel text-pixel-xs text-foreground">{character?.name}</div>
                  <div className="font-sans text-xs text-muted-foreground">Level {character?.level}</div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="font-sans text-xs text-muted-foreground">
                  {character?.xp}/{character?.maxXp} XP
                </div>
                <div className="font-sans text-xs text-muted-foreground">
                  {character?.health}/{character?.maxHealth} HP
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            {[...navigationItems, ...secondaryItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full px-3 py-2 text-left rounded-sm game-transition flex items-center space-x-3 ${
                  isActivePath(item?.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <div>
                  <div className="font-sans text-sm">{item?.label}</div>
                  <div className="font-sans text-xs text-muted-foreground">{item?.description}</div>
                </div>
              </button>
            ))}

            <hr className="my-2 border-border" />
            
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 text-left rounded-sm game-transition flex items-center space-x-3 text-error hover:bg-muted"
            >
              <Icon name="LogOut" size={18} />
              <span className="font-sans text-sm">Logout</span>
            </button>
          </div>
        </div>
      )}
      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-50" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
};

export default GameHUD;