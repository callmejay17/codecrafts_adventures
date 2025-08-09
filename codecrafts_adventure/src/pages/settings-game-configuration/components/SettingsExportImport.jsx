import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SettingsExportImport = () => {
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const mockSettings = {
    account: {
      username: 'CodeCrafter',
      emailNotifications: true,
      weeklyDigest: false
    },
    game: {
      difficulty: 'normal',
      hintFrequency: 'balanced',
      autoSaveInterval: '5'
    },
    editor: {
      theme: 'dark',
      fontSize: '14',
      fontFamily: 'jetbrains-mono'
    },
    audioVisual: {
      masterVolume: 75,
      soundEffectsEnabled: true,
      musicEnabled: true
    },
    privacy: {
      profileVisibility: 'public',
      dataCollection: true,
      analyticsOptIn: true
    },
    exportDate: new Date()?.toISOString(),
    version: '1.0.0'
  };

  const handleExportSettings = () => {
    const settingsData = JSON.stringify(mockSettings, null, 2);
    const blob = new Blob([settingsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `codecrafts-settings-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = async () => {
    if (!importData?.trim()) {
      setImportResult({ success: false, message: 'Please paste your settings data' });
      return;
    }

    setIsImporting(true);
    
    try {
      const parsedData = JSON.parse(importData);
      
      // Validate the structure
      if (!parsedData?.version || !parsedData?.exportDate) {
        throw new Error('Invalid settings file format');
      }
      
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setImportResult({ 
        success: true, 
        message: 'Settings imported successfully! Please refresh the page to see changes.' 
      });
      setImportData('');
      
    } catch (error) {
      setImportResult({ 
        success: false, 
        message: `Import failed: ${error?.message}` 
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImportData(e?.target?.result);
        setImportResult(null);
      };
      reader?.readAsText(file);
    }
  };

  return (
    <div className="border border-border rounded-sm bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="RefreshCw" size={20} color="var(--color-accent)" />
          <div>
            <h3 className="font-pixel text-pixel-sm text-foreground">Export & Import Settings</h3>
            <p className="text-sm text-muted-foreground">Share configurations across devices</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Export Section */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Export Settings</h4>
          
          <div className="p-4 bg-muted/20 rounded-sm border border-border">
            <div className="flex items-start space-x-3">
              <Icon name="Download" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <h5 className="font-medium text-foreground mb-1">Download Configuration</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Export all your current settings to a JSON file that can be imported on another device or shared with others.
                </p>
                <Button
                  variant="default"
                  onClick={handleExportSettings}
                  iconName="Download"
                  iconPosition="left"
                  size="sm"
                >
                  Export Settings
                </Button>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h6 className="text-sm font-medium text-foreground">Included in Export:</h6>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={12} color="var(--color-success)" />
                  <span>Game preferences & difficulty</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={12} color="var(--color-success)" />
                  <span>Code editor settings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={12} color="var(--color-success)" />
                  <span>Audio & visual preferences</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={12} color="var(--color-success)" />
                  <span>Privacy settings</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h6 className="text-sm font-medium text-foreground">Not Included:</h6>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center space-x-2">
                  <Icon name="X" size={12} color="var(--color-error)" />
                  <span>Account credentials</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="X" size={12} color="var(--color-error)" />
                  <span>Progress & achievements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="X" size={12} color="var(--color-error)" />
                  <span>Personal information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="X" size={12} color="var(--color-error)" />
                  <span>Code solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Import Section */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Import Settings</h4>
          
          <div className="space-y-4">
            {/* File Upload */}
            <div className="p-4 bg-muted/20 rounded-sm border border-border">
              <div className="flex items-start space-x-3">
                <Icon name="Upload" size={20} color="var(--color-primary)" />
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-1">Upload Settings File</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select a previously exported settings file to import your configuration.
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="settings-file-upload"
                  />
                  <label htmlFor="settings-file-upload">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Upload"
                      iconPosition="left"
                    >
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            {/* Manual Import */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Or paste settings data manually:
              </label>
              <textarea
                value={importData}
                onChange={(e) => {
                  setImportData(e?.target?.value);
                  setImportResult(null);
                }}
                placeholder="Paste your exported settings JSON data here..."
                className="w-full h-32 p-3 bg-input border border-border rounded-sm text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring game-transition"
              />
            </div>

            {/* Import Result */}
            {importResult && (
              <div className={`p-3 rounded-sm border ${
                importResult?.success 
                  ? 'bg-success/10 border-success/20 text-success' :'bg-error/10 border-error/20 text-error'
              }`}>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={importResult?.success ? "CheckCircle" : "AlertCircle"} 
                    size={16} 
                  />
                  <span className="text-sm">{importResult?.message}</span>
                </div>
              </div>
            )}

            {/* Import Actions */}
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handleImportSettings}
                loading={isImporting}
                disabled={!importData?.trim()}
                iconName="Upload"
                iconPosition="left"
                size="sm"
              >
                Import Settings
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  setImportData('');
                  setImportResult(null);
                }}
                disabled={!importData?.trim()}
                iconName="X"
                iconPosition="left"
                size="sm"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="p-4 bg-warning/10 rounded-sm border border-warning/20">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            <div>
              <h5 className="font-medium text-foreground mb-1">Important Notes</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Importing settings will overwrite your current configuration</li>
                <li>• Only import settings files from trusted sources</li>
                <li>• Some settings may require a page refresh to take effect</li>
                <li>• Account-specific settings will not be imported</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsExportImport;