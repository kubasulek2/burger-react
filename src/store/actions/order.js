import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const purchaseStart = () => {
	console.log('purchaseStart')
	return {
		type: actionTypes.PURCHASE_START
	};
};

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
		
		dispatch(purchaseStart());

		axios.post('/orders.json', orderData)
			.then(res => {
				dispatch(purchaseSuccess(res.data.name, orderData));
			})
			.catch(err => {
				dispatch(purchaseFail(err));
			});
	};
};
