import React from 'react';
import classes from './Input.module.css';

export default function Input(props) {
  let inputField = null;
  const config = { ...props.elementconfig };
  switch (props.elementtype) {
    case 'input':
      inputField = (
        <input
          className={classes.InputElement}
          {...props.elementconfig}
          value={props.value}
          onChange={props.onChangeHandler}
        />
      );
      break;
    case 'textarea':
      inputField = (
        <textarea
          className={classes.InputElement}
          {...props.elementconfig}
          value={props.value}
          onChange={props.onChangeHandler}
        />
      );
      break;
    case 'select':
      inputField = (
        <select value={props.value} onChange={props.onChangeHandler}>
          {config.options.map((op, i) => (
            <option key={i} value={op.opValue}>
              {' '}
              {op.opText}{' '}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputField = (
        <div>
          <input
            className={classes.InputElement}
            {...props.elementconfig}
            value={props.value}
            onChange={props.onChangeHandler}
          />
        </div>
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputField}
      {props.shouldValidate && props.isTouched && !props.isValid ? (
        <small style={{ display: 'block', textAlign: 'left', color: 'red' }}>
          Please enter a valid value
        </small>
      ) : null}
    </div>
  );
}
