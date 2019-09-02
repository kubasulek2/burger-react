import * as actionType from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionType.AUTH_START
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionType.AUTH_SUCCESS,
		authData: authData
	};
};

export const authFail = (err) => {
	return {
		type: actionType.AUTH_FAIL,
		error: err
	};
};

export const auth = (email, password, isSignUp) => {
	
	let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxqXiGzFjTAvsOo2GExdv2LTMDn9G_BWM';

	if (!isSignUp) {
		url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxqXiGzFjTAvsOo2GExdv2LTMDn9G_BWM';
	}
	
	const userData = {
		email: email,
		password: password,
		returnSecureToken: true
	};

	return dispatch => {
		dispatch(authStart());
		axios.post(url,userData)
			.then( res => {
				console.log(res);
				dispatch(authSuccess(res));
			})
			.catch( err => {
				console.log(err.response);
				dispatch(authFail(err.response));
			});


	};
};