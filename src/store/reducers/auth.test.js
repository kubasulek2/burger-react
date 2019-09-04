import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe( 'auth reducer', () => {
	it( 'should return the initial state', () => {
		expect( reducer( undefined, {} ) ).toEqual( {
			token: null,
			userId: null,
			error: null,
			loading: false,
			loggedIn: false,
		} );
	} );
	it( 'should store the token upon login', () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: false,
					loggedIn: false,
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					idToken: 'token',
					localId: 'id',
				}
			)
		).toEqual(
			{
				token: 'token',
				userId: 'id',
				error: null,
				loading: false,
				loggedIn: true,
			} );
	} );
} );
