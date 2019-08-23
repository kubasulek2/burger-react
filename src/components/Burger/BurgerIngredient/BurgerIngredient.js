import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredient.module.css';


const burgerIngredient = (props) => {
	
	let ingredient = props.type ? <div className={styles[props.type]}></div> : null;

	if (props.type === 'BreadTop')
	{
		ingredient = (
			<div className={styles[props.type]}>
				<div className={styles.Seeds1}></div>
				<div className={styles.Seeds2}></div>
			</div>
		);
	}
	
			

	
	return ingredient;
};
burgerIngredient.propTypes = {
	type: PropTypes.string.isRequired
};

export default burgerIngredient;
