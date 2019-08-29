import React from 'react';

import styles from './Order.module.css';

const order = (props) => {
	
	const ingredients = Object.keys(props.details.ingredients)
		.map((ing, i) => {
			return props.details.ingredients[ing] === 0 ? null : <p key={i}>{ing} ({props.details.ingredients[ing]})</p>;
		});
	console.log();

	return (
		<div className={styles.Order}>
			<h2>Ingredients</h2>
			{ingredients}
			<p>Price: <strong>{props.details.price} $</strong></p>
		</div>
	);
};

export default order;
