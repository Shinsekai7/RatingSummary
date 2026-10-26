import { INTERNATIONAL_NUMBER_SYSTEM_REGEX, Elements } from './constants';
import { CustomStyles, IRatings, RatingRanks } from './rating-summary/types';

export const formatThousandNumber = (num: number, thousandsSeparator = ','): string =>
  num.toString().replace(INTERNATIONAL_NUMBER_SYSTEM_REGEX, thousandsSeparator);

export const formatLargeNumber = (num: number): string => {
  const abbrev = ['K', 'M', 'B', 'T'];
  let round = 0;
  while (Math.abs(num) >= 1000 && round < abbrev.length) {
    round++;
    num /= 1000;
  }
  // e.g. 999,950 -> 999.95K would print as "1000.0K"; bump to the next unit
  if (Math.abs(Number(num.toFixed(1))) >= 1000 && round < abbrev.length) {
    round++;
    num /= 1000;
  }
  return num.toFixed(1) + (abbrev[round - 1] ?? '');
};

export const formatNumber = (num: number, thousandsSeparator = ''): string | number => {
  if (Math.abs(num) < 1000) return num;
  if (thousandsSeparator) return formatThousandNumber(num, thousandsSeparator);
  return formatLargeNumber(num);
};

// HTML ids can't contain whitespace, and url(#id) references break on it
export const toDomId = (...parts: string[]): string =>
  parts.join('-').replace(/\s+/g, '_');

export const joinClassNames = (...names: (string | false | undefined)[]): string =>
  names.filter(Boolean).join(' ');

export const getStyles = (
  allStyles: CustomStyles,
  element: Elements,
  ratingId: string
): object => {
  const getElementStyle = allStyles[element];
  if (getElementStyle) return getElementStyle(ratingId);
  return {};
};

export const getTotalRatingCount = (ratings: IRatings): number =>
  Object.values(ratings).reduce((sum, num) => sum + (num || 0), 0);

export const adjustDecimalPrecision = (
  value: number,
  precision: number
): string => value.toFixed(precision);

export const getWeightedAverage = (
  data: IRatings,
  ranks: RatingRanks
): number => {
  const weightedSum = Object.entries(data).reduce(
    (sum, [key, value]) => sum + (ranks[key] || 0) * Number(value),
    0
  );
  const sumOfNumbers = getTotalRatingCount(data);
  return sumOfNumbers ? weightedSum / sumOfNumbers : 0;
};
