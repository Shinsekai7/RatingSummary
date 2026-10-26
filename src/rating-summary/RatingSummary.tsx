import React, { FC, useId } from 'react';

import { ISummaryProp, RatingRanks } from './types';
import RatingLabel from '../rating-label';
import RatingDistributionItem from '../rating-distribution-item';
import { Elements, GenericElements, ORDER } from '../constants';
import { getStyles, getTotalRatingCount, joinClassNames, toDomId } from '../utils';
import RatingAverage from '../rating-average';
import { getThemeVariables, resolveTheme } from '../themes';
import classes from './styles.module.css';

const RatingSummary: FC<ISummaryProp> = (props) => {
  const {
    ratings,
    ratingRanks = {},
    renderLabel,
    showCount = true,
    showAnimation = true,
    styles = {},
    barColors,
    onBarClick,
    showAverageRating = true,
    customAverageFn,
    averageRatingPrecision = 1,
    ratingAverageIconProps = {},
    ratingLabelIconProps = {},
    thousandsSeparator,
    ratingAverageSubText = 'reviews',
    order = ORDER.REVERSE,
    theme: themeProp
  } = props;

  const theme = resolveTheme(themeProp);

  // unique per instance so several summaries on one page don't share ids
  const idPrefix = `rs-${useId().replace(/:/g, '')}`;

  const getRatingRanks = (): RatingRanks => {
    if (Object.keys(ratingRanks).length) return ratingRanks;
    return Object.keys(ratings).reduce(
      (accumulator, ratingId, index) => ({
        ...accumulator,
        [ratingId]: index + 1
      }),
      {}
    );
  };

  const ranks: RatingRanks = getRatingRanks();
  const totalRatingCount = getTotalRatingCount(ratings);

  const ratingKeys =
    order === ORDER.REVERSE
      ? Object.keys(ratings).reverse()
      : Object.keys(ratings);

  return (
    <div
      className={joinClassNames(
        classes.container,
        theme.classNames?.[GenericElements.Root]
      )}
      style={{
        ...getThemeVariables(theme.tokens),
        ...styles[GenericElements.Root]
      }}
    >
      {showAverageRating && (
        <RatingAverage
          ratings={ratings}
          ranks={ranks}
          customAverageFn={customAverageFn}
          averageRatingPrecision={averageRatingPrecision}
          iconProps={ratingAverageIconProps}
          styles={styles}
          thousandsSeparator={thousandsSeparator}
          ratingAverageSubText={ratingAverageSubText}
          idPrefix={idPrefix}
          theme={theme}
        />
      )}
      <div
        className={joinClassNames(
          classes.ratingsWrapper,
          theme.classNames?.[GenericElements.SummaryContainer]
        )}
        style={styles[GenericElements.SummaryContainer]}
        id={toDomId(idPrefix, 'ratings-container')}
      >
        {ratingKeys.map((ratingId) => (
          <div
            key={ratingId}
            className={joinClassNames(
              classes.ratingWrapper,
              theme.classNames?.[Elements.SummaryItemContainer]
            )}
            style={getStyles(styles, Elements.SummaryItemContainer, ratingId)}
          >
            {(renderLabel && <>{renderLabel(ratingId)}</>) || (
              <RatingLabel
                ratingId={ratingId}
                styles={styles}
                iconProps={ratingLabelIconProps}
                idPrefix={idPrefix}
                theme={theme}
              />
            )}
            <RatingDistributionItem
              currentRatingId={ratingId}
              currentRatingValue={ratings[ratingId]}
              totalRatingCount={totalRatingCount}
              idPrefix={idPrefix}
              theme={theme}
              showCount={showCount}
              showAnimation={showAnimation}
              styles={styles}
              barColors={barColors}
              onBarClick={onBarClick}
              thousandsSeparator={thousandsSeparator}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RatingSummary;
