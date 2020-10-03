import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../../NavItems/NavItems';
import ToggleBtn from '../ToggleBtn/ToggleBtn';
import classes from './Toolbar.module.css';

export default function Toolbar({ toggleClickHandler }) {
  return (
    <header className={classes.Toolbar}>
      <ToggleBtn clicked={toggleClickHandler}></ToggleBtn>
      <Logo />
      <nav className={classes.NavItems}>
        <NavItems></NavItems>
      </nav>
    </header>
  );
}
