import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';



const burger = (props) => {

	return (
		<div className={styles.Burger}>
			<BurgerIngredient type='BreadTop'/>
		</div>
	);
};


export default burger;