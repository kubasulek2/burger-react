import React, { Component } from 'react';

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
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				validation: {
					required: true,

				},
				valid: true,
			}
		},
		loading: false
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
			ingredients: this.props.ingredients,
			price: this.props.price,
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
		updatedFormDataElement.valid = this.checkValidity(updatedFormDataElement.value, updatedFormDataElement.validation);
		updatedFormData[inputIdentifier] = updatedFormDataElement;
		
		console.log(updatedFormDataElement);
		this.setState({
			formData: updatedFormData
		});

	}

	checkValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength){
			isValid = value >= rules.minLength && isValid;
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
						invalid={!input.valid}
						changed={(event) => this.inputChangeHandler(event, input.id)}
					/>
				))}
				<Button type='Success' clicked={this.orderHandler}>ORDER</Button>
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

export default ContactForm;
