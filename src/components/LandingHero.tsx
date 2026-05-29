/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/AppContext';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Shield, CheckCircle2, ChevronRight, Star, Quote, Plus, AlertTriangle } from 'lucide-react';
import { SurpriseBag } from '../types';

export const LandingHero: React.FC = () => {
  const { mode, setMode, tab, setTab, bags, activeCartItem, setActiveCartItem } = useAppState();

  const handleRescueAction = (bag: SurpriseBag) => {
    setActiveCartItem(bag);
    setTab('discover'); // takes them to discover with active detail modal
  };

  return (
    <div className="bg-[#fcfdf9] text-[#1b2d15] font-sans pb-16">
      {/* SECTION 1: HERO DISPLAY BANNER (Image 1 & 2) */}
      <section className="relative px-6 pt-12 md:pt-20 pb-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tagline Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#8ae922]/20 text-[#0e3e23] border border-[#8ae922]/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8ae922]" />
            {mode === 'surprise_bags' ? 'Ethical Sophistication In Food Recovery' : 'Financial Hygiene & Contract Recovery'}
          </span>

          {/* Core Captivating Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans text-[#0e3e23] leading-[1.08] tracking-tight mb-6">
            {mode === 'surprise_bags' ? (
              <>
                Save Food. <br />
                <span className="text-[#0e3e23]">Save Money.</span> <br />
                <span className="text-[#8ae922] bg-[#0e3e23] px-3.5 inline-block rounded-xl py-0.5 mt-2">Save the Planet.</span>
              </>
            ) : (
              <>
                Track Subs. <br />
                <span className="text-[#0e3e23]">Stop Waste.</span> <br />
                <span className="text-[#a2ee34] bg-[#0e3e23] px-3.5 inline-block rounded-xl py-0.5 mt-2">Unify Contracts.</span>
              </>
            )}
          </h1>

          {/* Persuading Description */}
          <p className="text-[#5c7a5a] text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            {mode === 'surprise_bags' 
              ? 'Join millions of eco-activists rescuing premium surplus food and fresh surprise bags from your favorite local bakeries, cafes, and grocers at a fraction of the retail cost.'
              : 'Secure, automate, and monitor your subscription invoices and recurring service contracts in one dynamic alerting console. Get ahead of renewal hikes before they hit your account.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={() => setTab('discover')}
              className="flex-1 sm:flex-initial rounded-full bg-[#0e3e23] hover:bg-[#155631] text-[#fcfdf9] text-sm font-semibold px-8 py-3.5 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </button>
            {mode === 'surprise_bags' ? (
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScazI4QP7naOgpHy3IZt04uA7vSNGWzOpKSTBmJQC5pV8I8Mw/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial rounded-full border border-[#0e3e23] hover:bg-[#0e3e23]/10 text-center text-[#0e3e23] text-sm font-semibold px-8 py-3.5 transition-all cursor-pointer inline-flex items-center justify-center"
              >
                Partner With Us
              </a>
            ) : (
              <button
                onClick={() => setTab('retailer')}
                className="flex-1 sm:flex-initial rounded-full border border-[#0e3e23] hover:bg-[#0e3e23]/5 text-[#0e3e23] text-sm font-semibold px-8 py-3.5 transition-all cursor-pointer"
              >
                Integrate Contract API
              </button>
            )}
          </div>

          {/* Hero Small Stats Row */}
          <div className="flex gap-8 border-t border-[#e2e2da] pt-6 w-full max-w-lg">
            <div>
              <span className="block text-2xl font-extrabold text-[#0e3e23]">
                {mode === 'surprise_bags' ? '125K+' : '₹14,200+'}
              </span>
              <span className="text-xs text-[#5c7a5a] font-medium uppercase tracking-wider">
                {mode === 'surprise_bags' ? 'Meals Rescued' : 'Annual Capital Saved'}
              </span>
            </div>
            <div className="border-l border-[#e2e2da] pl-8">
              <span className="block text-2xl font-extrabold text-[#0e3e23]">
                {mode === 'surprise_bags' ? '320 Tons' : '480 Audits'}
              </span>
              <span className="text-xs text-[#5c7a5a] font-medium uppercase tracking-wider">
                {mode === 'surprise_bags' ? 'CO₂ Prevented' : 'Contracts Synced'}
              </span>
            </div>
            <div className="border-l border-[#e2e2da] pl-8">
              <span className="block text-2xl font-extrabold text-[#0e3e23]">
                {mode === 'surprise_bags' ? '₹2.4 Cr+' : '99.8%'}
              </span>
              <span className="text-xs text-[#5c7a5a] font-medium uppercase tracking-wider">
                {mode === 'surprise_bags' ? 'Money Saved' : 'Alert Accuracy'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Vector Device Frame (Exactly from Image 1) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[360px] aspect-[9/18.5] bg-[#0e3e23] rounded-[48px] p-3.5 shadow-2xl border-4 border-[#e2e2da] overflow-hidden">
            {/* Phone Speaker & Camera cutouts */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#0e3e23] h-6 w-32 rounded-b-2xl z-20 flex items-center justify-center">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Simulated Live Screen Content */}
            <div className="w-full h-full bg-[#f9f9f6] rounded-[36px] overflow-hidden p-4 pt-8 flex flex-col justify-between">
              {/* Fake App header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#e2e2da]">
                <div className="flex gap-1.5 items-center">
                  <Leaf className="w-4 h-4 text-[#8ae922]" />
                  <span className="font-extrabold text-xs text-[#0e3e23]">ExpiryX App</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-[#8ae922] animate-pulse" />
              </div>

              {/* Fake interactive display content based on mode */}
              <div className="flex-1 my-4 flex flex-col justify-start">
                <p className="text-[10px] uppercase font-bold text-[#5c7a5a] tracking-wider mb-2">Live Activity</p>
                
                {mode === 'surprise_bags' ? (
                  <div className="space-y-2.5">
                    {/* Item Card 1 */}
                    <div className="bg-white p-2.5 rounded-2xl border border-[#e2e2da] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 overflow-hidden flex items-center justify-center">
                        <span className="text-lg">🥐</span>
                      </div>
                      <div className="flex-1">
                        <span className="block text-[11px] font-bold text-[#0e3e23]">Mystery Bakery Box</span>
                        <span className="text-[9px] text-[#5c7a5a]">Wild Yeast Bakery, Laxmi Nagar</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-black text-[#0e3e23]">₹120.00</span>
                        <span className="text-[8px] line-through text-[#5c7a5a]">₹350.00</span>
                      </div>
                    </div>

                    {/* Item Card 2 */}
                    <div className="bg-white p-2.5 rounded-2xl border border-[#e2e2da] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 overflow-hidden flex items-center justify-center">
                        <span className="text-lg">🥛</span>
                      </div>
                      <div className="flex-1">
                        <span className="block text-[11px] font-bold text-[#0e3e23]">Dairy Harvest Bag</span>
                        <span className="text-[9px] text-[#5c7a5a]">Green Roots Market, Green Park</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-black text-[#0e3e23]">₹140.00</span>
                        <span className="text-[8px] line-through text-[#5c7a5a]">₹380.00</span>
                      </div>
                    </div>

                    {/* Quick Stat widget */}
                    <div className="bg-[#0e3e23] text-white p-3 rounded-2xl flex items-center justify-between mt-1">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wide opacity-80">Saved Today</span>
                        <span className="text-xs font-bold">5.8 kg CO₂</span>
                      </div>
                      <div className="bg-[#8ae922] text-[#0e3e23] rounded-full p-1">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {/* Subscription Warning Card 1 */}
                    <div className="bg-white p-2.5 rounded-2xl border-l-[3.5px] border-l-red-500 border border-[#e2e2da] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                        <span className="text-red-500 font-bold text-xs">NET</span>
                      </div>
                      <div className="flex-1">
                        <span className="block text-[11px] font-bold text-[#0e3e23]">Netflix Suite Plan</span>
                        <span className="text-[9px] text-red-600 font-semibold">Renews in 2 Days</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-black text-red-500">₹22.99</span>
                        <span className="text-[8px] text-[#5c7a5a]">Monthly</span>
                      </div>
                    </div>

                    {/* Subscription Warning Card 2 */}
                    <div className="bg-white p-2.5 rounded-2xl border-l-[3.5px] border-l-amber-500 border border-[#e2e2da] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                        <span className="text-amber-600 font-bold text-[10px]">AWS</span>
                      </div>
                      <div className="flex-1">
                        <span className="block text-[11px] font-bold text-[#0e3e23]">Elastic Server Node</span>
                        <span className="text-[9px] text-amber-600 font-semibold">Renews in 4 Days</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-black text-amber-600">₹145.00</span>
                        <span className="text-[8px] text-[#5c7a5a]">Monthly</span>
                      </div>
                    </div>

                    {/* Quick Metric widget */}
                    <div className="bg-[#0e3e23] text-white p-3 rounded-2xl flex items-center justify-between mt-1">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wide opacity-80">Pending Renewals</span>
                        <span className="text-xs font-bold">2 Critical Alerts</span>
                      </div>
                      <div className="bg-[#8ae922] text-[#0e3e23] rounded-full p-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic device button */}
              <button 
                onClick={() => setTab('discover')}
                className="w-full bg-[#0e3e23] text-white text-[10px] font-bold py-2.5 rounded-full hover:bg-[#8ae922] hover:text-[#0e3e23] transition-colors cursor-pointer"
              >
                Launch Live View Explorer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (Image 1 & 2) */}
      <section className="bg-[#f0f0e8] py-20 px-6 border-y border-[#e2e2da]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#5c7a5a]">Process Model</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0e3e23] tracking-tight mt-2 mb-4">
            {mode === 'surprise_bags' ? 'How It Works in 3 Steps' : 'Your 3-Step Management Loop'}
          </h2>
          <p className="text-[#5c7a5a] max-w-2xl mx-auto text-sm md:text-base mb-12">
            ExpiryX bridges surplus capacity and alert automation to streamline eco-saving and spending protection:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mode === 'surprise_bags' ? (
              <>
                {/* Step 1 */}
                <div className="bg-white p-8 rounded-3xl border border-[#e2e2da] shadow-sm flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#8ae922]/10 text-[#0e3e23] flex items-center justify-center font-extrabold text-xl mb-6 border border-[#8ae922]/20">
                    🔍
                  </div>
                  <h3 className="text-lg font-bold text-[#0e3e23] mb-3">1. Browse Surpluses</h3>
                  <p className="text-sm text-[#5c7a5a] leading-relaxed">
                    Open the explorer to discover surplus bakery goods, groceries, or gourmet dishes near you going for 50-70% off.
                  </p>
                </div>
                {/* Step 2 */}
                <div className="bg-white p-8 rounded-3xl border border-[#e2e2da] shadow-sm flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#8ae922]/10 text-[#0e3e23] flex items-center justify-center font-extrabold text-xl mb-6 border border-[#8ae922]/20">
                    🛍️
                  </div>
                  <h3 className="text-lg font-bold text-[#0e3e23] mb-3">2. Reserve Instantly</h3>
                  <p className="text-sm text-[#5c7a5a] leading-relaxed">
                    Reserve a surprise item securely within the ExpiryX application to lock in your custom pick-up confirmation.
                  </p>
                </div>
                {/* Step 3 */}
                <div className="bg-white p-8 rounded-3xl border border-[#e2e2da] shadow-sm flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#8ae922]/10 text-[#0e3e23] flex items-center justify-center font-extrabold text-xl mb-6 border border-[#8ae922]/20">
                    🤝
                  </div>
                  <h3 className="text-lg font-bold text-[#0e3e23] mb-3">3. Claim at the Store</h3>
                  <p className="text-sm text-[#5c7a5a] leading-relaxed">
                    Show up at the bakery or outlet within the specified window to retrieve your high-quality surprise pack!
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Step 1 */}
                <div className="bg-white p-8 rounded-3xl border border-[#e2e2da] shadow-sm flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0e3e23] flex items-center justify-center font-extrabold text-xl mb-6 border border-blue-100">
                    📂
                  </div>
                  <h3 className="text-lg font-bold text-[#0e3e23] mb-3">1. Unified Entry</h3>
                  <p className="text-sm text-[#5c7a5a] leading-relaxed">
                    Input your active recurring subscriptions, pricing, renewal dates, and billing cycle inside your safe monitor.
                  </p>
                </div>
                {/* Step 2 */}
                <div className="bg-white p-8 rounded-3xl border border-[#e2e2da] shadow-sm flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-50 text-[#0e3e23] flex items-center justify-center font-extrabold text-xl mb-6 border border-amber-100">
                    🔔
                  </div>
                  <h3 className="text-lg font-bold text-[#0e3e23] mb-3">2. Smart Threshold Alerts</h3>
                  <p className="text-sm text-[#5c7a5a] leading-relaxed">
                    Receive alert flags (Perfect, Warning, Critical) based on renewal urgency to make proactive cancellation decisions.
                  </p>
                </div>
                {/* Step 3 */}
                <div className="bg-white p-8 rounded-3xl border border-[#e2e2da] shadow-sm flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-green-50 text-[#0e3e23] flex items-center justify-center font-extrabold text-xl mb-6 border border-green-100">
                    💸
                  </div>
                  <h3 className="text-lg font-bold text-[#0e3e23] mb-3">3. Optmize Spend</h3>
                  <p className="text-sm text-[#5c7a5a] leading-relaxed">
                    Cut recurring auto-renew fees for forgotten software tools or subscriptions you do not active utilize.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: RECENT LISTS / ACTIVE DEALS (Image 1 & 3) */}
      {mode === 'surprise_bags' ? (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#5c7a5a]">Today's Rescues</span>
              <h2 className="text-3xl font-extrabold text-[#0e3e23] tracking-tight mt-1">Today's Active Surprise Bags</h2>
            </div>
            <button
              onClick={() => setTab('discover')}
              className="text-sm font-bold text-[#0e3e23] hover:text-[#8ae922] flex items-center gap-1.5 transition-colors group"
            >
              See All Nearby
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bags.slice(0, 3).map((bag) => (
              <div 
                key={bag.id}
                className="bg-white rounded-3xl border border-[#e2e2da] hover:border-[#8ae922] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={bag.image}
                    alt={bag.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-[#0e3e23]">
                    {bag.category}
                  </span>
                  {/* Timer */}
                  <span className="absolute top-4 right-4 bg-[#0e3e23] text-[#fcfdf9] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#8ae922] rounded-full animate-ping" />
                    Ends in {bag.endsInMinutes}m
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#0e3e23] line-clamp-1 mb-1">{bag.title}</h3>
                    <p className="text-xs text-[#5c7a5a] mb-2 font-medium">{bag.storeName}</p>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {bag.tags.map(tag => (
                        <span key={tag} className="bg-[#f0f0e8] text-[#5c7a5a] text-[9px] px-2 py-0.5 rounded-md font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#e2e2da] pt-4 mt-2 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-[#5c7a5a] font-bold uppercase tracking-wider">Discounted Pool</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-[#0e3e23]">₹{bag.discountedPrice.toFixed(2)}</span>
                        <span className="text-xs line-through text-[#5c7a5a] font-medium">₹{bag.originalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRescueAction(bag)}
                      disabled={bag.quantityLeft === 0}
                      className={`text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm transition-all flex items-center gap-1.5 ${
                        bag.quantityLeft === 0 
                          ? 'bg-gray-100 text-[#5c7a5a] border border-[#e2e2da] cursor-not-allowed'
                          : 'bg-[#0e3e23] text-white hover:bg-[#8ae922] hover:text-[#0e3e23] cursor-pointer'
                      }`}
                    >
                      {bag.quantityLeft === 0 ? 'Sold Out' : (
                        <>
                          Reserve Bag
                          <Plus className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* SECTION 4: GLOBAL IMPACT SLATE WITH FOREST GRAPH (Image 1) */}
      <section className="bg-[#0e3e23] text-[#fcfdf9] py-20 px-6 rounded-[48px] mx-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Stats Description Grid */}
          <div className="lg:col-span-6 text-left">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#8ae922]">Dynamic Metrics</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 mb-6">Your Unified Global Impact</h2>
            <p className="text-[#a4ceb3] text-sm md:text-base leading-relaxed mb-8">
              Every surplus bag rescued and obsolete software contract deactivated drives both carbon capture and asset restoration across our cloud-native network. Join a massive collective effort to heal the planet and your wallet.
            </p>

            {/* Target meters */}
            <div className="space-y-6 mb-8 max-w-lg">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#a4ceb3]">CO₂ Saved (Tons)</span>
                  <span className="text-[#8ae922]">70% of Monthly Goal</span>
                </div>
                <div className="h-2 w-full bg-[#1b5e3a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8ae922] rounded-full" style={{ width: '70%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#a4ceb3]">Aquifer Vol Saved (Litres)</span>
                  <span className="text-[#8ae922]">1.2M Litres saved</span>
                </div>
                <div className="h-2 w-full bg-[#1b5e3a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#a2ee34] rounded-full" style={{ width: '52%' }} />
                </div>
              </div>
            </div>

            {/* Badges block */}
            <div className="flex gap-4">
              <div className="bg-[#1b5e3a] border border-[#a4ceb3]/10 p-4 rounded-2xl">
                <span className="block text-2xl font-black text-[#8ae922]">45</span>
                <span className="text-xs text-[#a4ceb3] font-medium font-sans uppercase">Badges Earned</span>
              </div>
              <div className="bg-[#1b5e3a] border border-[#a4ceb3]/10 p-4 rounded-2xl">
                <span className="block text-2xl font-black text-[#8ae922]">#12</span>
                <span className="text-xs text-[#a4ceb3] font-medium font-sans uppercase">Local Rank</span>
              </div>
            </div>
          </div>

          {/* Forest Graphic mockup on the right */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-[36px] overflow-hidden bg-[#112415] border border-[#a4ceb3]/20 shadow-xl flex flex-col justify-end p-8">
              {/* Overlay with rich foliage illustration of deep ecological roots */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e3e23] via-transparent to-black/20" />
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80"
                alt="Forest background"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                referrerPolicy="no-referrer"
              />

              {/* Text Overlay */}
              <div className="relative z-10 text-left">
                <span className="inline-flex bg-[#8ae922] text-[#0e3e23] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
                  Eco Forest Status
                </span>
                <h3 className="text-xl font-bold mb-1.5 text-white leading-tight">Canopy Restoration Level 14</h3>
                <p className="text-xs text-[#a4ceb3] leading-relaxed">
                  Your actions have generated enough offset surplus to foster 14 organic saplings in our real-world restoration zones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS (Image 1) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#5c7a5a]">Social Validation</span>
          <h2 className="text-3xl font-extrabold text-[#0e3e23] tracking-tight mt-1 mb-4">Voices of the Movement</h2>
          <p className="text-[#5c7a5a] max-w-xl mx-auto text-sm md:text-base">
            What our customers and partnered enterprise teams are saying about the ExpiryX framework:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-[#e2e2da] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4 text-[#8ae922]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="italic text-[#0e3e23] text-sm md:text-base leading-relaxed mb-6 font-medium">
                "{mode === 'surprise_bags' ? 'The quality of the food I get from ExpiryX is incredible. It feels like I am getting a secret gift every day while actually doing something amazing for the planet.' : 'I discovered three forgotten automated SaaS subscriptions that were draining ₹10,000 every month. This tool paid for itself on day one.'}"
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f0f0e8] flex items-center justify-center font-bold text-xs text-[#0e3e23]">
                KS
              </div>
              <div>
                <span className="block text-xs font-bold text-[#0e3e23]">Kamala Sharma</span>
                <span className="text-[10px] text-[#5c7a5a] font-medium uppercase">Planet Rescuer, Mumbai</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-[#e2e2da] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4 text-[#8ae922]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="italic text-[#0e3e23] text-sm md:text-base leading-relaxed mb-6 font-medium">
                "{mode === 'surprise_bags' ? 'As a small business owner, ExpiryX has transformed how we handle our end-of-day stock. We have reduced our bakery waste by 90% and met amazing new local customers!' : 'Managing 45 contractor service keys and utility cycles was a nightmare. The alert timers have completely streamlined our billing workflow.'}"
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f0f0e8] flex items-center justify-center font-bold text-xs text-[#0e3e23]">
                SP
              </div>
              <div>
                <span className="block text-xs font-bold text-[#0e3e23]">Suresh Prasad</span>
                <span className="text-[10px] text-[#5c7a5a] font-medium uppercase">{mode === 'surprise_bags' ? 'Owner, Green Grocers #402, Connaught Place' : 'Operations VP, TechCorp'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ETHICAL SIGNUP CTA */}
      <section className="bg-[#f0f0e8] py-16 px-6 text-center border-t border-[#e2e2da]">
        <div className="max-w-xl mx-auto">
          <Leaf className="w-10 h-10 text-[#8ae922] mx-auto mb-4" />
          <h2 className="text-3xl font-black text-[#0e3e23] mb-3">Join the Movement Today</h2>
          <p className="text-sm text-[#5c7a5a] mb-8 leading-relaxed">
            Download the ExpiryX platform or deploy the alerting tools to start conserving waste, preserving water, and securing capital efficiency in seconds.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setTab('discover')}
              className="bg-[#0e3e23] hover:bg-[#155631] text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-colors cursor-pointer"
            >
              Get App Store
            </button>
            <button
              onClick={() => setTab('discover')}
              className="bg-[#e2e2da] hover:bg-[#d6d6ce] text-[#0e3e23] font-bold text-xs px-6 py-3 rounded-full transition-colors border border-[#c8c8bc] cursor-pointer"
            >
              Google Play Shop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
