import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/actionIndex';

const Logout = props => {

	useEffect(() => {
		props.logOut();	
		//eslint-disable-next-line
	},[]);
	


	return (
		<Redirect to='/' />
	);
};
const maDispatchToProps = dispatch => {
	return {
		logOut: () => dispatch(actions.logOut())
	};
};
export default connect(null, maDispatchToProps)(Logout);
