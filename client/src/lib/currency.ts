// Define currency types
export type CurrencyCode = 'SEK' | 'NOK' | 'DKK' | 'EUR' | 'USD';

// Exchange rates (relative to SEK as base)
const exchangeRates: Record<CurrencyCode, number> = {
  SEK: 1.0,    // Base
  NOK: 1.05,   // 1 SEK ≈ 1.05 NOK
  DKK: 0.70,   // 1 SEK ≈ 0.70 DKK
  EUR: 0.085,  // 1 SEK ≈ 0.085 EUR 
  USD: 0.092,  // 1 SEK ≈ 0.092 USD
};

// Currency symbols
export const currencySymbols: Record<CurrencyCode, string> = {
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  EUR: '€',
  USD: '$',
};

/**
 * Converts amount from SEK to the target currency
 */
export const convertCurrency = (amount: number, currency: CurrencyCode): number => {
  if (currency === 'SEK') return amount;
  return amount * exchangeRates[currency];
};

/**
 * Formats a currency amount according to the selected currency
 */
export const formatCurrency = (amount: number, currency: CurrencyCode): string => {
  const convertedAmount = convertCurrency(amount, currency);
  
  // Format with appropriate decimal places and thousands separators
  const formattedAmount = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  }).format(Math.round(convertedAmount));
  
  // Different placement of currency symbol based on currency
  if (currency === 'USD') {
    return `${currencySymbols[currency]}${formattedAmount}`;
  } else if (currency === 'EUR') {
    return `${formattedAmount} ${currencySymbols[currency]}`;
  } else {
    // Nordic currencies (SEK, NOK, DKK)
    return `${formattedAmount} ${currencySymbols[currency]}`;
  }
};