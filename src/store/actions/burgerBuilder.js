import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const addIngredient = (ing) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ing
	};
};

export const removeIngredient = (ing) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ing
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const fetchIngredientFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
};

export const initIngredients = () => {
	return dispatch => {
		axios.get('/ingredients.json')
			.then(res => {
				dispatch(setIngredients(res.data));
			})
			.catch(error => {
				dispatch(fetchIngredientFailed());
				return error;
			});
	};
};