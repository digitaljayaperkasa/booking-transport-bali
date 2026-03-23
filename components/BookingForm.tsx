'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Car, MapPin, Calendar as CalendarIcon, Clock, Users, ChevronRight, Send } from 'lucide-react';

type ServiceType = 'airport' | 'charter';
type VehicleType = 'mpv' | 'minibus';
type CharterVehicleType = 'regular' | 'minibus';

const AIRPORT_PRICING = [
  { area: 'Kuta | Legian | Jimbaran', mpv: 200000, minibus: 475000 },
  { area: 'Seminyak | Sanur | Kerobokan | Nusa Dua', mpv: 250000, minibus: 525000 },
  { area: 'Pecatu | Uluwatu', mpv: 275000, minibus: 700000 },
  { area: 'Canggu', mpv: 300000, minibus: 700000 },
  { area: 'Ubud Centre', mpv: 325000, minibus: 750000 },
  { area: 'North Ubud | Tanah Lot', mpv: 400000, minibus: 775000 },
  { area: 'Padang Bai', mpv: 650000, minibus: 1100000 },
  { area: 'Candidasa', mpv: 675000, minibus: 1150000 },
  { area: 'Lovina | Amed', mpv: 700000, minibus: 1200000 },
  { area: 'Pemuteran | Tejakula', mpv: 850000, minibus: 1400000 },
];

const CHARTER_PRICING = {
  regular: { '6 Hours': 500000, '10 Hours': 650000 },
  minibus: { '6 Hours': 875000, '10 Hours': 1200000 },
};

export const BookingForm = () => {
  const [service, setService] = useState<ServiceType>('airport');
  const [vehicleType, setVehicleType] = useState<VehicleType>('mpv');
  const [charterVehicle, setCharterVehicle] = useState<CharterVehicleType>('regular');
  const [isToAirport, setIsToAirport] = useState(false);
  const [selectedArea, setSelectedArea] = useState(AIRPORT_PRICING[0].area);
  const [isLongDrive, setIsLongDrive] = useState(false);
  const [isNightService, setIsNightService] = useState(false);
  
  const [formData, setFormData] = useState({
    flightNumber: '',
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    passengers: '1',
    duration: '6 Hours',
  });

  // Calculate dynamic pricing directly
  const getPrice = () => {
    if (service === 'airport') {
      const pricing = AIRPORT_PRICING.find(p => p.area === selectedArea);
      if (pricing) {
        return vehicleType === 'mpv' ? pricing.mpv : pricing.minibus;
      }
      return 350000;
    }
    
    // Charter Pricing
    let basePrice = CHARTER_PRICING[charterVehicle][formData.duration as keyof typeof CHARTER_PRICING['regular']] || 500000;
    if (isLongDrive) basePrice += 250000;
    if (isNightService) basePrice += 250000;
    
    return basePrice;
  };

  const price = getPrice();

  const isFormValid = () => {
    if (service === 'airport') {
      return (
        formData.flightNumber.trim() !== '' &&
        formData.date !== '' &&
        formData.time !== ''
      );
    } else {
      return (
        formData.pickup.trim() !== '' &&
        formData.date !== '' &&
        formData.time !== ''
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-detect night service for charter
    if (name === 'time' && service === 'charter') {
      const hour = parseInt(value.split(':')[0]);
      setIsNightService(hour >= 0 && hour < 6);
    }
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppBooking = () => {
    const phone = '6285173104440';
    let message = `*New Booking Request - Tiketopia*\n\n`;
    message += `*Service:* ${service === 'airport' ? 'Airport Transfer' : 'Private Car Charter'}\n`;
    
    const bookingData = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now().toString(),
      service,
      date: formData.date,
      time: formData.time,
      price,
      status: 'pending',
      details: service === 'airport' 
        ? { route: isToAirport ? `${selectedArea} ➔ Airport` : `Airport ➔ ${selectedArea}`, vehicle: vehicleType, flight: formData.flightNumber }
        : { vehicle: charterVehicle, duration: formData.duration, pickup: formData.pickup }
    };

    // Save to localStorage
    try {
      const existingBookings = JSON.parse(localStorage.getItem('tiketopia_bookings') || '[]');
      localStorage.setItem('tiketopia_bookings', JSON.stringify([bookingData, ...existingBookings]));
    } catch (e) {
      console.error('Failed to save booking', e);
    }
    
    if (service === 'airport') {
      message += `*Route:* ${isToAirport ? `${selectedArea} ➔ Airport` : `Airport ➔ ${selectedArea}`}\n`;
      message += `*Vehicle:* ${vehicleType === 'mpv' ? 'Standard MPV (6 Seater)' : 'Minibus (10 Seater)'}\n`;
      message += `*Flight:* ${formData.flightNumber}\n`;
      message += `*Passengers:* ${formData.passengers}\n`;
    } else {
      message += `*Vehicle:* ${charterVehicle === 'regular' ? 'Regular Car (5 Seater)' : 'Minibus (10 Seater)'}\n`;
      message += `*Duration:* ${formData.duration}\n`;
      message += `*Pickup Location:* ${formData.pickup}\n`;
      if (isLongDrive) message += `*Note:* Long Drive Area (+IDR 250k)\n`;
      if (isNightService) message += `*Note:* Night Service (+IDR 250k)\n`;
    }
    
    message += `*Date:* ${formData.date}\n`;
    message += `*Time:* ${formData.time}\n`;
    message += `*Estimated Price:* ${formatIDR(price)}\n\n`;
    message += `Please confirm my booking. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-6 p-6 pb-32">
      {/* Service Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setService('airport')}
          className={`relative flex flex-col items-center gap-3 rounded-2xl border-2 p-4 transition-all ${
            service === 'airport'
              ? 'border-[#f54502] bg-[#f54502]/5 shadow-md'
              : 'border-zinc-100 bg-white hover:border-zinc-200'
          }`}
        >
          <div className={`rounded-full p-3 ${service === 'airport' ? 'bg-[#f54502] text-white' : 'bg-zinc-100 text-zinc-500'}`}>
            <Plane size={24} />
          </div>
          <span className={`text-sm font-semibold ${service === 'airport' ? 'text-[#f54502]' : 'text-zinc-600'}`}>
            Airport Transfer
          </span>
        </button>

        <button
          onClick={() => setService('charter')}
          className={`relative flex flex-col items-center gap-3 rounded-2xl border-2 p-4 transition-all ${
            service === 'charter'
              ? 'border-[#f54502] bg-[#f54502]/5 shadow-md'
              : 'border-zinc-100 bg-white hover:border-zinc-200'
          }`}
        >
          <div className={`rounded-full p-3 ${service === 'charter' ? 'bg-[#f54502] text-white' : 'bg-zinc-100 text-zinc-500'}`}>
            <Car size={24} />
          </div>
          <span className={`text-sm font-semibold ${service === 'charter' ? 'text-[#f54502]' : 'text-zinc-600'}`}>
            Car Charter
          </span>
        </button>
      </div>

      {/* Form Content */}
      <motion.div
        layout
        className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-zinc-100"
      >
        <AnimatePresence mode="wait">
          {service === 'airport' ? (
            <motion.div
              key="airport-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              {/* Route Toggle */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Direction</label>
                <div className="flex rounded-xl bg-zinc-100 p-1">
                  <button
                    onClick={() => setIsToAirport(false)}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${!isToAirport ? 'bg-white text-[#f54502] shadow-sm' : 'text-zinc-500'}`}
                  >
                    Airport ➔ Hotel
                  </button>
                  <button
                    onClick={() => setIsToAirport(true)}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${isToAirport ? 'bg-white text-[#f54502] shadow-sm' : 'text-zinc-500'}`}
                  >
                    Hotel ➔ Airport
                  </button>
                </div>
              </div>

              {/* Area Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Area</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-zinc-100 bg-zinc-50 py-3 pl-10 pr-4 outline-none focus:border-[#f54502]"
                  >
                    {AIRPORT_PRICING.map((p) => (
                      <option key={p.area} value={p.area}>{p.area}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Vehicle Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setVehicleType('mpv')}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      vehicleType === 'mpv' ? 'border-[#f54502] bg-[#f54502]/5' : 'border-zinc-100 bg-zinc-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-zinc-900">Standard MPV</div>
                    <div className="text-[10px] text-zinc-500">Up to 6 Seats</div>
                  </button>
                  <button
                    onClick={() => setVehicleType('minibus')}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      vehicleType === 'minibus' ? 'border-[#f54502] bg-[#f54502]/5' : 'border-zinc-100 bg-zinc-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-zinc-900">Minibus</div>
                    <div className="text-[10px] text-zinc-500">Up to 10 Seats</div>
                  </button>
                </div>
                {vehicleType === 'mpv' && (
                  <div className="mt-2 rounded-lg bg-blue-50 p-3 text-[10px] text-blue-700 leading-relaxed">
                    <strong>Capacity Info:</strong><br />
                    • 2 pax + 4 luggage (24&quot;)<br />
                    • 4 pax + 2 luggage (24&quot;)<br />
                    *Extra luggage takes one seat each.
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Flight Number</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input
                    type="text"
                    name="flightNumber"
                    placeholder="e.g. SQ942"
                    className="w-full rounded-xl border border-zinc-100 bg-zinc-50 py-3 pl-10 pr-4 outline-none focus:border-[#f54502]"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                      type="date"
                      name="date"
                      className="w-full rounded-xl border border-zinc-100 bg-zinc-50 py-3 pl-10 pr-4 outline-none focus:border-[#f54502]"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                      type="time"
                      name="time"
                      className="w-full rounded-xl border border-zinc-100 bg-zinc-50 py-3 pl-10 pr-4 outline-none focus:border-[#f54502]"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="charter-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Vehicle Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCharterVehicle('regular')}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      charterVehicle === 'regular' ? 'border-[#f54502] bg-[#f54502]/5' : 'border-zinc-100 bg-zinc-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-zinc-900">Regular Car</div>
                    <div className="text-[10px] text-zinc-500">Up to 5 Seats</div>
                  </button>
                  <button
                    onClick={() => setCharterVehicle('minibus')}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      charterVehicle === 'minibus' ? 'border-[#f54502] bg-[#f54502]/5' : 'border-zinc-100 bg-zinc-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-zinc-900">Minibus</div>
                    <div className="text-[10px] text-zinc-500">Up to 10 Seats</div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Duration</label>
                <div className="grid grid-cols-2 gap-2">
                  {['6 Hours', '10 Hours'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setFormData(p => ({ ...p, duration: d }))}
                      className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                        formData.duration === d
                          ? 'border-[#f54502] bg-[#f54502]/5 text-[#f54502]'
                          : 'border-zinc-100 bg-zinc-50 text-zinc-500'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Extra Options</label>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsLongDrive(!isLongDrive)}
                    className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                      isLongDrive ? 'border-[#f54502] bg-[#f54502]/5' : 'border-zinc-100 bg-zinc-50'
                    }`}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-zinc-900">Long Drive Area</span>
                      <span className="text-[10px] text-zinc-500">Karangasem, Buleleng, Jembrana, etc.</span>
                    </div>
                    <span className="text-xs font-bold text-[#f54502]">+IDR 250k</span>
                  </button>
                  <button
                    onClick={() => setIsNightService(!isNightService)}
                    className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                      isNightService ? 'border-[#f54502] bg-[#f54502]/5' : 'border-zinc-100 bg-zinc-50'
                    }`}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-zinc-900">Night Service</span>
                      <span className="text-[10px] text-zinc-500">Pickup/Drop between 00:00 - 06:00</span>
                    </div>
                    <span className="text-xs font-bold text-[#f54502]">+IDR 250k</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input
                    type="text"
                    name="pickup"
                    placeholder="e.g. Hotel Lobby"
                    className="w-full rounded-xl border border-zinc-100 bg-zinc-50 py-3 pl-10 pr-4 outline-none focus:border-[#f54502]"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                      type="date"
                      name="date"
                      className="w-full rounded-xl border border-zinc-100 bg-zinc-50 py-3 pl-10 pr-4 outline-none focus:border-[#f54502]"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                      type="time"
                      name="time"
                      className="w-full rounded-xl border border-zinc-100 bg-zinc-50 py-3 pl-10 pr-4 outline-none focus:border-[#f54502]"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pricing and CTA */}
      <div className="flex flex-col gap-4 rounded-2xl bg-zinc-900 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-400">Estimated Price</span>
            <span className="text-2xl font-bold text-[#f54502]">{formatIDR(price)}</span>
          </div>
          <div className="rounded-full bg-white/10 p-2">
            <ChevronRight size={20} />
          </div>
        </div>
        
        <button
          onClick={handleWhatsAppBooking}
          disabled={!isFormValid()}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition-all active:scale-[0.98] ${
            isFormValid() 
              ? 'bg-[#f54502] hover:bg-[#d43b02]' 
              : 'bg-zinc-700 cursor-not-allowed opacity-50'
          }`}
        >
          <Send size={18} />
          {isFormValid() ? 'Book via WhatsApp' : 'Please fill all fields'}
        </button>
        <p className="text-center text-[10px] text-zinc-500">
          No hidden fees. Pay directly to the driver.
        </p>
      </div>

      {/* Charter Info Section */}
      {service === 'charter' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-6 rounded-2xl bg-white p-6 border border-zinc-100 shadow-sm"
        >
          <div>
            <h3 className="text-sm font-bold text-zinc-900 mb-2">What&apos;s Included</h3>
            <ul className="grid grid-cols-2 gap-2">
              {['English/Mandarin Driver', 'Air Conditioned Car', 'Parking Fees', 'Fuel'].map(item => (
                <li key={item} className="flex items-center gap-2 text-[11px] text-zinc-600">
                  <div className="h-1 w-1 rounded-full bg-[#f54502]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-900 mb-2">Example Itineraries</h3>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-zinc-50 p-3">
                <span className="text-[11px] font-bold text-[#f54502] uppercase">Full Day: Ubud (10h)</span>
                <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                  Batuan Temple ➔ Ubud Market ➔ Monkey Forest ➔ Coffee Farm ➔ Goa Gajah ➔ Tegenungan Waterfall
                </p>
              </div>
              <div className="rounded-xl bg-zinc-50 p-3">
                <span className="text-[11px] font-bold text-[#f54502] uppercase">Half Day: South (6h)</span>
                <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                  Padang-padang Beach ➔ Uluwatu Temple ➔ Kecak Dance Performance ➔ Sunset View
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 p-3 border border-amber-100">
            <h3 className="text-[11px] font-bold text-amber-800 mb-1">Cancellation Policy</h3>
            <p className="text-[10px] text-amber-700 leading-relaxed">
              Full refund if you cancel at least 24 hours before the activity starts.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
