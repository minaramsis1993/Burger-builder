import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css';

function NavItem({ name, url }) {
  return (
    <li className={classes.NavItem}>
      <NavLink exact to={url} activeClassName={classes.active}>
        {name}
      </NavLink>
    </li>
  );
}

export default NavItem;
