import React from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

export default function Burger({ ings }) {
  let ingsArr = [];
  for (let prop in ings) {
    for (let i = 0; i < ings[prop]; i++) {
      ingsArr.push(
        <BurgerIngredient type={prop} key={prop + i}></BurgerIngredient>
      );
    }
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {ingsArr.length ? ingsArr : <div className="centered-msg">Please add some ingredients</div>}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
}
