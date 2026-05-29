/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/AppContext';
import { AlertTriangle, Droplet, Check, Shield, Cpu, RefreshCw, Zap, Heart, ArrowRight } from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const { setTab } = useAppState();

  // Team founders data
  const team = [
    {
      name: 'Jishnu',
      role: 'CO-FOUNDER & CMO',
      bio: 'Dedicated to expanding our network of retail partners to maximize food rescue across the region.',
      image: '/assets/input_file_0.png'
    },
    {
      name: 'Kartikeya',
      role: 'CO-FOUNDER & CEO',
      bio: 'Former supply chain architect at leading global retailers with 20 years of experience in logistics optimization.',
      image: '/assets/input_file_1.png'
    },
    {
      name: 'Alok',
      role: 'CO-FOUNDER & COO',
      bio: 'Environmental activist and policy advisor dedicated to zero-waste urban development.',
      image: '/assets/input_file_2.png'
    },
    {
      name: 'Navyom',
      role: 'CO-FOUNDER & CTO',
      bio: 'AI researcher specialized in predictive algorithms and sustainable computing architectures.',
      image: '/assets/input_file_3.png'
    }
  ];

  return (
    <div className="bg-[#fcfdf9] min-h-screen">
      {/* SECTION 1: HERO HEADER */}
      <section className="relative overflow-hidden py-20 px-6 max-w-7xl mx-auto text-center">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#8ae922]/10 to-transparent blur-3xl rounded-full -z-10" />
        
        <span className="block text-[10px] font-extrabold text-[#5c7a5a] tracking-widest uppercase mb-3">
          Our Shared Responsibility
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0e3e23] tracking-tight leading-tight max-w-4xl mx-auto">
          Turning Food Waste Into <br />
          <span className="text-[#3a6e14]">Opportunity</span><span className="text-[#8ae922]">.</span>
        </h1>
        <p className="mt-6 text-sm md:text-base text-[#5c7a5a] max-w-2xl mx-auto leading-relaxed">
          We're building a world where every meal finds its way to a table, not a landfill. 
          Ethical sophistication meets technological innovation to rescue the planet, one bag at a time.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setTab('discover')}
            className="bg-[#3e680f] hover:bg-[#4d8013] text-[#fcfdf9] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer shadow-sm"
          >
            Explore Bags
          </button>
          <a
            href="#stats"
            className="bg-[#fcfdf9] hover:bg-[#f4f5f0] border border-[#e2e2da] text-[#0e3e23] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer text-center"
          >
            Our Stats
          </a>
        </div>
      </section>

      {/* SECTION 2: ETHICAL NORTH STAR & CARBON CAPTURED (CARDS) */}
      <section id="stats" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Card 1: Ethical North Star (7 cols) */}
          <div className="md:col-span-7 bg-[#f2f4ec] rounded-[36px] p-8 md:p-12 border border-[#e2e2da]/60 relative overflow-hidden flex flex-col justify-between group">
            {/* Soft backdrop blur aesthetic */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
            
            <div className="space-y-6 relative z-10 text-left">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#e2e2da] flex items-center justify-center text-[#3e680f] shadow-xs">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#0e3e23]">Our Ethical North Star</h3>
                <p className="mt-4 text-xs md:text-sm text-[#5c7a5a] leading-relaxed max-w-lg">
                  We believe food waste is a logistics problem, not a resource problem. By connecting surplus inventory 
                  with conscious consumers, we create a circular economy that rewards sustainability and protects 
                  ecological assets.
                </p>
              </div>
            </div>
            
            {/* Visual bottom indicator for sleek frame */}
            <div className="mt-12 w-full h-1 bg-[#0e3e23]/10 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-[#3e680f]" />
            </div>
          </div>

          {/* Card 2: Carbon Captured (5 cols) */}
          <div className="md:col-span-5 bg-[#0e3e23] rounded-[36px] p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-between text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8ae922]/15 rounded-full blur-2xl" />
            
            <div className="space-y-6">
              <span className="block text-[9px] font-mono tracking-widest text-[#a4ceb3] uppercase font-bold">
                Ecosystem Carbon Index
              </span>
              <div>
                <span className="block text-[#8ae922] font-black text-5xl md:text-6xl tracking-tight leading-none mb-2">
                  12.4k
                </span>
                <span className="block text-xs text-[#a4ceb3] font-bold uppercase tracking-wider">
                  Tons of CO2 equivalent
                </span>
                <p className="text-xs text-[#a4ceb3]/80 mt-1">
                  Diverted from atmosphere through eco-efficient food salvage networks.
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-[#a4ceb3]">
                <span>2026 Goal Tracker</span>
                <span className="text-[#8ae922]">80% Achievement</span>
              </div>
              <div className="h-2 w-full bg-[#1b5e3a] rounded-full overflow-hidden">
                <div className="h-full bg-[#8ae922] rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Small auxiliary pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Pill 1 */}
          <div className="bg-white rounded-3xl p-6 border border-[#e2e2da] flex items-center md:items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold text-sm">
              👥
            </div>
            <div>
              <h4 className="font-extrabold text-[#0e3e23] text-sm md:text-base">Community Led</h4>
              <p className="text-xs text-[#5c7a5a] mt-0.5">Over 500,000 food heroes saving meals daily across regional districts.</p>
            </div>
          </div>

          {/* Pill 2 */}
          <div className="bg-white rounded-3xl p-6 border border-[#e2e2da] flex items-center md:items-start justify-between gap-4 text-left">
            <div className="flex items-center md:items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#8ae922]/15 text-[#0e3e23] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0e3e23] text-sm md:text-base">A Transparent Pipeline</h4>
                <p className="text-xs text-[#5c7a5a] mt-0.5">Every bag rescued is tracked, verified, and reported in our real-time ledger.</p>
              </div>
            </div>
            <div className="shrink-0 w-12 h-12 rounded-full border-4 border-[#8ae922] flex items-center justify-center text-[10px] font-black text-[#0e3e23] bg-[#fcfdf9]">
              100%
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 1.3 BILLION TON BLIND SPOT */}
      <section className="bg-[#f4f5f0] border-y border-[#e2e2da] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Points (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0e3e23] tracking-tight leading-tight">
                The 1.3 Billion Ton <br />
                <span className="text-[#be2525]">Blind Spot.</span>
              </h2>
              <p className="mt-4 text-[#5c7a5a] text-sm leading-relaxed max-w-xl">
                A third of all food produced globally goes to waste while one in nine people go hungry. 
                This isn't just a social failing—it's a critical climate catastrophe.
              </p>
            </div>

            <div className="space-y-6 max-w-lg">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#be2525] flex items-center justify-center shrink-0 shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0e3e23] text-sm md:text-base">Methane Emissions</h4>
                  <p className="text-xs text-[#5c7a5a] mt-1 leading-relaxed">
                    Decomposing food in landfills produces methane, which is 25x more potent than CO2 
                    at trapping atmospheric heat.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0e3e23] text-sm md:text-base">Resource Depletion</h4>
                  <p className="text-xs text-[#5c7a5a] mt-1 leading-relaxed">
                    Global agriculture consumes 70% of freshwater resources. Wasting finished physical foodstuffs 
                    is equivalent to flushing pure water down the drain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Stylized Chart (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-[36px] border border-[#e2e2da] shadow-sm text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-500 font-black block mb-4">
              CRITICAL REPORT &middot; GLOBAL WASTE TREND
            </span>
            <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2 border-b border-[#e2e2da] relative">
              
              {/* Overlay lines */}
              <div className="absolute top-12 left-0 right-0 border-t border-gray-100 w-full" />
              <div className="absolute top-32 left-0 right-0 border-t border-gray-100 w-full" />

              {/* Bar 2010 */}
              <div className="flex-1 flex flex-col items-center gap-1.5 z-10">
                <span className="text-[10px] text-gray-400 font-bold">2010</span>
                <div className="w-full bg-gray-100 rounded-t-xl transition-all duration-300" style={{ height: '50px' }} />
              </div>

              {/* Bar 2015 */}
              <div className="flex-1 flex flex-col items-center gap-1.5 z-10">
                <span className="text-[10px] text-gray-400 font-bold">2015</span>
                <div className="w-full bg-gray-200 rounded-t-xl transition-all duration-300" style={{ height: '90px' }} />
              </div>

              {/* Bar 2020 */}
              <div className="flex-1 flex flex-col items-center gap-1.5 z-10">
                <span className="text-[10px] text-gray-400 font-bold">2020</span>
                <div className="w-full bg-gray-300 rounded-t-xl transition-all duration-300" style={{ height: '140px' }} />
              </div>

              {/* Bar Today */}
              <div className="flex-1 flex flex-col items-center gap-1.5 z-10">
                <span className="text-[9px] bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded-full animate-pulse">
                  TODAY
                </span>
                <div className="w-full bg-red-600 rounded-t-xl transition-all duration-300 relative shadow-md" style={{ height: '190px' }}>
                  <span className="absolute top-2 inset-x-0 text-center text-white text-[9px] font-black tracking-wider">
                    CRITICAL
                  </span>
                </div>
              </div>

            </div>
            
            <div className="flex justify-between items-center mt-4 text-[10px] font-bold text-[#5c7a5a]">
              <span>UN Food Salvage Limit Indicator</span>
              <span className="text-red-600">LIMIT EXCEEDED</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR FUTURISTIC SOLUTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-[#072412] text-white rounded-[40px] px-8 py-16 md:p-16 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-950 to-transparent opacity-60" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Our Futuristic Solution</h2>
            <p className="text-xs md:text-sm text-[#a4ceb3] leading-relaxed">
              A seamless AI-driven pipeline connecting overproduction to consumer demand in milliseconds.
            </p>
          </div>

          {/* Three Steps Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-left max-w-5xl mx-auto">
            {/* Connector Line behind steps in tablet/desktop */}
            <div className="hidden md:block absolute top-[43px] left-[15%] right-[15%] h-0.5 bg-[#8ae922]/15 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#155631] border border-[#8ae922]/30 flex items-center justify-center text-[#8ae922] font-black text-lg shadow-inner shrink-0 leading-none">
                <Cpu className="w-6 h-6 text-[#8ae922]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm md:text-base text-white">Smart Sensing</h4>
                <p className="text-xs text-[#a4ceb3]/90 leading-relaxed max-w-xs md:max-w-none">
                  Retailer POS detects surplus inventory items automatically, matching expiration threshold flags.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#155631] border border-[#8ae922]/30 flex items-center justify-center text-[#8ae922] font-black text-lg shadow-inner shrink-0 leading-none">
                <RefreshCw className="w-5 h-5 text-[#8ae922] animate-spin-slow" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm md:text-base text-white">AI Matching</h4>
                <p className="text-xs text-[#a4ceb3]/90 leading-relaxed max-w-xs md:max-w-none">
                  Demand statistical forecasting pairs optimal food surprise bags with regional users instantly.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#155631] border border-[#8ae922]/30 flex items-center justify-center text-[#8ae922] font-black text-lg shadow-inner shrink-0 leading-none">
                <Zap className="w-5 h-5 text-[#8ae922]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm md:text-base text-white">Rapid Rescue</h4>
                <p className="text-xs text-[#a4ceb3]/90 leading-relaxed max-w-xs md:max-w-none">
                  Conscious users collect high-value bags within minutes of initial digital posting.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: THE MINDS BEHIND THE MISSION */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#e2e2da]">
        <div className="text-left mb-12">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-[#5c7a5a] font-extrabold mb-2">
            The Minds Behind The Mission
          </span>
          <h2 className="text-3xl font-black text-[#0e3e23] tracking-tight">Rooted in Passion.</h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((founder, i) => (
            <div key={founder.name + i} className="bg-white rounded-3xl border border-[#e2e2da] overflow-hidden flex flex-col text-left group hover:shadow-md transition-all duration-300">
              <div className="h-64 overflow-hidden bg-gray-100 relative">
                <img
                  src={founder.image}
                  referrerPolicy="no-referrer"
                  alt={founder.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-[9px] font-black bg-[#0e3e23] px-2.5 py-1 rounded tracking-widest uppercase">
                  ACTIVE FOUNDER
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-base font-black text-[#0e3e23]">{founder.name}</h4>
                  <span className="text-[9px] font-extrabold text-[#5c7a5a] tracking-wider block mt-0.5">{founder.role}</span>
                  <p className="text-xs text-[#5c7a5a] mt-3 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: TESTIMONIAL BY JISHNU */}
      <section className="pb-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#f0f2eb]/60 rounded-[36px] p-8 md:p-12 border border-[#e2e2da]/70 text-center space-y-8 relative overflow-hidden">
          {/* Symmetrical Quotation Graphic */}
          <span className="block text-5xl font-serif text-[#3e680f]/30 leading-none">“</span>
          
          <p className="italic text-base md:text-lg leading-relaxed text-[#0e3e23] font-medium max-w-2xl mx-auto">
            "ExpiryX isn't just an app; it's a movement. We've seen a 40% reduction in our store's waste 
            since partnering, and our customers love being part of the solution."
          </p>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-[#8ae922]">
              <img
                src="/assets/input_file_0.png"
                referrerPolicy="no-referrer"
                alt="Jishnu Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block text-xs font-black text-[#0e3e23]">Jishnu</span>
              <span className="text-[9px] text-[#5c7a5a] font-bold uppercase tracking-widest block mt-0.5">
                CO-FOUNDER & CMO
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
