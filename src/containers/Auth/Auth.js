import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/actionIndex';
import styles from './Auth.module.css';
import { updateObject, checkValidity } from '../../shared/utility';

export class Auth extends Component {
	state = {
		controls: {
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
		},
		isFromValid: false,
		isSignUp: true
	}

	inputChangeHandler = ( event, inputIdentifier ) => {

		const updatedControlsElement = updateObject( this.state.controls[ inputIdentifier ], {
			value: event.target.value,
			touched: true,
			valid: checkValidity( event.target.value, this.state.controls[ inputIdentifier ] )
		} );

		const updatedControls = updateObject( this.state.controls, {
			[ inputIdentifier ]: updatedControlsElement
		} );
		
		let formIsValid = true;

		/* eslint-disable no-unused-vars */

		for ( const input in updatedControls ) {
			formIsValid = updatedControls[ input ].valid && formIsValid;
		}


		this.setState( {
			controls: updatedControls,
			isFromValid: formIsValid
		} );

	}
	submitHandler = ( event ) => {
		event.preventDefault();
		if ( this.state.isSignUp ) {
			this.props.authenticate( this.state.controls.email.value, this.state.controls.password.value, true );
		} else {
			this.props.authenticate( this.state.controls.email.value, this.state.controls.password.value, false );
		}
	}

	switchAuthHandler = ( event ) => {
		event.preventDefault();

		this.setState( prevState => {
			return {
				isSignUp: !prevState.isSignUp
			};
		} );
	}

	render () {

		const formElementsArr = [];

		for ( const key in this.state.controls ) {
			formElementsArr.push( {
				id: key,
				config: this.state.controls[ key ]
			} );

		}
		/* eslint-enable no-unused-vars */
		const form = formElementsArr.map( input => (
			<Input
				key={input.id}
				elementType={input.config.elementType}
				elementConfig={input.config.elementConfig}
				value={input.config.value}
				invalid={!input.config.valid}
				touched={input.config.touched}
				changed={( event ) => this.inputChangeHandler( event, input.id )}
			/>
		) );
		let redirect = this.props.isAuth ? <Redirect to={this.props.url} /> : null;

		return (
			<div className={styles.Auth} >
				{redirect}
				{!this.props.loading
					? <form >
						{form}
						<Button type='Success' disabled={!this.state.isFromValid} clicked={this.submitHandler}>
							{this.state.isSignUp ? 'Sign Up' : 'Login In'}
						</Button>
						<Button type='Danger' clicked={this.switchAuthHandler} >
							Switch to {this.state.isSignUp ? 'log in' : 'sign up'}
						</Button>
						<p style={{ margin: '1rem', color: 'red' }}>{this.props.error}</p>
					</form>
					: <Spinner />
				}
			</div>
		);
	}
}

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
		authenticate: ( email, password, isSignUp ) => dispatch( actions.auth( email, password, isSignUp ) )
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
