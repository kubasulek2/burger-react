import React, { Component } from 'react';
import Summary from '../../components/Order/Summary/Summary';

export class Checkout extends Component {

	state={
		ingredients: {
			salad: 0,
			cheese: 0,
			meat: 0,
			bacon: 0
		}
	}

	componentDidMount() {

		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		/* eslint-disable no-unused-vars*/
		for (const param of query.entries()) {
			ingredients[param[0]] = +param[1];  // to make string number
		}
		/* eslint-enable no-unused-vars*/

		this.state = {
			ingredients: ingredients
		};

	}


	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutProceedHandler = () => {
		this.props.history.push(this.props.match.url + '/form');
	}

	render() {

		return (
			<div>
				<Summary
					ingredients={this.state.ingredients}
					cancel={this.checkoutCancelHandler}
					continue={this.checkoutProceedHandler}
				/>
			</div>
		);
	}
}

export default Checkout;
