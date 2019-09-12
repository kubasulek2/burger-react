import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Summary from '../../components/Order/Summary/Summary';
import ContactForm from './ContactForm/ContactForm';

const Checkout = props => {


	const checkoutCancelHandler = () => {
		props.history.goBack();
	};

	const checkoutProceedHandler = () => {
		props.history.push(props.match.url + '/contact-form');
	};

	let summary = <Redirect to='/' />;

	if (props.ings) {

		const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;

		summary = (
			<div>
				{ purchasedRedirect }
				<Summary
					ingredients={ props.ings }
					cancel={ checkoutCancelHandler }
					continue={ checkoutProceedHandler }
				/>
				<Route path={ props.match.url + '/contact-form' } component={ ContactForm } />
			</div>
		);
	}
	return (
		<div>
			{ summary }
		</div>
	);

};

const mapStateToProps = state => {
	return {
		ings: state.burger.ingredients,
		purchased: state.order.purchased
	};
};




export default connect(mapStateToProps)(Checkout);
