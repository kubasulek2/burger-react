import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Summary from '../../components/Order/Summary/Summary';
import ContactForm from './ContactForm/ContactForm';

export class Checkout extends Component {

	state = {
		ingredients: {
			bacon: 0,
			cheese: 0,
			meat: 0,
			salad: 0
		},
		totalPrice: 0
	}

	componentDidMount() {

		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let totalPrice;

		/* eslint-disable no-unused-vars*/
		for (const param of query.entries()) {
			if (param[0] === 'totalPrice') {
				totalPrice = +param[1];
			} else {
				ingredients[param[0]] = +param[1];  // to make string number
			}
		}
		/* eslint-enable no-unused-vars*/
		if (this.props.location.search) {
			this.setState({
				ingredients: ingredients,
				totalPrice: totalPrice
			});
		}
	}


	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutProceedHandler = () => {
		this.props.history.push(this.props.match.url + '/contact-form');
	}

	render() {

		return (
			<div>
				<Summary
					ingredients={this.state.ingredients}
					cancel={this.checkoutCancelHandler}
					continue={this.checkoutProceedHandler}
				/>
				<Route path={this.props.match.url + '/contact-form'} render={(props) => (
					<ContactForm
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						{...props}
					/>)} />
			</div>
		);
	}
}

export default Checkout;
