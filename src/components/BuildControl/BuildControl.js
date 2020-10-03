import React from 'react';
import classes from './BuildControl.module.css';

export default function BuildControl({
  label,
  type,
  addIngrHandler,
  removeIngrHandler,
}) {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button
        className={classes.Less}
        onClick={removeIngrHandler.bind(this, type)}
      >
        Less
      </button>
      <button
        className={classes.More}
        onClick={addIngrHandler.bind(this, type)}
      >
        More
      </button>
    </div>
  );
}
