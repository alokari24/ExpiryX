/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { SurpriseBag, Order } from '../types';
import { LayoutDashboard, ShoppingBag, BarChart3, Binary, Settings, Plus, Play, Check, Flame, Award, Globe, Bell, Search, PlusCircle, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, Legend, ReferenceLine } from 'recharts';

export const RetailerDashboard: React.FC = () => {
  const { bags, addSurpriseBag, orders, updateOrderStatus } = useAppState();

  // Sidebar active tab simulation
  const [activeSubTab, setActiveSubTab] = useState<'Overview' | 'Inventory' | 'Analytics' | 'Predictions' | 'Settings'>('Overview');

  // Add Item form fields
  const [title, setTitle] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState<SurpriseBag['category']>('Grocery');
  const [pickupTimeRange, setPickupTimeRange] = useState('20:30 - 21:00');
  const [tagsInput, setTagsInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Success indicator
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [priceError, setPriceError] = useState('');

  // AI predictions graph weekday items
  const predictionData = [
    { name: 'Mon', surplus: 120, recovered: 90, riskLimit: 70 },
    { name: 'Tue', surplus: 140, recovered: 110, riskLimit: 90 },
    { name: 'Wed', surplus: 230, recovered: 180, riskLimit: 140 },
    { name: 'Thu', surplus: 180, recovered: 140, riskLimit: 120 },
    { name: 'Fri', surplus: 260, recovered: 210, riskLimit: 190 },
    { name: 'Sat', surplus: 210, recovered: 190, riskLimit: 150 },
    { name: 'Sun', surplus: 150, recovered: 130, riskLimit: 110 }
  ];

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !originalPrice || !discountedPrice || !quantity) return;

    const op = parseFloat(originalPrice);
    const dp = parseFloat(discountedPrice);

    if (op <= 50 || dp <= 50) {
      setPriceError('Prices must be above ₹50.00 to guarantee quality standards and resource recovery minimums.');
      return;
    }

    setPriceError('');

    // Process tags
    const tagsArray = tagsInput ? tagsInput.split(',').map(t => t.trim()) : ['Surplus Item'];

    addSurpriseBag({
      title,
      originalPrice: op,
      discountedPrice: dp,
      quantityLeft: parseInt(quantity),
      category,
      storeName: 'Green Grocers #402, Connaught Place',
      storeId: 'store-green-grocers-402',
      pickupTimeRange,
      image: category === 'Bakery'
        ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
        : category === 'Dairy'
          ? 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=600&auto=format&fit=crop&q=80'
          : category === 'Cafe'
            ? 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
      distanceMiles: 0.4,
      tags: tagsArray,
      co2PreventedKg: 2.8,
      waterSavedLitres: 350,
      isVeg: true,
      endsInMinutes: 240
    });

    // Reset Form
    setTitle('');
    setOriginalPrice('');
    setDiscountedPrice('');
    setQuantity('1');
    setTagsInput('');
    setIsAdding(false);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  const activeReservations = orders.filter(o => o.bag.storeId === 'store-green-grocers-402' || o.bag.storeId === 'store-wild-yeast');

  return (
    <div className="bg-[#fcfdf9] min-h-screen grid grid-cols-1 md:grid-cols-12 border-t border-[#e2e2da]">
      {/* Sidebar navigation column (md:span-3) - (Image 4 Left) */}
      <aside className="md:col-span-3 bg-[#fcfdf9] border-r border-[#e2e2da] p-6 flex flex-col justify-between text-left">
        <div className="space-y-8">
          {/* Header branding */}
          <div>
            <h2 className="text-xl font-black text-[#0e3e23] tracking-tight">ExpiryX Retail</h2>
            <span className="font-mono text-[9px] text-[#5c7a5a] uppercase font-bold tracking-widest block mt-0.5">
              Green Grocers #402, Connaught Place
            </span>
          </div>

          {/* Menu Items lists */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSubTab('Overview')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeSubTab === 'Overview'
                  ? 'bg-[#0e3e23] text-white'
                  : 'text-[#5c7a5a] hover:bg-[#f0f0e8] hover:text-[#0e3e23]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 cursor-pointer" />
              Overview
            </button>
            <button
              onClick={() => setActiveSubTab('Inventory')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeSubTab === 'Inventory'
                  ? 'bg-[#0e3e23] text-white'
                  : 'text-[#5c7a5a] hover:bg-[#f0f0e8] hover:text-[#0e3e23]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 cursor-pointer" />
              Active Inventory
            </button>
            <button
              onClick={() => setActiveSubTab('Analytics')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeSubTab === 'Analytics'
                  ? 'bg-[#0e3e23] text-white'
                  : 'text-[#5c7a5a] hover:bg-[#f0f0e8] hover:text-[#0e3e23]'
              }`}
            >
              <BarChart3 className="w-4 h-4 cursor-pointer" />
              Analytics metrics
            </button>
            <button
              onClick={() => setActiveSubTab('Predictions')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeSubTab === 'Predictions'
                  ? 'bg-[#0e3e23] text-white'
                  : 'text-[#5c7a5a] hover:bg-[#f0f0e8] hover:text-[#0e3e23]'
              }`}
            >
              <Binary className="w-4 h-4 cursor-pointer" />
              AI Expiry Predictions
            </button>
            <button
              onClick={() => setActiveSubTab('Settings')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeSubTab === 'Settings'
                  ? 'bg-[#0e3e23] text-white'
                  : 'text-[#5c7a5a] hover:bg-[#f0f0e8] hover:text-[#0e3e23]'
              }`}
            >
              <Settings className="w-4 h-4 cursor-pointer" />
              Store Settings
            </button>
          </nav>
        </div>

        {/* Profile Card details at bottom (Image 4 Left Footer) */}
        <div className="border-t border-[#e2e2da] pt-6 flex items-center gap-3 mt-10">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs text-orange-700 select-none">
            AS
          </div>
          <div>
            <span className="block text-xs font-bold text-[#0e3e23]">Alex Sterling</span>
            <span className="text-[10px] text-[#5c7a5a] font-medium font-sans">Store Manager</span>
          </div>
        </div>
      </aside>

      {/* Main dashboard content panel (md:span-9) */}
      <main className="md:col-span-9 p-8 space-y-8 text-left bg-[#fbfbf9]/50 overflow-y-auto">
        {/* Upper Title HUD Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e2e2da] pb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0e3e23] tracking-tight">Retailer Store Dashboard</h1>
            <span className="text-xs text-[#5c7a5a] font-semibold block mt-0.5">
              Live status audit overview &middot; Updated seconds ago
            </span>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-[#0e3e23] hover:bg-[#8ae922] hover:text-[#0e3e23] text-white font-bold text-xs px-4.5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4.5 h-4.5" />
              Publish Surplus Bag
            </button>
          </div>
        </div>

        {publishSuccess && (
          <div className="bg-[#8ae922]/15 text-[#0e3e23] p-4 rounded-xl border border-[#8ae922]/30 flex items-center gap-2 text-xs font-bold">
            <Check className="w-4 h-4 text-[#8ae922]" />
            Surplus Bag published successfully! It is now live on the Customer Discovery Map in real-time.
          </div>
        )}

        {/* Giant Metrics Row (Image 4 Metrics card parameters) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-3xl border border-[#e2e2da] relative overflow-hidden shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase font-extrabold text-[#5c7a5a] tracking-wider">Estimated Surplus Reduced</span>
              <span className="text-xs font-extrabold text-[#8ae922] bg-[#8ae922]/10 px-2 py-0.5 rounded-full">+14.2%</span>
            </div>
            <span className="block text-3xl font-black text-[#0e3e23] mt-3">1,240 kg</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-1.5">surplus inventory diverted this cycle</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl border border-[#e2e2da] relative overflow-hidden shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase font-extrabold text-[#5c7a5a] tracking-wider">Surplus Revenue Loss Recovered</span>
              <span className="text-xs font-extrabold text-[#0e3e23] bg-[#f0f0e8] px-2 py-0.5 rounded-full">+₹4,230</span>
            </div>
            <span className="block text-3xl font-black text-[#0e3e23] mt-3">₹12,850</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-1.5">redirected into cash flow ledger</span>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl border border-[#e2e2da] relative overflow-hidden shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase font-extrabold text-[#5c7a5a] tracking-wider">Promotion In-Store Footfall</span>
              <span className="text-xs font-extrabold text-[#8ae922] bg-[#8ae922]/10 px-2 py-0.5 rounded-full">+890 new</span>
            </div>
            <span className="block text-3xl font-black text-[#0e3e23] mt-3">22% 🡱</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-1.5">associated back to ExpiryX listings</span>
          </div>
        </div>

        {/* Grid Area: Graph + Sidebar info details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chart column (lg:span-8) - (Image 4 AI Prediction details) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-[32px] border border-[#e2e2da] shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-base text-[#0e3e23]">AI Expiry Prediction Model vs Actions</h3>
                <span className="text-[10px] text-[#5c7a5a] block">Surplus quantities vs volume recovered through ExpiryX</span>
              </div>
              <span className="bg-[#f0f0e8] text-[#0e3e23] text-[10px] font-bold px-3 py-1 rounded-full uppercase cursor-pointer hover:bg-[#e2e2da]">
                Last 7 Days
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={predictionData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 'bold', fill: '#5c7a5a' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#5c7a5a' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', background: '#0e3e23', color: 'white', fontSize: '10px', border: 'none' }}
                    labelStyle={{ fontWeight: 'bold', color: '#a2ee34' }}
                  />
                  <ReferenceLine y={150} label={{ value: 'Risk Cap', fill: 'red', fontSize: 8, position: 'top' }} stroke="red" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="surplus" fill="#8ae922" stroke="#8ae922" fillOpacity={0.15} strokeWidth={2} name="Total Surplus" />
                  <Bar dataKey="recovered" fill="#0e3e23" radius={[5, 10, 0, 0]} name="Recovered Volume" barSize={18} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Environmental carbon badge (lg:span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0e3e23] text-white p-6 rounded-[32px] overflow-hidden text-left shadow-sm">
              <Globe className="w-10 h-10 text-[#8ae922] mb-4" />
              <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#8ae922] mb-1">CO₂ Footprint reduction</h3>
              <span className="text-3xl font-black text-white block">2.4 tons</span>
              <p className="text-xs text-[#a4ceb3] leading-relaxed mt-2.5">
                Surplus assets diverted this month equal 120 seedlings planted in carbon capture offsets. You rank in the top 5% of regional grocers!
              </p>

              {/* Progress limit */}
              <div className="mt-5 pt-3 border-t border-[#1b5e3a]">
                <div className="flex justify-between text-[10px] font-bold text-[#a4ceb3]/80 mb-1.5">
                  <span>Gold Certification Goal</span>
                  <span>75% achieved</span>
                </div>
                <div className="h-2 w-full bg-[#1b5e3a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8ae922] rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Order Verification Table block */}
        <div className="bg-white p-6 rounded-[32px] border border-[#e2e2da] shadow-xs text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#e2e2da] mb-6">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500 animate-bounce" />
              <h3 className="font-bold text-base text-[#0e3e23]">Live Customer Claim Reservations ({activeReservations.length})</h3>
            </div>
            <span className="font-mono text-[9px] text-[#5c7a5a] uppercase font-bold tracking-widest bg-[#f0f0e8] px-2.5 py-1 rounded">
              SYNC STATUS: GREEN
            </span>
          </div>

          {activeReservations.length === 0 ? (
            <div className="p-8 text-center bg-gray-50/50 rounded-2xl border border-[#e2e2da]/45 text-slate-400">
              <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#5c7a5a]">No reservations due for pickup yet.</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Purchases checked out on the customer interface appear here instantly.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#0e3e23]">
                <thead>
                  <tr className="border-b border-[#e2e2da] text-[#5c7a5a] font-extrabold uppercase text-[10px] tracking-wider pb-2">
                    <th className="py-3 px-4">Order ID &amp; Time</th>
                    <th className="py-3 px-4">Target Item Details</th>
                    <th className="py-3 px-4">Claim Code</th>
                    <th className="py-3 px-4">Claim Qty / Cash</th>
                    <th className="py-3 px-4">Order Progress</th>
                    <th className="py-3 px-4 text-right">Progress Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e2da]/65">
                  {activeReservations.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 font-bold">
                        <span className="block text-[#0e3e23]">#{ord.id}</span>
                        <span className="text-[9px] text-gray-400 font-medium">{ord.timestamp}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="block font-bold">{ord.bag.title}</span>
                        <span className="text-[9px] text-[#5c7a5a]">{ord.bag.category}</span>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold tracking-wide text-red-500">
                        {ord.pickupCode}
                      </td>
                      <td className="py-4 px-4">
                        <span className="block font-bold">{ord.quantity} bags</span>
                        <span className="text-10px font-semibold text-[#5c7a5a]">₹{ord.totalCost.toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-4">
                        {ord.status === 'Pending' && (
                          <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                            Pending
                          </span>
                        )}
                        {ord.status === 'Confirmed' && (
                          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                            Confirmed
                          </span>
                        )}
                        {ord.status === 'Ready for Pickup' && (
                          <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase animate-pulse">
                            Ready / Due
                          </span>
                        )}
                        {ord.status === 'Completed' && (
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                            Claimed ✓
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right space-x-1">
                        {ord.status === 'Confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Ready for Pickup')}
                            className="bg-[#0e3e23] hover:bg-[#8ae922] hover:text-[#0e3e23] text-[10px] font-bold py-1.5 px-3 rounded-full text-white transition-colors cursor-pointer"
                          >
                            Mark Ready
                          </button>
                        )}
                        {ord.status === 'Ready for Pickup' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Completed')}
                            className="bg-green-600 hover:bg-[#8ae922] hover:text-[#0e3e23] text-[10px] font-bold py-1.5 px-3 rounded-full text-white transition-colors cursor-pointer"
                          >
                            Claim Bagged!
                          </button>
                        )}
                        {ord.status === 'Completed' && (
                          <span className="text-[10px] font-black text-green-600 uppercase">Processed</span>
                        )}
                        {ord.status === 'Pending' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Confirmed')}
                            className="bg-blue-500 hover:bg-blue-600 text-[10px] font-bold py-1.5 px-3 rounded-full text-white transition-colors cursor-pointer"
                          >
                            Confirm Order
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* MOCK PUBLISH MODAL FORM */}
        {isAdding && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#fcfdf9] p-8 rounded-[36px] border border-[#e2e2da] shadow-2xl max-w-md w-full text-left relative max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-black text-[#0e3e23] mb-1">Create Surplus Surprise Bag</h2>
              <p className="text-[11px] text-[#5c7a5a] mb-6">Items instantly list publicly on the map for local users.</p>

              <form onSubmit={handleAddItemSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Surplus Package Item Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pastries & Croissants Box"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#f0f0e8] border border-[#e2e2da] rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-[#8ae922]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as SurpriseBag['category'])}
                      className="w-full bg-[#f0f0e8] border border-[#e2e2da] rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-[#8ae922]"
                    >
                      <option value="Bakery">Bakery Box</option>
                      <option value="Grocery">Grocery Saver</option>
                      <option value="Dairy">Dairy Selection</option>
                      <option value="Cafe">Cafe Meals</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Pickup Windows time</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 20:30 - 21:00"
                      value={pickupTimeRange}
                      onChange={(e) => setPickupTimeRange(e.target.value)}
                      className="w-full bg-[#f0f0e8] border border-[#e2e2da] rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-[#8ae922]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Retail Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="50.01"
                      required
                      placeholder="350.00"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full bg-[#f0f0e8] border border-[#e2e2da] rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-[#8ae922]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Rescued Price</label>
                    <input
                      type="number"
                      step="0.01"
                      min="50.01"
                      required
                      placeholder="120.00"
                      value={discountedPrice}
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                      className="w-full bg-[#f0f0e8] border border-[#e2e2da] rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-[#8ae922]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Bags Qty</label>
                    <input
                      type="number"
                      required
                      placeholder="3"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full bg-[#f0f0e8] border border-[#e2e2da] rounded-xl p-3 text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Sourdough, Donuts, Sweet"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full bg-[#f0f0e8] border border-[#e2e2da] rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-[#8ae922]"
                  />
                </div>

                {priceError && (
                  <div className="bg-red-50 text-red-600 border border-red-200 text-[11px] p-3 rounded-xl font-medium leading-relaxed">
                    ⚠️ {priceError}
                  </div>
                )}

                <div className="flex gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold text-xs py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#0e3e23] hover:bg-[#8ae922] hover:text-[#0e3e23] text-white font-bold text-xs py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Publish Surpluses
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
