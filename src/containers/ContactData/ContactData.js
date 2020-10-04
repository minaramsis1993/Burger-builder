import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

import axios from '../../axios-orders';
import { withRouter } from 'react-router';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: [
      {
        elementtype: 'input',
        elementconfig: {
          label: 'Name',
          type: 'text',
          name: 'name',
          placeholder: 'Name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        isValid: false,
        touched: false,
      },
      {
        elementtype: 'input',
        elementconfig: {
          label: 'Email',
          type: 'text',
          name: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      {
        elementtype: 'input',
        elementconfig: {
          label: 'Street',
          type: 'text',
          name: 'street',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      {
        elementtype: 'input',
        elementconfig: {
          label: 'postalCode',
          type: 'text',
          name: 'postalCode',
          placeholder: 'postalCode',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      {
        elementtype: 'select',
        elementconfig: {
          options: [
            { opText: 'Fastest', opValue: 'fastest' },
            { opText: 'Cheapest', opValue: 'cheapest' },
          ],
          name: 'deliveryMethod',
        },
        value: '',
      },
    ],
    isSpinning: false,
    isFormValid: false,
  };

  submitHandler = (e) => {
    e.preventDefault();
    // turn it into obj
    const orderFormObj = {};
    for (let i = 0; i < this.state.orderForm.length; i++) {
      const el = this.state.orderForm[i];
      orderFormObj[el.elementconfig.name] = el;
    }

    const { ingrs, price } = this.props;
    this.setState({ isSpinning: true }, () => {
      axios
        .post('/orderss.json', {
          ingredients: ingrs,
          price: price,
          customer: {
            name: orderFormObj['name']['value'],
            email: orderFormObj['email']['value'],
            address: {
              street: orderFormObj['street']['value'],
              postalCode: orderFormObj['postalCode']['value'],
            },
          },
        })
        .then((res) => {
          this.setState({ isSpinning: false }, () => {
            this.props.history.push('/');
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ isSpinning: false });
        });
    });
  };

  checkValidation = (value, rules) => {
    let isValid = false;
    if (rules['required']) {
      isValid = value.trim() !== '';
    }
    if (rules['minLength']) {
      isValid = value.length >= rules['minLength'];
    }
    if (rules['maxLength']) {
      isValid = value.length <= rules['maxLength'];
    }
    if (rules['minLength'] && rules['maxLength']) {
      isValid = value.length === rules['maxLength'];
    }
    return isValid;
  };

  onChangeHandler = (index, e) => {
    const formClone = [...this.state.orderForm];
    formClone[index]['touched'] = true;
    formClone[index]['value'] = e.target.value;
    formClone[index]['isValid'] = formClone[index]['validation']
      ? this.checkValidation(e.target.value, formClone[index]['validation'])
      : true;
    this.setState({ orderForm: formClone });
  };

  componentDidUpdate() {
    let isFormValid = true;
    for (let i = 0; i < this.state.orderForm.length; i++) {
      const el = this.state.orderForm[i];
      console.log(el);
      if (el.validation && !el.isValid) {
        isFormValid = false;
      }
    }
    if (this.state.isFormValid !== isFormValid) {
      this.setState({ isFormValid: isFormValid });
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        {this.state.isSpinning ? (
          <Spinner />
        ) : (
          <form>
            {this.state.orderForm.map((el, i) => (
              <Input
                key={i}
                value={el.value}
                elementtype={el.elementtype}
                label={el.elementconfig.label}
                elementconfig={el.elementconfig}
                onChangeHandler={this.onChangeHandler.bind(this, i)}
                shouldValidate={el.validation}
                isTouched={el.touched}
                isValid={el.isValid}
              />
            ))}
            <p>{this.state.isFormValid ? 'FORM VALID' : 'NOT VALID'}</p>

            <Button
              type={'success'}
              clickHandler={this.submitHandler}
              isDisabled={!this.state.isFormValid}
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default withRouter(ContactData);
