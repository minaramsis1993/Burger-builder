import React from 'react';
import Button from '../UI/Button/Button';

export default function OrderSummary({
  curState,
  cancelOrderHandler,
  approveOrderHandler,
}) {
  const { ingredients, totalPrice } = curState;
  console.log(curState);
  const ingrsArr = [];
  for (let prop in ingredients) {
    ingrsArr.push({
      name: prop[0].toUpperCase() + prop.slice(1),
      quantity: ingredients[prop],
    });
  }
  return (
    <div>
      <h3>Your Order</h3>
      <p>A delecious burger with the following ings:</p>
      <ul>
        {ingrsArr.map((ing, i) => (
          <li key={ing.name + i}>
            {ing.name} {ing.quantity}
          </li>
        ))}
      </ul>
      <h4>Total price {totalPrice.toFixed(2)}</h4>
      <p>Continue to checkout ?</p>
      <Button type="danger" clickHandler={cancelOrderHandler}>
        CANCEL
      </Button>
      <Button type="success" clickHandler={approveOrderHandler}>
        CONTINUE
      </Button>
    </div>
  );
}
