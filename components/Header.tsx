'use client';

import React from 'react';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="flex h-14 items-center justify-center border-b border-zinc-100 bg-white px-6">
      <div className="relative h-8 w-32">
        <Image
          src="https://tiketopia.com/uploads/0000/6/2025/09/08/tiketopia-2.png"
          alt="Tiketopia Logo"
          fill
          className="object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </header>
  );
};
