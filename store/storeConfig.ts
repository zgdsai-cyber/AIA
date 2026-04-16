import { create } from 'zustand';

export interface StoreConfig {
  // Basic Info
  storeName: string;
  storeType: string;
  targetAudience: string;
  language: 'ar' | 'en';
  targetRegion: string;
  currency: string;
  
  // Branding
  desireStyle: string;
  colorPalette: string;
  preferredColors: string[];
  
  // Features
  designType: string;
  hasApp: boolean;
  numberOfCategories: number;
  hasSeasonalOffers: boolean;
  
  // Payment & Shipping
  paymentMethods: string[];
  shippingMethods: string[];
  
  // Store Details
  logo?: string;
  tagline: string;
  description: string;
}

interface StoreStore {
  config: Partial<StoreConfig>;
  updateConfig: (config: Partial<StoreConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: Partial<StoreConfig> = {
  storeName: '',
  storeType: 'multistore',
  targetAudience: 'general',
  language: 'ar',
  targetRegion: 'saudi',
  currency: 'SAR',
  desireStyle: 'modern',
  colorPalette: 'luxury',
  preferredColors: ['#1a1a1a', '#d4af37'],
  designType: 'professional',
  hasApp: false,
  numberOfCategories: 6,
  hasSeasonalOffers: true,
  paymentMethods: ['creditcard', 'cod'],
  shippingMethods: ['standard', 'express'],
  tagline: '',
  description: '',
};

export const useStoreConfig = create<StoreStore>((set) => ({
  config: defaultConfig,
  updateConfig: (newConfig) =>
    set((state) => ({
      config: { ...state.config, ...newConfig },
    })),
  resetConfig: () => set({ config: defaultConfig }),
}));
