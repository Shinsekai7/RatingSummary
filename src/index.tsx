import RatingSummary from './rating-summary';

export { ORDER, Elements, GenericElements } from './constants';
export { themes } from './themes';
export { createIcon } from './rating-average/star/createIcon';
export type { IconOptions } from './rating-average/star/createIcon';
export type { ThemeName } from './themes';
export type {
  RatingTheme,
  ThemeTokens,
  ThemeClassNames,
  IconComponent
} from './themes/types';
export type { StarProp as IconProps } from './rating-average/star/types';
export type {
  ISummaryProp,
  IRatings,
  RatingRanks,
  CustomStyles,
  BarColors,
  RatingIconProps,
  CustomAverageFn
} from './rating-summary/types';

export default RatingSummary;
