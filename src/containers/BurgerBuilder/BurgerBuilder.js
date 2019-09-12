import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actions from '../../store/actions/actionIndex';




const BurgerBuilder = props => {


	const [ purchase, setPurchase ] = useState(false);

	// eslint-disable-next-line
	useEffect(() => props.fetchIngredients(), []);



	const isPurchasable = () => {
		const sum = Object.values({ ...props.ings })
			.reduce((prev, next) => prev + next, 0);

		return sum > 0;
	};

	const purchaseHandler = () => {
		if (props.isAuth)
			setPurchase(true);
		else props.history.push('/auth');
	};

	const purchaseCancelHandler = () => {
		setPurchase(false);
	};

	const purchaseContinue = () => {
		props.purchaseInit();
		props.history.push('/checkout');
	};

	let burger = !props.error ? <Spinner /> : <p>Error Occurred...</p>;
	let disableInfo = null;
	let orderSummary = null;
	if (props.ings) {

		/* eslint-disable no-unused-vars */

		disableInfo = { ...props.ings };
		for (let key in disableInfo) {
			if (Object.hasOwnProperty.call(disableInfo, key)) {
				disableInfo[ key ] = disableInfo[ key ] <= 0;

			}
		}

		burger = (
			<Aux>
				<Burger ingredients={ props.ings } />
				<BuildControls
					isAuth={ props.isAuth }
					purchasable={ isPurchasable() }
					price={ props.price }
					isDisabled={ disableInfo }
					ingredientAdded={ props.onIngredientAdded }
					ingredientRemoved={ props.onIngredientRemoved }
					ingredients={ props.ings }
					purchase={ purchaseHandler }
				/>
			</Aux>
		);

		orderSummary = <OrderSummary
			ingredients={ props.ings }
			cancel={ purchaseCancelHandler }
			continue={ purchaseContinue }
			price={ props.price }
		/>;
	}

	/* eslint-enable no-unused-vars */

	return (
		<Aux>
			<Modal
				show={ purchase }
				modalClosed={ purchaseCancelHandler }
			>
				{ orderSummary }
			</Modal>
			{ burger }
		</Aux>
	);
};

const mapStateToProps = state => {
	return {
		ings: state.burger.ingredients,
		price: state.burger.totalPrice,
		error: state.burger.error,
		isAuth: state.auth.token !== null
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ing) => dispatch(actions.addIngredient(ing)),
		onIngredientRemoved: (ing) => dispatch(actions.removeIngredient(ing)),
		fetchIngredients: () => dispatch(actions.initIngredients()),
		purchaseInit: () => dispatch(actions.purchaseInit())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
