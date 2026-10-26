import { CSSProperties } from 'react';

import { ACTIVE_THEME } from '../config';
import { RatingTheme, ThemeTokens } from './types';
import defaultTheme from './default';
import minecraft from './minecraft';

// To add a theme: create a folder next to these, then import it and add it here.
export const themes = {
  default: defaultTheme,
  minecraft
} satisfies Record<string, RatingTheme>;

export type ThemeName = keyof typeof themes;

export const resolveTheme = (
  theme: ThemeName | RatingTheme = ACTIVE_THEME
): RatingTheme =>
  typeof theme === 'string' ? themes[theme] ?? themes.default : theme;

// primary -> --rs-primary, barHeight -> --rs-bar-height
export const getThemeVariables = (tokens: ThemeTokens = {}): CSSProperties =>
  Object.fromEntries(
    Object.entries(tokens)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [
        `--rs-${key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`,
        value
      ])
  ) as CSSProperties;
