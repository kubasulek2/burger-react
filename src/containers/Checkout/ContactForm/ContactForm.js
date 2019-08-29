import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import styles from './ContactForm.module.css';

export class ContactForm extends Component {
	state={
		name: '',
		email: '',
		adress: {
			street: '',
			zipCode: ''
		}
	}
	orderHandler = () => {
		
	}
	
	render() {
		return (
			<div className={styles.ContactForm}>
				<h4>Enter your Contact Data</h4>
				<form action="" method="post">
					<input type="text" name='name' placeholder='Your Name'/>
					<input type="email" name='email' placeholder='Your Email'/>
					<input type="text" name='street' placeholder='Street'/>
					<input type="text" name='postal' placeholder='Zip Code'/>
					<Button type='Success'>ORDER</Button>
				</form>
			</div>
		);
	}
}

export default ContactForm;
