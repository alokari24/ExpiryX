/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SurpriseBag } from '../types';
import { X, MapPin, Clock, Heart, Share2, Info, Droplet, CloudLightning, Leaf, Users } from 'lucide-react';

interface ProductDetailModalProps {
  bag: SurpriseBag;
  onClose: () => void;
  onReserve: (quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ bag, onClose, onReserve }) => {
  const [quantity, setQuantity] = useState(1);
  const [faved, setFaved] = useState(false);

  const increment = () => {
    if (quantity < bag.quantityLeft) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalCost = Number((bag.discountedPrice * quantity).toFixed(2));
  const percentSaved = Math.round(((bag.originalPrice - bag.discountedPrice) / bag.originalPrice) * 100);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Container card */}
      <div className="bg-[#fcfdf9] rounded-[36px] overflow-hidden max-w-2xl w-full border border-[#e2e2da] shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Banner with absolute close actions */}
        <div className="relative h-64 bg-gray-100 shrink-0">
          <img
            src={bag.image}
            alt={bag.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Controls transparent header overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="bg-white/95 backdrop-blur-xs text-[#0e3e23] p-2.5 rounded-full hover:bg-[#8ae922] transition-colors border border-black/5"
            >
              <X className="w-4 h-4 cursor-pointer" />
            </button>
            <div className="flex gap-2.5">
              <button
                onClick={() => setFaved(!faved)}
                className="bg-white/95 backdrop-blur-xs p-2.5 rounded-full border border-black/5"
              >
                <Heart className={`w-4 h-4 transition-colors ${faved ? 'text-red-500 fill-current' : 'text-[#0e3e23]'}`} />
              </button>
              <button className="bg-white/95 backdrop-blur-xs p-2.5 rounded-full text-[#0e3e23] border border-black/5">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <span className="absolute bottom-4 left-4 bg-[#0e3e23] text-[#8ae922] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#8ae922]/20">
            {bag.category} Surprise Selection
          </span>
        </div>

        {/* Scrollable details panel */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6 text-left">
          {/* Header Title Information */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#5c7a5a]">Verified Retailer</span>
              <span className="h-1 text-[#e2e2da]">&middot;</span>
              <span className="text-xs font-bold text-[#0e3e23] flex items-center gap-1">
                ⭐ 4.8 (142 reviews)
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#0e3e23] tracking-tight">{bag.title}</h2>
            <p className="text-sm text-[#0e3e23] font-bold mt-1.5 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#8ae922]" />
              {bag.storeName} &middot; {bag.distanceMiles} miles away
            </p>
          </div>

          {/* Time & Alert info */}
          <div className="bg-[#f0f0e8] p-4.5 rounded-2xl border border-[#e2e2da] space-y-3">
            <div className="flex gap-3 text-xs text-[#0e3e23] font-bold">
              <Clock className="w-4 h-4 text-[#8ae922] shrink-0" />
              <div>
                <span className="block font-black text-[13px]">Pick up Window</span>
                <span className="text-[#5c7a5a] block font-semibold mt-0.5">Today, {bag.pickupTimeRange}</span>
              </div>
            </div>

            <div className="flex gap-3 text-xs text-[#0e3e23] font-bold">
              <MapPin className="w-4 h-4 text-[#8ae922] shrink-0" />
              <div>
                <span className="block font-black text-[13px]">Store Location</span>
                <span className="text-[#5c7a5a] block font-semibold mt-0.5">Eco District Drive, near central station</span>
              </div>
            </div>
          </div>

          {/* Contents expectation tag line */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#5c7a5a] mb-2.5">What might be inside?</h3>
            <div className="flex flex-wrap gap-2">
              {bag.tags.map(tag => (
                <span key={tag} className="bg-white border border-[#e2e2da] text-[#0e3e23] text-xs px-3.5 py-1.5 rounded-xl font-bold">
                  {tag}
                </span>
              ))}
              <span className="bg-[#8ae922]/10 border border-[#8ae922]/30 text-[#0e3e23] text-xs px-3.5 py-1.5 rounded-xl font-extrabold">
                + Mystery Items
              </span>
            </div>
            <p className="text-xs text-[#5c7a5a] italic mt-2.5">
              *The exact contents are surprise surplus bakery items baked fresh this morning, saved to protect climate integrity.
            </p>
          </div>

          {/* Ecological Impact values (Image 8 details) */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#5c7a5a] mb-3">Environmental Footprint Preserved</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#0e3e23] text-white p-3.5 rounded-2xl">
                <CloudLightning className="w-4.5 h-4.5 text-[#8ae922] mb-1.5" />
                <span className="block text-sm font-bold text-white">{bag.co2PreventedKg * quantity} kg</span>
                <span className="text-[9px] uppercase tracking-wider text-[#a4ceb3]/85">CO₂ Offset</span>
              </div>
              <div className="bg-[#0e3e23] text-white p-3.5 rounded-2xl">
                <Droplet className="w-4.5 h-4.5 text-[#a2ee34] mb-1.5" />
                <span className="block text-sm font-bold text-white">{bag.waterSavedLitres * quantity} L</span>
                <span className="text-[9px] uppercase tracking-wider text-[#a4ceb3]/85">Water Saved</span>
              </div>
              <div className="bg-[#0e3e23] text-white p-3.5 rounded-2xl">
                <Users className="w-4.5 h-4.5 text-[#8ae922] mb-1.5" />
                <span className="block text-sm font-bold text-white">2-3 People</span>
                <span className="text-[9px] uppercase tracking-wider text-[#a4ceb3]/85">Meals Provided</span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Order Controller */}
          <div className="border-t border-[#e2e2da] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
            {/* Price section and discount calculator */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-red-100 text-red-600 font-black px-2 py-0.5 rounded-md uppercase">
                  {percentSaved}% Saved
                </span>
                <span className="text-xs line-through text-[#5c7a5a] font-bold">
                  Original Price: ₹{(bag.originalPrice * quantity).toFixed(2)}
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-bold text-[#5c7a5a]">Reserve Total:</span>
                <span className="text-2xl font-black text-[#0e3e23]">₹{totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Quantity select counter and call actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-[#f0f0e8] border border-[#e2e2da] rounded-full p-1 w-fit">
                <button
                  onClick={decrement}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono hover:bg-white text-[#0e3e23] text-lg active:scale-95 transition-all outline-none"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#000000]">
                  {quantity}
                </span>
                <button
                  onClick={increment}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono hover:bg-white text-[#0e3e23] text-lg active:scale-95 transition-all outline-none"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onReserve(quantity)}
                disabled={bag.quantityLeft === 0}
                className="flex-1 sm:flex-none justify-center rounded-full bg-[#0e3e23] hover:bg-[#8ae922] hover:text-[#0e3e23] text-white font-bold text-xs px-8 py-4 shadow-sm transition-colors cursor-pointer"
              >
                {bag.quantityLeft === 0 ? 'Ended out' : 'Reserve Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
