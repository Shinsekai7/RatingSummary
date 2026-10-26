import React, { FC } from 'react';

import { StarProp } from '../../rating-average/star/types';

const WIDTH = 15;
const HEIGHT = 17;

// One path per shade of gold, 1 unit per pixel (from star.svg's 4px grid).
// The same shapes are drawn in the empty color underneath, and the gold
// layer is revealed left to right.
const PARTS = [
  {
    color: '#f6f5c1', // highlight
    d: 'M7 0h1v1h-1zM7 1h1v1h-1zM7 2h1v1h-1zM6 3h2v1h-2zM6 4h2v1h-2zM6 5h2v1h-2zM0 6h8v1h-8zM3 7h2v1h-2zM6 7h2v1h-2zM5 8h1v1h-1zM7 8h1v1h-1zM6 9h2v1h-2zM6 10h1v1h-1zM6 11h1v1h-1zM5 12h1v1h-1zM4 13h1v1h-1zM3 14h1v1h-1zM3 15h1v1h-1zM2 16h1v1h-1z'
  },
  {
    color: '#faf291',
    d: 'M10 6h5v1h-5zM5 7h1v1h-1zM11 7h2v1h-2zM6 8h1v1h-1zM9 8h2v1h-2zM8 9h1v1h-1zM7 10h1v1h-1zM8 11h1v1h-1zM9 12h1v1h-1zM10 13h1v1h-1zM11 14h1v1h-1zM11 15h1v1h-1zM12 16h1v1h-1z'
  },
  {
    color: '#fde100',
    d: 'M9 7h2v1h-2zM4 10h2v1h-2zM8 10h3v1h-3zM4 11h2v1h-2zM9 11h2v1h-2zM3 12h2v1h-2zM10 12h2v1h-2zM3 13h1v1h-1zM11 13h1v1h-1zM2 14h1v1h-1zM12 14h1v1h-1zM2 15h1v1h-1zM12 15h1v1h-1z'
  },
  {
    color: '#ddb126',
    d: 'M8 4h1v1h-1zM8 5h1v1h-1zM8 6h2v1h-2zM1 7h2v1h-2zM8 7h1v1h-1zM2 8h3v1h-3zM8 8h1v1h-1zM4 9h2v1h-2z'
  },
  {
    color: '#d59829', // shadow
    d: 'M8 3h1v1h-1zM13 7h1v1h-1zM11 8h2v1h-2zM9 9h2v1h-2zM7 11h1v1h-1zM6 12h3v1h-3zM5 13h2v1h-2zM8 13h2v1h-2zM4 14h2v1h-2zM9 14h2v1h-2zM4 15h1v1h-1zM10 15h1v1h-1zM3 16h1v1h-1zM11 16h1v1h-1z'
  }
];

/**
 * Multi-color pixel star. `fillColor` replaces the gold shades with one color,
 * `bgColor` (or the theme's iconEmpty) sets the empty color.
 */
const PixelStar: FC<StarProp> = (props) => {
  const { fillColor, bgColor, colorFilledFraction, id } = props;
  const gradientId = `${id}-gradient`;
  const maskId = `${id}-mask`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <defs>
        {/* white (visible) up to the filled fraction, black (hidden) after it */}
        <linearGradient
          id={gradientId}
          x1="0"
          x2={WIDTH}
          y1="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" />
          <stop offset={colorFilledFraction} stopColor="white" />
          <stop offset={colorFilledFraction} stopColor="black" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
        <mask id={maskId}>
          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill={`url(#${gradientId})`} />
        </mask>
      </defs>
      <g style={{ fill: bgColor || 'var(--rs-icon-empty, #777777)' }}>
        {PARTS.map((part) => (
          <path key={part.d} d={part.d} />
        ))}
      </g>
      <g mask={`url(#${maskId})`}>
        {PARTS.map((part) => (
          <path key={part.d} d={part.d} fill={fillColor || part.color} />
        ))}
      </g>
    </svg>
  );
};

export default PixelStar;
