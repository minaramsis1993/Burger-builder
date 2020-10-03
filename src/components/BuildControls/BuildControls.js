import React from 'react';
import BuildControl from '../BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const buildControls = [
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
];

export default function BuildControls({
  addIngrHandler,
  removeIngrHandler,
  price,
  canPurchase,
  orderNowHandler
}) {
  return (
    <div className={classes.BuildControls}>
      <p>Price {price.toFixed(2)}</p>
      {buildControls.map((control, i) => (
        <BuildControl
          label={control.label}
          type={control.type}
          key={control.label + i}
          addIngrHandler={addIngrHandler}
          removeIngrHandler={removeIngrHandler}
        ></BuildControl>
      ))}
      <button
        className={classes.OrderButton}
        disabled={!canPurchase}
        onClick={orderNowHandler}
      >
        ORDER NOW
      </button>
    </div>
  );
}
