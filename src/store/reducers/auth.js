import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../utility';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false
};

const authStart = ( state ) => {
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
		loading: false
	} );
};

const authFail = ( state, action ) => {
	const error = action.error
		.toLowerCase()
		.trim()
		.replace( /_/g, ' ' );

	const errorMessage = error.charAt( 0 ).toUpperCase() + error.slice( 1 ) + '.';

	return updateObject( state, {
		error: errorMessage,
		loading: false
	} );
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.AUTH_START: return authStart( state );
		case actionTypes.AUTH_SUCCESS: return authSuccess( state, action );
		case actionTypes.AUTH_FAIL: return authFail( state, action );
		default: return state;
	}
};

export default reducer;
