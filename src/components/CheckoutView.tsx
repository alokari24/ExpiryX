/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SurpriseBag, Order } from '../types';
import { Shield, Clock, MapPin, CheckCircle2, CreditCard, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutViewProps {
  bag: SurpriseBag;
  quantity: number;
  onBack: () => void;
  onPaymentSuccess: (order: Order) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ bag, quantity, onBack, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'Card' | 'Net Banking' | 'Wallets'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const totalCost = Number((bag.discountedPrice * quantity).toFixed(2));

  const handleRazorpayPayment = () => {
    setIsProcessing(true);
    setProcessingStep(1);

    // Simulate authentic payment ledger process
    setTimeout(() => {
      setProcessingStep(2); // Connecting transaction tokens
      setTimeout(() => {
        setProcessingStep(3); // Finalizing with bank
        setTimeout(() => {
          // Success callback
          const simulatedOrder: Order = {
            id: `EXP-${Math.floor(100000 + Math.random() * 900000)}`,
            bag,
            quantity,
            totalCost,
            status: 'Confirmed',
            pickupCode: `${Math.floor(1000 + Math.random() * 9000)} - CONF`,
            pickupTime: bag.pickupTimeRange,
            qrData: `https://expiryx.com/verify-pickup/${bag.id}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          onPaymentSuccess(simulatedOrder);
          setIsProcessing(false);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="bg-[#fcfdf9] min-h-screen py-10 px-6 max-w-2xl mx-auto text-left relative">
      {/* Back click option */}
      <button
        onClick={onBack}
        disabled={isProcessing}
        className="text-[#0e3e23] hover:text-[#8ae922] font-bold text-xs flex items-center gap-1.5 mb-8 group cursor-pointer transition-colors"
      >
        <ChevronLeft className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
        Back Back to details
      </button>

      <h1 className="text-3xl font-black text-[#0e3e23] tracking-tight mb-8">
        Secure Checkout <span className="text-[#8ae922]">.</span>
      </h1>

      <div className="space-y-6">
        {/* Order Summary (exactly like Image 8) */}
        <div className="bg-white rounded-3xl border border-[#e2e2da] p-6 shadow-xs">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#5c7a5a] mb-4">Order Summary</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-[#e2e2da] shrink-0">
              <img
                src={bag.image}
                alt={bag.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-sm text-[#0e3e23]">{bag.title}</h3>
              <p className="text-xs text-[#5c7a5a] font-medium mt-0.5">{bag.storeName}</p>
              <span className="text-xs font-bold text-[#0e3e23] bg-[#8ae922]/15 text-[#0e3e23] px-2.5 py-0.5 mt-1.5 inline-block rounded-md">
                Qty: {quantity}
              </span>
            </div>
            <div className="text-right">
              <span className="block font-black text-lg text-[#0e3e23]">₹{totalCost.toFixed(2)}</span>
              <span className="text-[10px] text-[#5c7a5a] line-through">₹{(bag.originalPrice * quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Pickup Details (exactly like Image 8) */}
        <div className="bg-white rounded-3xl border border-[#e2e2da] p-6 shadow-xs">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#5c7a5a] mb-4">Pickup Details</h2>
          <div className="space-y-4">
            <div className="flex gap-3 text-xs text-[#0e3e23] font-bold">
              <Clock className="w-4 h-4 text-[#8ae922] shrink-0" />
              <div>
                <span className="font-bold opacity-70">Pickup window</span>
                <span className="block text-[#0e3e23] mt-0.5">Today, {bag.pickupTimeRange}</span>
              </div>
            </div>

            <div className="flex gap-3 text-xs text-[#0e3e23] font-bold">
              <MapPin className="w-4 h-4 text-[#8ae922] shrink-0" />
              <div>
                <span className="font-bold opacity-70">Merchant Address</span>
                <span className="block text-[#0e3e23] mt-0.5">
                  {bag.storeName}, drive lane near Central Eco Square
                </span>
                <span className="text-[10px] text-[#5c7a5a] block font-medium mt-0.5">0.6 miles away</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods (exactly like Image 8 radio styled) */}
        <div className="bg-white rounded-3xl border border-[#e2e2da] p-6 shadow-xs">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#5c7a5a] mb-4">Select Payment Method</h2>
          <div className="space-y-3">
            {/* UPI */}
            <label className="flex items-center justify-between p-4 rounded-2xl border border-[#e2e2da] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'UPI'}
                  onChange={() => setSelectedMethod('UPI')}
                  className="accent-[#0e3e23] w-4.5 h-4.5"
                />
                <span className="text-xs font-bold text-[#0e3e23]">Unified Payments Interface (UPI)</span>
              </div>
              <span className="text-[10px] font-black tracking-widest text-[#a2ee34] bg-[#0e3e23] px-2 py-0.5 rounded-sm">UPI</span>
            </label>

            {/* Card */}
            <label className="flex items-center justify-between p-4 rounded-2xl border border-[#e2e2da] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'Card'}
                  onChange={() => setSelectedMethod('Card')}
                  className="accent-[#0e3e23] w-4.5 h-4.5"
                />
                <span className="text-xs font-bold text-[#0e3e23]">Credit or Debit Cards</span>
              </div>
              <CreditCard className="w-4.5 h-4.5 text-[#5c7a5a]" />
            </label>

            {/* Net Banking */}
            <label className="flex items-center justify-between p-4 rounded-2xl border border-[#e2e2da] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'Net Banking'}
                  onChange={() => setSelectedMethod('Net Banking')}
                  className="accent-[#0e3e23] w-4.5 h-4.5"
                />
                <span className="text-xs font-bold text-[#0e3e23]">Net Banking Suite</span>
              </div>
              <span className="text-[10px] font-bold text-[#5c7a5a]">SWIFT</span>
            </label>

            {/* Wallets */}
            <label className="flex items-center justify-between p-4 rounded-2xl border border-[#e2e2da] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'Wallets'}
                  onChange={() => setSelectedMethod('Wallets')}
                  className="accent-[#0e3e23] w-4.5 h-4.5"
                />
                <span className="text-xs font-bold text-[#0e3e23]">Mobile Money &amp; Wallets</span>
              </div>
              <span className="text-[10px] font-bold text-[#5c7a5a]">Instant</span>
            </label>
          </div>
        </div>

        {/* Razorpay Button with security logs (exactly like Image 8) */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#5c7a5a]">Subtotal:</span>
            <span className="text-sm font-semibold text-[#0e3e23]">₹{totalCost.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#e2e2da] pb-4">
            <span className="text-sm font-bold text-[#5c7a5a]">Gateway Comission:</span>
            <span className="text-xs font-bold text-[#8ae922]">FREE (₹0.00)</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-base font-black text-[#0e3e23]">Amount Payable:</span>
            <span className="text-3xl font-black text-[#0e3e23]">₹{totalCost.toFixed(2)}</span>
          </div>

          <button
            onClick={handleRazorpayPayment}
            disabled={isProcessing}
            className="w-full bg-[#0e3e23] hover:bg-[#155631] text-[#fcfdf9] text-xs font-extrabold uppercase tracking-widest py-4.5 rounded-full shadow-md hover:shadow-lg transition-transform focus:scale-95 duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Shield className="w-4 h-4 text-[#8ae922]" />
            Pay with Razorpay Secures
          </button>
        </div>
      </div>

      {/* RAZORPAY MODAL PROXY SIMULATION */}
      <AnimatePresence>
        {isProcessing && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[32px] p-8 max-w-sm w-full border border-gray-100 flex flex-col items-center justify-center text-center shadow-2xl"
            >
              <div className="relative flex h-14 w-14 items-center justify-center mb-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8ae922]/30 opacity-75" />
                <div className="relative rounded-full h-10 w-10 bg-[#0e3e23] border-2 border-[#8ae922] flex items-center justify-center text-[#8ae922] font-black text-lg">
                  R
                </div>
              </div>

              <h2 className="text-[#0e3e23] text-lg font-black mb-1">Razorpay Checkout</h2>
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-6 font-mono">
                Simulation Key #8241
              </p>

              {/* Processing items */}
              <div className="space-y-3.5 mb-8 w-full text-left">
                <div className="flex items-center gap-3">
                  <div className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[10px] ${
                    processingStep >= 1 ? 'bg-[#8ae922] text-[#0e3e23] font-bold' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {processingStep > 1 ? '✓' : '1'}
                  </div>
                  <span className={`text-xs font-bold ${processingStep >= 1 ? 'text-[#0e3e23]' : 'text-gray-400'}`}>
                    Validating transaction totals...
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[10px] ${
                    processingStep >= 2 ? 'bg-[#8ae922] text-[#0e3e23] font-bold' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {processingStep > 2 ? '✓' : '2'}
                  </div>
                  <span className={`text-xs font-bold ${processingStep >= 2 ? 'text-[#0e3e23]' : 'text-gray-400'}`}>
                    Connecting security secure links...
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[10px] ${
                    processingStep >= 3 ? 'bg-[#8ae922] text-[#0e3e23] font-bold' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {processingStep > 3 ? '✓' : '3'}
                  </div>
                  <span className={`text-xs font-bold ${processingStep >= 3 ? 'text-[#0e3e23]' : 'text-gray-400'}`}>
                    Finalizing with bank ledger...
                  </span>
                </div>
              </div>

              <span className="text-[10px] text-gray-400 font-medium">
                *Do not close this window. Your connection is fully protected.
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
