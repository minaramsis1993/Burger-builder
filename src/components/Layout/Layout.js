import Sidedrawer from '../UI/Sidedrawer/Sidedrawer';
import Toolbar from '../UI/Toolbar/Toolbar';
import classes from './Layout.module.css';
import React, { Component } from 'react';

export default class Layout extends Component {
  state = {
    isSideDrawerClosed: true,
  };

  sidedrawerCloseHandler = () => {
    this.setState({ isSideDrawerClosed: true });
  };

  toggleClickHandler = () => {
    this.setState({ isSideDrawerClosed: false });
  };

  render() {
    return (
      <React.Fragment>
        <Sidedrawer
          sidedrawerCloseHandler={this.sidedrawerCloseHandler}
          isSideDrawerClosed={this.state.isSideDrawerClosed}
        ></Sidedrawer>
        <Toolbar toggleClickHandler={this.toggleClickHandler}></Toolbar>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
