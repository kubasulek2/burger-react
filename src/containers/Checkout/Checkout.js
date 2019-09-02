import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Summary from '../../components/Order/Summary/Summary';
import ContactForm from './ContactForm/ContactForm';

export class Checkout extends Component {

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutProceedHandler = () => {
		this.props.history.push(this.props.match.url + '/contact-form');
	}

	render() {
		let summary = <Redirect  to='/'/>;

		if (this.props.ings) {
			summary = (
				<div>
					<Summary
						ingredients={this.props.ings}
						cancel={this.checkoutCancelHandler}
						continue={this.checkoutProceedHandler}
					/>
					<Route path={this.props.match.url + '/contact-form'} component={ContactForm} />
				</div>
			);
		}
		return (
			<div>
				{summary}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burger.ingredients,
	};
};



export default connect(mapStateToProps)(Checkout);
