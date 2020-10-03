import React from 'react';
import classes from './ToggleBtn.module.css';

export default function ToggleBtn({ clicked }) {
  return (
    <div className={classes.ToggleBtn} onClick={clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
