import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles?.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 2 + 1,
          icon: ['Code', 'Zap', 'Star', 'Sparkles', 'Gem']?.[Math.floor(Math.random() * 5)],
          color: ['var(--color-accent)', 'var(--color-primary)', 'var(--color-success)', 'var(--color-warning)']?.[Math.floor(Math.random() * 4)]
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-90"></div>
      {/* Floating Particles */}
      {particles?.map((particle) => (
        <div
          key={particle?.id}
          className="absolute opacity-20 animate-pulse"
          style={{
            left: `${particle?.x}%`,
            top: `${particle?.y}%`,
            animationDuration: `${particle?.speed + 2}s`,
            animationDelay: `${particle?.id * 0.2}s`
          }}
        >
          <Icon 
            name={particle?.icon} 
            size={particle?.size * 4} 
            color={particle?.color}
          />
        </div>
      ))}
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 opacity-30">
        <div className="w-16 h-16 border-2 border-accent rounded-sm flex items-center justify-center">
          <Icon name="Gamepad2" size={24} color="var(--color-accent)" />
        </div>
      </div>
      <div className="absolute top-8 right-8 opacity-30">
        <div className="w-16 h-16 border-2 border-primary rounded-sm flex items-center justify-center">
          <Icon name="Trophy" size={24} color="var(--color-primary)" />
        </div>
      </div>
      <div className="absolute bottom-8 left-8 opacity-30">
        <div className="w-16 h-16 border-2 border-success rounded-sm flex items-center justify-center">
          <Icon name="Shield" size={24} color="var(--color-success)" />
        </div>
      </div>
      <div className="absolute bottom-8 right-8 opacity-30">
        <div className="w-16 h-16 border-2 border-warning rounded-sm flex items-center justify-center">
          <Icon name="Sword" size={24} color="var(--color-warning)" />
        </div>
      </div>
      {/* Floating Code Symbols */}
      <div className="absolute top-1/4 left-1/4 opacity-10 animate-bounce" style={{ animationDuration: '3s' }}>
        <span className="font-pixel text-pixel-lg text-accent">{`{}`}</span>
      </div>
      <div className="absolute top-3/4 right-1/4 opacity-10 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <span className="font-pixel text-pixel-lg text-primary">{`</>`}</span>
      </div>
      <div className="absolute top-1/2 left-1/6 opacity-10 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}>
        <span className="font-pixel text-pixel-lg text-success">{`()`}</span>
      </div>
    </div>
  );
};

export default AnimatedBackground;