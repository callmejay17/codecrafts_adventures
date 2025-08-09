import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AccountCreationForm = ({ onNext, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData?.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onNext();
    }
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

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center mx-auto mb-4">
          <Icon name="UserPlus" size={32} color="var(--color-primary-foreground)" />
        </div>
        <h2 className="font-pixel text-pixel-lg text-foreground mb-2">Create Your Account</h2>
        <p className="text-sm text-muted-foreground">
          Join the coding adventure and start your journey to becoming a master programmer
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          description="We'll use this to save your progress and send important updates"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            description="Must be at least 8 characters with uppercase, lowercase, and number"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground game-transition"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground game-transition"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        <div className="bg-muted/20 border border-border rounded-sm p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} color="var(--color-success)" className="mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Your Privacy Matters</h4>
              <p className="text-sm text-muted-foreground">
                We use industry-standard encryption to protect your data. Your progress is saved securely and never shared without permission.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          className="font-pixel"
        >
          Create Account & Continue
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => window.location.href = '/user-login'}
              className="text-accent hover:text-accent/80 font-medium game-transition"
            >
              Sign in here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AccountCreationForm;