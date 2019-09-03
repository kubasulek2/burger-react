import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/actionIndex';
export class Logout extends Component {
	
	componentDidMount() {
		this.props.logOut();
	}
	

	render () {
		return (
			<Redirect to='/' />
		);
	}
}
const maDispatchToProps = dispatch => {
	return {
		logOut: ()=> dispatch( actions.logOut() )
	};
};
export default connect( null, maDispatchToProps )( Logout );
