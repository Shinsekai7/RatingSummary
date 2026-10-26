import React, { FC } from 'react';

import { StarProp } from './types';

export interface IconOptions {
  /** Stroke width (in viewBox units) when no `borderWidth` is passed */
  defaultBorderWidth?: number;
  /** Turn off anti-aliasing, for pixel-art shapes */
  crisp?: boolean;
}

// explicit icon props win; otherwise the theme's CSS variables, then the built-in colors
const FILL = 'var(--rs-icon-fill, var(--rs-primary, #5D5FEF))';
const EMPTY = 'var(--rs-icon-empty, #FFFFFF)';
const BORDER = `var(--rs-icon-border, ${FILL})`;

/**
 * Builds a rating icon from an SVG path. The shape is filled left to right
 * up to `colorFilledFraction`, so partial stars in the average still work.
 */
export const createIcon = (
  path: string,
  viewBox: string,
  options: IconOptions = {}
): FC<StarProp> => {
  const { defaultBorderWidth = 2, crisp = false } = options;

  const Icon: FC<StarProp> = (props) => {
    const {
      fillColor,
      bgColor,
      colorFilledFraction,
      borderColor,
      borderWidth = defaultBorderWidth,
      id
    } = props;

    return (
      <svg width="100%" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* the second stop is clamped to the first one's offset, giving a hard edge */}
          <linearGradient id={id}>
            <stop offset={colorFilledFraction} style={{ stopColor: fillColor || FILL }} />
            <stop offset="0%" style={{ stopColor: bgColor || EMPTY }} />
          </linearGradient>
        </defs>
        <path
          style={{ stroke: borderColor || fillColor || BORDER }}
          strokeWidth={borderWidth}
          fill={`url(#${id})`}
          shapeRendering={crisp ? 'crispEdges' : undefined}
          d={path}
        />
      </svg>
    );
  };

  return Icon;
};
