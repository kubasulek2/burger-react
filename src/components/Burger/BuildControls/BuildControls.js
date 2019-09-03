import React from 'react';
import { Link } from 'react-router-dom';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = ( props ) => {

	const controls = [
		{ label: 'Cheese', type: 'cheese' },
		{ label: 'Salad', type: 'salad' },
		{ label: 'Meat', type: 'meat' },
		{ label: 'Bacon', type: 'bacon' }
	];

	let button = (
		<Link style={{ textDecoration: 'none' }} to='/auth'>
			<button className={styles.OrderButton}>
				Log in to continue
			</button>
		</Link>
	);

	if ( props.isAuth ) {
		button = (
			<button
				className={styles.OrderButton}
				disabled={!props.purchasable}
				onClick={props.purchase}
			>
				ORDER NOW
			</button>
		);
	}

	return (
		<div className={styles.BuildControls}>
			<p>Current Price: {props.price.toFixed( 2 )}$</p>
			{controls.map( ctrl => (
				<BuildControl
					added={() => props.ingredientAdded( ctrl.type )}
					removed={() => props.ingredientRemoved( ctrl.type )}
					key={ctrl.label}
					label={ctrl.label}
					disabled={props.isDisabled[ ctrl.type ]} />
			) )}
			{button}
		</div>
	);
};

export default buildControls;

