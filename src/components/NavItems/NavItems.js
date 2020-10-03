import React from 'react';
import NavItem from '../NavItem/NavItem';
import classes from './NavItems.module.css';

export default function NavItems() {
  return (
    <ul className={classes.NavItems}>
      <NavItem name={'Burger Builder'} url={'/'}></NavItem>
      <NavItem name={'Orders'} url={'/orders'}></NavItem>
    </ul>
  );
}
