import React, { FC, KeyboardEvent } from 'react';

import { IRatingDistributionProp } from './types';
import { Elements } from '../constants';
import { formatNumber, getStyles, joinClassNames, toDomId } from '../utils';
import classes from './styles.module.css';

const RatingDistributionItem: FC<IRatingDistributionProp> = (props) => {
  const {
    currentRatingId,
    currentRatingValue,
    totalRatingCount,
    showCount,
    showAnimation,
    styles = {},
    barColors,
    onBarClick,
    thousandsSeparator,
    idPrefix,
    theme
  } = props;
  const themeClass = theme.classNames ?? {};

  // bar-width in percentage; 0 when there are no ratings at all (avoids NaN%)
  const barWidth = totalRatingCount
    ? ((currentRatingValue || 0) / totalRatingCount) * 100
    : 0;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onBarClick?.(currentRatingId);
    }
  };

  return (
    <>
      {/* the whole track is the click target, so empty bars stay clickable */}
      <div
        className={joinClassNames(
          classes.barContainer,
          themeClass[Elements.BarContainer],
          onBarClick && classes.cursorPointer
        )}
        style={getStyles(styles, Elements.BarContainer, currentRatingId)}
        {...(onBarClick && {
          role: 'button',
          tabIndex: 0,
          'aria-label': `${currentRatingId}: ${currentRatingValue || 0}`,
          onClick: (): void => onBarClick(currentRatingId),
          onKeyDown: handleKeyDown
        })}
      >
        <div
          style={{
            width: `${barWidth}%`,
            ...getStyles(styles, Elements.FilledBarContainer, currentRatingId)
          }}
          className={joinClassNames(
            classes.filledBarContainer,
            themeClass[Elements.FilledBarContainer],
            showAnimation && classes.transitions
          )}
          id={toDomId(idPrefix, currentRatingId, 'bar')}
        >
          <div
            id={toDomId(idPrefix, currentRatingId, 'inner-bar')}
            style={{
              // only set inline when given, so the theme's --rs-primary applies otherwise
              backgroundColor: barColors?.[currentRatingId],
              ...getStyles(styles, Elements.Bar, currentRatingId)
            }}
            className={joinClassNames(
              classes.filledBar,
              themeClass[Elements.Bar],
              showAnimation && classes.animations
            )}
          />
        </div>
      </div>
      {showCount && (
        <span
          className={joinClassNames(classes.countContainer, themeClass[Elements.Count])}
          style={getStyles(styles, Elements.Count, currentRatingId)}
          id={toDomId(idPrefix, currentRatingId, 'count')}
        >
          {formatNumber(currentRatingValue, thousandsSeparator)}
        </span>
      )}
    </>
  );
};

export default RatingDistributionItem;
