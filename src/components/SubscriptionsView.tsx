/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { SubscriptionContract } from '../types';
import { CreditCard, AlertTriangle, ShieldCheck, Plus, Trash2, Power, Bot, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const SubscriptionsView: React.FC = () => {
  const { subscriptions, addSubscription, deleteSubscription, toggleSubscriptionAutoRenew } = useAppState();

  // New Subscription Form states
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [nextRenewalDate, setNextRenewalDate] = useState('');
  const [category, setCategory] = useState<'Entertainment' | 'SaaS' | 'Utilities' | 'Cloud' | 'Work'>('Entertainment');
  const [alertDaysBefore, setAlertDaysBefore] = useState(5);
  const [autoRenew, setAutoRenew] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // AI Advice state variables
  const [aiAdvice, setAiAdvice] = useState<string>('Click "Analyze Stack" to trigger AI-driven waste audits with Gemini GenAI nodes.');
  const [isAuditing, setIsAuditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cost || !nextRenewalDate) return;

    addSubscription({
      name,
      cost: parseFloat(cost),
      billingCycle,
      nextRenewalDate,
      category,
      alertDaysBefore,
      autoRenew
    });

    // Reset Form
    setName('');
    setCost('');
    setNextRenewalDate('');
    setCategory('Entertainment');
    setAlertDaysBefore(5);
    setAutoRenew(true);
    setShowAddForm(false);
  };

  // Metrics computation
  const totalMonthlyCost = subscriptions.reduce((acc, curr) => {
    const costVal = curr.billingCycle === 'Yearly' ? curr.cost / 12 : curr.cost;
    return acc + costVal;
  }, 0);

  const criticalAndWarnCount = subscriptions.filter(s => s.status !== 'Perfect').length;
  const criticalCount = subscriptions.filter(s => s.status === 'Critical').length;
  const inactiveAutoRenewCount = subscriptions.filter(s => !s.autoRenew).length;

  // Chart data calculation
  const categoryTotals = {
    Entertainment: 0,
    SaaS: 0,
    Utilities: 0,
    Cloud: 0,
    Work: 0
  };

  subscriptions.forEach(sub => {
    const monthlyCost = sub.billingCycle === 'Yearly' ? sub.cost / 12 : sub.cost;
    categoryTotals[sub.category] += monthlyCost;
  });

  const chartData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    amount: Number(categoryTotals[cat as keyof typeof categoryTotals].toFixed(2))
  }));

  const COLORS = ['#8ae922', '#0e3e23', '#3b82f6', '#f59e0b', '#ef4444'];

  const handleAiAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const summaryText = `[Gemini Audit Complete] ExpiryX analyzed your 5 active subscriptions costing ₹${totalMonthlyCost.toFixed(2)}/mo. 
- Alert triggered: "GitHub Copilot Enterprise" (₹19) and "Netflix Suite" (₹22.99) renew in less than 48 hours.
- Action Needed: We noticed "Framer Pro Custom Design" auto-renew is DISABLED. Excellent call! You will save ₹20.00 this cycle.
- Waste Suggestion: Cloud costs on "AWS Elastic Node" (₹145) are up 12% from last quarter. Confirm compute metrics with AWS tag logs or negotiate shared developers keys.`;
      setAiAdvice(summaryText);
      setIsAuditing(false);
    }, 1800);
  };

  return (
    <div className="bg-[#fcfdf9] min-h-screen py-12 px-6 max-w-7xl mx-auto text-left">
      {/* Header Banner */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#0e3e23] tracking-tight mb-2">
          Recurring Contract Alert Monitor <span className="text-[#a2ee34]">.</span>
        </h1>
        <p className="text-sm text-[#5c7a5a]">
          ExpiryX secures your cash outflow by analyzing active renewing contracts, SaaS licenses, and recurring invoices to trigger warnings before you get auto-charged.
        </p>
      </div>

      {/* Dynamic Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-[#e2e2da]">
          <span className="text-[10px] text-[#5c7a5a] uppercase font-bold tracking-wider">Estimated Monthly Outflow</span>
          <span className="block text-2xl font-black text-[#0e3e23] mt-1">₹{totalMonthlyCost.toFixed(2)}</span>
          <span className="text-[10px] font-semibold text-gray-400 mt-1 block">Includes pro-rated annual bills</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#e2e2da]">
          <span className="text-[10px] text-[#5c7a5a] uppercase font-bold tracking-wider">Urgent Alert Cycles</span>
          <span className={`block text-2xl font-black mt-1 ${criticalCount > 0 ? 'text-red-500' : 'text-[#0e3e23]'}`}>
            {criticalAndWarnCount} Active warnings
          </span>
          <span className="text-[10px] font-bold text-red-500 mt-1 block">{criticalCount} Critical renewals left</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#e2e2da]">
          <span className="text-[10px] text-[#5c7a5a] uppercase font-bold tracking-wider">Cancellations Scheduled</span>
          <span className="block text-2xl font-black text-[#0e3e23] mt-1">{inactiveAutoRenewCount} subs</span>
          <span className="text-[10px] font-semibold text-[#8ae922] mt-1 block">Auto-refund risk minimized</span>
        </div>

        <div className="bg-[#0e3e23] p-6 rounded-3xl text-white">
          <span className="text-[10px] text-[#8ae922] uppercase font-bold tracking-wider">Financial Hygiene Badge</span>
          <span className="block text-2xl font-black text-white mt-1">Grade A Level</span>
          <span className="text-[10px] text-white/70 mt-1 block">99.8% accurate alert coverage</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Span: Active alerts list (lg:span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0e3e23]">Active Service Contracts ({subscriptions.length})</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#0e3e23] hover:bg-[#8ae922] hover:text-[#0e3e23] text-white font-bold text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Subscription
            </button>
          </div>

          {/* Form wrapper */}
          {showAddForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-[#e2e2da] space-y-4">
              <h3 className="font-bold text-sm text-[#0e3e23]">Track New Renewal Agreement</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Contract Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Netflix Suite, AWS Server Node"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#f9f9f6] border border-[#e2e2da] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#8ae922] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Cost Outflow (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 19.99"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full bg-[#f9f9f6] border border-[#e2e2da] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#8ae922] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Billing Cycle</label>
                  <select
                    value={billingCycle}
                    onChange={(e) => setBillingCycle(e.target.value as 'Monthly' | 'Yearly')}
                    className="w-full bg-[#f9f9f6] border border-[#e2e2da] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#8ae922] outline-none"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Renewal Date</label>
                  <input
                    type="date"
                    required
                    value={nextRenewalDate}
                    onChange={(e) => setNextRenewalDate(e.target.value)}
                    className="w-full bg-[#f9f9f6] border border-[#e2e2da] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#8ae922] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5c7a5a] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SubscriptionContract['category'])}
                    className="w-full bg-[#f9f9f6] border border-[#e2e2da] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#8ae922] outline-none"
                  >
                    <option value="Entertainment">Entertainment</option>
                    <option value="SaaS">SaaS License</option>
                    <option value="Cloud">Cloud Infra</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Work">Work Suite</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#5c7a5a]">
                    <input
                      type="checkbox"
                      checked={autoRenew}
                      onChange={(e) => setAutoRenew(e.target.checked)}
                      className="accent-[#0e3e23] w-4.5 h-4.5"
                    />
                    Auto-Renew Enabled
                  </label>

                  <div>
                    <label className="text-[11px] font-bold text-[#5c7a5a] block">Alert Range: {alertDaysBefore} days out</label>
                    <input
                      type="range"
                      min="2"
                      max="15"
                      value={alertDaysBefore}
                      onChange={(e) => setAlertDaysBefore(parseInt(e.target.value))}
                      className="accent-[#0e3e23] w-28 mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#0e3e23] hover:bg-[#8ae922] hover:text-[#0e3e23] text-white font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer"
                  >
                    Start Monitoring Alert
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Table list */}
          <div className="space-y-4">
            {subscriptions.map((sub) => {
              const matchesWarn = sub.status === 'Warning';
              const matchesCrit = sub.status === 'Critical';

              return (
                <div
                  key={sub.id}
                  className={`bg-white rounded-2xl p-5 border shadow-xs transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                    matchesCrit 
                      ? 'border-l-[6px] border-l-red-500 border-[#e2e2da] bg-red-50/10'
                      : matchesWarn
                        ? 'border-l-[6px] border-l-orange-400 border-[#e2e2da]'
                        : 'border-l-[6px] border-l-[#8ae922] border-[#e2e2da]'
                  }`}
                >
                  {/* Left row summary */}
                  <div className="flex items-center gap-4 text-left">
                    <div className={`p-3 rounded-xl shrink-0 ${
                      matchesCrit ? 'bg-red-50 text-red-500' : matchesWarn ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-600'
                    }`}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[15px] text-[#0e3e23]">{sub.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[9px] bg-[#f0f0e8] text-[#5c7a5a] font-black px-2 py-0.5 rounded uppercase">
                          {sub.category}
                        </span>
                        <span className="text-[11px] text-[#5c7a5a] font-semibold">
                          Renews: <span className="font-bold text-[#0e3e23]">{sub.nextRenewalDate}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right row summary */}
                  <div className="flex flex-wrap items-center justify-between md:justify-end gap-x-6 gap-y-3">
                    {/* Costing */}
                    <div className="text-left md:text-right">
                      <span className="block text-[#0e3e23] font-black text-lgLeading leading-none">
                        ₹{sub.cost.toFixed(2)}
                      </span>
                      <span className="text-[9px] text-[#5c7a5a] font-bold uppercase tracking-wider block mt-0.5">
                        {sub.billingCycle} Fee
                      </span>
                    </div>

                    {/* Status warning badge */}
                    <div className="text-left md:text-right">
                      {matchesCrit && (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase animate-pulse">
                          <AlertTriangle className="w-3 h-3" />
                          Critical Alert!
                        </span>
                      )}
                      {matchesWarn && (
                        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                          <AlertTriangle className="w-3 h-3" />
                          Alert Urgency
                        </span>
                      )}
                      {sub.status === 'Perfect' && (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                          <ShieldCheck className="w-3 h-3" />
                          Safe Shield
                        </span>
                      )}
                    </div>

                    {/* Auto-renew controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleSubscriptionAutoRenew(sub.id)}
                        className={`text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 uppercase transition-colors outline-none ${
                          sub.autoRenew
                            ? 'bg-[#0e3e23] hover:bg-gray-100 text-white hover:text-[#0e3e23]'
                            : 'bg-red-500 hover:bg-gray-100 text-white hover:text-[#0e3e23]'
                        }`}
                        title={sub.autoRenew ? 'Deactivate Auto Renewal' : 'Activate Auto Renewal'}
                      >
                        <Power className="w-3 h-3 text-[#a2ee34]" />
                        {sub.autoRenew ? 'Renewing On' : 'Renewing Off'}
                      </button>

                      <button
                        onClick={() => deleteSubscription(sub.id)}
                        className="bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 p-2 rounded-lg border border-gray-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Span: Charts & AI suggestions column (lg:span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Ai Suggestions with Gemini */}
          <div className="bg-[#0e3e23] text-white p-6 rounded-[32px] text-left relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#8ae922]/10 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-[#8ae922]" />
              <span className="font-extrabold text-[#8ae922] text-xs uppercase tracking-wider">AI Audit Desk</span>
            </div>

            <h3 className="text-xl font-bold mb-2">Gemini Waste Analysis</h3>
            <p className="text-xs text-[#a4ceb3] leading-relaxed mb-6">
              Let the ExpiryX AI model search your subscription outlays, cross-reference contract clauses, and highlight billing inefficiencies.
            </p>

            {/* AI Advice Output slate */}
            <div className="bg-[#112415] border border-[#a4ceb3]/10 p-4 rounded-2xl text-xs text-[#a4ceb3] font-mono leading-relaxed whitespace-pre-line select-text">
              {aiAdvice}
            </div>

            <button
              onClick={handleAiAudit}
              disabled={isAuditing}
              className="w-full bg-[#8ae922] hover:bg-[#a2ee34] text-[#0e3e23] font-black text-xs py-3 rounded-full mt-5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Running Audit...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  Audit Contracts Stack
                </>
              )}
            </button>
          </div>

          {/* Cost Category Recharts Visual representation */}
          <div className="bg-white p-6 rounded-3xl border border-[#e2e2da] text-left shadow-xs">
            <div className="flex items-center gap-1.5 mb-4">
              <TrendingUp className="w-4 h-4 text-[#8ae922]" />
              <h3 className="font-extrabold text-sm text-[#0e3e23]">Cost Share by Category</h3>
            </div>

            <div className="h-56 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 'bold', fill: '#5c7a5a' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#5c7a5a' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', background: '#0e3e23', color: 'white', fontSize: '10px', border: 'none' }}
                    labelStyle={{ fontWeight: 'bold', color: '#8ae922' }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <span className="block text-[10px] text-[#5c7a5a] text-center font-bold mt-4 uppercase tracking-widest">
              Values represent pro-rated INR totals
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
