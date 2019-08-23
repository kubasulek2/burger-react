import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';



const burger = (props) => {

	/* Create Array from Object Keys */
	/* Then create type by altering kye string like: 'burger-top' to 'BurgerTop */
	/* then create empty array with so many elements as props.ingredients[key] */

	let ingredients = Object.keys(props.ingredients)
		.map((key) => {
			let type = key.charAt(0).toUpperCase() + key.slice(1);

			if (key.includes('-')) {
				type = type.replace(/-/g, '');
				type = type.split('');
				type[key.indexOf('-')] = type[key.indexOf('-')].toUpperCase();
				type = type.join('');
			}

			return [...Array(props.ingredients[key])]
				.map((_, i) => <BurgerIngredient key={key + i} type={type} />);

		})
		.reduce((prev,next) => prev.concat(next));

	if(!ingredients.length){
		ingredients = <p>Please Start Adding Ingredients</p>
	}
		

	console.log(ingredients);
	


	return (
		<div className={styles.Burger}>
			<BurgerIngredient type='BreadTop'/>
			{ingredients}
			<BurgerIngredient type='BreadBottom' />

		</div>
	);
};


export default burger;