'use client';

import React from 'react';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="flex h-14 items-center justify-center border-b border-zinc-100 bg-white px-6">
      <div className="relative h-8 w-32">
        <Image
          src="https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/cdn/ubud-exploring/ubudexploring-logo.png"
          alt="Ubud Exploring"
          fill
          className="object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </header>
  );
};
