import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    'player@codecrafts.com': { password: 'adventure123', character: 'CodeCrafter' },
    'newbie@codecrafts.com': { password: 'beginner456', character: 'QuestSeeker' },
    'admin@codecrafts.com': { password: 'admin789', character: 'GameMaster' }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Your adventurer email is required to continue your quest!';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address, brave adventurer!';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Your secret password is needed to unlock your character!';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long!';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser = mockCredentials?.[formData?.email];
      
      if (mockUser && mockUser?.password === formData?.password) {
        // Store user session
        localStorage.setItem('codecrafts_user', JSON.stringify({
          email: formData?.email,
          character: mockUser?.character,
          loginTime: new Date()?.toISOString()
        }));
        
        // Success message and redirect
        setIsLoading(false);
        navigate('/main-game-interface');
      } else {
        setIsLoading(false);
        setErrors({
          general: 'Invalid credentials! Check your email and password, then try again, adventurer!'
        });
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('codecrafts_user', JSON.stringify({
        email: `${provider?.toLowerCase()}@codecrafts.com`,
        character: 'SocialAdventurer',
        loginTime: new Date()?.toISOString(),
        provider: provider
      }));
      
      setIsLoading(false);
      navigate('/main-game-interface');
    }, 2000);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error rounded-sm">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <span className="text-sm text-error font-medium">{errors?.general}</span>
            </div>
          </div>
        )}

        {/* Email Input */}
        <Input
          label="Adventurer Email"
          type="email"
          placeholder="Enter your quest email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
          className="game-transition"
        />

        {/* Password Input */}
        <Input
          label="Secret Password"
          type="password"
          placeholder="Enter your character password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          disabled={isLoading}
          className="game-transition"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember Me"
            checked={formData?.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
            disabled={isLoading}
            size="sm"
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-accent hover:text-accent/80 game-transition font-medium"
            disabled={isLoading}
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
          disabled={isLoading}
          className="font-pixel text-pixel-sm"
        >
          {isLoading ? 'Entering Adventure...' : 'Begin Adventure'}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground font-pixel text-pixel-xs">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('Google')}
            disabled={isLoading}
            iconName="Chrome"
            iconPosition="left"
            iconSize={18}
            className="font-medium"
          >
            Google
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('GitHub')}
            disabled={isLoading}
            iconName="Github"
            iconPosition="left"
            iconSize={18}
            className="font-medium"
          >
            GitHub
          </Button>
        </div>

        {/* Registration Link */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            New Adventurer?
          </p>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/user-registration-character-creation')}
            disabled={isLoading}
            iconName="UserPlus"
            iconPosition="left"
            className="font-pixel text-pixel-sm text-accent hover:text-accent/80"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;