import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
					{this.props.isAuth ? <Route path='/checkout' component={Checkout} /> : null}
					{this.props.isAuth ? <Route path='/orders' component={Orders} /> : null}
					<Route path='/auth' component={Auth} />
					<Route path='/logout' component={LogOut} />
					<Route path='/' exact component={BurgerBuilder} />
					<Redirect to='/'/>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		checkLogStatus: () => dispatch( actions.authCheckState() )
	};
};
export default connect( mapStateToProps, mapDispatchToProps )( App );
