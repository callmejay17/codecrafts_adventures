import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, label: 'Account', icon: 'UserPlus' },
    { id: 2, label: 'Character', icon: 'Palette' },
    { id: 3, label: 'Weapon', icon: 'Sword' }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-sm border-2 flex items-center justify-center game-transition ${
                  currentStep > step?.id
                    ? 'bg-success border-success text-success-foreground'
                    : currentStep === step?.id
                    ? 'bg-accent border-accent text-accent-foreground'
                    : 'bg-muted border-border text-muted-foreground'
                }`}
              >
                {currentStep > step?.id ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step?.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps?.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={`h-0.5 game-transition ${
                    currentStep > step?.id ? 'bg-success' : 'bg-border'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
          <div
            className="h-full bg-accent game-transition"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;