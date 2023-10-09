import { FormatUtils } from '@ijstech/components';

export const formatNumber = (num: number, options?: { format?: string, decimals?: number, percentValues?: boolean }) => {
  if (num === null) return '-';
  const { decimals, format, percentValues } = options || {};
  if (percentValues) {
    return `${FormatUtils.formatNumber(num, { decimalFigures: 2 })}%`;
  }
  if (format) {
    return formatNumberByFormat(num, format);
  }
  const absNum = Math.abs(num);
  if (absNum >= 1000) {
    return FormatUtils.formatNumber(num, { decimalFigures: decimals, roundingMethod: 'round', shortScale: true });
  }
  if (absNum < 0.0000001) {
    return FormatUtils.formatNumber(num, { decimalFigures: 0 });
  }
  if (absNum < 0.00001) {
    return FormatUtils.formatNumber(num, { decimalFigures: 6 });
  }
  if (absNum < 1) {
    return FormatUtils.formatNumber(num, { decimalFigures: 4 });
  }
  return FormatUtils.formatNumber(num, { decimalFigures: 2 });
}

export const formatNumberByFormat = (num: number, format: string, separators?: boolean) => {
  if (!format) return FormatUtils.formatNumber(num, { decimalFigures: 0 });
  const decimalFigures = format.split('.')[1] ? format.split('.')[1].length : 0;
  if (format.includes('%')) {
    return FormatUtils.formatNumber((num * 100), { decimalFigures }) + '%';
  }
  const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
  const roundedNum = FormatUtils.formatNumber(num, { decimalFigures });
  if (separators || !(format.includes('m') || format.includes('a'))) {
    return format.indexOf('$') === 0 ? `${currencySymbol}${roundedNum}` : `${roundedNum}${currencySymbol}`;
  }
  const parts = roundedNum.split('.');
  const decimalPart = parts.length > 1 ? parts[1] : '';
  const integerPart = formatNumber(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
  return `${currencySymbol}${integerPart}`;
}
