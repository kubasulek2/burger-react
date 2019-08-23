import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredient.module.css';


const burgerIngredient = (props) => {
	
	let ingredient = props.className ? <div className={styles[props.className]}></div> : null;

	if (props.className === 'BreadTop')
	{
		ingredient = (
			<div className={styles[props.className]}>
				<div className={styles.Seeds1}></div>
				<div className={styles.Seeds2}></div>
			</div>
		);
	}
	
			

	
	return ingredient;
};
burgerIngredient.propTypes = {
	className: PropTypes.string.isRequired
};

export default burgerIngredient;
