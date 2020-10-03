import React, { Component } from 'react';
import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { withRouter } from 'react-router-dom';

const INGREDIENT_PRICES = {
  meat: 1.3,
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
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
    let clonedIngs = { ...this.state.ingredients };
    if (!clonedIngs[type]) {
      clonedIngs[type] = 1;
    } else {
      clonedIngs[type]++;
    }

    this.setState(
      {
        ingredients: clonedIngs,
        totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
      },
      () => {
        // console.log(this.state);
        this.updateCanPurchase();
      }
    );
  };

  removeIngrHandler = (type) => {
    let clonedIngs = { ...this.state.ingredients };
    if (clonedIngs[type] > 1) {
      clonedIngs[type]--;
    } else {
      delete clonedIngs[type];
    }

    this.setState(
      {
        ingredients: clonedIngs,
        totalPrice: this.state.ingredients[type]
          ? this.state.totalPrice - INGREDIENT_PRICES[type]
          : this.state.totalPrice,
      },
      () => {
        console.log(this.state);
        this.updateCanPurchase();
      }
    );
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
    qParams.push('total-price=' + encodeURIComponent(this.state.totalPrice));
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

    // this.setState({ isSpinning: true }, () => {
    //   // console.log(this.state);
    //   axios
    //     .post('/orders.json', {
    //       ingredients: this.state.ingredients,
    //       price: this.state.totalPrice,
    //       customer: {
    //         name: 'Mina',
    //         address: {
    //           street: 'asdfasdf',
    //           zipcode: '1234',
    //           country: 'Australia',
    //         },
    //         email: 'minaramsis1993@gmail.com',
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       this.setState({ isSpinning: false, isOrderNowClicked: false });
    //       // this.props.history.push({ pathname: '/checkout' });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.setState({ isSpinning: false, isOrderNowClicked: false });
    //     });
    // });
  };

  render() {
    let toRender = null;
    if (this.state.ingredients) {
      toRender = (
        <div>
          <Burger ings={this.state.ingredients}></Burger>
          <BuildControls
            addIngrHandler={this.addIngrHandler}
            removeIngrHandler={this.removeIngrHandler}
            price={this.state.totalPrice}
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
              curState={this.state}
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
export default withErrorHandler(withRouter(BurgerBuilder), axios);
