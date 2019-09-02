import React, { Component } from 'react';
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



class BurgerBuilder extends Component {

	state = {
		purchase: false,
	};


	componentDidMount() {
		this.props.fetchIngredients();
	}


	isPurchasable = () => {
		const sum = Object.values({ ...this.props.ings })
			.reduce((prev, next) => prev + next, 0);

		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({ purchase: true });
	}
	
	purchaseCancelHandler = () => {
		this.setState({ purchase: false });
	}
	
	purchaseContinue = () => {
		this.props.purchaseInit();
		this.props.history.push('/checkout');
	}

	render() {
		let burger = !this.props.error ? <Spinner /> : <p>Error Occurred...</p>;
		let disableInfo = null;
		let orderSummary = null;
		if (this.props.ings) {

			/* eslint-disable no-unused-vars */

			disableInfo = { ...this.props.ings };
			for (let key in disableInfo) {
				if (Object.hasOwnProperty.call(disableInfo, key)) {
					disableInfo[key] = disableInfo[key] <= 0;

				}
			}

			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						purchasable={this.isPurchasable()}
						price={this.props.price}
						isDisabled={disableInfo}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						ingredients={this.props.ings}
						purchase={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = <OrderSummary
				ingredients={this.props.ings}
				cancel={this.purchaseCancelHandler}
				continue={this.purchaseContinue}
				price={this.props.price}
			/>;
		}

		/* eslint-enable no-unused-vars */

		return (
			<Aux>
				<Modal
					show={this.state.purchase}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burger.ingredients,
		price: state.burger.totalPrice,
		error: state.burger.error
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
