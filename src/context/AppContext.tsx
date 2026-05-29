/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SurpriseBag, Order, SubscriptionContract } from '../types';

interface AppContextProps {
  mode: 'surprise_bags' | 'subscriptions';
  setMode: (mode: 'surprise_bags' | 'subscriptions') => void;
  tab: 'landing' | 'discover' | 'impact' | 'retailer' | 'how_it_works' | 'how_it_works_how' | 'for_businesses';
  setTab: (tab: 'landing' | 'discover' | 'impact' | 'retailer' | 'how_it_works' | 'how_it_works_how' | 'for_businesses') => void;
  
  // Surprise Bag states
  bags: SurpriseBag[];
  setBags: React.Dispatch<React.SetStateAction<SurpriseBag[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  activeCartItem: SurpriseBag | null;
  setActiveCartItem: (bag: SurpriseBag | null) => void;
  addSurpriseBag: (bag: Omit<SurpriseBag, 'id'>) => void;
  createOrder: (bagId: string, quantity: number) => Order | null;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Subscription states
  subscriptions: SubscriptionContract[];
  setSubscriptions: React.Dispatch<React.SetStateAction<SubscriptionContract[]>>;
  addSubscription: (sub: Omit<SubscriptionContract, 'id' | 'status'>) => void;
  deleteSubscription: (subId: string) => void;
  toggleSubscriptionAutoRenew: (subId: string) => void;

  // User Achievements Stats
  userStats: {
    xp: number;
    ecoLevel: number;
    co2SavedKg: number;
    waterSavedL: number;
    moneySaved: number;
    streakDays: number;
  };
  incrementUserStats: (co2: number, water: number, savings: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const initialBags: SurpriseBag[] = [
  {
    id: 'bag-1',
    title: 'Mystery Bakery Box',
    originalPrice: 350.00,
    discountedPrice: 120.00,
    quantityLeft: 4,
    category: 'Bakery',
    storeName: 'Wild Yeast Artisan Bakery, Laxmi Nagar',
    storeId: 'store-wild-yeast',
    pickupTimeRange: '18:00 - 19:30',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    distanceMiles: 0.7,
    tags: ['Bread', 'Pastries', 'Sourdough'],
    co2PreventedKg: 2.4,
    waterSavedLitres: 200,
    isVeg: true,
    endsInMinutes: 28
  },
  {
    id: 'bag-2',
    title: 'Dairy Surprise Bag',
    originalPrice: 380.00,
    discountedPrice: 140.00,
    quantityLeft: 1,
    category: 'Dairy',
    storeName: 'Green Roots Market, Green Park',
    storeId: 'store-green-roots',
    pickupTimeRange: '20:30 - 21:00',
    image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=600&auto=format&fit=crop&q=80',
    distanceMiles: 1.2,
    tags: ['Organic Milk', 'Gourmet Cheese', 'Butter'],
    co2PreventedKg: 3.1,
    waterSavedLitres: 400,
    isVeg: true,
    endsInMinutes: 45
  },
  {
    id: 'bag-3',
    title: 'Cafe Evening Combo',
    originalPrice: 290.00,
    discountedPrice: 99.00,
    quantityLeft: 0, // Mocking a Sold Out bag
    category: 'Cafe',
    storeName: 'Ether Coffee Co., Hauz Khas',
    storeId: 'store-ether',
    pickupTimeRange: '17:00 - 20:00',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
    distanceMiles: 2.4,
    tags: ['Sandwiches', 'Fresh Salads', 'Cold Brew'],
    co2PreventedKg: 1.8,
    waterSavedLitres: 150,
    isVeg: false,
    endsInMinutes: 39
  },
  {
    id: 'bag-4',
    title: 'Grocery Saver Pack',
    originalPrice: 390.00,
    discountedPrice: 150.00,
    quantityLeft: 3,
    category: 'Grocery',
    storeName: 'Green Grocers #402, Connaught Place',
    storeId: 'store-green-grocers-402',
    pickupTimeRange: '20:30 - 21:00',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    distanceMiles: 0.4,
    tags: ['Fresh Vegetables', 'Ripened Fruits', 'Organic Eggs'],
    co2PreventedKg: 2.8,
    waterSavedLitres: 350,
    isVeg: true,
    endsInMinutes: 240
  }
];

const initialSubscriptions: SubscriptionContract[] = [
  {
    id: 'sub-1',
    name: 'Netflix Premium Suite',
    cost: 22.99,
    billingCycle: 'Monthly',
    nextRenewalDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
    category: 'Entertainment',
    status: 'Critical',
    autoRenew: true,
    alertDaysBefore: 5
  },
  {
    id: 'sub-2',
    name: 'AWS Elastic Cloud Node',
    cost: 145.00,
    billingCycle: 'Monthly',
    nextRenewalDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days from now
    category: 'Cloud',
    status: 'Warning',
    autoRenew: true,
    alertDaysBefore: 7
  },
  {
    id: 'sub-3',
    name: 'GitHub Copilot Enterprise',
    cost: 19.00,
    billingCycle: 'Monthly',
    nextRenewalDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    category: 'SaaS',
    status: 'Critical',
    autoRenew: true,
    alertDaysBefore: 3
  },
  {
    id: 'sub-4',
    name: 'Framer Pro Custom Design',
    cost: 20.00,
    billingCycle: 'Monthly',
    nextRenewalDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 18 days from now
    category: 'SaaS',
    status: 'Perfect',
    autoRenew: false,
    alertDaysBefore: 3
  },
  {
    id: 'sub-5',
    name: 'Office 365 Shared Plan',
    cost: 99.99,
    billingCycle: 'Yearly',
    nextRenewalDate: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 85 days out
    category: 'Work',
    status: 'Perfect',
    autoRenew: true,
    alertDaysBefore: 15
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'surprise_bags' | 'subscriptions'>('surprise_bags');
  const [tab, setTab] = useState<'landing' | 'discover' | 'impact' | 'retailer' | 'how_it_works' | 'how_it_works_how' | 'for_businesses'>('landing');

  // Load state from LocalStorage or Fallback
  const [bags, setBags] = useState<SurpriseBag[]>(() => {
    const local = localStorage.getItem('expiryx_bags');
    return local ? JSON.parse(local) : initialBags;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const local = localStorage.getItem('expiryx_orders');
    return local ? JSON.parse(local) : [];
  });

  const [subscriptions, setSubscriptions] = useState<SubscriptionContract[]>(() => {
    const local = localStorage.getItem('expiryx_subs');
    return local ? JSON.parse(local) : initialSubscriptions;
  });

  const [activeCartItem, setActiveCartItem] = useState<SurpriseBag | null>(null);

  const [userStats, setUserStats] = useState(() => {
    const local = localStorage.getItem('expiryx_user_stats');
    return local ? JSON.parse(local) : {
      xp: 4250,
      ecoLevel: 14,
      co2SavedKg: 42.5,
      waterSavedL: 1240,
      moneySaved: 184.20,
      streakDays: 7
    };
  });

  // Sync to Local Storage
  useEffect(() => {
    localStorage.setItem('expiryx_bags', JSON.stringify(bags));
  }, [bags]);

  useEffect(() => {
    localStorage.setItem('expiryx_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('expiryx_subs', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('expiryx_user_stats', JSON.stringify(userStats));
  }, [userStats]);

  // Recalculate subscription statuses dynamically on init and update
  const calculateSubStatus = (renewalDateStr: string, alertDays: number): 'Perfect' | 'Warning' | 'Critical' => {
    const renewalDate = new Date(renewalDateStr);
    const today = new Date();
    today.setHours(0,0,0,0);
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 2) return 'Critical';
    if (diffDays <= alertDays) return 'Warning';
    return 'Perfect';
  };

  useEffect(() => {
    // Audit active subscriptions on load to ensure statuses are accurate
    const updated = subscriptions.map(sub => {
      const calculated = calculateSubStatus(sub.nextRenewalDate, sub.alertDaysBefore);
      if (calculated !== sub.status) {
        return { ...sub, status: calculated };
      }
      return sub;
    });
    // Deep equality shortcut
    if (JSON.stringify(updated) !== JSON.stringify(subscriptions)) {
      setSubscriptions(updated);
    }
  }, [subscriptions]);

  const addSurpriseBag = (bagData: Omit<SurpriseBag, 'id'>) => {
    const newBag: SurpriseBag = {
      ...bagData,
      id: `bag-${Date.now()}`
    };
    setBags(prev => [newBag, ...prev]);
  };

  const createOrder = (bagId: string, quantity: number): Order | null => {
    const bagInstance = bags.find(b => b.id === bagId);
    if (!bagInstance || bagInstance.quantityLeft < quantity) return null;

    // Deduct stock in our reactive listings
    setBags(prev => prev.map(b => {
      if (b.id === bagId) {
        return { ...b, quantityLeft: b.quantityLeft - quantity };
      }
      return b;
    }));

    const totalCost = Number((bagInstance.discountedPrice * quantity).toFixed(2));
    const orderId = `EXP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: orderId,
      bag: { ...bagInstance, quantityLeft: bagInstance.quantityLeft - quantity },
      quantity,
      totalCost,
      status: 'Pending',
      pickupCode: `${Math.floor(1000 + Math.random() * 9000)} - CONF`,
      pickupTime: bagInstance.pickupTimeRange,
      qrData: `https://expiryx.com/verify-pickup/${orderId}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        // If order was marked completed, we count metrics towards user achievements!
        if (status === 'Completed' && o.status !== 'Completed') {
          // Increment user metrics
          const bagCo2 = o.bag.co2PreventedKg * o.quantity;
          const bagWater = o.bag.waterSavedLitres * o.quantity;
          const savings = (o.bag.originalPrice - o.bag.discountedPrice) * o.quantity;
          incrementUserStats(bagCo2, bagWater, savings);
        }
        return { ...o, status };
      }
      return o;
    }));
  };

  const addSubscription = (subData: Omit<SubscriptionContract, 'id' | 'status'>) => {
    const status = calculateSubStatus(subData.nextRenewalDate, subData.alertDaysBefore);
    const newSub: SubscriptionContract = {
      ...subData,
      id: `sub-${Date.now()}`,
      status
    };
    setSubscriptions(prev => [newSub, ...prev]);
  };

  const deleteSubscription = (subId: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== subId));
  };

  const toggleSubscriptionAutoRenew = (subId: string) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === subId) {
        return { ...s, autoRenew: !s.autoRenew };
      }
      return s;
    }));
  };

  const incrementUserStats = (co2: number, water: number, savings: number) => {
    setUserStats(prev => {
      const addedXp = Math.floor(co2 * 10) + Math.floor(savings * 5);
      const totalXp = prev.xp + addedXp;
      // level up every 2000 XP
      const currentLevel = Math.floor(totalXp / 2000) + 12; // starts at level 12-14

      return {
        xp: totalXp,
        ecoLevel: currentLevel > prev.ecoLevel ? currentLevel : prev.ecoLevel,
        co2SavedKg: Number((prev.co2SavedKg + co2).toFixed(1)),
        waterSavedL: prev.waterSavedL + water,
        moneySaved: Number((prev.moneySaved + savings).toFixed(2)),
        streakDays: prev.streakDays + 1
      };
    });
  };

  return (
    <AppContext.Provider value={{
      mode,
      setMode,
      tab,
      setTab,
      bags,
      setBags,
      orders,
      setOrders,
      activeCartItem,
      setActiveCartItem,
      addSurpriseBag,
      createOrder,
      updateOrderStatus,
      subscriptions,
      setSubscriptions,
      addSubscription,
      deleteSubscription,
      toggleSubscriptionAutoRenew,
      userStats,
      incrementUserStats
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};
