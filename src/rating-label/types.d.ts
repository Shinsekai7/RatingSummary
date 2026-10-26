import { CustomStyles, RatingIconProps } from '../rating-summary/types';
import { RatingTheme } from '../themes/types';

export type IRatingLabelProp = {
  ratingId: string;
  styles: CustomStyles;
  iconProps: RatingIconProps;
  idPrefix: string;
  theme: RatingTheme;
};
