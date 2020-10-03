import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classess from './Modal.module.css';

export default function Modal({ children, show, backdropClickHandler }) {
  return (
    <React.Fragment>
      <Backdrop
        show={show}
        backdropClickHandler={backdropClickHandler}
      ></Backdrop>
      <div
        className={classess.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-1000px)',
          opacity: show ? 1 : 0,
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
}
