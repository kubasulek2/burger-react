import React, { useEffect, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Spinner from './components/UI/Spinner/Spinner';

import * as actions from './store/actions/actionIndex';

import './App.css';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth.js'));
const LogOut = React.lazy(() => import('./containers/Auth/Logout/Logout'));


/* eslint-disable  react/display-name*/

const WaitingComponent = (Component) => {
	return props => (
		<Suspense fallback={ <Spinner /> }>
			<Component { ...props } />
		</Suspense>
	);
};


const App = props => {
	
	// eslint-disable-next-line
	useEffect(() => props.checkLogStatus(), []);


	return (
		<div className="App">
			<Layout>
				{ props.isAuth ? <Route path='/checkout' component={ WaitingComponent(Checkout) } /> : null }
				{ props.isAuth ? <Route path='/orders' component={ WaitingComponent(Orders) } /> : null }
				<Route path='/auth' component={ WaitingComponent(Auth) } />
				<Route path='/logout' component={ WaitingComponent(LogOut) } />
				<Route path='/' exact component={ BurgerBuilder } />
				<Redirect to='/' />
			</Layout>
		</div>
	);

};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		checkLogStatus: () => dispatch(actions.authCheckState())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
