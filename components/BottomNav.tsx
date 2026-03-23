'use client';

import React from 'react';
import { Home, Calendar, MessageCircle } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'bookings';
  onTabChange: (tab: 'home' | 'bookings') => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const contactWhatsApp = () => {
    window.open('https://wa.me/6285829289422', '_blank');
  };

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex h-20 w-full max-w-[480px] -translate-x-1/2 items-center justify-around border-t border-zinc-100 bg-white/90 px-6 pb-4 backdrop-blur-md">
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-[#f54502]' : 'text-zinc-400'}`}
      >
        <Home size={24} />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      <button 
        onClick={() => onTabChange('bookings')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'bookings' ? 'text-[#f54502]' : 'text-zinc-400'}`}
      >
        <Calendar size={24} />
        <span className="text-[10px] font-medium">My Bookings</span>
      </button>
      <button 
        onClick={contactWhatsApp}
        className="flex flex-col items-center gap-1 text-zinc-400"
      >
        <MessageCircle size={24} />
        <span className="text-[10px] font-medium">Contact</span>
      </button>
    </nav>
  );
};
