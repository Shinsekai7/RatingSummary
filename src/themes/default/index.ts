import { RatingTheme } from '../types';

// The built-in look. Its values are the fallbacks in the component CSS files,
// so this theme sets nothing and --rs-* variables set on a parent element still
// apply. To start a new theme, copy the minecraft folder instead.
const defaultTheme: RatingTheme = {
  name: 'default'
};

export default defaultTheme;
