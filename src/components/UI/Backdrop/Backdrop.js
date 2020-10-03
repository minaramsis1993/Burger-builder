import React from 'react';
import classes from './Backdrop.module.css';

export default function Backdrop({ show, backdropClickHandler }) {
  return show ? (
    <div className={classes.Backdrop} onClick={backdropClickHandler}></div>
  ) : null;
}
