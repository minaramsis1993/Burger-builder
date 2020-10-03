import React from 'react';
import classes from './Order.module.css';

export default function Order({ ingrs, price }) {
  console.log(ingrs, price);
  const ingrsArr = [];
  for (let prop in ingrs) {
    ingrsArr.push({ name: prop, value: ingrs[prop] });
  }
  console.log(ingrsArr);
  return (
    <div className={classes.Order}>
      <p>
        Ingredients:{' '}
        {ingrsArr.map((ing, id) => (
          <span
            key={id}
            style={{
              textTransform: 'capitalize',
              border: '1px solid #ccc',
              margin: '0 0.5rem',
              padding: '0.3rem',
            }}
          >
            {ing['name']} ({ing['value']})
          </span>
        ))}
      </p>
      <p>Price: {price.toFixed(2)}</p>
    </div>
  );
}
