import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactForm.module.css';

export class ContactForm extends Component {
	state = {
		formData: {
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
		},
		loading: false,
		isFromValid: false
	}
	orderHandler = (event) => {

		event.preventDefault();
		/* eslint-disable no-unused-vars */

		this.setState({ loading: true });

		let formData = {};
		for (const key in this.state.formData) {
			formData[key] = this.state.formData[key].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price.toFixed(2),
			formData: formData
		};

		axios.post('/orders.json', order)
			.then(res => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(err => {
				this.setState({ loading: false });
			});

	}

	inputChangeHandler = (event, inputIdentifier) => {

		const updatedFormData = { ...this.state.formData };
		const updatedFormDataElement = { ...updatedFormData[inputIdentifier] }; // second level copy

		updatedFormDataElement.value = event.target.value;
		updatedFormDataElement.touched = true;
		updatedFormDataElement.valid = this.checkValidity(updatedFormDataElement.value, updatedFormDataElement.validation);
		updatedFormData[inputIdentifier] = updatedFormDataElement;

		let formIsValid = true;

		for (const input in updatedFormData) {
			formIsValid = updatedFormData[input].valid && formIsValid;
		}


		this.setState({
			formData: updatedFormData,
			isFromValid: formIsValid
		});

	}

	checkValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}


		return isValid;
	}

	render() {

		const formElementsArr = [];

		for (const key in this.state.formData) {
			formElementsArr.push({
				id: key,
				config: this.state.formData[key]
			});

		}

		/* eslint-enable no-unused-vars */
		let form = (
			<form action="" method="post" onSubmit={this.orderHandler}>

				{formElementsArr.map(input => (
					<Input
						key={input.id}
						elementType={input.config.elementType}
						elementConfig={input.config.elementConfig}
						value={input.config.value}
						invalid={!input.config.valid}
						touched={input.config.touched}
						changed={(event) => this.inputChangeHandler(event, input.id)}
					/>
				))}
				<Button
					disabled={!this.state.isFromValid}
					type='Success' 
					clicked={this.orderHandler}
				>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={styles.ContactForm}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

export default connect(mapStateToProps)(ContactForm);