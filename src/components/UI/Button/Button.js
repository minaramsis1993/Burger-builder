import React from 'react';
import classes from './Button.module.css';
export default function Button({ children, type, clickHandler }) {
  return (
    <button
      className={[
        classes.Button,
        type === 'success' ? classes.Success : classes.Danger,
      ].join(' ')}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
