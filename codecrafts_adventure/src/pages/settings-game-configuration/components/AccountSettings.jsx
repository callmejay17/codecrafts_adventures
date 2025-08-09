import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettings = ({ isExpanded, onToggle }) => {
  const [formData, setFormData] = useState({
    username: 'CodeCrafter',
    email: 'codecrafter@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData?.newPassword && formData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (formData?.newPassword && formData?.newPassword !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    
    // Show success message (would integrate with toast system)
    console.log('Account settings saved successfully');
  };

  return (
    <div className="border border-border rounded-sm bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 game-transition"
      >
        <div className="flex items-center space-x-3">
          <Icon name="User" size={20} color="var(--color-accent)" />
          <div>
            <h3 className="font-pixel text-pixel-sm text-foreground">Account Settings</h3>
            <p className="text-sm text-muted-foreground">Manage your profile and security</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          color="var(--color-muted-foreground)" 
        />
      </button>
      {isExpanded && (
        <div className="p-4 border-t border-border space-y-6">
          {/* Profile Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Profile Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Username"
                type="text"
                value={formData?.username}
                onChange={(e) => handleInputChange('username', e?.target?.value)}
                error={errors?.username}
                description="Your display name in the game"
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                description="Used for account recovery and notifications"
                required
              />
            </div>
          </div>

          {/* Password Change */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Change Password</h4>
            
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={formData?.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e?.target?.value)}
                error={errors?.currentPassword}
                placeholder="Enter your current password"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  type="password"
                  value={formData?.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e?.target?.value)}
                  error={errors?.newPassword}
                  placeholder="Enter new password"
                  description="Minimum 8 characters"
                />
                
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={formData?.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                  error={errors?.confirmPassword}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          {/* Email Preferences */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Email Preferences</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Email Notifications"
                description="Receive notifications about quest updates and achievements"
                checked={formData?.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e?.target?.checked)}
              />
              
              <Checkbox
                label="Weekly Progress Digest"
                description="Get a weekly summary of your coding progress"
                checked={formData?.weeklyDigest}
                onChange={(e) => handleInputChange('weeklyDigest', e?.target?.checked)}
              />
              
              <Checkbox
                label="Marketing Communications"
                description="Receive updates about new features and events"
                checked={formData?.marketingEmails}
                onChange={(e) => handleInputChange('marketingEmails', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Save Changes
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setFormData({
                  username: 'CodeCrafter',
                  email: 'codecrafter@example.com',
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                  emailNotifications: true,
                  weeklyDigest: false,
                  marketingEmails: false
                });
                setErrors({});
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;