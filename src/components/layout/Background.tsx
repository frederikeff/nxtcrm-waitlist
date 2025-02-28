// src/components/layout/Background.tsx
"use client";

import React from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Adaptive main background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-zinc-900 dark:to-black transition-colors duration-300"></div>
      
      {/* Subtle animated glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-times8-purple/5 dark:bg-times8-purple/20 rounded-full filter blur-[100px] opacity-70 dark:opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-pink-500/5 dark:bg-times8-purple/30 rounded-full filter blur-[80px] opacity-50 dark:opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-times8-purple/5 dark:bg-pink-500/20 rounded-full filter blur-[120px] opacity-50 dark:opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500/5 dark:bg-times8-purple/30 rounded-full filter blur-[100px] opacity-60 dark:opacity-40 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-soft-light"></div>
    </div>
  );
}