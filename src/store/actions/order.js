import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const purchaseStart = () => {
	return {
		type: actionTypes.PURCHASE_START
	};
};

export const purchaseSuccess = ( id, orderData ) => {
	return {
		type: actionTypes.PURCHASE_SUCCESS,
		id: id,
		orderData: orderData
	};
};


export const purchaseFail = ( error ) => {
	return {
		type: actionTypes.PURCHASE_FAIL,
		error: error
	};
};


export const handlePurchase = ( orderData ) => {
	return (dispatch, getState) => {

		dispatch( purchaseStart() );
		const token = getState().auth.token || window.localStorage.getItem( 'token' );

		axios.post( '/orders.json?auth=' + token, orderData )
			.then( res => {
				dispatch( purchaseSuccess( res.data.name, orderData ) );
			} )
			.catch( err => {
				window.localStorage.removeItem( 'token' );
				dispatch( purchaseFail( err ) );
			} );
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrderSuccess = ( orders ) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrderFail = ( error ) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
};

export const fetchOrders = () => {
	return ( dispatch, getState ) => {
		dispatch( fetchOrderStart() );
		
		const token = getState().auth.token || window.localStorage.getItem( 'token' );
		
		axios.get( '/orders.json?auth=' + token )
			.then( res => {
				let ordersArr = [];
				/* eslint-disable no-unused-vars */
				for ( const key in res.data ) {
					ordersArr.push( {
						...res.data[ key ],
						id: key
					} );
				}
				/* eslint-enable no-unused-vars */
				dispatch( fetchOrderSuccess( ordersArr ) );
			} )
			.catch( err => {
				window.localStorage.removeItem( 'token' );
				dispatch( fetchOrderFail( err ) );
			} );
	};
};
