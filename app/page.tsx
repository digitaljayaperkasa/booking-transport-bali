'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { BookingForm } from '@/components/BookingForm';
import { MyBookings } from '@/components/MyBookings';
import { Destinations } from '@/components/Destinations';
import { Drivers } from '@/components/Drivers';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<'home' | 'bookings'>('home');

  return (
    <main className="relative flex min-h-screen flex-col pb-20">
      <Header />
      
      <AnimatePresence mode="wait">
        {activeTab === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col"
          >
            {/* Hero Section */}
            <section className="relative h-64 w-full overflow-hidden">
              <Image
                src="https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/cdn/ubud-exploring/ubud-exploring-cover.jpg"
                alt="Bali Airport Transport"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </section>

            {/* Title Section */}
            <section className="px-6 py-8 bg-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold text-zinc-900 leading-tight">
                  Explore Bali with <br />
                  <span className="text-[#f54502]">Ubud Exploring</span>
                </h1>
                <p className="mt-2 text-sm text-zinc-500 font-medium leading-relaxed">
                  Bali offers a perfect blend of culture, beaches, and nature. From the artistic heart of Ubud 
                  to the dramatic cliffs of Uluwatu, explore the most iconic spots on the island.
                </p>
              </motion.div>
            </section>

            {/* Drivers Section */}
            <Drivers />

            {/* Booking Section */}
            <section className="flex-1 rounded-t-[32px] bg-zinc-50">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-zinc-200 mt-3" />
              <BookingForm />
            </section>

            {/* Popular Destinations */}
            <Destinations />
          </motion.div>
        ) : (
          <motion.div
            key="bookings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 bg-zinc-50"
          >
            <MyBookings />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
