type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CNY'
  | 'INR'
  | 'IDR';

export interface CurrencyFormatOptions {
  locale?: string;
  currency?: CurrencyCode;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
}
