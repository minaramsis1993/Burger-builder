import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

export default function CheckoutSummary({
  ings,
  approveOrderHandler,
  cancelOrderHandler,
}) {
  return (
    // <div className={classes.CheckoutSummary}>
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tastes well</h1>
      <div>
        <Burger ings={ings} />
      </div>

      <Button type="success" clickHandler={approveOrderHandler}>
        CONTINUE
      </Button>
      <Button type="danger" clickHandler={cancelOrderHandler}>
        CANCEL
      </Button>
    </div>
  );
}
