import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
	const isVisible = props.isOpen ? styles.Open : styles.Close;
	return (
		<Aux>
			<Backdrop show={props.isOpen} clicked={props.close} />
			<div className={[styles.SideDrawer, isVisible].join(' ')}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer;
