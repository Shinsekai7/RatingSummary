import React, { FC } from 'react';

import { IRatingLabelProp } from './types';
import { getStyles, joinClassNames, toDomId } from '../utils';
import { Elements } from '../constants';
import classes from './styles.module.css';
import Star from '../rating-average/star';

const RatingLabel: FC<IRatingLabelProp> = (props) => {
  const { ratingId, styles, iconProps, idPrefix, theme } = props;
  const Icon = theme.icon ?? Star;

  return (
    <div
      className={joinClassNames(classes.label, theme.classNames?.[Elements.Label])}
      id={toDomId(idPrefix, ratingId, 'label')}
      style={getStyles(styles, Elements.Label, ratingId)}
    >
      <div
        className={joinClassNames(
          classes.starImage,
          theme.classNames?.[Elements.LabelStarIcon]
        )}
        style={getStyles(styles, Elements.LabelStarIcon, ratingId)}
      >
        <Icon
          {...iconProps}
          colorFilledFraction={1}
          id={toDomId(idPrefix, 'label-star', ratingId)}
        />
      </div>
      {ratingId}
    </div>
  );
};

export default RatingLabel;
