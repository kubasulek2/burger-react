import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.5,
	cheese: .4,
	meat: 1.3
};

class BurgerBuilder extends Component {

	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchase: false,
		loading: false,
		error: false,


	};

	componentDidMount() {
		axios.get('/ingredients.json')
			.then(res => {
				this.setState({ ingredients: res.data });
			})
			.catch(error => {
				this.setState({error: true});
				return error;
			});
	}


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
		this.setState({ loading: true });

		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Kuba Sułkowski',
				address: {
					street: 'Dżonków 3',
					zipCode: '00-000'
				},
				email: 'example@yahoo.com',
				deliveryMethod: 'fastest'
			}
		};

		axios.post('/orders.json', order)
			.then(res => {
				this.setState({ loading: false, purchase: false });
			})
			.catch(err => {
				this.setState({ loading: false, purchase: false });
			});
	}

	render() {
		let burger = !this.state.error ? <Spinner /> : <p>Error Occurred...</p>;
		let disableInfo = null;
		let orderSummary= null;
		if (this.state.ingredients) {
			
			disableInfo = { ...this.state.ingredients };
			for (let key in disableInfo) {
				if (Object.hasOwnProperty.call(disableInfo, key)) {
					disableInfo[key] = disableInfo[key] <= 0;

				}
			}

			burger = (
				<Aux>
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

			orderSummary = <OrderSummary
				ingredients={this.state.ingredients}
				cancel={this.purchaseCancelHandler}
				continue={this.purchaseContinue}
				price={this.state.totalPrice}
			/>;
		}

		/* eslint-enable no-unused-vars */


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
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
