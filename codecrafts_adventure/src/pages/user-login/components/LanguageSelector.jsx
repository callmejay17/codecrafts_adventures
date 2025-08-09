import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('codecrafts_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('codecrafts_language', language);
    
    // In a real app, this would trigger language change across the app
    console.log(`Language changed to: ${language}`);
  };

  const getCurrentLanguageLabel = () => {
    const current = languageOptions?.find(lang => lang?.value === currentLanguage);
    return current ? `${current?.flag} ${current?.label}` : '🇺🇸 English';
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <Icon name="Globe" size={16} color="var(--color-muted-foreground)" />
        <Select
          options={languageOptions?.map(lang => ({
            value: lang?.value,
            label: `${lang?.flag} ${lang?.label}`
          }))}
          value={currentLanguage}
          onChange={handleLanguageChange}
          placeholder="Select Language"
          className="min-w-32"
        />
      </div>
    </div>
  );
};

export default LanguageSelector;