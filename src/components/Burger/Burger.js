import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';



const burger = (props) => {

	/* Create Array from Object Keys */	
	const ingredients = Object.keys(props.ingredients);
	
	/* change each element in array from ie 'burger-top' to 'BurgerTop */
	
	ingredients.forEach((str, i, arr) => {

		let result = str.charAt(0).toUpperCase() + str.slice(1);
		
		if (str.includes('-')) {
			result = result.replace(/-/g, '');
			result = result.split('');
			result[str.indexOf('-')] = result[str.indexOf('-')].toUpperCase();
			result = result.join('');
		}
		arr[i] = result;
	});


	return (
		<div className={styles.Burger}>
			<BurgerIngredient type='BreadTop' />
			<BurgerIngredient type='Cheese' />
			<BurgerIngredient type='Meat' />
			<BurgerIngredient type='Salad' />
			<BurgerIngredient type='BreadBottom' />
		</div>
	);
};


export default burger;