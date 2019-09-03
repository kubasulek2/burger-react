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
		}, expirationTime * 1000 );
	};
};

const authStart = () => {
	return {
		type: actionType.AUTH_START
	};
};



export const logOut = () => {
	localStorage.removeItem( 'token' );
	localStorage.removeItem( 'expDate' );
	localStorage.removeItem( 'userId' );
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
				const expDate = new Date( new Date().getTime() + res.data.expiresIn * 1000 );
		
				localStorage.setItem( 'token', res.data.idToken );
				localStorage.setItem( 'expDate', expDate );
				localStorage.setItem( 'userId', res.data.localId );
				dispatch( checkAuthTimeout( res.data.expiresIn ) );
				dispatch( authSuccess( res.data.idToken, res.data.localId ) );

			} )
			.catch( err => {
				dispatch( authFail( err.response.data.error.message ) );
			} );


	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem( 'token' );
		const userId = localStorage.getItem( 'userId' );
		if ( !token ) {
			dispatch( logOut() );
		} else {
			const expDate = new Date( localStorage.getItem( 'expDate' ) );

			if ( expDate > new Date() ) {
				dispatch( authSuccess( token, userId ) );
				dispatch( checkAuthTimeout( (expDate.getTime() - new Date().getTime()) / 1000 ) );
			} else {
				dispatch( logOut() );
			}

		}
	};
};