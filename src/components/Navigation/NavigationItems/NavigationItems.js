import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {
	return (
		<ul className={styles.NavigationItems}>
			<NavigationItem link='/'>Burger Builder</NavigationItem>
			<NavigationItem link='/orders'>Orders</NavigationItem>
			{!props.isAuth
				? <NavigationItem link='/auth'>Sign Up</NavigationItem>
				: <NavigationItem link='/logout'>Logout</NavigationItem>
			}
		</ul>
	);
};

export default navigationItems;
