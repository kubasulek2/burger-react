import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ( props ) => {
	const isVisible = props.isOpen ? styles.Open : styles.Close;
	return (
		<Aux>
			<Backdrop show={props.isOpen} clicked={props.close} />
			<div className={[ styles.SideDrawer, isVisible ].join( ' ' )} onClick={props.close}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer;
