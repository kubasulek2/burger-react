import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';



const burger = (props) => {

	/* Create Array from Object Keys */
	/* Then create type by altering kye string like: 'burger-top' to 'BurgerTop */
	/* then create empty array with so many elements as props.ingredients[key] */

	let ingredients = Object.keys(props.ingredients)
		.map((key) => {
			let className = key.charAt(0).toUpperCase() + key.slice(1);

			if (key.includes('-')) {
				className = className.replace(/-/g, '');
				className = className.split('');
				className[key.indexOf('-')] = className[key.indexOf('-')].toUpperCase();
				className = className.join('');
			}
				
			return [...Array(props.ingredients[key])]
				.map((_, i) => <BurgerIngredient key={key + i} className={className} />);

		})
		.reduce((prev,next) => prev.concat(next));

	if(!ingredients.length){
		ingredients = <p>Please Start Adding Ingredients</p>;
	}
		



	return (
		<div className={styles.Burger}>
			<BurgerIngredient className='BreadTop'/>
			{ingredients}
			<BurgerIngredient className='BreadBottom' />

		</div>
	);
};


export default burger;