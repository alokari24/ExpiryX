/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useAppState } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { LandingHero } from './components/LandingHero';
import { SurpriseBagsView } from './components/SurpriseBagsView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutView } from './components/CheckoutView';
import { ConfirmationView } from './components/ConfirmationView';
import { SubscriptionsView } from './components/SubscriptionsView';
import { HowItWorksView } from './components/HowItWorksView';
import { AboutUsView } from './components/AboutUsView';
import { RetailerDashboard } from './components/RetailerDashboard';
import { SurpriseBag, Order } from './types';
import { Leaf, Info, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e3e23] text-[#fcfdf9]/70 pt-16 pb-12 border-t border-[#1b5e3a] text-xs font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        <div className="space-y-4">
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            ExpiryX <span className="text-[#8ae922]">.</span>
          </span>
          <p className="leading-relaxed max-w-sm text-white/60">
            Unifying redundant food recoveries and recurring service agreement monitors in one single ecosystem to guard physical resources and economic capital.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[10px]">Ecosystem Mode Solutions</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="hover:text-white transition-colors">Surplus Surprise Bags discovery</a></li>
            <li><a href="#" className="hover:text-white transition-colors">SaaS Contract alert limits</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Merchant Inventory Publish Portal</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Unified environmental carbon index</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[10px]">Merchant Partnership API</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="hover:text-white transition-colors">Sourdough Bakery Alliance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Green Grocery Surplus SDK</a></li>
            <li><a href="#" className="hover:text-white transition-colors">SaaS Invoice OCR Integration</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Restoration Forest offset trees</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[10px]">Global Environmental Shield</h4>
          <p className="leading-relaxed text-white/50 mb-4">
            ExpiryX operates clean and secure carbon ledger lines, removing tracking stress and landfill pollution in 42 regional districts.
          </p>
          <div className="flex gap-4">
            <span className="bg-[#1b5e3a] text-[#8ae922] font-black tracking-widest text-[9px] px-2.5 py-1 rounded">
              ISO-CO2 COMPLIANT
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-[#1b5e3a]/40 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40">
        <span className="block">&copy; 2026 ExpiryX Corporation. All ecological assets secured.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Shield Clauses</a>
          <a href="#" className="hover:text-white transition-colors">Arbitration and Terms</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Registers</a>
        </div>
      </div>
    </footer>
  );
};

const MainAppContent: React.FC = () => {
  const { mode, tab, setTab, orders, addOrder } = useAppState();

  // Selected detail modal trigger state
  const [selectedInspectBag, setSelectedInspectBag] = useState<SurpriseBag | null>(null);

  // Active user checkout parameters
  const [checkoutItem, setCheckoutItem] = useState<{ bag: SurpriseBag; quantity: number } | null>(null);

  // Active completed order state to show confirmation panel
  const [justCompletedOrder, setJustCompletedOrder] = useState<Order | null>(null);

  // Render sub page mapping
  const renderTabContent = () => {
    switch (tab) {
      case 'landing':
        return <LandingHero />;

      case 'discover':
        if (mode === 'surprise_bags') {
          // If the customer just bought something, present confirmation details
          if (justCompletedOrder) {
            return (
              <ConfirmationView 
                order={justCompletedOrder} 
                onBackToExplore={() => {
                  setJustCompletedOrder(null);
                  setCheckoutItem(null); 
                  setTab('discover');
                }} 
              />
            );
          }

          // If the customer is in checkout checkout phase
          if (checkoutItem) {
            return (
              <CheckoutView
                bag={checkoutItem.bag}
                quantity={checkoutItem.quantity}
                onBack={() => setCheckoutItem(null)}
                onPaymentSuccess={(newOrder) => {
                  addOrder(newOrder); // Saves into AppContext persistent logs
                  setJustCompletedOrder(newOrder); // Triggers confirmation display state
                }}
              />
            );
          }

          // Regular listings discover screen
          return (
            <SurpriseBagsView
              onSelectBag={(bag) => {
                setSelectedInspectBag(bag);
              }}
            />
          );
        } else {
          // Subscriptions tracker alert console
          return <SubscriptionsView />;
        }

      case 'how_it_works':
        return <HowItWorksView />;

      case 'impact':
        return <AboutUsView />;

      case 'retailer':
        return <RetailerDashboard />;

      default:
        return <LandingHero />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Top-level Header Nav with dynamic router switches */}
      <Navigation />

      {/* Main Reactive Route Panel Container */}
      <main className="flex-grow">
        {renderTabContent()}
      </main>

      {/* Product Information Overlay Modal */}
      {selectedInspectBag && (
        <ProductDetailModal
          bag={selectedInspectBag}
          onClose={() => setSelectedInspectBag(null)}
          onReserve={(qty) => {
            // Closes modal and opens checkout routing state
            setSelectedInspectBag(null);
            setCheckoutItem({ bag: selectedInspectBag, quantity: qty });
          }}
        />
      )}

      {/* Permanent Sustainable Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
