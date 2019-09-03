import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../utility';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false
};

const authStart = ( state, action ) => {
	updateObject( state, {
		error: null,
		loading: true
	} );
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.AUTH_START:
			return;
		case actionTypes.AUTH_SUCCESS:
			return updateObject( state, {
				error: null,
				loading: true
			} );
		case actionTypes.AUTH_FAIL:
			break;

		default:
			return state;
	}
};

export default reducer;
