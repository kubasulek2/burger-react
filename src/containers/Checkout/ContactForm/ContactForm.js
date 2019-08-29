import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';

import styles from './ContactForm.module.css';

export class ContactForm extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			zipCode: ''
		},
		loading: false
	}
	orderHandler = (event) => {

		event.preventDefault();

		this.setState({ loading: true });

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: this.state.name,
				address: {
					street: this.state.address.street,
					zipCode: this.state.address.zipCode
				},
				email: this.state.email,
				deliveryMethod: 'fastest'
			}
		};
		/* eslint-disable no-unused-vars */
		axios.post('/orders.json', order)
			.then(res => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(err => {
				this.setState({ loading: false });
			});
		/* eslint-enable no-unused-vars */
	}

	render() {
		let form = (
			<form action="" method="post">
				<input type="text" name='name' placeholder='Your Name' />
				<input type="email" name='email' placeholder='Your Email' />
				<input type="text" name='street' placeholder='Street' />
				<input type="text" name='postal' placeholder='Zip Code' />
				<Button type='Success' clicked={this.orderHandler}>ORDER</Button>
			</form>
		);
		
		if(this.state.loading){
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
