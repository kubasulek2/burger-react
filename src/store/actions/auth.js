import * as actionType from './actionTypes';
import axios from 'axios';

const authSuccess = ( token, id ) => {
	return {
		type: actionType.AUTH_SUCCESS,
		idToken: token,
		localId: id
	};
};

const authFail = ( err ) => {
	return {
		type: actionType.AUTH_FAIL,
		error: err
	};
};

const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout( () => {
			dispatch( logOut() );
			window.localStorage.removeItem( 'token' );
		}, expirationTime * 1000 );
	};
};

const authStart = () => {
	return {
		type: actionType.AUTH_START
	};
};



export const logOut = () => {
	return {
		type: actionType.AUTH_LOG_OUT
	};
};

export const auth = ( email, password, isSignUp ) => {

	let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxqXiGzFjTAvsOo2GExdv2LTMDn9G_BWM';

	if ( !isSignUp ) {
		url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxqXiGzFjTAvsOo2GExdv2LTMDn9G_BWM';
	}

	const userData = {
		email: email,
		password: password,
		returnSecureToken: true
	};

	return dispatch => {
		dispatch( authStart() );
		axios.post( url, userData )
			.then( res => {
				dispatch( checkAuthTimeout( res.data.expiresIn ) );
				dispatch( authSuccess( res.data.idToken, res.data.localId ) );
				window.localStorage.setItem( 'token', res.data.idToken );
			} )
			.catch( err => {
				dispatch( authFail( err.response.data.error.message ) );
				window.localStorage.removeItem('token');
			} );


	};
};