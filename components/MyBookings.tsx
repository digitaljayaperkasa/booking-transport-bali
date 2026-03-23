'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, ExternalLink, Trash2, MessageCircle } from 'lucide-react';

interface Booking {
  id: string;
  service: 'airport' | 'charter';
  date: string;
  time: string;
  price: number;
  status: string;
  details: any;
}

export const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('tiketopia_bookings');
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBookings(JSON.parse(saved));
    }
  }, []);

  const deleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('tiketopia_bookings', JSON.stringify(updated));
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const contactWhatsApp = () => {
    window.open('https://wa.me/6285829289422', '_blank');
  };

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
        <div className="rounded-full bg-zinc-100 p-6 text-zinc-400">
          <Calendar size={48} />
        </div>
        <h3 className="text-lg font-bold text-zinc-900">No Bookings Yet</h3>
        <p className="text-sm text-zinc-500">Your booking history will appear here once you make a reservation.</p>
        <button 
          onClick={contactWhatsApp}
          className="mt-4 flex items-center gap-2 rounded-xl bg-[#f54502] px-6 py-3 font-bold text-white"
        >
          <MessageCircle size={18} />
          Contact Support
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6 pb-32">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-zinc-900">My Bookings</h2>
        <button 
          onClick={contactWhatsApp}
          className="flex items-center gap-1 text-xs font-bold text-[#f54502]"
        >
          <MessageCircle size={14} />
          Need Help?
        </button>
      </div>

      {bookings.map((booking) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${booking.service === 'airport' ? 'text-blue-600' : 'text-purple-600'}`}>
                {booking.service === 'airport' ? 'Airport Transfer' : 'Car Charter'}
              </span>
              <span className="text-sm font-bold text-zinc-900">
                {booking.service === 'airport' ? booking.details.route : `${booking.details.duration} Charter`}
              </span>
            </div>
            <button 
              onClick={() => deleteBooking(booking.id)}
              className="rounded-full p-2 text-zinc-300 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 border-y border-zinc-50 py-3">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <Calendar size={14} className="text-zinc-400" />
              {booking.date || 'Not set'}
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <Clock size={14} className="text-zinc-400" />
              {booking.time || 'Not set'}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">Price</span>
              <span className="text-sm font-bold text-[#f54502]">{formatIDR(booking.price)}</span>
            </div>
            <button 
              onClick={() => {
                const msg = encodeURIComponent(`Hi, I'd like to follow up on my booking ID: ${booking.id}`);
                window.open(`https://wa.me/6285829289422?text=${msg}`, '_blank');
              }}
              className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-bold text-white"
            >
              <ExternalLink size={14} />
              Re-confirm
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
