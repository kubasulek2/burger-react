import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
};
/* eslint-disable no-case-declarations */
const reducer = (state=initialState, action) => {

	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return updateObject(state, { purchased: false});

		case actionTypes.PURCHASE_START:
			return updateObject(state, { loading: true});

		case actionTypes.PURCHASE_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.id
			};
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true
			};
		
		case actionTypes.PURCHASE_FAIL:
			return {
				...state,
				loading: false
			};

		case actionTypes.FETCH_ORDERS_START:
			return {
				...state,
				loading: true

			};			
		
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				loading: false,
				orders: action.orders

			};
			
		case actionTypes.FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false

			};

		default:
			return state;
	}
};


export default reducer;