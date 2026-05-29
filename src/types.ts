/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SurpriseBag {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  quantityLeft: number;
  category: 'Bakery' | 'Grocery' | 'Cafe' | 'Dairy' | 'Veg Only';
  storeName: string;
  storeId: string;
  pickupTimeRange: string;
  image: string;
  distanceMiles: number;
  tags: string[];
  co2PreventedKg: number;
  waterSavedLitres: number;
  isVeg: boolean;
  endsInMinutes: number;
}

export interface Order {
  id: string;
  bag: SurpriseBag;
  quantity: number;
  totalCost: number;
  status: 'Pending' | 'Confirmed' | 'Ready for Pickup' | 'Completed';
  pickupCode: string;
  pickupTime: string;
  qrData: string;
  timestamp: string;
}

export interface SubscriptionContract {
  id: string;
  name: string;
  cost: number;
  billingCycle: 'Monthly' | 'Yearly';
  nextRenewalDate: string;
  category: 'Entertainment' | 'SaaS' | 'Utilities' | 'Cloud' | 'Work';
  status: 'Perfect' | 'Warning' | 'Critical'; // status of alert trigger close to renewal
  autoRenew: boolean;
  alertDaysBefore: number;
}

export interface RetailerStats {
  wasteReducedKg: number;
  lossRecoveredAmount: number;
  footfallIncreasePercent: number;
}
