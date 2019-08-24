import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {

	const controls = [
		{ label: 'Cheese', type: 'cheese' },
		{ label: 'Salad', type: 'salad' },
		{ label: 'Meat', type: 'meat' },
		{ label: 'Bacon', type: 'bacon' }
	];


	console.log(props.purchasable);
	

	return (
		<div className={styles.BuildControls}>
			<p>Current Price: {props.price.toFixed(2)}$</p>
			{controls.map(ctrl => (
				<BuildControl
					added={() => props.ingredientAdded(ctrl.type)}
					removed={() => props.ingredientRemoved(ctrl.type)}
					key={ctrl.label}
					label={ctrl.label}
					disabled={props.isDisabled[ctrl.type]} />
			))}
			<button 
				className={styles.OrderButton}
				disabled={!props.purchasable}
				onClick={props.purchase}
			>
				ORDER NOW
			</button>
		</div>
	);
};

export default buildControls;

