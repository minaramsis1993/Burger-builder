import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../../NavItems/NavItems';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Sidedrawer.module.css';

export default function Sidedrawer({
  isSideDrawerClosed,
  sidedrawerCloseHandler,
}) {
  return (
    <React.Fragment>
      <Backdrop
        show={!isSideDrawerClosed}
        backdropClickHandler={sidedrawerCloseHandler}
      ></Backdrop>
      <div
        className={[
          classes.Sidedrawer,
          isSideDrawerClosed ? classes.Close : classes.Open,
        ].join(' ')}
      >
        <Logo></Logo>
        <nav>
          <NavItems></NavItems>
        </nav>
      </div>
    </React.Fragment>
  );
}
