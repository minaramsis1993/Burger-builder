import React from 'react';
import classes from './Button.module.css';
export default function Button({ children, type, clickHandler, isDisabled }) {
  // console.log(isDisabled);
  return (
    <button
      className={[
        classes.Button,
        type === 'success' ? classes.Success : classes.Danger,
      ].join(' ')}
      onClick={clickHandler}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
