import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false
};
/* eslint-disable no-case-declarations */
const reducer = (state=initialState, action) => {

	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return state;

		case actionTypes.PURCHASE_START:
			return {
				...state,
				loading: true
			};

		case actionTypes.PURCHASE_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.id
			};
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder)
			};
		
		case actionTypes.PURCHASE_FAIL:
			return {
				...state,
				loading: false

			};

		default:
			return state;
	}
};


export default reducer;