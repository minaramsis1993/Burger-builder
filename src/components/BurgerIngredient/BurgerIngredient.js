import React from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

export default function BurgerIngredient({ type }) {
  let ingr = null;
  if (type === 'bread-bottom') {
    ingr = <div className={classes.BreadBottom}></div>;
  } else if (type === 'bread-top') {
    ingr = (
      <div className={classes.BreadTop}>
        <div className={classes.Seeds1}></div>
        <div className={classes.Seeds2}></div>
      </div>
    );
  } else if (type === 'meat') {
    ingr = <div className={classes.Meat}></div>;
  } else if (type === 'cheese') {
    ingr = <div className={classes.Cheese}></div>;
  } else if (type === 'salad') {
    ingr = <div className={classes.Salad}></div>;
  } else if (type === 'bacon') {
    ingr = <div className={classes.Bacon}></div>;
  }
  return ingr;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string,
};
