import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CharacterCustomization = ({ onNext, onPrevious, formData, setFormData }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(formData?.avatar || 0);
  const [selectedHairColor, setSelectedHairColor] = useState(formData?.hairColor || '#8B4513');
  const [selectedSkinTone, setSelectedSkinTone] = useState(formData?.skinTone || '#FDBCB4');
  const [selectedClothing, setSelectedClothing] = useState(formData?.clothing || '#2D5A27');

  const avatarOptions = [
    { id: 0, name: 'Warrior', description: 'Strong and brave', icon: 'Sword' },
    { id: 1, name: 'Mage', description: 'Wise and magical', icon: 'Sparkles' },
    { id: 2, name: 'Archer', description: 'Swift and precise', icon: 'Target' },
    { id: 3, name: 'Rogue', description: 'Stealthy and cunning', icon: 'Eye' },
    { id: 4, name: 'Paladin', description: 'Noble and righteous', icon: 'Shield' },
    { id: 5, name: 'Scholar', description: 'Intelligent and curious', icon: 'BookOpen' }
  ];

  const hairColors = [
    '#8B4513', '#D2691E', '#FFD700', '#000000', '#654321', '#FF6347', '#9370DB', '#32CD32'
  ];

  const skinTones = [
    '#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#975A3E', '#6B4423', '#4A2C17'
  ];

  const clothingColors = [
    '#2D5A27', '#8B4513', '#4169E1', '#DC143C', '#FF8C00', '#9370DB', '#2F4F4F', '#8B0000'
  ];

  const handleNext = () => {
    setFormData(prev => ({
      ...prev,
      avatar: selectedAvatar,
      hairColor: selectedHairColor,
      skinTone: selectedSkinTone,
      clothing: selectedClothing
    }));
    onNext();
  };

  const ColorPicker = ({ colors, selectedColor, onColorSelect, label }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="flex flex-wrap gap-2">
        {colors?.map((color, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onColorSelect(color)}
            className={`w-8 h-8 rounded-sm border-2 game-transition ${
              selectedColor === color ? 'border-accent scale-110' : 'border-border hover:border-muted-foreground'
            }`}
            style={{ backgroundColor: color }}
            title={`Color ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-pixel text-pixel-lg text-foreground mb-2">Customize Your Character</h2>
        <p className="text-sm text-muted-foreground">
          Design your avatar to represent you in the coding adventure
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Character Preview */}
        <div className="order-2 lg:order-1">
          <div className="bg-card border border-border rounded-sm p-6">
            <h3 className="font-pixel text-pixel-sm text-foreground mb-4 text-center">Character Preview</h3>
            
            {/* Avatar Preview */}
            <div className="bg-muted/20 rounded-sm p-8 mb-6 flex items-center justify-center">
              <div className="relative">
                {/* Character Base */}
                <div 
                  className="w-32 h-32 rounded-sm border-4 border-border flex items-center justify-center pixel-perfect"
                  style={{ backgroundColor: selectedSkinTone }}
                >
                  <Icon 
                    name={avatarOptions?.[selectedAvatar]?.icon} 
                    size={48} 
                    color={selectedClothing}
                  />
                </div>
                
                {/* Hair Overlay */}
                <div 
                  className="absolute -top-2 left-2 right-2 h-8 rounded-t-sm"
                  style={{ backgroundColor: selectedHairColor }}
                />
                
                {/* Clothing Accent */}
                <div 
                  className="absolute bottom-2 left-2 right-2 h-4 rounded-sm"
                  style={{ backgroundColor: selectedClothing }}
                />
              </div>
            </div>

            {/* Character Info */}
            <div className="text-center">
              <h4 className="font-pixel text-pixel-sm text-foreground mb-1">
                {avatarOptions?.[selectedAvatar]?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {avatarOptions?.[selectedAvatar]?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className="order-1 lg:order-2 space-y-6">
          {/* Avatar Selection */}
          <div className="bg-card border border-border rounded-sm p-6">
            <h3 className="font-pixel text-pixel-sm text-foreground mb-4">Choose Avatar Type</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {avatarOptions?.map((avatar) => (
                <button
                  key={avatar?.id}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar?.id)}
                  className={`p-4 rounded-sm border-2 game-transition text-center ${
                    selectedAvatar === avatar?.id
                      ? 'border-accent bg-accent/10 text-accent' :'border-border bg-card hover:border-muted-foreground hover:bg-muted/20'
                  }`}
                >
                  <Icon name={avatar?.icon} size={24} className="mx-auto mb-2" />
                  <div className="font-pixel text-pixel-xs">{avatar?.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Appearance Customization */}
          <div className="bg-card border border-border rounded-sm p-6 space-y-6">
            <h3 className="font-pixel text-pixel-sm text-foreground mb-4">Customize Appearance</h3>
            
            <ColorPicker
              colors={hairColors}
              selectedColor={selectedHairColor}
              onColorSelect={setSelectedHairColor}
              label="Hair Color"
            />

            <ColorPicker
              colors={skinTones}
              selectedColor={selectedSkinTone}
              onColorSelect={setSelectedSkinTone}
              label="Skin Tone"
            />

            <ColorPicker
              colors={clothingColors}
              selectedColor={selectedClothing}
              onColorSelect={setSelectedClothing}
              label="Clothing Color"
            />
          </div>

          {/* Random Generator */}
          <div className="bg-muted/20 border border-border rounded-sm p-4">
            <Button
              variant="outline"
              fullWidth
              iconName="Shuffle"
              iconPosition="left"
              onClick={() => {
                setSelectedAvatar(Math.floor(Math.random() * avatarOptions?.length));
                setSelectedHairColor(hairColors?.[Math.floor(Math.random() * hairColors?.length)]);
                setSelectedSkinTone(skinTones?.[Math.floor(Math.random() * skinTones?.length)]);
                setSelectedClothing(clothingColors?.[Math.floor(Math.random() * clothingColors?.length)]);
              }}
            >
              Randomize Appearance
            </Button>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Previous
        </Button>

        <Button
          variant="default"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
          className="font-pixel"
        >
          Continue to Naming
        </Button>
      </div>
    </div>
  );
};

export default CharacterCustomization;