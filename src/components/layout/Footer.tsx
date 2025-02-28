// src/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-gray-500 dark:text-white/40 text-sm">©2025 All rights reserved by NxtCRM.ai</span>
          </div>
          
          <div className="flex gap-6 items-center">
            <Link href="/terms" className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white text-sm transition-colors duration-200">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white text-sm transition-colors duration-200">
              Privacy
            </Link>
            
            <a href="mailto:hello@nxtcrm.ai" className="ml-1">
              <AnimatedButton
                variant="primary"
                size="sm"
                animationType="scale"
                className="bg-times8-purple text-white hover:bg-times8-purple-light dark:bg-times8-purple dark:text-white dark:hover:bg-times8-purple-light"
              >
                Careers
              </AnimatedButton>
            </a>
            
            <a href="https://linkedin.com/company/nxtcrm" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}