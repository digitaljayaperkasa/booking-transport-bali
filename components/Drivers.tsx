'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, X, ChevronRight } from 'lucide-react';

const DRIVERS = [
  "I Wayan Karmana", "Nyoman Tri Guna", "Dewa Ketut Rai", "Gusti Putu Sudarsana",
  "Gede Widiasa", "I Gede Ngurah Adi Sucita", "I Komang Agus Juliantara", "I Gede Adi Sasmika",
  "I Putu Eka Arya Pradnyana", "I Made Indra Wirawan", "Putu Angga Ferdinanda", "I Gusti Putu Bang Ardika",
  "I Wayan Krisna Pramana", "Ni Luh Putu Widyantari", "I Nyoman Surya Dharma Subawa", "Ni Putu Ayu Meta Ardiantika",
  "I Made Gede Subawa", "Ketut Suranatha", "I Kadek Agus Musmuliadi", "I Made Gandra"
];

export const Drivers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const displayedDrivers = DRIVERS.slice(0, 8);

  return (
    <section className="px-6 py-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-zinc-900">Our Professional Drivers</h2>
        <button 
          onClick={() => setIsOpen(true)}
          className="text-xs font-semibold text-[#f54502] flex items-center gap-1"
        >
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {displayedDrivers.map((name, idx) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative h-14 w-14 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200 overflow-hidden">
              <User size={24} className="text-zinc-400" />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <span className="text-[10px] font-medium text-zinc-600 text-center line-clamp-2 leading-tight">
              {name.split(' ').slice(-2).join(' ')}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">Our Driver Team</h3>
                  <p className="text-xs text-zinc-500 mt-1">20 Professional & Licensed Drivers</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                  {DRIVERS.map((name, idx) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-100"
                    >
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-zinc-200 shadow-sm">
                        <User size={18} className="text-zinc-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-900 leading-tight">{name}</span>
                        <span className="text-[10px] text-emerald-600 font-medium">Verified Driver</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-emerald-900">Quality Guarantee</h4>
                  <p className="text-[10px] text-emerald-700 leading-relaxed">
                    All our drivers are English-speaking, licensed professionals with extensive knowledge of Bali&apos;s roads and hidden gems. We ensure your safety and comfort throughout your journey.
                  </p>
                </div>
              </div>
              
              <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 bg-[#f54502] text-white font-bold rounded-2xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-all"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
