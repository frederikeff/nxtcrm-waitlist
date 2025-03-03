"use client";

import React, { useState } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import GlowBlob from '@/components/decorations/GlowBlob';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Clear any previous error
    setFormError('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.redirect) {
        window.location.href = data.redirect;
      } else if (data.message === 'Email already registered') {
        setFormError('This email is already registered for our waitlist.');
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setFormError('Failed to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section - added more top padding for mobile */}
      <section className="pt-36 pb-16 md:pt-40 md:pb-20 min-h-screen flex flex-col justify-center relative overflow-hidden">
        {/* Add GlowBlobs for decoration */}
        <div className="absolute inset-0 -z-10">
          <GlowBlob position="top-right" size="xl" color="purple" opacity={10} />
          <GlowBlob position="bottom-left" size="lg" color="purple" opacity={15} />
        </div>
        
        <div className="container relative z-10">
          {/* Feature badge */}
          <div className="flex justify-center mb-8">
            <div className="glass px-4 py-2 rounded-full inline-flex items-center gap-2">
              <svg className="w-5 h-5 text-times8-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-adaptive">Super Charge Your Relationships</span>
            </div>
          </div>
          
          {/* Main heading with highlighted text and MORE spacing between lines */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 leading-tight text-adaptive">
              Your CRM Finally Works for
              <div className="h-4"></div>
              you, <span className="bg-times8-purple px-3 py-1 text-white">Not Against</span> You
            </h1>
            <p className="text-xl text-adaptive-secondary max-w-3xl mx-auto">
              No more data entry. No more guesswork. Just ask questions, get answers, and build relationships.
            </p>
          </div>
          
          {/* Waitlist Signup - First Form */}
          <div id="signup-form" className="max-w-md mx-auto mt-12">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 flex-grow"
                required
              />
              <AnimatedButton
                variant="adaptive"
                size="md"
                animationType="glow"
                className="button-glow whitespace-nowrap"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join Beta'}
              </AnimatedButton>
            </form>
            {/* Form error message */}
            {formError && (
              <div className="mt-2 text-red-500 text-sm text-center">
                {formError}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Horizontal Timeline Section - reduced top padding */}
      <section className="py-10 relative">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative pt-8">
              {/* Horizontal line */}
              <div className="absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-times8-purple via-pink-500 to-times8-purple"></div>
              
              {/* Steps */}
              <div className="flex justify-between items-start relative">
                {/* Step 1: Data Input */}
                <div className="flex flex-col items-center relative z-10 w-1/3">
                  <div className="w-12 h-12 mb-4 bg-white dark:bg-black rounded-full border-2 border-times8-purple flex items-center justify-center">
                    {/* Triangle/Funnel icon */}
                    <svg className="w-6 h-6 text-times8-purple" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 4v2.67l-4 8V20h6v-5.33l-4-8V4h2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-center text-adaptive">Dump In Your Data</h3>
                  <p className="text-center text-adaptive-secondary text-sm mt-2">Unstructured, messy, real-time</p>
                </div>
                
                {/* Step 2: AI Processing */}
                <div className="flex flex-col items-center relative z-10 w-1/3">
                  <div className="w-12 h-12 mb-4 bg-white dark:bg-black rounded-full border-2 border-pink-500 flex items-center justify-center">
                    {/* Dot/Network icon */}
                    <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      <circle cx="12" cy="12" r="5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-center text-adaptive">AI Agents Process It</h3>
                  <p className="text-center text-adaptive-secondary text-sm mt-2">Structure, enrich, clean</p>
                </div>
                
                {/* Step 3: Chat With Data */}
                <div className="flex flex-col items-center relative z-10 w-1/3">
                  <div className="w-12 h-12 mb-4 bg-white dark:bg-black rounded-full border-2 border-times8-purple flex items-center justify-center">
                    {/* Square/Chat icon */}
                    <svg className="w-6 h-6 text-times8-purple" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-center text-adaptive">Chat With Your Data</h3>
                  <p className="text-center text-adaptive-secondary text-sm mt-2">Find insights, strengthen relationships</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-24 relative">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg glass-dark">
              <h3 className="text-xl font-bold mb-4 text-adaptive">All Your Data in One Place</h3>
              <p className="text-adaptive-secondary mb-6">
                NxtCRM organizes & centralizes your customer data in one AI-powered platform.
              </p>
              <div className="aspect-video rounded-lg bg-white/5 dark:bg-black/50 border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Database illustration */}
                <div className="flex items-center gap-4">
                  <div className="text-cyan-500">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm0 14c-3.87 0-6-1.5-6-2v-1.32c1.34.86 3.45 1.32 6 1.32s4.66-.46 6-1.32V17c0 .5-2.13 2-6 2zm0-4c-3.87 0-6-1.5-6-2v-1.32c1.34.86 3.45 1.32 6 1.32s4.66-.46 6-1.32V13c0 .5-2.13 2-6 2zm0-4c-3.87 0-6-1.5-6-2V9.68c1.34.86 3.45 1.32 6 1.32s4.66-.46 6-1.32V11c0 .5-2.13 2-6 2z" />
                    </svg>
                  </div>
                  <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-times8-purple"></div>
                  <div className="text-times8-purple">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature 2 - Improved Chat Box Visibility */}
            <div className="p-6 rounded-lg glass-dark">
              <h3 className="text-xl font-bold mb-4 text-adaptive">Chat Smoothly with Your Client Data</h3>
              <p className="text-adaptive-secondary mb-6">
                AI-driven chat interface lets you talk to your CRM like a human.
              </p>
              <div className="aspect-video rounded-lg bg-gray-900 dark:bg-black/50 border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Chat illustration with improved contrast */}
                <div className="relative w-full h-full p-4">
                  <div className="absolute top-4 right-4 bg-times8-purple/90 text-white text-xs px-2 py-1 rounded-full">
                    Chat AI Assistant
                  </div>
                  <div className="absolute bottom-8 w-3/4 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-white/10 rounded-lg p-2 text-white text-sm border border-gray-700 dark:border-white/10">
                    What can I help you with today?
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 rounded-lg glass-dark">
              <h3 className="text-xl font-bold mb-4 text-adaptive">Find Pathways to Deals Faster</h3>
              <p className="text-adaptive-secondary mb-6">
                AI suggests the best sales opportunities based on customer interactions.
              </p>
              <div className="aspect-video rounded-lg bg-white/5 dark:bg-black/50 border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Network visualization */}
                <div className="relative w-full h-full">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-times8-purple rounded-full"></div>
                  <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-times8-purple rounded-full"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-times8-purple rounded-full"></div>
                  <div className="absolute h-px transform rotate-45 bg-times8-purple/50 w-20 top-1/4 left-1/4"></div>
                  <div className="absolute h-px transform -rotate-45 bg-times8-purple/50 w-24 bottom-1/4 left-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="join-beta" className="py-24 relative">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-adaptive">Join Us in Reshaping Relationship Data</h2>
            <p className="text-xl text-adaptive-secondary mb-8">
              No more tedious data entry. Just real connections that matter.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 sm:w-64"
                required
              />
              <AnimatedButton
                variant="adaptive"
                size="md"
                animationType="glow"
                className="button-glow"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join Beta'}
              </AnimatedButton>
            </form>
            {/* Form error message - Second form */}
            {formError && (
              <div className="mt-2 text-red-500 text-sm text-center">
                {formError}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

