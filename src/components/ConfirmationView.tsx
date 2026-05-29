/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Order } from '../types';
import { CheckCircle, Share2, Calendar, Compass, ArrowRight, Sparkles, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfirmationViewProps {
  order: Order;
  onBackToExplore: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({ order, onBackToExplore }) => {
  const [showDirections, setShowDirections] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(`I just rescued freshly-baked ${order.bag.title} surplus from ${order.bag.storeName} using ExpiryX and offset ${order.bag.co2PreventedKg * order.quantity}kg of CO2!`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-[#fcfdf9] min-h-screen py-12 px-6 max-w-4xl mx-auto text-left relative">
      {/* Top Rounded Green Tick Badge (Image 6) */}
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-[#8ae922]/20 rounded-full blur-xl scale-125" />
          <div className="bg-[#8ae922] text-[#0e3e23] p-5 rounded-full relative z-10 border border-white">
            <CheckCircle className="w-12 h-12 stroke-[2.5]" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0e3e23] tracking-tight">
          Order Rescued!
        </h1>
        <p className="text-sm text-[#5c7a5a] font-medium mt-1">
          Thank you for being a food waste hero in our ecological system.
        </p>
      </div>

      {/* Impact metrics highlight row (Image 6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-3xl border border-[#e2e2da] p-6 text-left flex gap-5 items-center">
          <div className="p-3.5 rounded-2xl bg-[#8ae922]/10 text-[#0e3e23] font-bold text-2xl shrink-0">
            🍴
          </div>
          <div>
            <span className="text-[10px] text-[#5c7a5a] uppercase tracking-wider font-extrabold block">Meals Saved</span>
            <span className="text-lg font-black text-[#0e3e23] leading-none block mt-1">
              {order.quantity} Saved
            </span>
            <span className="text-xs text-[#5c7a5a] font-medium block mt-0.5">
              Delicious surplus fresh {order.bag.category.toLowerCase()} items.
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#e2e2da] p-6 text-left flex gap-5 items-center">
          <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-700 font-bold text-2xl shrink-0">
            ☁️
          </div>
          <div>
            <span className="text-[10px] text-[#5c7a5a] uppercase tracking-wider font-extrabold block">CO₂ Prevented</span>
            <span className="text-lg font-black text-[#0e3e23] leading-none block mt-1">
              {(order.bag.co2PreventedKg * order.quantity).toFixed(1)} kg
            </span>
            <span className="text-xs text-[#5c7a5a] font-medium block mt-0.5">
              Equivalent to offset driving {-Math.round(order.bag.co2PreventedKg * order.quantity * 4)} miles.
            </span>
          </div>
        </div>
      </div>

      {/* Primary Pickup QR Mobile Card Row (Image 6 splits QR left / Map right) */}
      <div className="bg-white rounded-[32px] border border-[#e2e2da] overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12 max-w-3xl mx-auto mb-10">
        {/* Left Side: Code & Custom Vector QR Layout (spanning 7 cols) */}
        <div className="md:col-span-7 p-8 flex flex-col justify-between text-left">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#5c7a5a] block mb-2">Claim Parameters</span>
            <h3 className="text-base font-black text-[#0e3e23]">Your Pickup Code</h3>
            
            {/* Custom Responsive QR Code Frame representation */}
            <div className="bg-[#f0f0e8] border border-[#e2e2da] rounded-2xl p-5 my-5 flex flex-col items-center justify-center max-w-[200px] mx-auto relative group">
              <span className="absolute top-2 left-2 text-[8px] font-mono opacity-40">EXP ID: #{order.id}</span>
              
              {/* Complex Vector Grid representing QR layout */}
              <div className="w-28 h-28 bg-[#0e3e23] rounded-lg p-2 flex flex-wrap gap-0.5">
                {[...Array(64)].map((_, i) => {
                  const isTopLeftCorner = i < 4 || (i % 8 < 4 && i < 32);
                  const isTopRightCorner = i % 8 >= 4 && i < 28;
                  const isBottomLeftCorner = i % 8 < 4 && i >= 36;
                  
                  return (
                    <div
                      key={`qr-${i}`}
                      className={`w-[11.5px] h-[11.5px] rounded-[1.5px] ${
                        isTopLeftCorner || isTopRightCorner || isBottomLeftCorner
                          ? 'bg-[#8ae922]'
                          : (i * 3 + 7) % 5 === 0 
                            ? 'bg-[#fcfdf9]/60' 
                            : 'bg-transparent'
                      }`}
                    />
                  );
                })}
              </div>
              
              <span className="text-[15px] font-black tracking-widest text-[#0e3e23] font-mono mt-4 block text-center uppercase">
                {order.pickupCode}
              </span>
            </div>

            {/* Timers & location details */}
            <div className="space-y-3.5 mt-2">
              <div className="flex gap-2.5 text-xs text-[#0e3e23] font-bold">
                <span className="text-[#8ae922] text-sm shrink-0">⏰</span>
                <div>
                  <span className="font-extrabold text-[13px] block">Pickup Time</span>
                  <span className="text-[#5c7a5a] block font-semibold mt-0.5">Today, {order.pickupTime}</span>
                </div>
              </div>

              <div className="flex gap-2.5 text-xs text-[#0e3e23] font-bold">
                <span className="text-[#8ae922] text-sm shrink-0">📍</span>
                <div>
                  <span className="font-extrabold text-[13px] block">Store Location</span>
                  <span className="text-[#5c7a5a] block font-semibold mt-0.5">{order.bag.storeName}</span>
                  <span className="text-[10px] text-gray-400 block font-medium mt-0.5">Drive near central station square, Suite B2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Map & Route illustration (spanning 5 cols in Image 6 splitted style) */}
        <div className="md:col-span-5 bg-[#0e3e23]/5 border-l border-[#e2e2da] p-8 flex flex-col justify-between text-left relative overflow-hidden">
          {/* Subtle map route dots vector */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
              <path d="M 30,50 Q 80,120 180,90 T 260,190" fill="none" stroke="#0e3e23" strokeWidth="3" strokeDasharray="6" />
            </svg>
          </div>

          <div className="relative z-10">
            <span className="bg-[#8ae922] text-[#0e3e23] text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5 inline-block">
              Route Active
            </span>
            <h4 className="text-[14px] font-extrabold text-[#0e3e23] mb-1">0.6 miles to target</h4>
            <p className="text-xs text-[#5c7a5a] leading-relaxed mb-4">
              Our live GPS route finder has calculated the fastest cycling route to reach {order.bag.storeName} ahead of cleanup.
            </p>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="text-xs font-bold text-gray-500 bg-white p-2.5 rounded-xl border border-gray-100 flex items-center justify-between">
              <span>Traffic Delay:</span>
              <span className="text-green-600 font-extrabold">NONE (Clear)</span>
            </div>

            <button
              onClick={() => setShowDirections(true)}
              className="w-full bg-[#0e3e23] hover:bg-[#8ae922] hover:text-[#0e3e23] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Compass className="w-4 h-4 text-[#8ae922]" />
              Get Directions
            </button>
          </div>
        </div>
      </div>

      {/* Button lists (Image 6 actions) */}
      <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl mx-auto mb-12">
        <button
          onClick={handleShare}
          className="flex-1 min-w-[200px] border border-[#0e3e23] text-[#0e3e23] bg-white hover:bg-gray-50 text-xs font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          {copiedLink ? 'Achievement Link Saved!' : 'Share Achievement' }
        </button>

        <button 
          onClick={() => alert(`Order scheduled successfully for today at ${order.pickupTime}.`)}
          className="flex-1 min-w-[200px] bg-[#0e3e23] hover:bg-[#155631] text-white text-xs font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#8ae922]" />
          Add to Calendar
        </button>
      </div>

      {/* Return anchor link */}
      <div className="text-center">
        <button
          onClick={onBackToExplore}
          className="text-[#0e3e23] hover:text-[#8ae922] text-sm font-bold tracking-tight underline cursor-pointer"
        >
          ← Back to Explore Nearby Discoveries
        </button>
      </div>

      {/* DynamicDirections Simulation overlay */}
      <AnimatePresence>
        {showDirections && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fcfdf9] rounded-[32px] p-6 max-w-md w-full border border-[#e2e2da] text-left"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#e2e2da] mb-4">
                <span className="font-black text-sm text-[#0e3e23]">Directions Simulation</span>
                <button onClick={() => setShowDirections(false)} className="text-gray-400 hover:text-black font-extrabold text-xs">CLOSE</button>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-3 border border-[#e2e2da] rounded-xl flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">1</div>
                  <p className="text-xs text-[#0e3e23] font-bold">Start heading north on 16th Ave towards Eco Drive (0.2 mi)</p>
                </div>
                <div className="bg-white p-3 border border-[#e2e2da] rounded-xl flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">2</div>
                  <p className="text-xs text-[#0e3e23] font-bold">Turn right onto Central Eco Square. Merchant is on your left on the curve (0.4 mi)</p>
                </div>

                {/* mini mock map */}
                <div className="h-32 bg-gray-100 border border-[#e2e2da] rounded-2xl overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#0b170e]" />
                  <div className="relative text-white z-10 flex flex-col items-center gap-1.5 p-4 text-center">
                    <Navigation className="w-6 h-6 text-[#8ae922] rotate-45 animate-bounce" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8ae922]">Active Route Sync</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
