import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,

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
		
		case actionTypes.SET_INGREDIENTS:
			newState.ingredients = action.ingredients;
			break;

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			newState.error = true;
			break;	

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