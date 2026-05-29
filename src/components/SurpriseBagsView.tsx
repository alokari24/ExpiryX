/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { Search, SlidersHorizontal, MapPin, Sparkles, Navigation2 } from 'lucide-react';
import { SurpriseBag } from '../types';

interface SurpriseBagsViewProps {
  onSelectBag: (bag: SurpriseBag) => void;
}

export const SurpriseBagsView: React.FC<SurpriseBagsViewProps> = ({ onSelectBag }) => {
  const { bags, userStats } = useAppState();
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState(false);

  // Filter computation
  const filteredBags = bags.filter(bag => {
    const matchesSearch = bag.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bag.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bag.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || bag.category === activeCategory;
    const matchesVeg = !vegOnly || bag.isVeg;
    const matchesDistance = !distanceFilter || bag.distanceMiles < 1.0;

    return matchesSearch && matchesCategory && matchesVeg && matchesDistance;
  });

  // Map stores positioning simulator
  const storeCoordinates: { [key: string]: { x: number; y: number; label: string } } = {
    'store-wild-yeast': { x: 30, y: 40, label: '🥐 Wild Yeast Bakery (Laxmi Nagar)' },
    'store-green-roots': { x: 75, y: 25, label: '🥛 Green Roots Market (Green Park)' },
    'store-ether': { x: 50, y: 70, label: '☕ Ether Coffee Co. (Hauz Khas)' },
    'store-green-grocers-402': { x: 20, y: 80, label: '🥦 Green Grocers (Connaught Place)' }
  };

  const [selectedStorePin, setSelectedStorePin] = useState<string | null>(null);

  return (
    <div className="bg-[#fcfdf9] min-h-screen py-12 px-6 max-w-7xl mx-auto">
      {/* Search Header Banner */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0e3e23] tracking-tight mb-2">
          Rescue Fresh Food Nearby <span className="text-[#8ae922]">.</span>
        </h1>
        <p className="text-sm text-[#5c7a5a]">
          Discover surprise food bags expiring soon in your local grocery shops, bakeries, and cafes. Click any bag to inspect details.
        </p>
      </div>

      {/* Interactive Search Tool & Filters Row (Image 3) */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        {/* Search Bar Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#5c7a5a]" />
          <input
            type="text"
            placeholder="Search by store name, bakery goods, cafe soup..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f0f0e8] text-[#0e3e23] placeholder-[#5c7a5a] text-xs font-semibold pl-11 pr-4 py-3.5 rounded-full outline-none focus:ring-2 focus:ring-[#8ae922]/50 border border-[#e2e2da]"
          />
        </div>

        {/* Dynamic Horizontal Controls */}
        <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none select-none">
          {/* Main Filter Icon */}
          <button 
            onClick={() => {
              setActiveCategory('All');
              setVegOnly(false);
              setDistanceFilter(false);
              setSearchQuery('');
            }}
            className="flex items-center gap-1.5 bg-[#0e3e23] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:opacity-95 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Reset Reset
          </button>

          {/* Bakery pill */}
          <button
            onClick={() => setActiveCategory(activeCategory === 'Bakery' ? 'All' : 'Bakery')}
            className={`text-xs font-bold px-4 py-2.5 rounded-full border transition-all ${
              activeCategory === 'Bakery' 
                ? 'bg-[#8ae922]/20 border-[#8ae922] text-[#0e3e23] font-black' 
                : 'bg-white border-[#e2e2da] text-[#5c7a5a] hover:bg-gray-50'
            }`}
          >
            🥐 Bakery
          </button>

          {/* Grocery pill */}
          <button
            onClick={() => setActiveCategory(activeCategory === 'Grocery' ? 'All' : 'Grocery')}
            className={`text-xs font-bold px-4 py-2.5 rounded-full border transition-all ${
              activeCategory === 'Grocery' 
                ? 'bg-[#8ae922]/20 border-[#8ae922] text-[#0e3e23] font-black' 
                : 'bg-white border-[#e2e2da] text-[#5c7a5a] hover:bg-gray-50'
            }`}
          >
            🥬 Grocery
          </button>

          {/* Cafe pill */}
          <button
            onClick={() => setActiveCategory(activeCategory === 'Cafe' ? 'All' : 'Cafe')}
            className={`text-xs font-bold px-4 py-2.5 rounded-full border transition-all ${
              activeCategory === 'Cafe' 
                ? 'bg-[#8ae922]/20 border-[#8ae922] text-[#0e3e23] font-black' 
                : 'bg-white border-[#e2e2da] text-[#5c7a5a] hover:bg-gray-50'
            }`}
          >
            ☕ Cafe
          </button>

          {/* Distance < 1km */}
          <button
            onClick={() => setDistanceFilter(!distanceFilter)}
            className={`text-xs font-bold px-4 py-2.5 rounded-full border transition-all ${
              distanceFilter
                ? 'bg-[#8ae922]/20 border-[#8ae922] text-[#0e3e23] font-black' 
                : 'bg-white border-[#e2e2da] text-[#5c7a5a] hover:bg-gray-50'
            }`}
          >
            📍 Distance &lt; 1km
          </button>

          {/* Veg Only pill */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`text-xs font-bold px-4 py-2.5 rounded-full border transition-all ${
              vegOnly
                ? 'bg-[#8ae922]/20 border-[#8ae922] text-[#0e3e23] font-black' 
                : 'bg-white border-[#e2e2da] text-[#5c7a5a] hover:bg-gray-50'
            }`}
          >
            🟢 Veg Only
          </button>
        </div>
      </div>

      {/* Layout Content (Image 3 layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Product Cards Grid (lg:span-7) */}
        <div className="lg:col-span-7 space-y-8">
          {filteredBags.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#e2e2da] text-center">
              <span className="text-4xl text-[#5c7a5a] block mb-2">🥡</span>
              <h3 className="text-base font-bold text-[#0e3e23] mb-1">No surprise bags match your filters</h3>
              <p className="text-xs text-[#5c7a5a]">Try resetting your query or category filters above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBags.map((bag) => (
                <div
                  key={bag.id}
                  onClick={() => onSelectBag(bag)}
                  className="bg-white rounded-3xl border border-[#e2e2da] hover:border-[#8ae922] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  {/* Bag Preview */}
                  <div className="relative h-44 bg-gray-50 overflow-hidden">
                    <img
                      src={bag.image}
                      alt={bag.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-full text-[#0e3e23]">
                      {bag.category}
                    </span>
                    {bag.isVeg && (
                      <span className="absolute top-3 left-20 bg-[#8ae922] text-[#0e3e23] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Veg
                      </span>
                    )}
                    {bag.quantityLeft > 0 ? (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full animate-pulse">
                        {bag.quantityLeft} Left
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 bg-[#e2e2da] text-[#5c7a5a] text-[9px] font-bold px-2.5 py-0.5 rounded-full">
                        Ended
                      </span>
                    )}
                  </div>

                  {/* Body Copy */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0e3e23] group-hover:text-[#8ae922] transition-colors line-clamp-1 mb-1">
                        {bag.title}
                      </h3>
                      <p className="text-xs text-[#5c7a5a] font-medium flex items-center gap-1 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#8ae922]" />
                        {bag.storeName} &middot; {bag.distanceMiles} miles away
                      </p>
                      
                      {/* Active Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {bag.tags.map((t) => (
                          <span key={t} className="bg-[#f0f0e8] text-[#5c7a5a] text-[8px] font-black px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing Row */}
                    <div className="border-t border-[#e2e2da] pt-3 mt-1 flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] text-[#5c7a5a] font-bold tracking-wide uppercase">Rescue Special</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-[#0e3e23]">₹{bag.discountedPrice.toFixed(2)}</span>
                          <span className="text-xs line-through text-[#5c7a5a] font-medium">₹{bag.originalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        className={`text-xs font-bold px-4 py-2 rounded-full shadow-xs transition-colors ${
                          bag.quantityLeft === 0
                            ? 'bg-[#e2e2da] text-[#5c7a5a] cursor-not-allowed'
                            : 'bg-[#0e3e23] text-white group-hover:bg-[#8ae922] group-hover:text-[#0e3e23]'
                        }`}
                      >
                        {bag.quantityLeft === 0 ? 'Sold Out' : 'Rescue' }
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stunning Neon Progress Banner (Exactly from Image 3!) */}
          <div className="bg-[#a2ee34] text-[#0e3e23] p-7 rounded-[32px] text-left relative overflow-hidden shadow-sm">
            {/* Ambient visual background highlights */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
            <Sparkles className="w-8 h-8 text-[#0e3e23] mb-4 stroke-[1.5]" />

            <h3 className="text-2xl font-black mb-1.5">Your Impact Is Growing!</h3>
            <p className="text-sm font-semibold text-[#0e3e23]/80 leading-relaxed mb-6 max-w-md">
              Join index-led eco-rescuers mapping excess production blocks. We have collected over 12,000 bags this week alone.
            </p>

            {/* Target goal indicator bar */}
            <div>
              <div className="flex justify-between text-xs font-black mb-1.5">
                <span>City Rescue Threshold</span>
                <span>82% achieved</span>
              </div>
              <div className="h-3 w-full bg-[#0e3e23]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#0e3e23] rounded-full" style={{ width: '82%' }} />
              </div>
              <span className="block text-[10px] font-bold text-center mt-2 uppercase tracking-wide opacity-80">
                1,000,000 bag target ledger
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Maps Frame and Live Stats (lg:span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Map View Frame Overlay with grid graphics */}
          <div className="bg-[#112415] rounded-[36px] overflow-hidden p-6 border border-[#a4ceb3]/10 shadow-lg text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#a4ceb3]/10 mb-4">
              <div className="flex items-center gap-2">
                <Navigation2 className="w-4 h-4 text-[#8ae922] rotate-45" />
                <span className="font-bold text-xs text-[#fcfdf9]">GPS Radar Console</span>
              </div>
              {/* Fake status dot */}
              <span className="inline-flex items-center gap-1.5 bg-[#8ae922]/15 text-[#8ae922] text-[9px] font-black px-2.5 py-1 rounded-full uppercase border border-[#8ae922]/20">
                <span className="w-1 h-1 rounded-full bg-[#8ae922] animate-ping" />
                Live Tracking Active
              </span>
            </div>

            {/* Interactive Custom SVG/Canvas Styled Grid Map (Image 3 map) */}
            <div className="relative w-full aspect-square bg-[#0b170e] rounded-2xl overflow-hidden border border-[#a4ceb3]/5 flex items-center justify-center">
              {/* Draw beautiful dark grid lines */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
                {[...Array(12)].map((_, i) => (
                  <div key={`v-${i}`} className="border-r border-[#8ae922] h-full" />
                ))}
                {[...Array(12)].map((_, i) => (
                  <div key={`h-${i}`} className="border-b border-[#8ae922] w-full" />
                ))}
              </div>

              {/* Draw beautiful custom futuristic map radar circle sweeps */}
              <div className="absolute w-[80%] aspect-square border border-[#8ae922]/5 rounded-full animate-pulse" />
              <div className="absolute w-[50%] aspect-square border border-[#8ae922]/5 rounded-full" />

              {/* Central user location beacon */}
              <div className="absolute top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-white shadow-md cursor-pointer" />
                </div>
              </div>

              {/* Dynamic store pins from data state */}
              {bags.map((bag) => {
                const coord = storeCoordinates[bag.storeId];
                if (!coord) return null;

                const isSelected = selectedStorePin === bag.storeId;
                const soldOut = bag.quantityLeft === 0;

                return (
                  <div
                    key={`pin-${bag.id}`}
                    onClick={() => {
                      setSelectedStorePin(bag.storeId);
                      onSelectBag(bag);
                    }}
                    style={{ top: `${coord.y}%`, left: `${coord.x}%` }}
                    className="absolute cursor-pointer transition-all hover:scale-125 z-20 group"
                  >
                    <div className="relative">
                      {/* Pin Dot */}
                      <div className={`p-1.5 rounded-full border shadow-md transition-all ${
                        soldOut 
                          ? 'bg-gray-500 border-gray-100 text-white opacity-60'
                          : isSelected 
                            ? 'bg-[#8ae922] border-white text-[#0e3e23] scale-110' 
                            : 'bg-[#0e3e23] border-[#8ae922] text-[#8ae922]'
                      }`}>
                        <span className="text-[10px] font-bold">
                          {bag.category === 'Bakery' ? '🥐' : bag.category === 'Grocery' ? '🥬' : '☕'}
                        </span>
                      </div>

                      {/* Store Text Label (visible on hover) */}
                      <span className="absolute left-1/2 -translate-x-1/2 top-7 bg-black/90 text-[8px] font-bold text-white px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                        {bag.storeName} ({bag.distanceMiles}mi)
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Dynamic Map HUD card info */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#112415]/90 border border-[#a4ceb3]/10 p-3.5 rounded-xl text-left backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <span className="font-bold text-[9px] text-[#a4ceb3]/80 uppercase tracking-widest block">Current Location</span>
                </div>
                <span className="font-extrabold text-[13px] text-white block mt-0.5">Connaught Place, New Delhi</span>
              </div>
            </div>

            {/* Quick directions text indicator */}
            <p className="text-[10px] text-[#a4ceb3]/60 italic text-center mt-3">
              *Pins represent active, food-compliance rescue nodes updated in real-time.
            </p>
          </div>

          {/* mini stats block for visual richness */}
          <div className="bg-white p-6 rounded-[32px] border border-[#e2e2da] text-left">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#5c7a5a] mb-4">Rescue Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f0f0e8] p-4 rounded-2xl border border-[#e2e2da]/40">
                <span className="text-[10px] text-[#5c7a5a] font-bold block uppercase">CO₂ prevented</span>
                <span className="text-xl font-bold text-[#0e3e23]">{userStats.co2SavedKg} kg</span>
              </div>
              <div className="bg-[#f0f0e8] p-4 rounded-2xl border border-[#e2e2da]/40">
                <span className="text-[10px] text-[#5c7a5a] font-bold block uppercase">Reservations Claimed</span>
                <span className="text-xl font-bold text-[#0e3e23]">14 Bags</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
