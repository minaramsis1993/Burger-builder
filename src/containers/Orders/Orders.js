import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import classes from './Orders.module.css';
class Orders extends Component {
  state = {
    orders: null,
    isLoading: false,
  };
  componentDidMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get('/orderss.json')
          .then((res) => {
            console.log(res);
            let orders = [];
            for (let prop in res.data) {
              orders.push({
                ...res.data[prop],
              });
            }
            console.log(orders);
            this.setState({ orders, isLoading: false }, () => {
              // console.log(this.state);
            });
          })
          .catch((err) => {
            this.setState({ isLoading: false });
            console.log(err);
          });
      }
    );
  }
  render() {
    let toRender = null;
    if (this.state.orders) {
      toRender = this.state.isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.Orders}>
          {this.state.orders.map((order, id) => (
            <Order key={id} ingrs={order.ingredients} price={order.price} />
          ))}
        </div>
      );
    }
    return toRender;
  }
}

export default withErrorHandler(Orders, axios);
