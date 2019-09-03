import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth.js';
import LogOut from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/actionIndex';

import './App.css';

class App extends Component {
	componentDidMount () {
		this.props.checkLogStatus();
	}


	render () {

		return (
			<div className="App">
				<Layout>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/auth' component={Auth} />
					<Route path='/logout' component={LogOut} />
					<Route path='/' exact component={BurgerBuilder} />
				</Layout>
			</div>
		);
	}
}
const mapDispatchToProps = dispatch => {
	return {
		checkLogStatus: () => dispatch( actions.authCheckState() )
	};
};
export default connect( null, mapDispatchToProps )( App );
