import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients:{
		cheese: 0,
		bacon: 0,
		meat: 0,
		salad: 0
	},
	totalPrice: 4,
};

const INGREDIENT_PRICES = {
	cheese: .4,
	bacon: 0.5,
	meat: 1.3,
	salad: 0.5
};


const reducer = (state = initialState, action) => {

	const newState = {...state};

	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			newState.ingredients = {
				...newState.ingredients,
				[action.ingredientName]: newState.ingredients[action.ingredientName] + 1 
			};
			newState.totalPrice = newState.totalPrice + INGREDIENT_PRICES[action.ingredientName];
			break;

		case actionTypes.REMOVE_INGREDIENT:
			newState.ingredients = {
				...newState.ingredients,
				[action.ingredientName]: newState.ingredients[action.ingredientName] - 1
			};
			newState.totalPrice = newState.totalPrice - INGREDIENT_PRICES[action.ingredientName];
			break;

		default:
			return state;
	}
	return newState;
};

export default reducer;