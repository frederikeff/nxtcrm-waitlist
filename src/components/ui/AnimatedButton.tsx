// src/components/ui/AnimatedButton.tsx
"use client";

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'adaptive';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type AnimationType = 'scale' | 'bounce' | 'pulse' | 'shine' | 'glow' | 'none';

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  animationType?: AnimationType;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  animationType = 'none',
  className = '',
  ...props
}) => {
  // Base classes all buttons share
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-times8-purple hover:bg-times8-purple-dark text-white focus:ring-times8-purple',
    secondary: 'bg-white/10 dark:bg-dark-bg-tertiary hover:bg-white/20 dark:hover:bg-dark-border text-white dark:text-white border border-white/30 dark:border-dark-border focus:ring-times8-purple',
    outline: 'bg-transparent hover:bg-times8-purple/10 text-times8-purple border border-times8-purple focus:ring-times8-purple',
    ghost: 'bg-transparent hover:bg-white/10 dark:hover:bg-dark-bg-tertiary text-white dark:text-gray-300 focus:ring-times8-purple',
    white: 'bg-white hover:bg-white text-black border border-white/10 focus:ring-times8-purple',
    adaptive: 'bg-black hover:bg-black/90 text-white dark:bg-white dark:hover:bg-white/90 dark:text-black border border-transparent focus:ring-times8-purple',
  };
  
  // Size-specific classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  // Animation classes
  const animationClasses = {
    scale: 'transition-transform duration-300 hover:scale-105 active:scale-95',
    bounce: 'hover:animate-bounce',
    pulse: 'hover:animate-pulse',
    shine: 'relative overflow-hidden hover:before:absolute hover:before:content-[""] hover:before:top-0 hover:before:right-0 hover:before:w-12 hover:before:h-full hover:before:bg-white hover:before:bg-opacity-30 hover:before:transform hover:before:-skew-x-30 hover:before:animate-shine',
    glow: 'transition-all duration-300 hover:shadow-glow-purple hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
    none: '',
  };
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${animationClasses[animationType]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;