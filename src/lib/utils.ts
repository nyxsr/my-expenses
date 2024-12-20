import { CurrencyFormatOptions } from '@/types/currency-formatter';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges and deduplicates Tailwind CSS classes using clsx and tailwind-merge.
 * @param inputs - Class name inputs to be processed
 * @returns A merged and deduplicated string of class names
 *
 * @example
 * cn('text-red-500', 'bg-blue-500') // returns "text-red-500 bg-blue-500"
 * cn('p-4 p-8') // returns "p-8"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates initials from a given name based on specific requirements.
 * @param name - The full name to generate initials from
 * @returns A string containing the initials
 *
 * @example
 * getNameInitials("John Doe") // returns "JD"
 * getNameInitials("Derek") // returns "D"
 * getNameInitials("Big Homie Gun Garcia") // returns "BH"
 * getNameInitials("") // returns "NN"
 */
export const getNameInitials = (name: string): string => {
  // Return "NN" if name is empty or only contains whitespace
  if (!name?.trim()) {
    return 'NN';
  }

  const nameParts = name.split(' ').filter((part) => part.length > 0);

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }

  return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
};

/**
 * Formats a numeric amount into a currency string based on the provided options.
 *
 * @param {number} amount - The numeric amount to be formatted as currency.
 * @param {CurrencyFormatOptions} [options] - An object containing formatting options.
 * @param {string} [options.locale='id-ID'] - The locale to use for formatting (default: 'id-ID').
 * @param {string} [options.currency='IDR'] - The currency code (e.g., 'USD', 'EUR', 'IDR').
 * @param {number} [options.minimumFractionDigits=2] - The minimum number of fraction digits to use (default: 2).
 * @param {number} [options.maximumFractionDigits=2] - The maximum number of fraction digits to use (default: 2).
 * @param {boolean} [options.useGrouping=true] - Whether to use grouping separators (default: true).
 * @param {string} [options.currencyDisplay='symbol'] - How to display the currency ('symbol', 'narrowSymbol', 'code', or 'name') (default: 'symbol').
 * @returns {string} The formatted currency string.
 *
 * @example
 * // Returns: "Rp 1,234.56"
 * formatCurrency(1234.56, { currency: 'IDR' });
 *
 * @example
 * // Returns: "$ 1,234.56"
 * formatCurrency(1234.56, { currency: 'USD', locale: 'en-US' });
 */
export function formatCurrency(
  amount: number,
  options?: CurrencyFormatOptions
): string {
  const defaultOptions: CurrencyFormatOptions = {
    locale: 'id-ID',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
    currencyDisplay: 'symbol',
  };

  const finalOptions = { ...defaultOptions, ...options };

  const formatter = new Intl.NumberFormat(finalOptions.locale, {
    style: 'currency',
    currency: finalOptions.currency,
    minimumFractionDigits: finalOptions.minimumFractionDigits,
    maximumFractionDigits: finalOptions.maximumFractionDigits,
    useGrouping: finalOptions.useGrouping,
    currencyDisplay: finalOptions.currencyDisplay,
  });

  return formatter.format(amount);
}

/**
 * Formats a number into Indonesian Rupiah (IDR) representation with abbreviated suffixes for large numbers.
 *
 * @param {number} number - The number to format into Rupiah
 * @returns {string} The formatted Rupiah string
 *
 * @example
 * // Returns: "Rp1.000"
 * formatToRupiah(1000)
 *
 * @example
 * // Returns: "Rp1.5jt" (jt = juta/million)
 * formatToRupiah(1500000)
 *
 * @example
 * // Returns: "Rp1.5mil" (mil = miliar/billion)
 * formatToRupiah(1500000000)
 *
 * @example
 * // Returns: "Rp1.5tril" (tril = triliun/trillion)
 * formatToRupiah(1500000000000)
 */
export const formatToRupiah = (number: number): string => {
  // Check if input is a number
  if (typeof number !== 'number') {
    return 'Invalid input';
  }

  // Handle numbers less than 100000
  if (number < 100000) {
    return `Rp${number.toLocaleString('id-ID')}`;
  }

  // Constants for conversion
  const trillion = 1000000000000;
  const billion = 1000000000;
  const million = 1000000;

  // Format function with decimal places
  const formatDecimal = (value: number): string => {
    return Number(value.toFixed(1)).toString();
  };

  // Handle trillions
  if (number >= trillion) {
    const value = number / trillion;
    return `Rp${formatDecimal(value)}tril`;
  }

  // Handle billions
  if (number >= billion) {
    const value = number / billion;
    return `Rp${formatDecimal(value)}mil`;
  }

  // Handle millions
  if (number >= million) {
    const value = number / million;
    return `Rp${formatDecimal(value)}jt`;
  }

  // Fallback for other cases
  return `Rp${number.toLocaleString('id-ID')}`;
};
