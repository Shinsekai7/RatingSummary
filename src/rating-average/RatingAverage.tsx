import React, { FC } from 'react';

import {
  adjustDecimalPrecision,
  formatNumber,
  getTotalRatingCount,
  getWeightedAverage,
  joinClassNames,
  toDomId
} from '../utils';
import { IRatingAverageProp } from './types';
import Star from './star';
import { GenericElements } from '../constants';
import classes from './styles.module.css';

const RatingAverage: FC<IRatingAverageProp> = (props) => {
  const {
    ratings,
    ranks = {},
    customAverageFn = getWeightedAverage,
    averageRatingPrecision,
    iconProps,
    styles = {},
    thousandsSeparator,
    ratingAverageSubText,
    idPrefix,
    theme
  } = props;
  const Icon = theme.icon ?? Star;
  const themeClass = theme.classNames ?? {};

  const extractStarInfo = (average: number): [number, number, number] => {
    // 0 when there are no ranks, instead of Math.max()'s -Infinity
    const maxRank = Math.max(0, ...Object.values(ranks));
    // a customAverageFn may return values outside 0..maxRank (or NaN)
    const clamped = Number.isFinite(average)
      ? Math.min(Math.max(average, 0), maxRank)
      : 0;
    const wholePart = Math.floor(clamped);
    const decimalPart = clamped - wholePart;
    return [maxRank - Math.ceil(clamped), wholePart, decimalPart];
  };

  const average = customAverageFn(ratings, ranks);
  const totalRatingCount = getTotalRatingCount(ratings);
  const [noOfEmptyStars, noOfCompleteStars, visibleStarFraction] =
    extractStarInfo(average);

  const starClassName = joinClassNames(
    classes.starImage,
    themeClass[GenericElements.AverageStarIcon]
  );

  return (
    <div
      className={joinClassNames(
        classes.container,
        themeClass[GenericElements.AverageContainer]
      )}
      style={styles[GenericElements.AverageContainer]}
    >
      <div
        className={joinClassNames(
          classes.averageRatingValue,
          themeClass[GenericElements.Average]
        )}
        style={styles[GenericElements.Average]}
      >
        {adjustDecimalPrecision(average, averageRatingPrecision)}
      </div>
      <div
        className={joinClassNames(
          classes.iconsWrapper,
          themeClass[GenericElements.AverageIconsWrapper]
        )}
        style={styles[GenericElements.AverageIconsWrapper]}
      >
        {Array(noOfCompleteStars)
          .fill(0)
          .map((_item, index) => (
            <div
              key={`completely-filled-star-${index}`}
              className={starClassName}
              style={styles[GenericElements.AverageStarIcon]}
            >
              <Icon
                {...iconProps}
                colorFilledFraction={1}
                id={toDomId(idPrefix, 'completely-filled-star', String(index))}
              />
            </div>
          ))}
        {Boolean(visibleStarFraction) && (
          <div
            key="fraction-filled-star"
            className={starClassName}
            style={styles[GenericElements.AverageStarIcon]}
          >
            <Icon
              {...iconProps}
              colorFilledFraction={visibleStarFraction}
              id={toDomId(idPrefix, 'fraction-filled-star')}
            />
          </div>
        )}
        {Array(noOfEmptyStars)
          .fill(0)
          .map((_item, index) => (
            <div
              key={`unfilled-star-${index}`}
              className={starClassName}
              style={styles[GenericElements.AverageStarIcon]}
            >
              <Icon
                {...iconProps}
                colorFilledFraction={0}
                id={toDomId(idPrefix, 'unfilled-star', String(index))}
              />
            </div>
          ))}
      </div>
      <div
        className={joinClassNames(
          classes.subTextContainer,
          themeClass[GenericElements.AverageSubTextContainer]
        )}
        style={styles[GenericElements.AverageSubTextContainer]}
      >
        <div
          className={themeClass[GenericElements.AverageTotalReviews]}
          style={styles[GenericElements.AverageTotalReviews]}
        >
          {formatNumber(totalRatingCount, thousandsSeparator)}
        </div>
        <div
          className={themeClass[GenericElements.AverageSubText]}
          style={styles[GenericElements.AverageSubText]}
        >
          {ratingAverageSubText}
        </div>
      </div>
    </div>
  );
};

export default RatingAverage;
