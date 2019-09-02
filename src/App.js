import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth.js';

import './App.css';

class App extends Component {

	render() {
		return (
			<div className="App">
				<Layout>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/auth' component={Auth} />
					<Route path='/' exact component={BurgerBuilder} />
				</Layout>
			</div>
		);
	}
}
export default App;
