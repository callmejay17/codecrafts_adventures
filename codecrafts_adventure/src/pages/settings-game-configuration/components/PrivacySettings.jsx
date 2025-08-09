import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySettings = ({ isExpanded, onToggle }) => {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    showProgressToFriends: true,
    showAchievements: true,
    allowFriendRequests: true,
    shareCodeSolutions: false,
    dataCollection: true,
    analyticsOptIn: true,
    crashReporting: true,
    performanceData: false,
    marketingCommunications: false,
    thirdPartyIntegrations: true,
    locationTracking: false
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const profileVisibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to everyone' },
    { value: 'friends', label: 'Friends Only', description: 'Only visible to your friends' },
    { value: 'private', label: 'Private', description: 'Only visible to you' }
  ];

  const handleSettingChange = (key, value) => {
    // Some settings require confirmation
    const sensitiveSettings = ['dataCollection', 'analyticsOptIn', 'profileVisibility'];
    
    if (sensitiveSettings?.includes(key) && value !== settings?.[key]) {
      setPendingAction({ key, value });
      setShowConfirmDialog(true);
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const confirmChange = () => {
    if (pendingAction) {
      setSettings(prev => ({
        ...prev,
        [pendingAction?.key]: pendingAction?.value
      }));
    }
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const cancelChange = () => {
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const handleSave = () => {
    console.log('Privacy settings saved:', settings);
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    // Simulate data export
    const userData = {
      profile: { username: 'CodeCrafter', level: 12 },
      progress: { questsCompleted: 23, totalXP: 15750 },
      settings: settings,
      exportDate: new Date()?.toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'codecrafts-data-export.json';
    link?.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested...');
    // This would typically redirect to a dedicated account deletion flow
  };

  return (
    <div className="border border-border rounded-sm bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 game-transition"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} color="var(--color-accent)" />
          <div>
            <h3 className="font-pixel text-pixel-sm text-foreground">Privacy Settings</h3>
            <p className="text-sm text-muted-foreground">Control your data and visibility</p>
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
          {/* Profile Visibility */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Profile & Visibility</h4>
            
            <Select
              label="Profile Visibility"
              description="Control who can see your profile and progress"
              options={profileVisibilityOptions}
              value={settings?.profileVisibility}
              onChange={(value) => handleSettingChange('profileVisibility', value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Show Progress to Friends"
                description="Allow friends to see your quest progress"
                checked={settings?.showProgressToFriends}
                onChange={(e) => handleSettingChange('showProgressToFriends', e?.target?.checked)}
                disabled={settings?.profileVisibility === 'private'}
              />
              
              <Checkbox
                label="Show Achievements"
                description="Display your achievements on your profile"
                checked={settings?.showAchievements}
                onChange={(e) => handleSettingChange('showAchievements', e?.target?.checked)}
                disabled={settings?.profileVisibility === 'private'}
              />
              
              <Checkbox
                label="Allow Friend Requests"
                description="Let other users send you friend requests"
                checked={settings?.allowFriendRequests}
                onChange={(e) => handleSettingChange('allowFriendRequests', e?.target?.checked)}
              />
              
              <Checkbox
                label="Share Code Solutions"
                description="Allow sharing of your code solutions with others"
                checked={settings?.shareCodeSolutions}
                onChange={(e) => handleSettingChange('shareCodeSolutions', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Data Collection */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Data Collection & Analytics</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Data Collection"
                description="Allow collection of usage data to improve the platform"
                checked={settings?.dataCollection}
                onChange={(e) => handleSettingChange('dataCollection', e?.target?.checked)}
              />
              
              <Checkbox
                label="Analytics Opt-in"
                description="Share anonymous analytics to help us understand user behavior"
                checked={settings?.analyticsOptIn}
                onChange={(e) => handleSettingChange('analyticsOptIn', e?.target?.checked)}
              />
              
              <Checkbox
                label="Crash Reporting"
                description="Automatically send crash reports to help fix bugs"
                checked={settings?.crashReporting}
                onChange={(e) => handleSettingChange('crashReporting', e?.target?.checked)}
              />
              
              <Checkbox
                label="Performance Data"
                description="Share performance metrics to optimize the platform"
                checked={settings?.performanceData}
                onChange={(e) => handleSettingChange('performanceData', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Communications */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Communications</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Marketing Communications"
                description="Receive emails about new features and promotions"
                checked={settings?.marketingCommunications}
                onChange={(e) => handleSettingChange('marketingCommunications', e?.target?.checked)}
              />
              
              <Checkbox
                label="Third-party Integrations"
                description="Allow integration with external coding platforms"
                checked={settings?.thirdPartyIntegrations}
                onChange={(e) => handleSettingChange('thirdPartyIntegrations', e?.target?.checked)}
              />
              
              <Checkbox
                label="Location Tracking"
                description="Use location data for regional features (disabled)"
                checked={settings?.locationTracking}
                onChange={(e) => handleSettingChange('locationTracking', e?.target?.checked)}
                disabled
              />
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Data Management</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/20 rounded-sm border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Download" size={16} color="var(--color-primary)" />
                  <h5 className="font-medium text-foreground">Export Your Data</h5>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Download a copy of all your data including progress, achievements, and settings.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportData}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Data
                </Button>
              </div>

              <div className="p-4 bg-error/10 rounded-sm border border-error/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Trash2" size={16} color="var(--color-error)" />
                  <h5 className="font-medium text-error">Delete Account</h5>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteAccount}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>

          {/* Privacy Summary */}
          <div className="p-4 bg-primary/10 rounded-sm border border-primary/20">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} color="var(--color-primary)" />
              <div>
                <h5 className="font-medium text-foreground mb-1">Privacy Summary</h5>
                <p className="text-sm text-muted-foreground">
                  Your privacy is important to us. We only collect data necessary to provide and improve our service. 
                  You can review our full Privacy Policy and Terms of Service for detailed information about how we handle your data.
                </p>
                <div className="flex space-x-2 mt-2">
                  <Button variant="link" size="sm">Privacy Policy</Button>
                  <Button variant="link" size="sm">Terms of Service</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Save Privacy Settings
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setSettings({
                  profileVisibility: 'public',
                  showProgressToFriends: true,
                  showAchievements: true,
                  allowFriendRequests: true,
                  shareCodeSolutions: false,
                  dataCollection: true,
                  analyticsOptIn: true,
                  crashReporting: true,
                  performanceData: false,
                  marketingCommunications: false,
                  thirdPartyIntegrations: true,
                  locationTracking: false
                });
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset Defaults
            </Button>
          </div>
        </div>
      )}
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-96 bg-card border border-border rounded-sm retro-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="AlertTriangle" size={24} color="var(--color-warning)" />
                <h3 className="font-pixel text-pixel-sm text-foreground">Confirm Change</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to change this privacy setting? This may affect how your data is collected and used.
              </p>
              
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={confirmChange}
                  className="flex-1"
                >
                  Confirm
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelChange}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;