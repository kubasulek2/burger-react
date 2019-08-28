import React, { Component } from 'react';
import Summary from '../../components/Order/Summary/Summary'

export class Checkout extends Component {
	
	state = {
		ingredients: {
			cheese: 1,
			bacon: 1,
			meat: 1,
			salad: 1
		}
	};
	
	render() {

		return (
			<div>
				<Summary ingredients={this.state.ingredients}/>
			</div>
		);
	}
}

export default Checkout;
