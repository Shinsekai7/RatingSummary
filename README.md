# Rating Summary

A React component that shows an average star rating next to a bar chart of how many reviews each rating got.

## Requirements

- React 18 or newer (uses `useId`)
- A bundler that handles TypeScript and CSS modules (`*.module.css`), such as Vite, Next.js, or Create React App. No Sass needed. The package ships source files, not a compiled build.

## Usage

```tsx
import RatingSummary from 'rating-summary';

const ratings = { 1: 12, 2: 8, 3: 40, 4: 210, 5: 980 };

export const ProductReviews = () => (
  <RatingSummary
    ratings={ratings}
    onBarClick={(ratingId) => console.log(`Filter by ${ratingId} stars`)}
  />
);
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `ratings` | `{ [ratingId: string]: number }` | required | Number of reviews for each rating. |
| `theme` | `'default' \| 'minecraft' \| RatingTheme` | `ACTIVE_THEME` | A built-in theme's name or your own theme object. See [Themes](#themes). |
| `ratingRanks` | `{ [ratingId: string]: number }` | `1..n` in key order | Weight of each rating in the average. Pass this when the keys aren't `"1"`–`"5"` (e.g. `excellent`, `poor`). |
| `order` | `ORDER.ORIGINAL \| ORDER.REVERSE` | `REVERSE` | Row order. `REVERSE` puts the highest numeric key at the top. |
| `showAverageRating` | `boolean` | `true` | Show the average value, stars, and review count. |
| `averageRatingPrecision` | `number` | `1` | Decimal places for the average. |
| `customAverageFn` | `(ratings, ranks) => number` | weighted average | Replace how the average is calculated. Stars are clamped to `0..max rank`. |
| `ratingAverageSubText` | `string` | `'reviews'` | Text after the total review count. |
| `showCount` | `boolean` | `true` | Show the count next to each bar. |
| `showAnimation` | `boolean` | `true` | Animate bars when they appear and change. |
| `thousandsSeparator` | `string` | – | When set, counts of 1000 or more are shown in full (`1,234`). Otherwise they're shortened (`1.2K`). |
| `barColors` | `{ [ratingId: string]: string }` | theme color | Bar color for each rating. Overrides the theme. |
| `onBarClick` | `(ratingId: string) => void` | – | Makes each bar a button (clickable, focusable, Enter/Space). |
| `renderLabel` | `(ratingId: string) => ReactElement` | star + id | Custom row label. Give it `display: table-cell` to keep the layout. |
| `ratingAverageIconProps` | `RatingIconProps` | – | `fillColor`, `bgColor`, `borderColor`, `borderWidth` for the average stars. |
| `ratingLabelIconProps` | `RatingIconProps` | – | Same, for the small star in each row label. |
| `styles` | `CustomStyles` | – | Inline style overrides, see below. |

## Themes

Built-in themes live in `src/themes/`, one folder each. Pick one per component:

```tsx
<RatingSummary ratings={ratings} theme="minecraft" />
```

Or change the default for every instance in `src/config.ts`:

```ts
export const ACTIVE_THEME: ThemeName = 'minecraft';
```

The Minecraft theme looks best with the free [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) font loaded in your app. Without it, a monospace font is used.

### Adding a theme

1. Copy `src/themes/minecraft` to `src/themes/<your-theme>` and edit it.
2. Import it in `src/themes/index.ts` and add it to the `themes` list. Its name then works in the `theme` prop and `ACTIVE_THEME`, and TypeScript catches typos.

If you're using the published package, you can't add folders inside it. Pass a theme object instead:

```tsx
import RatingSummary, { RatingTheme } from 'rating-summary';

const ocean: RatingTheme = {
  name: 'ocean',
  tokens: { primary: '#0E7490', track: '#CFFAFE', radius: '8px', iconFill: '#F59E0B' }
};

<RatingSummary ratings={ratings} theme={ocean} />;
```

### What a theme can set

A theme has three optional parts:

- **`tokens`**: values that become CSS variables on the component (`barHeight` → `--rs-bar-height`): `primary`, `track`, `text`, `font`, `radius`, `barHeight`, `iconFill`, `iconEmpty`, `iconBorder`, `averageIconSize`, `labelIconSize`. Anything left out keeps the default look.
- **`classNames`**: extra classes per element, using the same `Elements` / `GenericElements` keys as `styles`. Use this for things tokens can't express, like textures or shadows. Start each rule with the `Root` class, e.g. `.root .bar` (see `minecraft.module.css`), so it wins over the built-in styles.
- **`icon`**: replaces the star. Build one from any SVG path with `createIcon`, which keeps partial fill working for the average:

  ```ts
  import { createIcon } from 'rating-summary';

  const Heart = createIcon('M16 29 3 16a7 7 0 0 1 13-9 7 7 0 0 1 13 9z', '0 0 32 32');
  ```

  For a multi-color icon, write a component that takes `IconProps` and fills up to `colorFilledFraction` itself. `src/themes/minecraft/PixelStar.tsx` does this with an SVG mask.

When several settings apply, the most specific wins: `barColors`, icon props and `styles` → the theme → `--rs-*` variables set on a parent element → built-in defaults. So you can also theme everything inside a container with plain CSS:

```css
.dark-mode { --rs-text: #fff; --rs-track: #333; }
```

## Styling

`styles` takes two kinds of keys:

- **`GenericElements`** (`Root`, `SummaryContainer`, `AverageContainer`, `Average`, `AverageIconsWrapper`, `AverageStarIcon`, `AverageSubTextContainer`, `AverageTotalReviews`, `AverageSubText`) take a style object.
- **`Elements`** (`SummaryItemContainer`, `BarContainer`, `FilledBarContainer`, `Bar`, `Count`, `Label`, `LabelStarIcon`) take a function of the rating id, so each row can be styled differently.

```tsx
import RatingSummary, { Elements, GenericElements } from 'rating-summary';

<RatingSummary
  ratings={ratings}
  styles={{
    [GenericElements.Average]: { fontSize: 48 },
    [Elements.Bar]: (ratingId) => ({ opacity: ratingId === '5' ? 1 : 0.6 })
  }}
/>;
```

## Development

```bash
pnpm install
pnpm typecheck
```
