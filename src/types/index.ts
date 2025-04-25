import { platformsConfig } from '@/config/japConfig';

export type PlatformKey = keyof typeof platformsConfig;

export interface ServiceDetails {
  platform: PlatformKey;
  service: string;
  quantity: number;
  totalPrice: number;
  orderId?: string;
  extras: {
    premiumGuarantee: boolean;
  };
  accountInfo: {
    type: string;
    value: string;
  };
  email: string;
  paymentMethod: string;
}

export type ServiceType = {
  id: string;
  name: string;
  minQuantity: number;
  maxQuantity: number;
  japServiceId: string;
  priceRanges?: Array<{min: number, max: number, pricePerUnit: number}>;
  pricePerUnit?: number;
  extraOptions?: {
    premiumGuarantee?: {
      additionalPrice: number;
    };
  };
  inputType: string;
}; 