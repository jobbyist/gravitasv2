/**
 * Currency converter utility
 * Exchange rates are approximate and should be updated regularly
 */

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'ZAR';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

// Exchange rates relative to USD (base currency)
// Rates as of March 2026 - Update regularly for accuracy
const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1.0,      // Base currency
  EUR: 0.92,     // Euro
  GBP: 0.79,     // British Pound
  CAD: 1.36,     // Canadian Dollar
  ZAR: 18.50,    // South African Rand
};

export const CURRENCY_INFO: Record<Currency, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
};

/**
 * Convert USD amount to target currency
 */
export function convertCurrency(amountUSD: number, targetCurrency: Currency): number {
  const rate = EXCHANGE_RATES[targetCurrency];
  return amountUSD * rate;
}

/**
 * Format currency amount with appropriate symbol and formatting
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const info = CURRENCY_INFO[currency];
  const convertedAmount = convertCurrency(amount, currency);
  
  // Round to 2 decimal places for most currencies
  // Round to nearest integer for ZAR (Rand typically doesn't use decimals in pricing)
  const roundedAmount = currency === 'ZAR' 
    ? Math.round(convertedAmount)
    : Math.round(convertedAmount * 100) / 100;
  
  // Format with appropriate locale
  const locale = currency === 'EUR' ? 'de-DE' : 
                 currency === 'GBP' ? 'en-GB' :
                 currency === 'ZAR' ? 'en-ZA' :
                 'en-US';
  
  const formattedNumber = roundedAmount.toLocaleString(locale, {
    minimumFractionDigits: currency === 'ZAR' ? 0 : 2,
    maximumFractionDigits: currency === 'ZAR' ? 0 : 2,
  });
  
  return `${info.symbol}${formattedNumber}`;
}

/**
 * Get all available currencies
 */
export function getAvailableCurrencies(): CurrencyInfo[] {
  return Object.values(CURRENCY_INFO);
}

/**
 * Get exchange rate for a currency
 */
export function getExchangeRate(currency: Currency): number {
  return EXCHANGE_RATES[currency];
}
