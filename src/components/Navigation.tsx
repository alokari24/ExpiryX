/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/AppContext';
import { Leaf, CreditCard, ShieldAlert, Store, Award, Info, AppWindow } from 'lucide-react';
import { motion } from 'motion/react';

export const Navigation: React.FC = () => {
  const { mode, setMode, tab, setTab } = useAppState();

  return (
    <header className="sticky top-0 z-50 bg-[#f9f9f6]/95 backdrop-blur-md border-b border-[#e2e2da] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex flex-col cursor-pointer"
          onClick={() => { setTab('landing'); }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-sans tracking-tight text-[#0e3e23] flex items-center gap-1.5 hover:opacity-90 transition-opacity">
              ExpiryX <span className="text-[#a2ee34]">.</span>
            </span>
          </div>
          {tab === 'retailer' && (
            <span className="font-mono text-[9px] tracking-widest text-[#5c7a5a] uppercase font-bold">RETAIL PORTAL</span>
          )}
        </div>

        {/* Navigation Menus */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => { setTab('landing'); }}
            className={`text-sm font-medium tracking-tight hover:text-[#0e3e23] transition-colors ${
              tab === 'landing' ? 'text-[#0e3e23] font-bold border-b-2 border-[#8ae922] pb-0.5' : 'text-[#5c7a5a]'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => { setTab('discover'); }}
            className={`text-sm font-medium tracking-tight hover:text-[#0e3e23] transition-colors ${
              tab === 'discover' ? 'text-[#0e3e23] font-bold border-b-2 border-[#8ae922] pb-0.5' : 'text-[#5c7a5a]'
            }`}
          >
            Discover Nearby
          </button>

          <button
            onClick={() => { setTab('how_it_works'); }}
            className={`text-sm font-medium tracking-tight hover:text-[#0e3e23] transition-colors ${
              tab === 'how_it_works' ? 'text-[#0e3e23] font-bold border-b-2 border-[#8ae922] pb-0.5' : 'text-[#5c7a5a]'
            }`}
          >
            How It Works
          </button>

          <button
            onClick={() => { setTab('impact'); }}
            className={`text-sm font-medium tracking-tight hover:text-[#0e3e23] transition-colors ${
              tab === 'impact' ? 'text-[#0e3e23] font-bold border-b-2 border-[#8ae922] pb-0.5' : 'text-[#5c7a5a]'
            }`}
          >
            <span className="flex items-center gap-1">
              <Info className="w-4 h-4 text-[#8ae922]" />
              About Us
            </span>
          </button>

          <button
            onClick={() => { setTab('retailer'); }}
            className={`text-sm font-medium tracking-tight hover:text-[#0e3e23] transition-colors flex items-center gap-1.5 ${
              tab === 'retailer' ? 'text-[#0e3e23] font-bold' : 'text-[#5c7a5a]'
            }`}
          >
            <Store className="w-4 h-4 text-[#8ae922]" />
            For Businesses
          </button>
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Partner Trigger to Google Form */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScazI4QP7naOgpHy3IZt04uA7vSNGWzOpKSTBmJQC5pV8I8Mw/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center border border-[#0e3e23] text-[#0e3e23] hover:bg-[#0e3e23] hover:text-[#fcfdf9] text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
          >
            Partner With Us
          </a>

          {/* Core Dynamic Mode Button */}
          <button
            onClick={() => { setTab('discover'); }}
            className="inline-flex items-center justify-center bg-[#0e3e23] hover:bg-[#155631] text-[#fcfdf9] text-xs font-semibold px-4 w-fit py-2 rounded-full transition-all duration-300 shadow-sm"
          >
            Get Surprise Bags
          </button>
        </div>
      </div>

      {/* Mobile Switcher & Navigation helper */}
      <div className="flex select-none md:hidden items-center justify-between border-t border-[#e2e2da] mt-3 pt-3 w-full">
        <div className="flex gap-4 text-[11px] font-bold text-[#5c7a5a] justify-around w-full">
          <button onClick={() => setTab('landing')} className={tab === 'landing' ? 'text-[#0e3e23] underline text-xs font-extrabold' : ''}>Home</button>
          <button onClick={() => setTab('discover')} className={tab === 'discover' ? 'text-[#0e3e23] underline text-xs font-extrabold' : ''}>Explore</button>
          <button onClick={() => setTab('impact')} className={tab === 'impact' ? 'text-[#0e3e23] underline text-xs font-extrabold' : ''}>About Us</button>
          <button onClick={() => setTab('retailer')} className={tab === 'retailer' ? 'text-[#0e3e23] underline text-xs font-extrabold' : ''}>Store Portal</button>
        </div>
      </div>
    </header>
  );
};
