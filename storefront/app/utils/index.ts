import { FormatInput } from 'swell-js';

export function formatCurrency(swell: any, price: any, options?: FormatInput) {
  return swell.currency.format(price as number, options as FormatInput);
}

export function formatDateShort(date: string) {
  const options = { day: 'numeric' as const, month: 'short' as const };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

export function stringifyQuery(queryObject: any, prefix?: string): string {
  const result = [];

  for (const [key, value] of Object.entries(queryObject)) {
    const prefixKey = prefix ? `${prefix}[${key}]` : key;
    const isObject = value !== null && typeof value === 'object';
    const encodedResult = isObject
      ? stringifyQuery(value, prefixKey)
      : `${encodeURIComponent(prefixKey)}=${encodeURIComponent(value as string)}`;

    result.push(encodedResult);
  }

  return result.join('&');
}
