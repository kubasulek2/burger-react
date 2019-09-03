import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../utility';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	loggedIn: false
};

const authStart = state => {
	return updateObject( state, {
		error: null,
		loading: true
	} );
};

const authSuccess = ( state, action ) => {
	return updateObject( state, {
		token: action.idToken,
		userId: action.localId,
		error: null,
		loading: false,
		loggedIn: true
	} );
};

const authFail = ( state, action ) => {
	const error = action.error.toLowerCase().trim().replace( /_/g, ' ' );

	const errorMessage = error.charAt( 0 ).toUpperCase() + error.slice( 1 ) + '.';

	return updateObject( state, {
		error: errorMessage,
		loading: false,
		loggedIn: false
	} );
};

const logOut = ( state ) => {
	console.log(window.localStorage.getItem('token'))
	return updateObject( state, {
		loggedIn: false,
		token: null,
		userId: null
	} );
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.AUTH_START:
			return authStart( state );
		case actionTypes.AUTH_SUCCESS:
			return authSuccess( state, action );
		case actionTypes.AUTH_FAIL:
			return authFail( state, action );
		case actionTypes.AUTH_LOG_OUT:
			return logOut( state );
		default:
			return state;
	}
};

export default reducer;
