import { FC } from 'react';

import { Elements, GenericElements } from '../constants';
import { StarProp } from '../rating-average/star/types';

/**
 * Values that become `--rs-*` CSS variables on the component's root
 * (`barHeight` -> `--rs-bar-height`). Anything left out keeps the built-in look.
 */
export interface ThemeTokens {
  /** Bar color, and icon color unless `iconFill` is set */
  primary?: string;
  /** Empty part of each bar */
  track?: string;
  text?: string;
  font?: string;
  /** Corner radius of the bars */
  radius?: string;
  barHeight?: string;
  iconFill?: string;
  /** Unfilled part of the icons */
  iconEmpty?: string;
  iconBorder?: string;
  averageIconSize?: string;
  labelIconSize?: string;
}

/** Extra class names per element, for styling that tokens can't express */
export type ThemeClassNames = Partial<Record<Elements | GenericElements, string>>;

export type IconComponent = FC<StarProp>;

export interface RatingTheme {
  name: string;
  tokens?: ThemeTokens;
  classNames?: ThemeClassNames;
  /** Replaces the star everywhere; build one with `createIcon` */
  icon?: IconComponent;
}
