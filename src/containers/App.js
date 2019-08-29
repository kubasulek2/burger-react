import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';
import Orders from './Orders/Orders';

import './App.css';

class App extends Component {

	render() {
		return (
			<div className="App">
				<Layout>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/' exact component={BurgerBuilder} />
				</Layout>
			</div>
		);
	}
}
export default App;
