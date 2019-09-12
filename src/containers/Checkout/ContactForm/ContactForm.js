import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-order';
import withError from '../../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../../store/actions/actionIndex';
import { updateObject, checkValidity } from '../../../shared/utility';

import styles from './ContactForm.module.css';

const ContactForm = props => {

	const [ isFormValid, setIsFormValid ] = useState(false);
	const [ formData, setFormData ] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name'
			},
			value: '',
			validation: {
				required: true,
				minLength: 2
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Your Email'
			},
			value: '',
			validation: {
				required: true,
				isEmail: true,

			},
			valid: false,
			touched: false
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Street'
			},
			value: '',
			validation: {
				required: true,
				minLength: 3
			},
			valid: false,
			touched: false
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'ZIP Code'
			},
			value: '',
			validation: {
				required: true,

			},
			valid: false,
			touched: false
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Country'
			},
			value: '',
			validation: {
				required: false,

			},
			valid: true,
			touched: false
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Fastest' },
					{ value: 'cheapest', displayValue: 'Cheapest' }
				]
			},
			value: 'fastest',
			validation: {
				required: true,

			},
			valid: true,
			touched: false
		}
	});

	const orderHandler = (event) => {

		event.preventDefault();
		/* eslint-disable no-unused-vars */



		let formData = {};
		for (const key in formData) {
			formData[ key ] = formData[ key ].value;
		}
		const order = {
			ingredients: props.ingredients,
			price: props.price.toFixed(2),
			formData: formData
		};

		props.purchaseHandle(order);

	};

	const inputChangeHandler = (event, inputIdentifier) => {

		const updatedFormDataElement = updateObject(formData[ inputIdentifier ], {
			value: event.target.value,
			touched: true,
			valid: checkValidity(event.target.value, formData[ inputIdentifier ].validation)
		});
		const updatedFormData = updateObject(formData, {
			[ inputIdentifier ]: updatedFormDataElement
		});

		updatedFormData[ inputIdentifier ] = updatedFormDataElement;

		let formIsValid = true;

		for (const input in updatedFormData) {
			formIsValid = updatedFormData[ input ].valid && formIsValid;
		}

		setFormData(updatedFormData);
		setIsFormValid(formIsValid);
	};



	const formElementsArr = [];

	for (const key in formData) {
		formElementsArr.push({
			id: key,
			config: formData[ key ]
		});

	}

	/* eslint-enable no-unused-vars */
	let form = (
		<form action="" method="post" onSubmit={ orderHandler }>

			{ formElementsArr.map(input => (
				<Input
					key={ input.id }
					elementType={ input.config.elementType }
					elementConfig={ input.config.elementConfig }
					value={ input.config.value }
					invalid={ !input.config.valid }
					touched={ input.config.touched }
					changed={ (event) => inputChangeHandler(event, input.id) }
				/>
			)) }
			<Button
				disabled={ !isFormValid }
				type='Success'
				clicked={ orderHandler }
			>
				ORDER
			</Button>
		</form>
	);

	if (props.loading) {
		form = <Spinner />;
	}

	return (
		<div className={ styles.ContactForm }>
			<h4>Enter your Contact Data</h4>
			{ form }
		</div>
	);

};

const mapStateToProps = state => {
	return {
		ingredients: state.burger.ingredients,
		price: state.burger.totalPrice,
		loading: state.order.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		purchaseHandle: (orderData) => dispatch(action.handlePurchase(orderData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(ContactForm, axios));
