import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
	
	const controls = [
		{ label: 'Cheese', type: 'cheese'},
		{ label: 'Salad', type: 'salad'},
		{ label: 'Meat', type: 'meat'},
		{ label: 'Bacon', type: 'bacon'}
	]; 
	
	
		
	
	return (
		<div className={styles.BuildControls}>
			{controls.map(ctrl => (
				<BuildControl
					added={()=>props.ingredientAdded(ctrl.type)} 
					removed={()=>props.ingredientRemoved(ctrl.type)} 
					key={ctrl.label} 
					label={ctrl.label}/>
			))}
		</div>
	);
};

export default buildControls;

