import React from 'react';
import burgerLogo from '../../assets/28.1 burger-logo.png.png';
import classes from './Logo.module.css'
export default function Logo() {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="burgerimg" />
    </div>
  );
}
