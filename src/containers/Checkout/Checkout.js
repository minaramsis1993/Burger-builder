import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

export default class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: null,
  };

  componentDidMount() {
    console.log(this.props);
    const ings = {};
    const query = new URLSearchParams(this.props.location.search);
    // This will result in [ ['key', 'value'] ]
    for (let prop of query.entries()) {
      console.log(prop);
      if (prop[0] !== 'total-price') {
        ings[prop[0]] = +prop[1];
      } else {
        this.setState({ totalPrice: +prop[1] });
      }
    }
    this.setState({ ingredients: ings });
  }

  approveOrderHandler = () => {
    this.props.history.push('/checkout/contact-data');
  };
  cancelOrderHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ings={this.state.ingredients}
          approveOrderHandler={this.approveOrderHandler}
          cancelOrderHandler={this.cancelOrderHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={() => (
            <ContactData
              ingrs={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}
