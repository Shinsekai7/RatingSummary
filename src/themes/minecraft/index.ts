import { Elements, GenericElements } from '../../constants';
import { RatingTheme } from '../types';
import PixelStar from './PixelStar';
import classes from './minecraft.module.css';

// Example theme: copy this folder to make your own, then add it to ../index.ts.
// The pixel font isn't bundled. Load "Press Start 2P" (free, OFL licensed) in
// your app, e.g. from Google Fonts; without it a monospace font is used.
const minecraft: RatingTheme = {
  name: 'minecraft',
  tokens: {
    primary: '#80FF20', // XP bar green
    track: '#8B8B8B', // inventory slot gray
    text: '#3F3F3F',
    font: "'Press Start 2P', 'Courier New', monospace",
    radius: '0',
    barHeight: '12px',
    iconEmpty: '#777777', // the star's own gold shades are in PixelStar.tsx
    averageIconSize: '20px',
    labelIconSize: '10px'
  },
  classNames: {
    [GenericElements.Root]: classes.root,
    [GenericElements.Average]: classes.average,
    [GenericElements.AverageSubTextContainer]: classes.subText,
    [Elements.BarContainer]: classes.track,
    [Elements.Bar]: classes.xpBar,
    [Elements.Label]: classes.label,
    [Elements.Count]: classes.count
  },
  icon: PixelStar
};

export default minecraft;
