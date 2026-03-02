/**
 * Pure functions for pricing calculations
 */

import { pricingConfig, UpsellOption } from './pricingConfig';

export interface SelectedUpsell {
  id: string;
  price: number;
  name: string;
  value?: string; // For select-type upsells
}

export interface PricingBreakdown {
  basePrice: number;
  upsells: SelectedUpsell[];
  maintenanceEnabled: boolean;
  totalOnceOff: number;
  totalMonthly: number;
  savings: number;
}

/**
 * Calculate the total price based on selected upsells and maintenance
 */
export function calculateTotal(
  selectedUpsells: Map<string, string | boolean>,
  maintenanceEnabled: boolean
): PricingBreakdown {
  const breakdown: PricingBreakdown = {
    basePrice: pricingConfig.baseWebsiteBuild,
    upsells: [],
    maintenanceEnabled,
    totalOnceOff: pricingConfig.baseWebsiteBuild,
    totalMonthly: maintenanceEnabled ? pricingConfig.maintenanceMonthly : 0,
    savings: pricingConfig.originalPrice - pricingConfig.baseWebsiteBuild,
  };

  // Calculate upsells
  pricingConfig.upsells.forEach((upsell) => {
    const selection = selectedUpsells.get(upsell.id);
    
    if (!selection) return;

    if (upsell.type === 'checkbox' && selection === true) {
      breakdown.upsells.push({
        id: upsell.id,
        name: upsell.name,
        price: upsell.price,
      });
      breakdown.totalOnceOff += upsell.price;
    } else if (upsell.type === 'select' && selection && selection !== 'none' && selection !== '0') {
      const option = upsell.options?.find((opt) => opt.value === selection);
      if (option && option.price > 0) {
        breakdown.upsells.push({
          id: upsell.id,
          name: `${upsell.name} (${option.label})`,
          price: option.price,
          value: selection as string,
        });
        breakdown.totalOnceOff += option.price;
      }
    }
  });

  return breakdown;
}

/**
 * Format USD currency
 */
export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

/**
 * Parse URL query params for pricing state
 */
export function parsePricingFromURL(searchParams: URLSearchParams): {
  selectedUpsells: Map<string, string | boolean>;
  maintenanceEnabled: boolean;
} {
  const selectedUpsells = new Map<string, string | boolean>();
  const maintenanceEnabled = searchParams.get('maintenance') === 'true';

  pricingConfig.upsells.forEach((upsell) => {
    const value = searchParams.get(upsell.id);
    if (value) {
      if (upsell.type === 'checkbox') {
        selectedUpsells.set(upsell.id, value === 'true');
      } else if (upsell.type === 'select') {
        selectedUpsells.set(upsell.id, value);
      }
    }
  });

  return { selectedUpsells, maintenanceEnabled };
}

/**
 * Convert pricing state to URL query params
 */
export function pricingToURLParams(
  selectedUpsells: Map<string, string | boolean>,
  maintenanceEnabled: boolean
): URLSearchParams {
  const params = new URLSearchParams();
  
  if (maintenanceEnabled) {
    params.set('maintenance', 'true');
  }

  selectedUpsells.forEach((value, key) => {
    if (value === true) {
      params.set(key, 'true');
    } else if (typeof value === 'string' && value !== 'none' && value !== '0') {
      params.set(key, value);
    }
  });

  return params;
}

/**
 * Get discount percentage
 */
export function getDiscountPercentage(): number {
  const savings = pricingConfig.originalPrice - pricingConfig.baseWebsiteBuild;
  return Math.round((savings / pricingConfig.originalPrice) * 100);
}
