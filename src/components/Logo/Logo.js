import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './logo.module.css';

const logo = () => {
	return (
		<div className={styles.Logo}>
			<img src={burgerLogo} alt="logo"/>
		</div>
	);
};

export default logo;
