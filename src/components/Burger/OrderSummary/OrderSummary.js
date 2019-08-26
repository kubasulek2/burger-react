import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';


const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients)
		.map((ing) => {
			return (
				props.ingredients[ing] > 0 
					? <li key={ing}>
						<span style={{ textTransform: 'uppercase' }}>{ing}</span>: {props.ingredients[ing]}
					</li> 
					: null
			);
		});
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total: {props.price.toFixed(2)}$</strong></p>
			<p>Would you like to order now?</p>
			<Button type='Danger' clicked={props.cancel}>Cancel</Button>
			<Button type='Success' clicked={props.continue}>Continue</Button>
		</Aux>
	);
};

orderSummary.propTypes = {
	ingredients: PropTypes.object.isRequired,
	cancel: PropTypes.func.isRequired,
	continue: PropTypes.func.isRequired,
	price: PropTypes.number.isRequired
};

export default orderSummary;
