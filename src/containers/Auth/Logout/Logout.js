import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/actionIndex';

const Logout = props => {
	const { logOut } = props;
	useEffect(() => {
		logOut();

	}, [ logOut ]);



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
