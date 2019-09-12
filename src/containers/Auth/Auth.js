import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/actionIndex';
import styles from './Auth.module.css';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {

	const [ controls, setControls ] = useState({
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
				minLength: 5
			},
			valid: false,
			touched: false
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password'
			},
			value: '',
			validation: {
				required: true,
				minLength: 6
			},
			valid: false,
			touched: false
		}
	});

	const [ isFromValid, setIsFromValid ] = useState(false);
	const [ isSignUp, setIsSignUp ] = useState(true);


	const inputChangeHandler = (event, inputIdentifier) => {

		const updatedControlsElement = updateObject(controls[ inputIdentifier ], {
			value: event.target.value,
			touched: true,
			valid: checkValidity(event.target.value, controls[ inputIdentifier ].validation)
		});

		const updatedControls = updateObject(controls, {
			[ inputIdentifier ]: updatedControlsElement
		});

		let formIsValid = true;

		/* eslint-disable no-unused-vars */

		for (const input in updatedControls) {
			formIsValid = updatedControls[ input ].valid && formIsValid;
		}

		setControls(updatedControls);
		setIsFromValid(formIsValid);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (isSignUp) {
			props.authenticate(controls.email.value, controls.password.value, true);
		} else {
			props.authenticate(controls.email.value, controls.password.value, false);
		}
	};

	const switchAuthHandler = (event) => {
		event.preventDefault();

		setIsSignUp(prevState => !prevState);
	};


	const formElementsArr = [];

	for (const key in controls) {
		formElementsArr.push({
			id: key,
			config: controls[ key ]
		});

	}
	/* eslint-enable no-unused-vars */
	const form = formElementsArr.map(input => (
		<Input
			key={ input.id }
			elementType={ input.config.elementType }
			elementConfig={ input.config.elementConfig }
			value={ input.config.value }
			invalid={ !input.config.valid }
			touched={ input.config.touched }
			changed={ (event) => inputChangeHandler(event, input.id) }
		/>
	));
	let redirect = props.isAuth ? <Redirect to={ props.url } /> : null;

	return (
		<div className={ styles.Auth } >
			{ redirect }
			{ !props.loading
				? <form >
					{ form }
					<Button type='Success' disabled={ !isFromValid } clicked={ submitHandler }>
						{ isSignUp ? 'Sign Up' : 'Login In' }
					</Button>
					<Button type='Danger' clicked={ switchAuthHandler } >
						Switch to { isSignUp ? 'log in' : 'sign up' }
					</Button>
					<p style={ { margin: '1rem', color: 'red' } }>{ props.error }</p>
				</form>
				: <Spinner />
			}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		url: state.burger.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authenticate: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
