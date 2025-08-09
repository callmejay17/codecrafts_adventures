import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MinimalHeader from './components/MinimalHeader';
import ProgressIndicator from './components/ProgressIndicator';
import AccountCreationForm from './components/AccountCreationForm';
import CharacterCustomization from './components/CharacterCustomization';
import CharacterNamingWeapon from './components/CharacterNamingWeapon';

const UserRegistrationCharacterCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    avatar: 0,
    hairColor: '#8B4513',
    skinTone: '#FDBCB4',
    clothing: '#2D5A27',
    characterName: '',
    weapon: null
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save character data to localStorage or send to backend
    const characterData = {
      ...formData,
      createdAt: new Date()?.toISOString(),
      level: 1,
      xp: 0,
      maxXp: 100,
      health: 100,
      maxHealth: 100,
      totalXp: 0,
      questsCompleted: 0,
      achievements: 0,
      streak: 0,
      class: ['Warrior', 'Mage', 'Archer', 'Rogue', 'Paladin', 'Scholar']?.[formData?.avatar] || 'Adventurer'
    };

    localStorage.setItem('characterData', JSON.stringify(characterData));
    localStorage.setItem('userRegistered', 'true');

    // Navigate to main game interface
    navigate('/main-game-interface');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountCreationForm
            onNext={handleNext}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <CharacterCustomization
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <CharacterNamingWeapon
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
            setFormData={setFormData}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      
      {/* Main Content */}
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          
          {/* Step Content */}
          <div className="mt-8">
            {renderCurrentStep()}
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </div>
  );
};

export default UserRegistrationCharacterCreation;