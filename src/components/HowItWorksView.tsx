/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, CreditCard, Shield, TrendingUp, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  return (
    <div className="bg-[#fcfdf9] min-h-screen py-16 px-6 max-w-5xl mx-auto text-left">
      {/* Switzerland Minimalist Header */}
      <div className="border-b border-[#e2e2da] pb-10 mb-12">
        <span className="text-xs uppercase tracking-widest font-extrabold text-[#5c7a5a]">Operational Protocol</span>
        <h1 className="text-4xl md:text-5xl font-black text-[#0e3e23] tracking-tight mt-2 leading-[1.1]">
          The ExpiryX Architecture <span className="text-[#a2ee34]">.</span>
        </h1>
        <p className="text-base text-[#5c7a5a] max-w-2xl mt-4 leading-relaxed">
          How our dual-ecosystem reduces carbon waste streams and locks in capital hygiene for direct ecological preservation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
        {/* Surprise Bags Flow details */}
        <div className="space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-[#8ae922]/10 text-[#0e3e23]">
            <Leaf className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#0e3e23] tracking-tight">1. Stream Food Rescue</h2>
          <p className="text-sm text-[#5c7a5a] leading-relaxed">
            Local bakeries and markets log redundant end-of-day food stock onto ExpiryX. Instead of discarding premium items, we package them into high-quality Surprise Bags. You reserve them inside the app at deep discounts of 50-70% and pick them up during stated local times.
          </p>

          <ul className="space-y-3.5 text-xs font-bold text-[#0e3e23]">
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#8ae922]" />
              50-70% reduction in food retail costs
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#8ae922]" />
              Zero landfill organic decomposition guarantees
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#8ae922]" />
              Direct support for local neighborhood grocers
            </li>
          </ul>
        </div>

        {/* Subscriptions Alert features */}
        <div className="space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-[#0e3e23] border border-blue-100">
            <CreditCard className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#0e3e23] tracking-tight">2. Contract Alert Engine</h2>
          <p className="text-sm text-[#5c7a5a] leading-relaxed">
            Forget automated billing spikes. Input SaaS accounts, mobile licenses, or utility contracts into the alert ledger. ExpiryX monitors renewal thresholds daily and flags impending auto-renew billing using a high-precision countdown status. Turn off auto-renew or request AI audits to prune unused apps.
          </p>

          <ul className="space-y-3.5 text-xs font-bold text-[#0e3e23]">
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Dynamic alerts triggered 2-15 days ahead
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Toggle Auto-Renew flags to instantly target waste
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              SaaS rate negotiations metrics
            </li>
          </ul>
        </div>
      </div>

      {/* High Fidelity FAQ Details */}
      <section className="bg-[#f0f0e8] p-8 md:p-12 rounded-[40px] border border-[#e2e2da]">
        <div className="flex items-center gap-2 mb-8">
          <HelpCircle className="w-5 h-5 text-[#8ae922]" />
          <h3 className="font-extrabold text-xs uppercase tracking-widest text-[#5c7a5a]">Frequently Answered Logic</h3>
        </div>

        <div className="space-y-8 divide-y divide-[#e2e2da] text-xs md:text-sm">
          {/* FAQ 1 */}
          <div className="pt-0 pb-2">
            <h4 className="font-black text-[#0e3e23] mb-2.5">Why is it called a "Surprise" Bag?</h4>
            <p className="text-[#5c7a5a] leading-relaxed">
              Stores cannot predict exactly which high-grade items remain unsold at the end of business hours. Therefore, the bag's specific contents are kept as a premium mystery, varying daily based on surplus patterns, ensuring perfect quality and surprising value.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="pt-6">
            <h4 className="font-black text-[#0e3e23] mb-2.5">How secure is the Subscription Monitoring deck?</h4>
            <p className="text-[#5c7a5a] leading-relaxed">
              Security is our core priority. ExpiryX operates strictly on a client-authorized alert protocol, meaning we require no bank logins or raw card parameters. You control exactly what data is tracked.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="pt-6">
            <h4 className="font-black text-[#0e3e23] mb-2.5">What happens if I miss the pickup window?</h4>
            <p className="text-[#5c7a5a] leading-relaxed">
              If you cannot claim your reserved bag during the designated timeframe, the store may process the bag's allocation to waitlisted eco-rescuers. Refunds are subject to merchant-specific environmental guidelines.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
