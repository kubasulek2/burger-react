import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
	
	const controls = Object.keys(props.ingredients).map((el) => {
		return{
			type: el.charAt(0).toUpperCase() + el.slice(1)
		};
	});
	
		
	
	return (
		<div className={styles.BuildControls}>
			{controls.map(ctrl => (
				<BuildControl key={ctrl.type} label={ctrl.type}/>
			))}
		</div>
	);
};

export default buildControls;

