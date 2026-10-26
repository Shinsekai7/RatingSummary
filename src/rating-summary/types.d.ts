import { ReactElement } from 'react';

import { Elements, GenericElements, ORDER } from '../constants';
import type { ThemeName } from '../themes';
import type { RatingTheme } from '../themes/types';

export type StyleObjectType = React.CSSProperties;

export type IRatings = {
  [value: string]: number;
};

export type RatingRanks = {
  [value: keyof IRatings]: number;
};

export type IStyleFunction = (ratingId: keyof IRatings) => React.CSSProperties;

type GenericCustomStyles = {
  [value in GenericElements]?: StyleObjectType;
};

type SpecificCustomStyles = {
  [value in Elements]?: IStyleFunction;
};

export type CustomStyles = GenericCustomStyles & SpecificCustomStyles;

export type BarColors = { [value in keyof IRatings]: string };

export interface RatingIconProps {
  fillColor?: string;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export type CustomAverageFn = (ratings: IRatings, ranks: RatingRanks) => number;

export type ISummaryProp = {
  ratings: IRatings;
  /**
   * Weight of each rating used for the average. When omitted, ranks are
   * 1..n in `Object.keys(ratings)` order: numeric keys ("1".."5") sort
   * ascending, other keys keep insertion order, so pass this explicitly
   * for keys like `excellent` / `poor`.
   */
  ratingRanks?: RatingRanks;
  renderLabel?: (ratingId: string) => ReactElement;
  showCount?: boolean;
  showAnimation?: boolean;
  styles?: CustomStyles;
  barColors?: BarColors;
  onBarClick?: (ratingId: keyof IRatings) => void;
  showAverageRating?: boolean;
  customAverageFn?: CustomAverageFn;
  averageRatingPrecision?: number;
  ratingAverageIconProps?: RatingIconProps;
  ratingLabelIconProps?: RatingIconProps;
  thousandsSeparator?: string;
  ratingAverageSubText?: string;
  order?: ORDER;
  /**
   * A built-in theme's name, or your own theme object.
   * Defaults to `ACTIVE_THEME` in `config.ts`.
   */
  theme?: ThemeName | RatingTheme;
};
