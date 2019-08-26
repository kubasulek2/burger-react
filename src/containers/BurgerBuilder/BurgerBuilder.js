import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.5,
	cheese: .4,
	meat: 1.3
};

class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchase: false,
		loading: false

	};

	updatePurchaseState = (ingredients) => {
		const sum = Object.values({ ...ingredients })
			.reduce((prev, next) => prev + next, 0);

		this.setState({ purchasable: sum > 0 });
	}

	addIngredientHandler = (type) => {


		const oldCount = this.state.ingredients[type];
		const updateCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[type] = updateCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);

	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) return;
		const updateCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[type] = updateCount;

		const priceSubtraction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceSubtraction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({ purchase: true });
	}

	purchaseCancelHandler = () => {
		this.setState({ purchase: false });
	}

	purchaseContinue = () => {
		/* eslint-disable no-unused-vars */
		this.setState({loading: true});

		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Kuba Sułkowski',
				adress: {
					street: 'Dżonków 3',
					zipCode: '00-000'
				},
				email: 'example@yahoo.com',
				deliveryMethod: 'fastest'
			}
		};

		axios.post('/orders.json', order)
			.then(res => {
				this.setState({ loading: false, purchase: false});
			})
			.catch(err => {
				this.setState({ loading: false, purchase: false });
			});
	}

	render() {

		
		const disableInfo = { ...this.state.ingredients };
		for (let key in disableInfo) {
			if (Object.hasOwnProperty.call(disableInfo, key)) {
				disableInfo[key] = disableInfo[key] <= 0;

			}
		}
		/* eslint-enable no-unused-vars */

		let orderSummary = <OrderSummary
			ingredients={this.state.ingredients}
			cancel={this.purchaseCancelHandler}
			continue={this.purchaseContinue}
			price={this.state.totalPrice}
		/>;

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchase}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					isDisabled={disableInfo}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					ingredients={this.state.ingredients}
					purchase={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
