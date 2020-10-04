import React, { Component } from 'react';
import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    canPurchase: false,
    isOrderNowClicked: false,
    isSpinning: false,
    isERR: false,
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isERR: true });
      });
  }

  updateCanPurchase = () => {
    let clonedIngs = { ...this.state.ingredients };
    let sum = 0;
    for (let prop in clonedIngs) {
      sum += clonedIngs[prop];
    }
    if (sum > 0) {
      this.setState({ canPurchase: true });
    } else {
      this.setState({ canPurchase: false });
    }
  };

  addIngrHandler = (type) => {
    this.props.addIngr(type);
    this.updateCanPurchase();
  };

  removeIngrHandler = (type) => {
    this.props.removeIngr(type);
    this.updateCanPurchase();
  };

  orderNowHandler = () => {
    this.setState({ isOrderNowClicked: true }, () => {
      console.log(this.state);
    });
  };

  backdropClickHandler = () => {
    this.setState({ isOrderNowClicked: false }, () => {
      console.log(this.state);
    });
  };

  cancelOrderHandler = () => {
    this.setState({ isOrderNowClicked: false }, () => {
      console.log(this.state);
    });
  };

  buildQueryParams() {
    const qParams = [];
    for (let i in this.state.ingredients) {
      qParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    qParams.push('total-price=' + encodeURIComponent(this.props.totalPrice));
    return qParams.join('&');
  }

  approveOrderHandler = () => {
    const { history } = this.props;
    console.log(history);
    const res = this.buildQueryParams();
    history.push({
      pathname: '/checkout',
      search: '?' + res,
    });
  };

  render() {
    let toRender = null;
    if (this.props.ingredients) {
      toRender = (
        <div>
          <Burger ings={this.props.ingredients}></Burger>
          <BuildControls
            addIngrHandler={this.addIngrHandler}
            removeIngrHandler={this.removeIngrHandler}
            price={this.props.totalPrice}
            canPurchase={this.state.canPurchase}
            orderNowHandler={this.orderNowHandler}
          ></BuildControls>
        </div>
      );
    } else {
      toRender = <Spinner />;
    }
    if (this.state.isERR) {
      // SAME
      toRender = null;
    }

    const curState = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
    };
    return (
      <React.Fragment>
        <Modal
          show={this.state.isOrderNowClicked}
          backdropClickHandler={this.backdropClickHandler}
        >
          {this.state.isSpinning ? (
            <Spinner></Spinner>
          ) : (
            <OrderSummary
              curState={curState}
              cancelOrderHandler={this.cancelOrderHandler}
              approveOrderHandler={this.approveOrderHandler}
            ></OrderSummary>
          )}
        </Modal>
        {toRender}
      </React.Fragment>
    );
  }
}

// export default BurgerBuilder;
const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIngr: (ingType) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { type: ingType },
      }),
    removeIngr: (ingType) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { type: ingType },
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(withRouter(BurgerBuilder), axios));
