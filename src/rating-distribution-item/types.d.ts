import { BarColors, CustomStyles } from '../rating-summary/types';
import { RatingTheme } from '../themes/types';

export interface IRatingDistributionProp {
  currentRatingId: string;
  currentRatingValue: number;
  totalRatingCount: number;
  showCount?: boolean;
  showAnimation?: boolean;
  styles?: CustomStyles;
  barColors?: BarColors;
  onBarClick?: (ratingId: string) => void;
  thousandsSeparator?: string;
  idPrefix: string;
  theme: RatingTheme;
}
