import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import LoginForm from './components/LoginForm';
import GameLogo from './components/GameLogo';
import AnimatedBackground from './components/AnimatedBackground';
import LanguageSelector from './components/LanguageSelector';
import LoadingSpinner from './components/LoadingSpinner';

const UserLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('codecrafts_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setWelcomeMessage(`Welcome back, ${userData?.character}!`);
      setIsLoading(true);
      
      // Auto-redirect after showing welcome message
      setTimeout(() => {
        navigate('/main-game-interface');
      }, 2000);
    }
  }, [navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  // Show loading screen if auto-redirecting
  if (isLoading && welcomeMessage) {
    return <LoadingSpinner message={welcomeMessage} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      {/* Header Navigation */}
      <header className="relative z-10 flex items-center justify-between p-4 lg:p-6">
        {/* Logo/Home Button */}
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          iconName="Home"
          iconPosition="left"
          className="font-pixel text-pixel-sm text-accent hover:text-accent/80"
        >
          <span className="hidden sm:inline">CodeCrafts</span>
        </Button>

        {/* Language Selector */}
        <LanguageSelector />
      </header>
      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-card border border-border rounded-sm retro-shadow p-8 lg:p-10">
            {/* Game Logo */}
            <GameLogo />
            
            {/* Login Form */}
            <LoginForm />
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground mb-2">
              Demo Credentials for Testing:
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="bg-muted/20 p-2 rounded-sm border border-border">
                <span className="text-accent font-medium">Player:</span> player@codecrafts.com / adventure123
              </div>
              <div className="bg-muted/20 p-2 rounded-sm border border-border">
                <span className="text-success font-medium">Newbie:</span> newbie@codecrafts.com / beginner456
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 text-center p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Secure Login</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={12} />
            <span>SSL Protected</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Gamepad2" size={12} />
            <span>Adventure Awaits</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} CodeCrafts Adventure. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserLogin;