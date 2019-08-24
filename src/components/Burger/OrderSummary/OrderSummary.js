import React from 'react';
import Aux from '../../../hoc/Aux';

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
			<p>Would you like to order now?</p>
		</Aux>
	);
};

export default orderSummary;
