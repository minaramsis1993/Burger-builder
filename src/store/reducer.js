import * as actionTypes from './actions';
const initialState = {
  ingredients: { meat: 0, salad: 0, cheese: 0, bacon: 0 },
  totalPrice: 4,
};
const INGREDIENT_PRICES = {
  meat: 1.3,
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.type]: state['ingredients'][action.payload.type] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.type],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.type]: state['ingredients'][action.payload.type] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.type],
      };
    default:
      return state;
  }
};

export default reducer;
