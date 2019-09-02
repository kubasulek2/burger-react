import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const purchaseSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_SUCCESS,
		id: id,
		orderData: orderData
	};
};


export const purchaseFail = (error) => {
	return {
		type: actionTypes.PURCHASE_FAIL,
		error: error
	};
};


export const handlePurchase = (orderData) => {
	return dispatch => {
		axios.post('/orders.json', orderData)
			.then(res => {
				dispatch(purchaseSuccess(res.data, orderData));
			})
			.catch(err => {
				dispatch(purchaseFail(err));
			});
	};
};
