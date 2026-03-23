'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { MapPin, Star, Camera, Compass } from 'lucide-react';

const DESTINATIONS = [
  {
    category: 'Culture & Nature',
    icon: <Star size={16} className="text-amber-500" />,
    items: [
      {
        name: 'Ubud',
        description: 'The cultural heart of Bali, famous for the Monkey Forest, art markets, and galleries.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/ubud.jpg',
      },
      {
        name: 'Tegalalang Rice Terrace',
        description: 'Stunning terraced rice fields offering iconic Balinese landscapes.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/tegalalang.jpg',
      },
      {
        name: 'Tirta Empul',
        description: 'A holy water temple where visitors can observe or participate in purification rituals.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/tirta-empul.jpg',
      },
    ],
  },
  {
    category: 'Beaches & Beach Clubs',
    icon: <Camera size={16} className="text-blue-500" />,
    items: [
      {
        name: 'Seminyak & Canggu',
        description: 'Trendy hubs known for surf beaches, world-class beach clubs like La Brisa, and fine dining.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/canggu.jpg',
      },
      {
        name: 'Uluwatu',
        description: 'Breathtaking cliffside views, white sand beaches, and the famous Kecak Fire Dance.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/uluwatu.jpg',
      },
      {
        name: 'Nusa Dua & Jimbaran',
        description: 'Upscale resort enclaves and legendary beachfront seafood dinners at sunset.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/nusa-dua.jpg',
      },
      {
        name: 'Melasti Beach',
        description: 'A pristine white sand beach in Ungasan, perfect for swimming and photography.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/melasti.jpg',
      },
    ],
  },
  {
    category: 'Temples & Landmarks',
    icon: <MapPin size={16} className="text-[#f54502]" />,
    items: [
      {
        name: 'Tanah Lot',
        description: 'An ancient Hindu shrine perched on a rock formation, famous for spectacular sunsets.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/tanah-lot.jpg',
      },
      {
        name: 'Ulun Danu Beratan',
        description: 'The iconic "floating" temple on Lake Beratan in the cool highlands of Bedugul.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/bedugul.jpg',
      },
    ],
  },
  {
    category: 'Adventure & Nature',
    icon: <Compass size={16} className="text-emerald-500" />,
    items: [
      {
        name: 'Nusa Penida & Lembongan',
        description: 'Island getaways famous for Kelingking Cliff, Manta Bay snorkeling, and crystal clear waters.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/nusa-penida.jpg',
      },
      {
        name: 'Tegenungan Waterfall',
        description: 'A powerful and scenic waterfall located conveniently close to Ubud.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/tegenungan.jpg',
      },
      {
        name: 'Bali Safari & Marine Park',
        description: 'A family-friendly wildlife adventure featuring animals from Indonesia, Africa, and India.',
        image: 'https://cmdcnlhpphkeskmeyytw.supabase.co/storage/v1/object/public/Free%20Storage/bali-safari.jpg',
      },
    ],
  },
];

export const Destinations = () => {
  return (
    <section className="flex flex-col gap-8 px-6 pb-32">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-900">Popular Destinations</h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Bali offers a perfect blend of culture, beaches, and nature. From the artistic heart of Ubud to the 
          dramatic cliffs of Uluwatu, explore the most iconic spots on the island.
        </p>
      </div>

      {DESTINATIONS.map((cat, idx) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
            {cat.icon}
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              {cat.category}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {cat.items.map((item) => (
              <div
                key={item.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-zinc-100 shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-lg font-bold text-white">{item.name}</h4>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
};
